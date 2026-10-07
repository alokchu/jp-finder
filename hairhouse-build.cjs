// Run after the existing JP build. Preserve its generated public config verbatim.
const fs=require('node:fs');const p='netlify.toml';let s=fs.readFileSync(p,'utf8');
const route='[[redirects]]\n  from = "/hairhouse"\n  to = "/.netlify/functions/hairhouse?action=app"\n  status = 200\n  force = true\n\n';
// Existing generator writes invalid TOML. Keep the established catch-all without that invalid condition.
s=s.replace('  conditions = {Response = {404}}\n','');
if(!s.includes('from = "/hairhouse"'))s=s.replace('[[redirects]]',route+'[[redirects]]');
if(!s.includes('[functions]'))s+='\n[functions]\n  node_bundler = "esbuild"\n  included_files = ["node_modules/pdfjs-dist/build/pdf.mjs", "node_modules/pdfjs-dist/build/pdf.worker.mjs"]\n';
fs.writeFileSync(p,s);
// A real static shell survives Netlify's post-build config reload and pretty URLs.
(async()=>{const {APP}=await import('./netlify/functions/hairhouse.mjs');fs.mkdirSync('build/hairhouse',{recursive:true});fs.writeFileSync('build/hairhouse/index.html',APP);fs.appendFileSync('build/_headers','\n/hairhouse/*\n  X-Robots-Tag: noindex, nofollow\n  Cache-Control: no-store\n');})().catch(e=>{console.error(e);process.exit(1)});
