import {getStore} from '@netlify/blobs';
import {gmailSync} from './hairhouse.mjs';
// Daily at 06:00 Sydney time (19:00 UTC during daylight saving). Netlify runs scheduled functions on the published production deploy only.
export const config={schedule:'0 19 * * *'};
export default async function(){try{const store=getStore({name:'hairhouse-private-production',consistency:'strong'});const r=await gmailSync({env:process.env,store});console.log('Hairhouse Gmail sync:',JSON.stringify(r));}catch(e){console.error('Hairhouse Gmail sync failed:',e.message);}}
