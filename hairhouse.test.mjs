import {test} from 'node:test';import assert from 'node:assert/strict';
import {deflateRawSync} from 'node:zlib';
import {APP,users,session,verify,validate} from './netlify/functions/hairhouse.mjs';
const source=APP.slice(APP.indexOf('function match('),APP.indexOf('const $='));
const {forecast,match,extract,duplicates,receiptAlerts,outflowWindows}=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {forecast,match,extract,duplicates,receiptAlerts,outflowWindows};').toString('base64'));
const data=(items=[])=>({version:1,balance:{cents:100000,date:'2026-10-07'},items});const item=(p={})=>({id:'1',kind:'invoice',supplier:'Example',reference:'I1',cents:10000,date:'2026-10-08',status:'confirmed',notes:'',...p});
const cases=[['invoice', [item()],90000],['review excluded',[item({status:'review'})],100000],['paid before balance excluded',[item({status:'paid',paidDate:'2026-10-06'})],100000],['paid after balance deducted',[item({status:'paid',paidDate:'2026-10-08'})],90000],['estimated order',[item({kind:'order',status:'estimated'})],90000],['order matched once',[item({id:'po',kind:'order'}),item({id:'inv',orderId:'po'})],90000],['partial invoices',[item({id:'po',kind:'order'}),item({id:'inv',orderId:'po',cents:4000})],90000],['credit reduces payable',[item(),item({id:'c',kind:'credit',cents:2000})],92000],['credit does not restore order',[item({id:'po',kind:'order'}),item({orderId:'po'}),item({id:'c',kind:'credit',orderId:'po',cents:2000})],92000],['sales excluded from conservative',[item({kind:'inflow',cents:50000})],100000],['cancelled excluded',[item({status:'cancelled'})],100000],['overdue reserved',[item({date:'2026-10-01'})],90000]];
for(const [name,items,min] of cases)test(name,()=>assert.equal(forecast(data(items)).minimum,min));
test('12 weeks',()=>assert.equal(forecast(data()).weeks.length,12));test('negative cash visible',()=>assert.equal(forecast(data([item({cents:200000})])).minimum,-100000));test('duplicates case insensitive',()=>assert.equal(duplicates([item(),item({id:'2',reference:'i1'})]).length,1));test('duplicates ignores punctuation',()=>assert.equal(duplicates([item(),item({id:'2',reference:'I 1'})]).length,1));test('blank reference duplicate blocked',()=>assert.equal(duplicates([item({reference:''}),item({id:'2',reference:''})]).length,1));test('blank reference different date allowed',()=>assert.equal(duplicates([item({reference:''}),item({id:'2',reference:'',date:'2026-10-09'})]).length,0));test('blank reference different amount allowed',()=>assert.equal(duplicates([item({reference:''}),item({id:'2',reference:'',cents:5000})]).length,0));test('pack mismatch',()=>assert.ok(match({...item(),lines:[{sku:'a',qty:3,pack:6}]},{...item(),lines:[{sku:'a',qty:6,pack:1}]}).length));test('quantity matches',()=>assert.deepEqual(match({...item(),lines:[{sku:'a',qty:3,pack:6}]},{...item(),lines:[{sku:'a',qty:18,pack:1}]}),[]));test('late receipts',()=>assert.deepEqual(receiptAlerts([item({receiptExpected:'2026-09-20',lines:[{sku:'a',qty:3,pack:6,received:6}]})],'2026-10-07'),['1']));test('received not late',()=>assert.deepEqual(receiptAlerts([item({receiptExpected:'2026-09-20',lines:[{sku:'a',qty:3,pack:6,received:18}]})],'2026-10-07'),[]));test('valid data',()=>assert.equal(validate(data([item()])).version,1));test('invalid dates',()=>assert.throws(()=>validate(data([item({date:'2026-02-30'})]))));test('invalid negative',()=>assert.throws(()=>validate(data([item({cents:-1})]))));test('wrong supplier match',()=>assert.throws(()=>validate(data([item({id:'po',kind:'order'}),item({orderId:'po',supplier:'other'})]))));test('missing configuration fails closed',()=>assert.deepEqual(users({}),[]));test('third user rejected',()=>assert.deepEqual(users({HAIRHOUSE_USERS:'[{},{},{}]'}),[]));test('session integrity and expiry',()=>{const s='x'.repeat(48),u=[{email:'a@example.com'}],token=session('a@example.com',s,0);assert.equal(verify(token,s,u,100),'a@example.com');assert.equal(verify(token+'x',s,u,100),null);assert.equal(verify(token,s,u,9*3600e3),null);assert.equal(verify(token,s,[],100),null);});test('generic extraction is review candidate',()=>{const r=extract('Invoice Number INV-12 Due Date 05/11/2026 Total Due $1,200.00');assert.equal(r.reference,'INV-12');assert.equal(r.cents,120000);assert.equal(r.date,'2026-11-05');});

test('paid linked invoice does not reopen order reserve',()=>assert.equal(forecast(data([item({id:'po',kind:'order'}),item({id:'paid',orderId:'po',status:'paid',paidDate:'2026-10-06'})])).minimum,100000));
test('credit owed not spendable',()=>assert.equal(forecast(data([item({kind:'creditOwed',cents:50000})])).minimum,100000));
const predictionSource=APP.slice(APP.indexOf('function match('),APP.indexOf('const $='));const {bankHistory,historyPrediction,storedBankRows}=await import('data:text/javascript;base64,'+Buffer.from(predictionSource+'\nexport {bankHistory,historyPrediction,storedBankRows};').toString('base64'));
const rows=[];let balance=100000;for(let n=0;n<35;n++){const date=new Date(Date.UTC(2026,7,3+n)).toISOString().slice(0,10);const d=date.split('-').reverse().join('/');balance+=1000;rows.unshift(`${d},10.00,Direct Credit ANZ Worldline,${balance/100}`);}
const model=bankHistory(rows.join('\n')),predictionData={version:1,balance:{cents:100000,date:'2026-09-06'},items:[],historyModel:model};
test('complete weeks only',()=>{assert.equal(model.weeks,4);assert.equal(model.start,'2026-08-03');assert.equal(model.end,'2026-08-30');});
test('sales prediction deterministic',()=>{assert.equal(historyPrediction(predictionData).next7,107000);assert.equal(historyPrediction(predictionData).next30,130000);});
test('bad balance chain rejected',()=>assert.throws(()=>bankHistory(rows.join('\n').replace('1350','9999'))));
test('committed floor not added twice',()=>{const m={...model,daily:model.daily.map(d=>({...d,'other debits':1000}))};const items=[{id:'i',kind:'expense',status:'confirmed',date:'2026-09-07',cents:10000,supplier:'Example',reference:'',notes:''}];assert.equal(historyPrediction({...predictionData,historyModel:m,items}).next7,97000);});
test('history is optional',()=>assert.equal(historyPrediction({...predictionData,historyModel:null}),null));
test('invalid history blocked server side',()=>assert.throws(()=>validate({...predictionData,historyModel:{...model,daily:[]}})));
test('import record validated server side',()=>{assert.throws(()=>validate({...predictionData,lastImport:{date:'12 Oct',added:1,skipped:0}}));assert.throws(()=>validate({...predictionData,lastImport:{date:'2026-10-12',added:-1,skipped:0}}));validate({...predictionData,lastImport:{date:'2026-10-12',added:3,skipped:5}});validate(predictionData);});
test('margin windows use trailing days of actual settlements',()=>{const w=model.margin.windows;assert.deepEqual(w.map(x=>x.days),[7,14,30]);assert.equal(w[0].sales,7*1000);assert.equal(w[2].sales,30*1000);assert.equal(w[0].rent,0);});
test('margin windows validated server side',()=>{assert.throws(()=>validate({...predictionData,historyModel:{...model,margin:{windows:[{days:9}]}}}));validate(predictionData);});
test('margin months cover calendar months with partial flags',()=>{const mo=model.margin.months;assert.deepEqual(mo.map(x=>x.key),['2026-08','2026-09']);assert.equal(mo[0].partial,true);assert.equal(mo[0].start,'2026-08-03');assert.equal(mo[0].sales,29*1000);assert.equal(mo[1].partial,true);assert.equal(mo[1].sales,6*1000);});
test('margin months validated server side',()=>assert.throws(()=>validate({...predictionData,historyModel:{...model,margin:{...model.margin,months:[{key:'bad'}]}}})));
test('margin windows reconcile to bank balance change',()=>{for(const w of [...model.margin.windows,...model.margin.months])assert.equal(w.sales+w.credits-w.staff-w.insurance-w.suppliers-w.royalty-w.rent-w.other-(w.marketing||0)-(w.loans||0)-(w.tax||0)-(w.utilities||0)-(w.fees||0)-(w.coffee||0)-(w.personal||0),w.change);assert.equal(model.margin.windows[0].change,7*1000);});
const mkRows=(from,to,fn)=>{const out=[];for(let n=from;n<=to;n++)out.unshift(fn(n));return out;};
{const all=rows.slice();// newest first, 35 rows
 const A=all.slice(0,20).join('\n'),B=all.slice(15).join('\n');
 test('two overlapping CSVs merge to the single-file model',()=>{const m=bankHistory([B,A]);assert.equal(m.rows,35);assert.equal(m.merge.duplicates,5);assert.deepEqual({...m,merge:undefined},{...model,merge:undefined});});
 test('adjacent CSVs with no overlap still join by balance chain',()=>{const m=bankHistory([all.slice(0,20).join('\n'),all.slice(20).join('\n')]);assert.equal(m.rows,35);assert.equal(m.merge.duplicates,0);});
 test('CSVs with a gap are rejected',()=>assert.throws(()=>bankHistory([all.slice(0,15).join('\n'),all.slice(20).join('\n')]),/do not join/));
 test('contained duplicate file adds nothing',()=>assert.equal(bankHistory([all.join('\n'),all.slice(5,25).join('\n')]).rows,35));
 {const full=[];let bal=100000;const oldestFirst=[];for(let n=0;n<30;n++){const d=new Date(Date.UTC(2026,7,3+Math.floor(n/2))).toISOString().slice(0,10).split('-').reverse().join('/');const amt=n===10||n===11?-4:10;bal+=amt*100;oldestFirst.push(`${d},${amt.toFixed(2)},${amt<0?'Card fee':'ANZ Worldline'},${bal/100}`);}
 const nf=oldestFirst.reverse();// newest first, rows 19 and 18 are the two identical fees
 test('identical same-day fees both survive an overlapping merge',()=>{const m=bankHistory([nf.slice(0,20).join('\n'),nf.slice(8).join('\n')]);assert.equal(m.rows,30);assert.equal(m.merge.duplicates,12);});
 test('same fee on same day in both files is not double counted or dropped',()=>{const m=bankHistory([nf.slice(0,22).join('\n'),nf.slice(8).join('\n')]);assert.equal(m.rows,30);});
}
}

{const all=rows.slice(),base=bankHistory(all.join('\n')),stored=storedBankRows(base);
 test('saved history rebuilds bank rows with balances',()=>{assert.equal(stored.length,35);assert.equal(stored[0].balance,base.latestCents);for(let n=0;n<stored.length-1;n++)assert.equal(stored[n].balance,stored[n+1].balance+stored[n].cents);});
 const feed=[];let bal=base.latestCents;for(let n=0;n<10;n++){const ds=new Date(Date.UTC(2026,8,7+n)).toISOString().slice(0,10).split('-').reverse().join('/');bal+=1000;feed.unshift(`${ds},10.00,Direct Credit ANZ Worldline,${bal/100}`);}
 test('a new feed extends saved history without re-selecting old files',()=>{const m=bankHistory([feed.join('\n'),stored]);assert.equal(m.rows,45);assert.equal(m.latestCents,bal);});
 test('re-importing the same export adds nothing',()=>assert.equal(bankHistory([all.join('\n'),stored]).rows,35));
 test('an overlapping new feed skips the overlap silently',()=>{const m=bankHistory([feed.concat(all.slice(0,30)).join('\n'),stored]);assert.equal(m.rows,45);assert.equal(m.merge.duplicates,30);});
 test('a feed with a gap to saved history is rejected with the missing dates',()=>assert.throws(()=>bankHistory([feed.slice(0,7).join('\n'),stored]),/do not join/));
}
{const long=[];let lb=500000;for(let n=0;n<28;n++){const ds=new Date(Date.UTC(2026,8,1+n)).toISOString().slice(0,10).split('-').reverse().join('/');lb+=1000;long.unshift(`${ds},10.00,${'Direct Credit ANZ Worldline settlement reference '+'x'.repeat(140)},${lb/100}`);}
 test('references trimmed in saved history still dedupe against the raw export',()=>{const st=storedBankRows(bankHistory(long.join('\n')));assert.equal(bankHistory([long.join('\n'),st]).rows,28);});
}
{const {parseCashTenders,mergeCash,cashIn}=await import('data:text/javascript;base64,'+Buffer.from(predictionSource+'\nexport {parseCashTenders,mergeCash,cashIn};').toString('base64'));
const cell=(t,v)=>`<Cell><Data ss:Type="${t}">${v}</Data></Cell>`,hdr=['Date','Location','Visa','Cash','Total Cash &amp; Cards'].map(x=>cell('String',x)).join('');
const xml=(rows,loc='Store A')=>`<Workbook><Worksheet><Table><Row>${hdr}</Row>${rows.map(([d,c])=>`<Row>${cell('DateTime',d+'T00:00:00')}${cell('String',loc)}${cell('Number','.00')}${cell('Number',c)}${cell('Number',c)}</Row>`).join('')}<Row>${cell('String','Overall Total')}${cell('String','')}${cell('Number','0')}${cell('Number','999')}</Row></Table></Worksheet></Workbook>`;
test('cash tenders parsed from NetSuite xml, total row ignored',()=>{const c=parseCashTenders(xml([['2026-09-01','100.50'],['2026-09-03','.00'],['2026-09-04','20']]));assert.equal(c.start,'2026-09-01');assert.equal(c.end,'2026-09-04');assert.deepEqual(c.days,[['2026-09-01',10050],['2026-09-03',0],['2026-09-04',2000]]);});
test('cash tenders rejects wrong file and several stores',()=>{assert.throws(()=>parseCashTenders('hello'));assert.throws(()=>parseCashTenders('<Workbook><Row><Cell><Data ss:Type="String">Date</Data></Cell></Row></Workbook>'),/No Date and Cash/);const two=xml([['2026-09-01','1']],'A').replace('</Table>','')+'';assert.throws(()=>parseCashTenders(xml([['2026-09-01','1']]).replace('</Row></Table>',`</Row><Row>${cell('DateTime','2026-09-02T00:00:00')}${cell('String','Store B')}${cell('Number','0')}${cell('Number','5')}</Row></Table>`)),/several locations/);});
test('cash merge overrides overlap, replaces on gap, window sums',()=>{const a=parseCashTenders(xml([['2026-09-01','10'],['2026-09-02','20']])),b=parseCashTenders(xml([['2026-09-02','25'],['2026-09-03','30']]));const r=mergeCash(a,b);assert.equal(r.replaced,false);assert.deepEqual(r.merged.days,[['2026-09-01',1000],['2026-09-02',2500],['2026-09-03',3000]]);assert.equal(cashIn(r.merged,'2026-09-02','2026-09-03').cents,5500);assert.equal(cashIn(r.merged,'2026-08-30','2026-09-03').covered,false);assert.equal(mergeCash(a,parseCashTenders(xml([['2026-10-09','1']]))).replaced,true);});
test('cash sales validated server side',()=>{assert.throws(()=>validate({...predictionData,cashSales:{version:1,start:'2026-09-01',end:'2026-09-02',days:[['bad',1]]}}));validate({...predictionData,cashSales:{version:1,start:'2026-09-01',end:'2026-09-02',days:[['2026-09-01',1]]}});});
}
{const descs=[['-100.00','Direct Debit 403450 Commonwealth Bank Loan Rypmt to 062703'],['-50.00','Direct Debit 313094 HAIRHOUSE WAREHO MARK3026853'],['-4.00','HUANG INVENTIONS P/L WETHERILL PAR AU Card xx1366'],['-30.00','TAX OFFICE PAYMENTS NetBank BPAY'],['-20.00','Direct Debit 523295 AFTERPAY AUSTRAL'],['-10.00','Transfer To Unknown Vendor Pty'],['-500.00','THE HILLS GRAMMA 27845']];
 const lines=[];let bal=1000000;const oldest=[];for(let n=0;n<28;n++){const d=new Date(Date.UTC(2026,8,1+n)).toISOString().slice(0,10).split('-').reverse().join('/');const x=n<7?descs[n]:['10.00','Direct Credit ANZ Worldline'];bal=Math.round(bal+Number(x[0])*100);oldest.push(`${d},${x[0]},${x[1]},${bal/100}`);}
 const m=bankHistory(oldest.reverse().join('\n')),w=m.margin.months[0];
 test('new cost categories classify recurring payees',()=>{assert.equal(w.loans,10000);assert.equal(w.marketing,5000);assert.equal(w.coffee,400);assert.equal(w.tax,3000);assert.equal(w.fees,2000);assert.equal(w.other,1000);assert.equal(w.personal,50000);assert.equal(w.sales+w.credits-w.personal-w.loans-w.marketing-w.coffee-w.tax-w.fees-w.other-w.staff-w.insurance-w.suppliers-w.royalty-w.rent,w.change);});
}
import {splitTx} from './netlify/functions/hairhouse.mjs';
test('splitTx removes transactions from the stored workspace copy only',()=>{const d={version:1,historyModel:{margin:{windows:[],tx:[['2026-10-01',-5,'','A']]}}};const s=splitTx(d);assert.equal(s.tx.length,1);assert.equal('tx' in s.data.historyModel.margin,false);assert.equal('tx' in d.historyModel.margin,true);assert.equal(splitTx({version:1}).tx,null);});
import {gmailSync} from './netlify/functions/hairhouse.mjs';
test('gmailSync adds new invoice emails once and keeps resume state',async()=>{
 const blobs=new Map();const store={get:async(k,o)=>{const v=blobs.get(k);if(v===undefined)return null;return v;},setJSON:async(k,v)=>{blobs.set(k,JSON.parse(JSON.stringify(v)));},set:async(k,v)=>{blobs.set(k,v);},delete:async k=>{blobs.delete(k);}};
 const env={GMAIL_CLIENT_ID:'c',GMAIL_CLIENT_SECRET:'s',GMAIL_REFRESH_TOKEN:'r'};
 const pdf=Buffer.from('%PDF-1.4 fake').toString('base64url');
 const msgs={m1:{id:'m1',internalDate:String(Date.parse('2026-10-08T01:00:00Z')),payload:{headers:[{name:'From',value:'Supplier <a@b.c>'},{name:'Subject',value:'Invoice 123'}],parts:[{filename:'inv.pdf',mimeType:'application/pdf',body:{attachmentId:'a1',size:12}}]}},m2:{id:'m2',internalDate:String(Date.parse('2026-10-08T02:00:00Z')),payload:{headers:[{name:'From',value:'x@y.z'},{name:'Subject',value:'Hello'}],body:{}}}};
 const calls=[];const f=async(u,o)=>{u=String(u);calls.push(u);const J=x=>({ok:true,status:200,json:async()=>x});if(u.includes('oauth2'))return J({access_token:'t'});if(u.includes('/attachments/'))return J({data:pdf});if(/messages\?/.test(u))return J({messages:[{id:'m1'},{id:'m2'}]});const id=u.match(/messages\/(\w+)\?format/)[1];return J(msgs[id]);};
 const now=Date.parse('2026-10-09T00:00:00Z');
 assert.equal((await gmailSync({env:{},store,fetchFn:f,now})).configured,false);
 const r=await gmailSync({env,store,fetchFn:f,now});assert.equal(r.added,2);
 const idx=blobs.get('inbox/index');assert.equal(idx.items.length,2);assert.equal(idx.items[0].hasFile,true);assert.equal(idx.items[1].hasFile,false);assert.ok(blobs.get('inbox/file/m1-1').length>0);assert.ok(idx.lastSync);
 const r2=await gmailSync({env,store,fetchFn:f,now:now+864e5});assert.equal(r2.added,0);assert.equal(blobs.get('inbox/index').items.length,2);
});
test('custom date range sums only that window',async()=>{
 const src=APP.slice(APP.indexOf('function mkCat('),APP.indexOf('function mkCat(')+APP.slice(APP.indexOf('function mkCat(')).indexOf('\nfunction ')),cw=APP.slice(APP.indexOf('function customWin('),APP.indexOf('function customTile('));
 const {customWin}=await import('data:text/javascript;base64,'+Buffer.from(src+'\n'+cw+'\nexport {customWin};').toString('base64'));
 const tx=[['2026-10-11',50000,0,'ANZ WORLDLINE'],['2026-10-08',-10000,0,'WAGES'],['2026-10-06',20000,0,'ANZ WORLDLINE'],['2026-10-05',99900,0,'ANZ WORLDLINE']];
 const w=customWin(tx,'2026-10-06','2026-10-11');assert.equal(w.sales,70000);assert.equal(w.staff,10000);assert.equal(w.change,60000);
});
test('avg per week only for long periods',async()=>{
 const i=APP.indexOf('function avgWeek(');const src=APP.slice(i,APP.indexOf('\nfunction marginTile(',i));
 const {avgWeek}=await import('data:text/javascript;base64,'+Buffer.from('const money=c=>"$"+(c/100).toFixed(2);\n'+src+'\nexport {avgWeek};').toString('base64'));
 assert.equal(avgWeek({start:'2026-10-06',end:'2026-10-12',sales:100},null),'');
 const h=avgWeek({start:'2026-04-01',end:'2026-09-29',sales:2600000},{cents:260000});assert.match(h,/\$1000\.00/);assert.match(h,/\$1100\.00/);
});
test('statement lines missing from planner are offered once, by invoice number',async()=>{
 const i=APP.indexOf('function missingFromStatement(');const src=APP.slice(i,APP.indexOf('\nfunction parseBankCSV(',i));
 const ps=APP.slice(APP.indexOf('function parseStatement('),APP.indexOf('\nfunction missingFromStatement('));
 const pre='const day=x=>Date.parse(x+"T00:00:00Z"),plus=(x,n)=>new Date(day(x)+n*864e5).toISOString().slice(0,10),money=c=>"$"+(c/100).toFixed(2);function termsFor(d,s){return 30}\n';
 const nr=APP.slice(APP.indexOf('function normRef('),APP.indexOf('\nfunction duplicates('));const {missingFromStatement,parseStatement}=await import('data:text/javascript;base64,'+Buffer.from(pre+ps+'\n'+src+'\n'+nr+'\nexport {missingFromStatement,parseStatement};').toString('base64'));
 const st=parseStatement('Collective Brands Statement Date 13/10/2026 Amount Due $300.00 1/7/2025 Balance Forward 0.00 8/9/2026 Invoice #111 400.00 100.00 21/9/2026 Invoice #222 120.00 220.00 6/10/2026 Invoice #333 80.00 300.00');
 assert.equal(st.lines.length,3);assert.equal(st.lines[0].remainingCents,10000);
 const d={items:[{kind:'invoice',supplier:'Collective Brands',reference:'333'}]};
 const m=missingFromStatement(d,st);assert.deepEqual(m.map(x=>x.reference),['111','222']);assert.equal(m[0].cents,10000);assert.equal(m[0].date,'2026-10-08');assert.equal(m[1].date,'2026-10-21');
 d.items.push(...m);assert.equal(missingFromStatement(d,st).length,0);
});

{const {xlsxTable,parseCashTable}=await import('data:text/javascript;base64,'+Buffer.from(predictionSource+'\nexport {xlsxTable,parseCashTable};').toString('base64'));
const crc32=buf=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0;}let crc=0xffffffff;for(const b of buf)crc=t[(crc^b)&255]^(crc>>>8);return (crc^0xffffffff)>>>0;};
const zip=files=>{const enc=s=>Buffer.from(s,'utf8'),chunks=[],central=[];let off=0;for(const [name,content] of files){const nb=enc(name),raw=enc(content),data=deflateRawSync(raw),crc=crc32(raw),lh=Buffer.alloc(30),ch=Buffer.alloc(46);lh.writeUInt32LE(0x04034b50,0);lh.writeUInt16LE(20,4);lh.writeUInt16LE(8,8);lh.writeUInt32LE(crc,14);lh.writeUInt32LE(data.length,18);lh.writeUInt32LE(raw.length,22);lh.writeUInt16LE(nb.length,26);ch.writeUInt32LE(0x02014b50,0);ch.writeUInt16LE(20,4);ch.writeUInt16LE(20,6);ch.writeUInt16LE(8,10);ch.writeUInt32LE(crc,16);ch.writeUInt32LE(data.length,20);ch.writeUInt32LE(raw.length,24);ch.writeUInt16LE(nb.length,28);ch.writeUInt32LE(off,42);chunks.push(lh,nb,data);central.push(ch,nb);off+=30+nb.length+data.length;}const cd=Buffer.concat(central),eo=Buffer.alloc(22);eo.writeUInt32LE(0x06054b50,0);eo.writeUInt16LE(files.length,8);eo.writeUInt16LE(files.length,10);eo.writeUInt32LE(cd.length,12);eo.writeUInt32LE(off,16);return Buffer.concat([...chunks,cd,eo]);};
const serial=(...d)=>(Date.UTC(...d)-Date.UTC(1899,11,30))/86400000;
const xlsx=rows=>zip([['xl/workbook.xml','<?xml version="1.0"?><workbook xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets></workbook>'],['xl/_rels/workbook.xml.rels','<?xml version="1.0"?><Relationships><Relationship Id="rId1" Type="t" Target="worksheets/sheet1.xml"/></Relationships>'],['xl/styles.xml','<?xml version="1.0"?><styleSheet><numFmts count="1"><numFmt numFmtId="164" formatCode="dd/mm/yyyy"/></numFmts><cellXfs count="2"><xf numFmtId="0"/><xf numFmtId="164"/></cellXfs></styleSheet>'],['xl/sharedStrings.xml','<?xml version="1.0"?><sst><si><t>Date</t></si><si><t>Location</t></si><si><t>Visa</t></si><si><t>Cash</t></si><si><t>Total Cash &amp; Cards</t></si><si><t>Store A</t></si><si><t>Overall Total</t></si></sst>'],['xl/worksheets/sheet1.xml','<?xml version="1.0"?><worksheet><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c><c r="C1" t="s"><v>2</v></c><c r="D1" t="s"><v>3</v></c><c r="E1" t="s"><v>4</v></c></row>'+rows+'</sheetData></worksheet>']]);
const dataRow=(r,dateCell,cash)=>`<row r="${r}">${dateCell}<c r="B${r}" t="s"><v>5</v></c><c r="C${r}"><v>0</v></c><c r="D${r}"><v>${cash}</v></c><c r="E${r}"><v>${cash}</v></c></row>`;
test('cash tenders parsed from a real-structured xlsx (zip, shared strings, styled date serials)',async()=>{const f=xlsx(dataRow(2,`<c r="A2" s="1"><v>${serial(2026,8,1)}</v></c>`,'100.5')+dataRow(3,`<c r="A3" s="1"><v>${serial(2026,8,3)}</v></c>`,'0')+dataRow(4,`<c r="A4" s="1"><v>${serial(2026,8,4)}</v></c>`,'20')+'<row r="5"><c r="A5" t="s"><v>6</v></c><c r="D5"><v>999</v></c></row>');const c=parseCashTable(await xlsxTable(f));assert.equal(c.start,'2026-09-01');assert.equal(c.end,'2026-09-04');assert.deepEqual(c.days,[['2026-09-01',10050],['2026-09-03',0],['2026-09-04',2000]]);});
test('xlsx string dates in day/month/year form are accepted',async()=>{const f=xlsx(dataRow(2,'<c r="A2" t="inlineStr"><is><t>17/10/2026</t></is></c>','15'));const c=parseCashTable(await xlsxTable(f));assert.deepEqual(c.days,[['2026-10-17',1500]]);});
test('xlsx parser rejects files that are not spreadsheets',async()=>{await assert.rejects(()=>xlsxTable(Buffer.from('not a zip')),/Could not read this file/);await assert.rejects(()=>xlsxTable(zip([['readme.txt','hello']])),/Could not read this file/);});
}

const wdata=(items)=>({version:1,balance:{cents:100000,date:'2026-10-29'},items,suppliers:[]});
const witem=(p={})=>({id:Math.random().toString(36).slice(2),kind:'invoice',supplier:'Example',reference:'I1',cents:5000,date:'2026-10-30',status:'confirmed',notes:'',...p});
test('outflowWindows: overdue-only counts in every window, flagged',()=>{
  const r=outflowWindows(wdata([witem({date:'2026-10-01'})]),'2026-10-29');
  assert.equal(r.overdue,5000);
  assert.deepEqual(r.totals,[5000,5000,5000]);
  assert.equal(r.rows[0].length,1);
  assert.equal(r.rows[0][0].overdue,true);
});
test('outflowWindows: mixed overdue and future, cumulative, no double count',()=>{
  const r=outflowWindows(wdata([witem({date:'2026-10-01',cents:5000}),witem({date:'2026-11-02',cents:3000,reference:'I2'}),witem({date:'2026-11-20',cents:2000,reference:'I3'})]),'2026-10-29');
  assert.equal(r.overdue,5000);
  assert.deepEqual(r.totals,[8000,8000,10000]);
  assert.equal(r.rows[0].length,2);
  assert.equal(r.rows[2].length,3);
  assert.equal(r.rows[0].filter(x=>x.overdue).length,1);
});
test('outflowWindows: no overdue stays as before',()=>{
  const r=outflowWindows(wdata([witem({date:'2026-11-02'})]),'2026-10-29');
  assert.equal(r.overdue,0);
  assert.deepEqual(r.totals,[5000,5000,5000]);
  assert.equal(r.rows[0][0].overdue,false);
});

const statementFns=()=>{const ps=APP.slice(APP.indexOf('function parseStatement('),APP.indexOf('\nfunction missingFromStatement('));const pk=APP.slice(APP.indexOf('function pdfKind('),APP.indexOf('\nfunction statementCreated('));const sc=APP.slice(APP.indexOf('function statementCreated('),APP.indexOf('\nfunction statementMerge('));const sm=APP.slice(APP.indexOf('function statementMerge('),APP.indexOf('\nlet pdfQueue='));return import('data:text/javascript;base64,'+Buffer.from(ps+'\n'+pk+'\n'+sc+'\n'+sm+'\nexport {parseStatement,pdfKind,statementCreated,statementMerge};').toString('base64'));};
test('statement parser carries payment rows and balance forward through running balances',async()=>{
 const {parseStatement}=await statementFns();
 const st=parseStatement('Demo Supplies Statement Date 28/10/2026 Amount Due $6,292.36 1/7/2025 Balance Forward 500.00 8/9/2026 Invoice #111 1,000.00 1,500.00 20/9/2026 Payment 208.00 1,292.00 6/10/2026 Invoice #222 5,000.36 6,292.36');
 assert.equal(st.lines.length,2);
 assert.equal(st.lines[0].remainingCents,100000);
 assert.equal(st.lines[1].remainingCents,500036);
 assert.equal(st.hasPayments,true);
 assert.equal(st.claimedCents,629236);
});
test('statement parser reads a full statement layout; remaining equals charge when unpaid',async()=>{
 const {parseStatement}=await statementFns();
 const st=parseStatement('Demo Supplies Pty Ltd\nStatement\nDate 28/10/2026\nAmount Due $1,000.00\nBill To DEMO STORE\nDate Description Charge Payment Balance\n1/7/2025 Balance Forward 0.00\n21/9/2026 Invoice #1001 400.00 400.00\n6/10/2026 Invoice #1002 600.00 1,000.00\nCurrent 1-30 Days 31-60 Days Amount Due\n0.00 1,000.00 0.00 $1,000.00\nRemittance Slip\nAmount Paid ______\n');
 assert.equal(st.supplier,'');
 assert.equal(st.date,'2026-10-28');
 assert.deepEqual(st.lines.map(l=>[l.reference,l.remainingCents]),[['1001',40000],['1002',60000]]);
 assert.equal(st.hasPayments,false);
});
test('pdfKind routes statements, unreadable statements and invoices',async()=>{
 const {pdfKind}=await statementFns();
 assert.equal(pdfKind('Supplier Statement Date 28/10/2026 Amount Due $400.00 21/9/2026 Invoice #1001 400.00 400.00'),'statement');
 assert.equal(pdfKind('ACME Statement Amount Due $10.00 nothing parseable here'),'statement-unread');
 assert.equal(pdfKind('TAX INVOICE HairCo Tracking Code 01 Oct 2026 INV-1 total due $50.00'),'invoice');
});
test('statement-created entries are detected and merged, keeping id and allocations target',async()=>{
 const {statementCreated,statementMerge}=await statementFns();
 const existing={id:'a',notes:'Added from supplier statement dated 2026-10-28. Amount is the remaining balance on the statement.',pdfHash:'h1',cents:100};
 const incoming={id:'b',notes:'PDF candidate.',pdfHash:'h2',cents:400};
 assert.equal(statementCreated(existing),true);
 assert.equal(statementCreated({notes:'manual entry'}),false);
 const m=statementMerge(existing,incoming);
 assert.equal(m.id,'a');
 assert.equal(m.pdfHash,'h2');
 assert.equal(m.cents,400);
 assert.match(m.notes,/Replaces the entry added from the supplier statement/);
});
