# Hairhouse cash planner - staging preview

This is a setup-required prototype, not an activated financial system. Alok reviews the Netlify preview and merges staging to main himself.

## Privacy and boundaries

`/hairhouse` serves an unlinked, noindex shell and a explicitly labelled synthetic sample. Real workspace reads and writes require a signed HttpOnly Secure SameSite session. Exactly two configured users are allowed, with scrypt password hashes. Without configuration all business-data requests fail closed. No invoice samples, names, credentials or real customer figures are committed. The PDF reader runs locally in the browser; original files are not retained.

Public templates, ads, JP location data and the public build script are unchanged. Netlify routing adds only /hairhouse; dependencies and tests run before the existing Python build. Production is not deployed by this change.

## Implemented

- Dated bank balance; 12-week outflow forecast; separate expected inflows; conservative low-water cash.
- Committed orders reserved before invoicing. Linked invoices replace covered order amounts without double-counting.
- Invoice/credit review queue; duplicates by supplier and reference; direct debit flag.
- PDF text candidates for HairCo and Rogue Beauty headers, totals, due dates and lines; generic PDFs need more review. Pack defaults to 1 and must be checked. Scans/photos require manual entry; highlight recognition is not implemented.
- Received-unit quantities, pack sizes, tick-to-received action, partial receipt progress, overdue receipt warnings.
- Separate verified-missing checkboxes and copyable invoice-adjustment text. No emails are sent.
- Credit owed records remain open separately; only actual reviewed credits reduce forecast. Replace invoice amount only when a corrected invoice has been reviewed.
- Weekly summary data: money out, overdue, unreceived invoices, credits owed. No WhatsApp or email delivery yet.
- JSON backup export. No automated accounting, reconciliation, orders, payments or bank changes.

## Activation gate

1. Owner confirms the two login email identities, enters passwords through a secure setup path (not chat), and approves reminders' delivery channel and schedule.
2. Configure server-only Netlify function environment variables `HAIRHOUSE_USERS` as a two-element array of `{email,salt,hash}` and `HAIRHOUSE_SESSION_SECRET` as a random 48+ character secret. Generate independent 16-byte hex salts, hash passwords with Node scrypt to 64 bytes hex. Never put these in the repo. There is no self-registration or password reset yet.
3. Storage is a single versioned workspace document in a strongly consistent Netlify Blob store. Updates reject stale ETags rather than merging financial values. This is a small two-user prototype, not a transactional ledger. Move to a transaction-capable database before payment automation or broader rollout. Preview stores are per deployment; production storage is separate.
4. Test both users, non-user rejection, logout, simultaneous edits, storage readback and PDF reading in the deployed function. Verify Netlify usage/cost limits before activating; no paid upgrade is authorized.
5. Enter a dated balance plus all wages/rent/GST/other outflows and unbilled purchase orders. Expected sales remain estimates. Recurrences must currently be entered as dated rows; automatic recurrence scheduling is not implemented.
6. Keep original documents externally and verify recovery/export. No scheduled reminder delivery exists yet.

## Checks

`npm test` exercises forecast, matching, duplicates, session validation, date/amount validation and receipts against the actual embedded application engine. `npm audit --omit=dev` reported zero vulnerabilities at development time. Live deployment/auth checks remain required.

## Later

Image OCR and highlight candidates with human confirmation, email forwarding intake, automatic recurrences, authenticated recovery flow, price-history comparison, and weekly NetSuite report import. Inventory import must not create or send purchase orders without approval.
