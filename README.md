# Saudi Procurement & Supplier Management Intelligence

A browser-based procurement portfolio application for **Tawreed Business Solutions**, a fictional Saudi B2B company purchasing IT equipment, office supplies, furniture and business services for branches in Riyadh, Jeddah, Dammam, Madinah and Abha.

## Disclosure

All companies, suppliers, people, approvals, transactions and results are synthetic demonstration data. Tawreed Business Solutions is not a real client. The application sends no business data to a server and stores its demonstration workspace only in the current browser's `localStorage`.

## Phase 1 scope

- Responsive corporate interface and eight-module navigation
- Complete typed procurement domain model and approved business-rule constants
- Deterministic linked dataset covering requisitions, approvals, RFQs, three-supplier comparison, POs, receipts, rejected goods, service acceptance and invoice matching
- Executive Overview calculated from stored source records
- Versioned local storage with validation, corruption recovery and two-step reset
- Accessible controls, focus states and meaningful Phase 2–5 placeholders
- Automated rules, fixture, storage and KPI tests

Operational CRUD, workflow actions, CSV import/export, printable POs and advanced analytics are intentionally reserved for later approved phases.

## Value definitions

- **Requested:** active requisition estimates.
- **Approved:** estimates for Approved requisitions.
- **Committed:** totals for non-draft, non-cancelled purchase orders.
- **Received:** accepted goods at PO price plus accepted services; returns reduce this value.
- **Invoiced:** supplier invoice totals.
- **Paid:** unsupported and never inferred.

Purchase-order and invoice totals use a fixed **15% demonstration VAT assumption**. This project does not claim tax, accounting, procurement-policy or regulatory compliance. Workflow approval identities do not provide real authentication or authorization.

## Technology and local setup

React 19, TypeScript, Vite, Vitest and Oxlint. No backend, authentication, external API, telemetry, database or paid service.

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
npm audit
```

See [BUSINESS_REQUIREMENTS.md](BUSINESS_REQUIREMENTS.md), [DATA_DICTIONARY.md](DATA_DICTIONARY.md) and [DEMO_GUIDE.md](DEMO_GUIDE.md).

## Limitations

Browser storage is unencrypted and lacks central backup, collaboration and identity assurance. Do not enter confidential or real supplier information. Synthetic metrics are demonstrations, not actual outcomes, savings or verified supplier performance.

## Phase 2 capabilities

Purchase requisitions now support multi-line create, edit, search, lifecycle control, threshold-based simulated approvals, auditable decisions, rejection reasons, duplicate warnings and protected cancellation/deletion. Supplier management supports create, edit, search, filters, lifecycle status, duplicate warnings and transaction-history protection. Both modules offer local-only CSV templates, import reports, partial safe acceptance and formula-injection-safe exports (2 MB / 5,000-row limits).

Comparable management KPIs use pre-VAT values. The demonstration's SAR 230,000 approved and SAR 230,000 committed pre-VAT values reconcile. The former SAR 264,500 committed figure was the same PO population including SAR 34,500 demonstration VAT; it was not excess purchasing.

## Phase 3 capabilities

Approved requisitions can now be sourced through controlled RFQs. Active suppliers must match at least one requested category, and purchases above SAR 25,000 require three invitations unless a sourcing exception is documented. Itemized supplier quotations are validated, rescored deterministically using the published 50/20/10/20 model, and shown as eligible or ineligible. The highest eligible score is recommended without automatic selection; selecting another eligible bid requires written justification.

Purchase orders are generated only from valid selected quotations and cannot exceed approved requisition quantities. The application calculates subtotal, discounts, taxable value, demonstration VAT and gross total, protects issued/downstream orders, derives receipt-related states from existing records, and provides a browser-native printable synthetic PO.

## Phase 4 capabilities

Goods receiving supports multiple and partial receipts, accepted/rejected quantities, mandatory rejection reasons, auditable return events, outstanding quantities and late-delivery indicators. Service lines use a separate value-based acceptance workflow and cannot be processed as physical goods.

Supplier invoices are validated against eligible POs and supplier-specific duplicate numbers. Transparent two-way/three-way matching checks cumulative eligible quantities or service values, PO prices, 15% demonstration VAT, line totals and document totals. Blocking exceptions prevent Matched status. Reviewed means a documented exception review only; it is not payment approval.

### Dependency audit status

The reviewed development toolchain uses Vite 8.3.8, Vitest 5.1.0, `tinyglobby` 0.2.17, `fdir` 6.5.0 and `picomatch` 4.0.7. Earlier audits reported six `picomatch` findings; on 22 November 2026, a fresh `npm audit` using the then-current advisory database returned **0 vulnerabilities** without forced fixes or breaking downgrades. This is a point-in-time dependency check, not a permanent claim that future advisories cannot affect the project.

## Phase 5 analytics

The Procurement Analytics module derives financial, operational, sourcing and supplier indicators entirely from the shared browser-local workspace. Filters cover dates, branch, department, supplier, category and PO status. Charts include monthly commitments, branch/department comparisons, supplier concentration and category distribution, with accessible text equivalents and tables. A client-side printable management summary is available.

The Executive Overview now exposes outstanding commitments and on-time delivery context with direct analytics navigation. The invoice domain already supports multi-line invoices, but the interactive invoice-entry editor remains one line at a time; expanding it is deferred to Phase 6 to avoid weakening cumulative matching controls late in Phase 5.

## Final portfolio readiness

All eight modules are operational. The invoice form now supports multiple distinct PO lines in one document while retaining per-line receipt/service evidence and cumulative invoice controls. The interface includes a five-minute recruiter walkthrough, synthetic-data disclosures, printable POs and management summaries, responsive layouts, accessible labels, empty states, and a two-step reset.

Static-hosting preparation uses relative Vite asset paths and a manually reviewable GitHub Pages workflow. Nothing has been published. See [CASE_STUDY.md](CASE_STUDY.md) for the concise business and technical narrative.
