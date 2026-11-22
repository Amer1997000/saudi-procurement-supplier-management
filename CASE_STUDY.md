# Saudi Procurement & Supplier Management Intelligence

## Portfolio case study

Tawreed Business Solutions is a fictional Saudi organization used solely for a synthetic browser-based portfolio demonstration. The scenario addresses fragmented purchase requests, inconsistent sourcing decisions, weak receipt evidence, and manual invoice reconciliation across Riyadh, Jeddah, Dammam, Madinah, and Abha.

## Business objective

Create one traceable workflow from requisition through approval, competitive sourcing, purchase order, goods or service acceptance, invoice matching, exception review, and management reporting—without claiming payment execution, accounting posting, authentication, regulatory compliance, or measured savings.

## Implemented workflow

1. Multi-line requisitions and threshold-based simulated approvals.
2. Active, category-matching supplier invitations and documented sourcing exceptions.
3. Transparent 50/20/10/20 quotation scoring and justified selection overrides.
4. Controlled SAR purchase orders with discounts and disclosed 15% demonstration VAT.
5. Partial receipts, rejected goods, returns, late-delivery evidence, and service acceptance.
6. Multi-line invoices with cumulative two-way and three-way matching.
7. Preserved exception history and mandatory review comments.
8. Filterable executive analytics using pre-VAT management values.

## Architecture

React, TypeScript, Vite and Vitest form a static browser-only application. Versioned local storage holds the synthetic workspace. Domain services isolate business calculations from the UI. No backend, telemetry, authentication, paid API, database, or external data transmission is used.

## Demonstrated controls

- Approval thresholds at SAR 25,000 and SAR 100,000.
- Three eligible supplier invitations above SAR 25,000 unless justified.
- Duplicate requisition, supplier, quotation, commitment, and supplier-invoice protections.
- Quantity, price, VAT, line-total and document-total invoice exceptions.
- SAR 0.05 line and SAR 1.00 document rounding tolerances.
- Objective delivery, rejection, exception, participation, cycle-time and concentration metrics.

## Evidence and limitations

All company, employee, supplier and transaction records are fictional. Dashboard values describe only the included synthetic records. Browser storage is unencrypted and unsuitable for confidential production data. Simulated roles are workflow demonstrations, not access control. No paid-value or accounting-expenditure metric exists. Development-tooling dependency findings remain documented in the README.

## Five-minute recruiter demonstration

Reset the synthetic workspace, inspect the Executive Overview, create a requisition, review RFQ comparison and PO controls, inspect partial receipt and invoice exception evidence, then open Procurement Analytics and apply the Jeddah filter. Detailed steps are in `DEMO_GUIDE.md`.
