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
- JSON backup export. Supplier-statement snapshots and recorded-ledger comparison. No automated accounting, orders, payments or bank changes.

## Activation gate

1. Owner confirms the two login email identities, enters passwords through a secure setup path (not chat), and approves reminders' delivery channel and schedule.
2. Configure server-only Netlify values for exactly two `HAIRHOUSE_ALLOWED_EMAILS`, a random `HAIRHOUSE_SESSION_SECRET` of 48+ characters, and temporary keyed setup (`HAIRHOUSE_ENROLLMENT_SECRET`, `HAIRHOUSE_SETUP_ENABLED=true`). Enroll new unique passwords (8+ characters, owner-selected minimum) through secure browser fill. Credentials are hashed server-side and immutable on this initial endpoint. Disable setup and redeploy immediately afterward. No reset/recovery flow yet. Preview and production require separate enrollment.
3. Storage is a versioned workspace document in strongly consistent Netlify Blobs. Updates reject stale ETags. Preview stores use the PR number across deploys, production is separate; build context is embedded without secrets. Branch deploys fail closed. This is a small two-user visibility layer, not a transactional accounting ledger.
4. Test both users, non-user rejection, logout, simultaneous edits, storage readback and PDF reading in the deployed function. Verify Netlify usage/cost limits before activating; no paid upgrade is authorized.
5. Enter a dated balance plus all wages/rent/GST/other outflows and unbilled purchase orders. Expected sales remain estimates. Recurrences must currently be entered as dated rows; automatic recurrence scheduling is not implemented.
6. Keep original documents externally and verify recovery/export. No scheduled reminder delivery exists yet.

## Checks

`npm test` exercises forecast, matching, duplicates, session validation, date/amount validation and receipts against the actual embedded application engine. `npm audit --omit=dev` reported zero vulnerabilities at development time. Live deployment/auth checks remain required.

## Later

Image OCR and highlight candidates with human confirmation, email forwarding intake, automatic recurrences, authenticated recovery flow, price-history comparison, and weekly NetSuite report import. Inventory import must not create or send purchase orders without approval.

## Supplier statements and payment terms

- A reviewed snapshot is not a new invoice and never changes invoice amounts automatically. PDF parsing supports the supplied Collective Brands layout; other layouts/scans may need manual review outside the tool. Original charge and remaining balance are separate; running balances are converted to row residuals. Separate credit memos stay separate.
- Bank CSV candidates are reviewed individually. Positive credits and volume rebates are excluded, not netted against bills. No payment is sent. Cleared-payment records must be on or before the dated bank balance, avoiding double cash deduction.
- Payment and real credit-memo allocations reduce invoice residuals once. Do not also mark allocated invoices paid or enter the same credit as a forecast credit. V1 form supports one invoice allocation per record; split payments stay unallocated pending confirmed allocation. Unknown allocations keep reconciliation in Needs review.
- Configurable days-from-invoice terms default to 30, not month-end terms. Invoices without invoice dates use their explicit due dates. Aging is days past due: current / 1-30 / 31-60 / 60+. Statement invoice-age columns are not copied as overdue aging.
- Charge changes, residual differences, absent invoices and unallocated payments are flagged. Disappearing rows or equal aggregate totals are not proof of individual payment allocations. Same-day payment posting can differ from statement printing.
- No real statements, bank data or promises of payment are seeded into the public repo/sample. The two unexplained adjustments from the owner's supplied reconciliation remain unresolved evidence, not verified credits.

Checks: `npm test` includes original forecast/auth checks, synthetic statement/aging boundaries and mocked enrollment/persistence checks. Preview two-user live persistence, stale-edit conflict, logout, non-user rejection and disabled-enrollment checks passed. Production activation remains separate.

## Preview tested, production not activated

The two approved preview accounts are enrolled. Preview setup is disabled and readback is empty after removal of a zero-value test row. Both users can sign in with their chosen Hairhouse passwords, see shared saved edits, and sign out. A stale edit is rejected without overwriting newer data. Preview credentials/data do not transfer to production.

After Alok merges, production still needs separate server-only secrets, the same two-identity allowlist, controlled enrollment, setup disablement and production smoke tests. Verify hosting usage/cost limits before using this as a live business system. No production secrets, paid upgrade, reminders or external sends were configured.

Graphical cues: one-week cash summary, 12-week risk strip, negative-week red shading, owner-set amber safety buffer, prominent actual overdue / unreceived stock / credit owed cues, direct-debit marker and due-date countdowns. An empty workspace asks for opening cash and commitments rather than claiming safety. Forecast completeness remains the user's responsibility; no bank feed or recurring outflows are imported automatically.

## Gmail invoice intake (read-only)

A daily scheduled function (06:00 Sydney, production deploy only) and a "Check Gmail now" button read the invoices mailbox with the Gmail read-only scope. New emails are listed in the app as "X new invoice emails from Gmail"; PDF attachments (3 MB max) are held privately until reviewed. Review opens the same PDF reader and invoice editor as the manual flow, and nothing is saved until the owner confirms. Dedupe is by Gmail message id. Nothing is sent, labelled or deleted in Gmail.

Server-only Netlify env vars: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN. Without them the panel stays hidden and nothing runs. Scheduled functions do not run on deploy previews; use the button there.
