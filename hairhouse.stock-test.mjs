import {test} from 'node:test';import assert from 'node:assert/strict';import {APP} from './netlify/functions/hairhouse.mjs';
const a=APP.indexOf('const STOCK_MON'),b=APP.indexOf('let stockParsed');
const src=APP.slice(a,b)+';export {stockRowsFromPages,stockBrand,stockBuild,stockPdf,stockDmy,stockKey};';
const {stockRowsFromPages,stockBrand,stockBuild,stockPdf,stockDmy}=await import('data:text/javascript;base64,'+Buffer.from(src).toString('base64'));
// Synthetic report layout only. Numbers are made up.
function line(y,name,id,upc,v,extra=[]){const it=[{x:36,y,str:name},{x:130,y,str:id},{x:180,y,str:upc}];v.forEach((n,i)=>it.push({x:250+i*45,y,str:String(n)}));return it.concat(extra);}
const head=(from,to,days)=>[{x:300,y:780,str:from},{x:340,y:780,str:to},{x:400,y:770,str:days+' DAYS'}];
const page1=[...head('1/10/2026','26/11/2026',57),
 ...line(700,'Alpha Shampoo 250mL','1001','9300000000011',[2,1,1,1,1,1,5,0.1,20,0]),
 ...line(680,'Alpha Conditioner 250mL','1002','9300000000012',[-3,4,4,4,4,4,20,0.4,0,0]),
 ...line(660,'De Lorenzo Gel 100mL','1003','9300000000013',[0,1,0,0,0,0,1,0.02,0,0]),
 ...line(640,'Beta Wax','1004','- None -',[50,0,0,0,0,0,0,0,0,0]),
 ...line(620,'DUPE - Beta Wax','1005','9300000000015',[1,1,1,1,1,1,5,0.1,10,0]),
 ...line(600,'Returned Thing','1006','9300000000016',[1,0,0,0,0,(-1),(-1),0,0,0]),
 ...line(580,'Gamma Very Long Name That Wraps','1007','9300000000017',[0,1,1,1,1,1,5,0.1,0,0]),
 [{x:36,y:572,str:'Second Line'}][0]];
const pages=[page1];
test('parses rows, days and dates',()=>{const p=stockRowsFromPages(pages);assert.equal(p.rows.length,7);assert.equal(p.days,57);assert.equal(p.from,'1/10/2026');assert.equal(p.to,'26/11/2026');assert.equal(p.errors.length,0);assert.equal(p.rows[6].name,'Gamma Very Long Name That Wraps Second Line');assert.equal(p.rows[3].upc,'');});
test('days read from date range when header missing',()=>{const p=stockRowsFromPages([page1.filter(i=>!/DAYS/.test(i.str))]);assert.equal(p.days,57);});
test('unreadable line is counted, not guessed',()=>{const bad=[...head('1/10/2026','26/11/2026',57),{x:36,y:700,str:'Odd'},{x:130,y:700,str:'9'},{x:260,y:700,str:'3'}];const p=stockRowsFromPages([bad]);assert.equal(p.rows.length,0);assert.equal(p.errors.length,1);});
test('order units use days, stock on hand and ignore On order',()=>{const s=stockBuild(stockRowsFromPages(pages)),al=s.brands.find(x=>x.name==='Alpha'),sh=al.items.find(i=>i.id==='1001');
 // 5 sold / 57 days: 15d = 1.31 - 2 stock = 0; 30d = 2.63-2 = 1; 45d = 3.95-2 = 2
 assert.deepEqual([sh.n15,sh.n30,sh.n45],[0,1,2]);});
test('negative stock on hand shows check, not a number',()=>{const s=stockBuild(stockRowsFromPages(pages)),it=s.brands.find(x=>x.name==='Alpha').items.find(i=>i.id==='1002');assert.equal(it.check,true);assert.equal(s.negative,1);const al=s.brands.find(x=>x.name==='Alpha');assert.ok(al.rows.includes(it));});
test('DUPE, returns and no-sales items are not ordered',()=>{const s=stockBuild(stockRowsFromPages(pages));assert.equal(s.skipped,1);assert.equal(s.returnsOnly,1);assert.equal(s.brands.some(x=>x.items.some(i=>i.id==='1005'||i.id==='1004'||i.id==='1006')),false);});
test('brand from name prefix, two word brands, and fixes join brands',()=>{assert.equal(stockBrand('De Lorenzo Gel'),'De Lorenzo');assert.equal(stockBrand('Alpha Shampoo'),'Alpha');const s=stockBuild(stockRowsFromPages(pages),{alpha:'De Lorenzo'});const d=s.brands.find(x=>x.name==='De Lorenzo');assert.equal(d.items.length,3);});
test('pdf is built with a page footer and the brand name',()=>{const s=stockBuild(stockRowsFromPages(pages)),u=stockPdf([s.brands[0]],{days:57,line1:'Test',line2:'x'}),t=Buffer.from(u).toString('latin1');assert.ok(t.startsWith('%PDF-1.4'));assert.ok(t.includes('Page 1 of 1'));assert.ok(t.includes('Alpha'));assert.ok(!t.includes('On order ')||t.includes('not counted'));});
test('date text',()=>assert.equal(stockDmy('26/11/2026'),'26 Nov 2026'));
test('stock data is never sent or stored, only brand name fixes are',()=>{const ui=APP.slice(APP.indexOf('let stockParsed'),APP.indexOf('function renderImport('));assert.ok(!/\bapi\(|fetch\(|sessionStorage/.test(ui));assert.equal((ui.match(/localStorage/g)||[]).length,2);assert.ok(ui.includes("'hh_stock_brands'"));});
