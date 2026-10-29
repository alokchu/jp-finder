import {test} from 'node:test';import assert from 'node:assert/strict';import {APP,aging,reconcile,parseStatement,parseBankCSV,aliasKey,bankAlias,bankSupplierGuess,matchBankPayments,invoiceBalance,validateLedger} from './netlify/functions/hairhouse.mjs';
const invoice={id:'i',kind:'invoice',supplier:'Example',reference:'SYN-1',cents:10000,invoiceDate:'2026-09-01',date:'2026-10-01',status:'confirmed'};
const data=()=>({balance:{cents:100000,date:'2026-10-07'},items:[{...invoice}],payments:[{id:'p',source:'bank',supplier:'Example',reference:'SYN-P',date:'2026-10-02',cents:2000,allocations:[{invoiceId:'i',cents:2000}]}]});
test('due today is current',()=>assert.equal(aging(data(),'Example','2026-10-01').buckets.current,10000));
test('payment allocated once',()=>assert.equal(aging(data(),'Example','2026-10-07').overdue,8000));
for(const [date,bucket] of [['2026-10-31','1-30'],['2026-11-01','31-60'],['2026-12-01','60+']])test('aging boundary '+bucket,()=>assert.equal(aging(data(),'Example',date).buckets[bucket],8000));
test('supplier configurable terms',()=>assert.equal(aging({...data(),suppliers:[{name:'Example',days:60}]},'Example','2026-10-07').overdue,0));
test('unexplained difference remains review',()=>{const r=reconcile(data(),{supplier:'Example',date:'2026-10-07',claimedCents:7500,lines:[{reference:'SYN-1',chargeCents:10000,remainingCents:7500}]});assert.equal(r.difference,-500);assert.equal(r.status,'Needs review');});
test('statement running balance is not invoice residual',()=>{const s=parseStatement('Date 7/10/2026 Amount Due $120.00 1/9/2026 Invoice #123456 100.00 80.00 5/9/2026 Invoice #123457 40.00 120.00');assert.equal(s.lines[0].remainingCents,8000);assert.equal(s.lines[1].remainingCents,4000);});
test('bank rebate excluded',()=>{const p=parseBankCSV('01/09/2026,"-10.00","Transfer To Example","+20.00"\n02/09/2026,"+5.00","REBATE","+25.00"');assert.equal(p.rows.length,1);assert.equal(p.excluded.length,1);});
test('cannot overallocate payment',()=>{const d=data();d.payments[0].cents=1000;assert.throws(()=>validateLedger(d));});
test('cannot overallocate invoice',()=>{const d=data();d.payments[0].cents=15000;d.payments[0].allocations[0].cents=15000;assert.throws(()=>validateLedger(d));});
test('cannot allocate twice with paid flag',()=>{const d=data();d.items[0].status='paid';assert.throws(()=>validateLedger(d));});
test('cash forecast only residual after balance-date payments',async()=>{const source=APP.slice(APP.indexOf('function match('),APP.indexOf('const $='));const {forecast}=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {forecast};').toString('base64'));assert.equal(forecast(data()).totalOut,8000);});
test('cannot enter payment later than cash balance',()=>{const d=data();d.payments[0].date='2026-10-08';assert.throws(()=>validateLedger(d));});
test('future invoice excluded from historical snapshot',()=>assert.equal(aging({...data(),items:[{...invoice,invoiceDate:'2026-10-08'}]},'Example','2026-10-07').outstanding,0));
test('upcoming cash windows cumulative exact boundaries and overdue included in every window',async()=>{const source=APP.slice(APP.indexOf('function match('),APP.indexOf('const $='));const {outflowWindows}=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {outflowWindows};').toString('base64'));const asOf='2026-10-08',days=[-1,0,6,7,13,14,29,30],items=days.map((d,n)=>({id:String(n),kind:'expense',supplier:'Example',reference:'SYN-'+n,cents:100,date:new Date(Date.parse(asOf)+d*864e5).toISOString().slice(0,10),status:'confirmed'}));const r=outflowWindows({items,balance:{date:asOf}},asOf);assert.deepEqual(r.totals,[300,500,700]);assert.equal(r.overdue,100);assert.deepEqual(r.rows[0].map(x=>x.id),['0','1','2']);assert.equal(r.rows[0][0].overdue,true);});
test('cash windows exclude review paid sales credit and avoid order double count',async()=>{const source=APP.slice(APP.indexOf('function match('),APP.indexOf('const $='));const {outflowWindows}=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {outflowWindows};').toString('base64'));const base={supplier:'Example',reference:'SYN',cents:10000,date:'2026-10-09',status:'confirmed'},items=[{...base,id:'po',kind:'order',status:'estimated'},{...base,id:'inv',kind:'invoice',orderId:'po',cents:4000},...['inflow','credit','creditOwed'].map((kind,n)=>({...base,id:'other'+n,kind})),{...base,id:'review',kind:'invoice',status:'review'},{...base,id:'paid',kind:'invoice',status:'paid',paidDate:'2026-10-08'}],d={items,payments:[{date:'2026-10-08',allocations:[{invoiceId:'inv',cents:1000}]}]};assert.deepEqual(outflowWindows(d,'2026-10-08').totals,[9000,9000,9000]);});
test('clickable window rows sum exactly to headline with partial invoices and reserves',async()=>{const source=APP.slice(APP.indexOf('function match('),APP.indexOf('const $='));const {outflowWindows}=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {outflowWindows};').toString('base64'));const base={supplier:'Example',reference:'SYN',cents:10000,date:'2026-10-09',status:'confirmed'},items=[{...base,id:'po',kind:'order',status:'estimated'},{...base,id:'inv',kind:'invoice',orderId:'po',cents:4000,directDebit:true},{...base,id:'old',kind:'expense',date:'2026-10-07'},{...base,id:'far',kind:'expense',date:'2026-11-07'}],d={items,payments:[{date:'2026-10-08',allocations:[{invoiceId:'inv',cents:1000}]}]};const r=outflowWindows(d,'2026-10-08');for(let n=0;n<3;n++){assert.equal(r.rows[n].reduce((s,x)=>s+x.cents,0),r.totals[n]);assert.deepEqual(r.rows[n].map(x=>x.id),['old','po','inv']);}assert.equal(r.rows[0][2].partial,true);assert.equal(r.rows[0][2].directDebit,true);assert.equal(r.rows[0][1].cents,6000);assert.equal(r.rows[0][0].overdue,true);});
test('receipt gate: no lines partial missing and unreviewed never OK to pay',async()=>{const source=APP.slice(APP.indexOf('function match('),APP.indexOf('const $='));const {paymentReadiness}=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {paymentReadiness};').toString('base64'));const i={kind:'invoice',status:'confirmed',lines:[{sku:'Sample',qty:2,pack:3,received:6}]};assert.equal(paymentReadiness(i).manualPay,true);for(const lines of [[],[{sku:'Sample',qty:0,pack:1,received:0}],[{sku:'Sample',qty:2,pack:3,received:3}]])assert.equal(paymentReadiness({...i,lines}).tone,'amber');assert.equal(paymentReadiness({...i,status:'review'}).manualPay,false);assert.equal(paymentReadiness({...i,lines:[{...i.lines[0],received:3,missing:true}],adjustment:'credit requested'}).tone,'red');assert.equal(paymentReadiness({...i,directDebit:true}).manualPay,false);assert.match(paymentReadiness({...i,directDebit:true}).label,/no manual pay/);assert.equal(paymentReadiness({...i,status:'paid'}).manualPay,false);assert.equal(paymentReadiness({...i,status:'cancelled'}).manualPay,false);});
test('outflow rows carry readiness without removing pending cash obligations',async()=>{const source=APP.slice(APP.indexOf('function match('),APP.indexOf('const $='));const {outflowWindows}=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {outflowWindows};').toString('base64'));const r=outflowWindows({items:[{id:'example',kind:'invoice',status:'confirmed',supplier:'Sample',date:'2026-10-09',cents:1000,lines:[]}]},'2026-10-08');assert.equal(r.totals[0],1000);assert.equal(r.rows[0][0].readiness.tone,'amber');assert.equal(r.rows[0][0].readiness.manualPay,false);});
test('manual receipt attestation needs review and cannot bypass missing or debit',async()=>{const source=APP.slice(APP.indexOf('function match('),APP.indexOf('const $='));const {paymentReadiness}=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {paymentReadiness};').toString('base64'));const i={kind:'invoice',status:'confirmed',lines:[],manualReceipt:true};assert.equal(paymentReadiness(i).manualPay,true);assert.match(paymentReadiness(i).label,/Manually confirmed/);assert.equal(paymentReadiness({...i,status:'review'}).manualPay,false);assert.equal(paymentReadiness({...i,directDebit:true}).manualPay,false);assert.equal(paymentReadiness({...i,lines:[{sku:'Example',qty:1,pack:1,received:0,missing:true}]}).tone,'red');assert.equal(paymentReadiness({...i,manualReceipt:false}).tone,'amber');});

const mkData=()=>({version:1,balance:{cents:10000000,date:'2026-10-28'},items:[
 {id:'inv1',kind:'invoice',status:'confirmed',supplier:'Collective Brands',reference:'29301517',cents:500000,date:'2026-10-21',invoiceDate:'2026-09-21',paidDate:'',orderId:'',receiptExpected:'',receiptDays:7,directDebit:false,manualReceipt:false,manualReceiptDate:'',adjustment:'none',lines:[],notes:''},
 {id:'inv2',kind:'invoice',status:'confirmed',supplier:"L'Oreal Australia",reference:'6100272474',cents:320647,date:'2026-11-29',invoiceDate:'2026-10-15',paidDate:'',orderId:'',receiptExpected:'',receiptDays:7,directDebit:false,manualReceipt:false,manualReceiptDate:'',adjustment:'none',lines:[],notes:''},
],payments:[],supplierAliases:[{alias:'SUPP COLLECTIVE BRANDS',supplier:'Collective Brands'}]});
const CSV='07/10/2026,"-5000.00","SUPP COLLECTIVE BRANDS TDM","+9000.00"\n20/10/2026,"-3206.47","DIRECT DEBIT LOREAL AUSTRALIA","+5793.53"';
test('bank match: confirmed alias + unique exact outstanding amount proposes a match',()=>{
 const r=matchBankPayments(mkData(),parseBankCSV(CSV).rows);
 assert.equal(r[0].status,'match');assert.equal(r[0].invoiceId,'inv1');assert.equal(r[0].invoiceReference,'29301517');
 assert.equal(r[1].status,'nosupplier');assert.equal(r[1].guess,"L'Oreal Australia",'ledger supplier name is only a guess until the owner confirms');
});
test('bank match: saved alias resolves; guess never matches on its own',()=>{
 const d=mkData();assert.equal(bankAlias(d,'SUPP COLLECTIVE BRANDS TDM REF 123'),'Collective Brands');
 assert.equal(bankAlias(d,'DIRECT DEBIT LOREAL AUSTRALIA'),'','no saved alias, no match');
 assert.equal(bankSupplierGuess(d,'DIRECT DEBIT LOREAL AUSTRALIA'),"L'Oreal Australia");
 assert.equal(bankSupplierGuess(d,'RANDOM SHOP PTY LTD'),'');
});
test('bank match: ambiguous, partial and settled-baseline cases never auto-match',()=>{
 const d=mkData();
 d.items.push({id:'inv3',kind:'invoice',status:'confirmed',supplier:'Collective Brands',reference:'29301518',cents:500000,date:'2026-10-21',invoiceDate:'2026-09-22',paidDate:'',orderId:'',receiptExpected:'',receiptDays:7,directDebit:false,manualReceipt:false,manualReceiptDate:'',adjustment:'none',lines:[],notes:''});
 let r=matchBankPayments(d,parseBankCSV(CSV).rows);
 assert.equal(r[0].status,'ambiguous','two open bills at the same amount ask, never guess');
 d.items.pop();
 r=matchBankPayments(d,[{date:'2026-10-07',cents:250000,reference:'SUPP COLLECTIVE BRANDS TDM'}]);
 assert.equal(r[0].status,'none','partial payment is manual');
 d.items[0].settledCents=300000;
 r=matchBankPayments(d,[{date:'2026-10-07',cents:200000,reference:'SUPP COLLECTIVE BRANDS TDM'}]);
 assert.equal(r[0].status,'match','statement settled baseline: 800 charge - 300 settled = 200 outstanding matches 200');
 r=matchBankPayments(d,[{date:'2026-10-07',cents:500000,reference:'SUPP COLLECTIVE BRANDS TDM'}]);
 assert.equal(r[0].status,'none','full charge does not match once part is settled');
});
test('bank match: duplicate rows in one file cannot double-apply; recorded lines skip; dates guard',()=>{
 const d=mkData();
 const two=[{date:'2026-10-07',cents:500000,reference:'SUPP COLLECTIVE BRANDS TDM'},{date:'2026-10-07',cents:500000,reference:'SUPP COLLECTIVE BRANDS TDM'}];
 const r=matchBankPayments(d,two);
 assert.equal(r[0].status,'match');assert.equal(r[1].status,'none','second identical line finds no open bill after the first applies');
 d.payments.push({id:'p1',supplier:'Collective Brands',date:'2026-10-07',reference:'SUPP COLLECTIVE BRANDS TDM',cents:500000,source:'bank',allocations:[{invoiceId:'inv1',cents:500000}]});
 const r2=matchBankPayments(d,[{date:'2026-10-07',cents:500000,reference:'SUPP COLLECTIVE BRANDS TDM'}]);
 assert.equal(r2[0].status,'recorded','reimport of an already recorded line is skipped');
 const r3=matchBankPayments(mkData(),[{date:'2026-10-29',cents:500000,reference:'SUPP COLLECTIVE BRANDS TDM'}]);
 assert.equal(r3[0].status,'future','payment after the dated bank balance is not recorded');
 const r4=matchBankPayments(mkData(),[{date:'2026-09-20',cents:500000,reference:'SUPP COLLECTIVE BRANDS TDM'}]);
 assert.equal(r4[0].status,'none','payment dated before the invoice issue date does not match');
 const early=mkData();delete early.items[0].invoiceDate;
 const r5=matchBankPayments(early,[{date:'2026-10-15',cents:500000,reference:'SUPP COLLECTIVE BRANDS TDM'}]);
 assert.equal(r5[0].status,'match','payment before the DUE date is normal when no issue date is recorded');
});
test('bank match: proposed payments validate and settle the invoice',()=>{
 const d=mkData(),r=matchBankPayments(d,parseBankCSV(CSV).rows);
 const x=r[0];
 d.payments.push({id:'p9',supplier:x.supplier,date:x.row.date,reference:x.row.reference,cents:x.row.cents,source:'bank',allocations:[{invoiceId:x.invoiceId,cents:x.row.cents}]});
 validateLedger(d);
 assert.equal(invoiceBalance(d,d.items[0],'2026-10-28'),0);
});
test('supplier aliases are validated by validateLedger',()=>{
 const d=mkData();validateLedger(d);
 d.supplierAliases=[{alias:'',supplier:'X'}];assert.throws(()=>validateLedger(d),/Invalid supplier alias/);
 d.supplierAliases=[{alias:'X'}];assert.throws(()=>validateLedger(d),/Invalid supplier alias/);
 d.supplierAliases=new Array(201).fill({alias:'A',supplier:'B'});assert.throws(()=>validateLedger(d),/Invalid supplier ledger/);
});

test('bank match: invoice reference in narration backs and disambiguates the match',()=>{
 const d=mkData();
 d.items.push({id:'inv4',kind:'invoice',status:'confirmed',supplier:'Collective Brands',reference:'29301599',cents:500000,date:'2026-10-25',invoiceDate:'2026-09-25',paidDate:'',orderId:'',receiptExpected:'',receiptDays:7,directDebit:false,manualReceipt:false,manualReceiptDate:'',adjustment:'none',lines:[],notes:''});
 const r=matchBankPayments(d,[{date:'2026-10-28',cents:500000,reference:'Transfer To Collective Brands TDM NetBank Supp Collective Brands 29301599'}]);
 assert.equal(r[0].status,'match');assert.equal(r[0].invoiceId,'inv4','reference picks the named invoice, not an amount twin');
});
test('bank match: a named reference never falls back to an amount match on another bill',()=>{
 const d=mkData();
 let r=matchBankPayments(d,[{date:'2026-10-28',cents:144829,reference:'Transfer To Collective Brands TDM NetBank Supp Collective Brands 29301517'}]);
 assert.equal(r[0].status,'refmismatch',/open amount differs/.test(r[0].reason)?'amount differs':'wrong','names 29301517 (open at 5000) but pays 1448.29');
 r=matchBankPayments(d,[{date:'2026-10-28',cents:500000,reference:'Transfer To Collective Brands TDM NetBank Supp Collective Brands 99998888'}]);
 assert.equal(r[0].status,'match','unrecognised digits are treated as no reference (owner: invoice number may be absent); unique amount resolves');
 r=matchBankPayments(d,[{date:'2026-10-28',cents:320647,reference:'Transfer To Collective Brands TDM NetBank Supp Collective Brands 6100272474'}]);
 assert.equal(r[0].status,'refmismatch','cross-supplier reference never merges');
});
test('bank match: same-day statement date adds a caution instead of blind confidence',()=>{
 const d=mkData();
 d.statements=[{id:'s1',supplier:'Collective Brands',date:'2026-10-07',claimedCents:500000,lines:[{reference:'29301517',date:'2026-09-21',chargeCents:500000,remainingCents:500000}]}];
 const r=matchBankPayments(d,[{date:'2026-10-07',cents:500000,reference:'SUPP COLLECTIVE BRANDS TDM'}]);
 assert.equal(r[0].status,'match');assert.match(r[0].caution,/statement dated 2026-10-07/);
 const r2=matchBankPayments(d,[{date:'2026-10-06',cents:500000,reference:'SUPP COLLECTIVE BRANDS TDM'}]);
 assert.equal(r2[0].caution,'','different day carries no caution');
});
test('alias key ignores invoice numbers and amounts so one confirmation covers future narrations',()=>{
 assert.equal(aliasKey('Transfer To Collective Brands TDM NetBank Supp Collective Brands 29301517'),aliasKey('Transfer To Collective Brands TDM NetBank Supp Collective Brands 29301600'));
 const d=mkData();
 d.supplierAliases=[{alias:aliasKey('Transfer To Collective Brands TDM NetBank Supp Collective Brands 29301517'),supplier:'Collective Brands'}];
 assert.equal(bankAlias(d,'Transfer To Collective Brands TDM NetBank Supp Collective Brands 29301600'),'Collective Brands');
 assert.equal(bankAlias(d,'Transfer To Someone Else 29301600'),'');
});

test('reversing a recorded bank payment restores the invoice balance and validates',()=>{
 const d=mkData(),r=matchBankPayments(d,parseBankCSV(CSV).rows);
 const m=r.find(x=>x.status==='match'&&x.supplier==='Collective Brands');
 const payment={id:'rev1',supplier:m.supplier,date:m.row.date,reference:m.row.reference,cents:m.row.cents,source:'bank',allocations:[{invoiceId:m.invoiceId,cents:m.row.cents}]};
 const recorded={...d,payments:[payment]};
 validateLedger(recorded);
 assert.equal(invoiceBalance(recorded,recorded.items.find(i=>i.id==='inv1'),'2026-10-28'),0);
 const reversed={...recorded,payments:recorded.payments.filter(p=>p.id!=='rev1')};
 validateLedger(reversed);
 assert.equal(invoiceBalance(reversed,reversed.items.find(i=>i.id==='inv1'),'2026-10-28'),500000,'invoice fully outstanding again after removal');
});
test('auto-recordable matches are exactly clean matches without a caution',()=>{
 const d=mkData(),r=matchBankPayments(d,parseBankCSV(CSV).rows);
 const clean=r.filter(x=>x.status==='match');
 assert.ok(clean.length>=1);
 for(const x of clean)assert.equal(x.caution,'','no statement on those dates, so no caution');
 const withStatement={...d,statements:[{id:'s',supplier:'Collective Brands',date:'2026-10-07',claimedCents:500000,lines:[]}]};
 const r2=matchBankPayments(withStatement,parseBankCSV(CSV).rows);
 const flagged=r2.find(x=>x.status==='match'&&x.supplier==='Collective Brands');
 assert.ok(flagged.caution,'same-day statement match stays manual, never auto-recorded');
});
test('wages, card purchases and fee narrations resolve no supplier and no guess so the review list can collapse them',()=>{
 const d=mkData();
 for(const reference of ['Transfer To HIBA CHALHOUB NetBank Hairhouse Wages','CocaColaEPP HURSTVILLE AU Card xx1366 Value Date: 23/10/2026','Direct Debit 523295 AFTERPAY AUSTRAL 261025001087733']){
  const r=matchBankPayments(d,[{date:'2026-10-27',cents:10000,reference}]);
  assert.equal(r[0].status,'nosupplier',reference);
  assert.equal(r[0].guess,'',reference);
 }
});
