// Run after the existing JP build. Preserve its generated public config verbatim.
const fs=require('node:fs');const p='netlify.toml';let s=fs.readFileSync(p,'utf8');
const route='[[redirects]]\n  from = "/hairhouse"\n  to = "/.netlify/functions/hairhouse?action=app"\n  status = 200\n  force = true\n\n';
if(!s.includes('from = "/hairhouse"'))s=s.replace('[[redirects]]',route+'[[redirects]]');
if(!s.includes('[functions]'))s+='\n[functions]\n  node_bundler = "esbuild"\n  included_files = ["node_modules/pdfjs-dist/build/pdf.mjs", "node_modules/pdfjs-dist/build/pdf.worker.mjs"]\n';
fs.writeFileSync(p,s);
