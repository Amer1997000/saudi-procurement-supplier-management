# Data Dictionary and Business Rules

Identifiers are synthetic and unique per entity. Dates use ISO `YYYY-MM-DD`; timestamps use ISO 8601. Currency is SAR. Monetary values are non-negative.

| Entity | Purpose | Principal relationships |
|---|---|---|
| Branch | Five Saudi operating locations | Requisitions and POs |
| Department | Organizational purchasing owner | Requisitions and POs |
| ProcurementActor | Synthetic workflow identity | Requests, approvals, receipts and reviews |
| Supplier | Synthetic vendor master | Quotations, POs and invoices |
| PurchaseRequisition | Requested purchasing need | Lines, approvals, RFQs |
| ApprovalDecision | Simulated authority decision | Requisition and actor |
| RequestForQuotation | Supplier invitation event | Requisition and suppliers |
| SupplierQuotation | Commercial bid and transparent score | RFQ, supplier and bid lines |
| PurchaseOrder | Committed purchase | Approved request, selected quote and supplier |
| GoodsReceipt | Physical delivery record | PO and receipt lines |
| ServiceAcceptance | Accepted service milestone | Service PO line |
| SupplierInvoice | Invoice proposed against PO | PO, supplier, lines and exceptions |
| MatchException | Calculated discrepancy | Invoice or invoice line |

## Status definitions

Requisition: Draft → Submitted → Approved or Rejected; eligible records may be Cancelled. Rejected may be explicitly reopened to Draft in a future operational phase.

RFQ: Draft → Issued → Closed; eligible records may be Cancelled.

Purchase order: Draft → Issued → Partially Received → Fully Received → Closed. Cancellation eligibility depends on downstream receipts and invoices.

Invoice: Match, Exception, or Reviewed. Reviewed means documented human review, not payment authorization.

## Financial formulas

```text
Line subtotal = quantity × unit price
Taxable amount = line subtotal − discount
VAT = taxable amount × 15%
Line total = taxable amount + VAT
```

Document totals sum rounded line calculations. Paid value is not modeled.

## Quotation score

```text
Price score = lowest eligible bid ÷ bid × 100
Delivery score = best eligible delivery days ÷ bid delivery days × 100
Terms score = bid payment days ÷ best eligible payment days × 100
Total = price × 50% + delivery × 20% + terms × 10% + compliance × 20%
```

The score is a documented recommendation aid, not an AI procurement decision. A different eligible selection requires justification.

## Receipt and matching rules

- Net accepted quantity equals accepted less returned quantity across preserved receipts.
- Accepted quantity cannot exceed ordered quantity.
- Rejected quantity remains outstanding until replaced, cancelled or otherwise resolved.
- Physical receipts do not apply to service lines.
- Three-way matching compares invoice quantities with accepted receipts and invoice prices with PO prices.
- Two-way matching may be used where receipt evidence is not applicable, such as accepted services.
- Missing data is never treated as zero performance.
- Zero-denominator rates display Unavailable.

## Storage

Key: `tawreed-procurement-workspace-v1`; schema version: `1`. A workspace must contain all eleven domain collections, string record identifiers, SAR metadata, and explicit fictional/synthetic classification. Missing, malformed or incompatible data is replaced by a fresh independent demonstration workspace.

## Phase 2 lifecycle and CSV contracts

Requisitions follow Draft → Submitted → Approved or Rejected, with Cancelled allowed only when downstream RFQ/PO records do not exist. Rejected records may be edited and resubmitted; approval history is retained by submission round. Approval roles are derived from pre-VAT requisition estimates: ≤25,000 Department Manager; 25,000.01–100,000 also Procurement Manager; >100,000 also Finance Director. These are simulated workflow roles, not authentication.

Supplier CSV columns: `legalName, city, categories, contactName, email, paymentTermsDays, leadTimeDays, status`. Requisition CSV columns: `branchCode, departmentCode, requesterEmail, requiredDate, justification, description, category, quantity, unitOfMeasure, estimatedUnitCostSar, service`. Each requisition import row creates one Draft, one-line requisition; multi-line creation is available in the form. Duplicate rows are reported and skipped, never merged. Valid rows may be accepted while invalid rows remain rejected.

Financial stages use pre-VAT bases for comparison: requested = active requisition estimates; approved = Approved requisition estimates; committed = non-draft/non-cancelled PO taxable amounts; received = net accepted quantity × PO unit price plus service acceptance; invoiced = supplier invoice taxable amounts. VAT and document totals are separately disclosed. Paid value is unsupported.

## RFQ, quotation and purchase-order controls

An RFQ references exactly one Approved requisition and contains unique active, category-matching supplier invitations. RFQ states are Draft → Issued → Closed, with cancellation allowed before closure. Values above SAR 25,000 require at least three invitations or `exceptionJustification`.

Quotation eligibility requires an invited Active supplier, unexpired validity, complete requisition-line coverage, exact requested quantities, and 100% line specification compliance. Component scores are normalized within each RFQ: price = lowest eligible pre-VAT bid ÷ bid; delivery = shortest eligible delivery period ÷ delivery period; payment terms = offered days ÷ longest eligible terms; compliance = mean compliance percentage. Final score = price × 50% + delivery × 20% + terms × 10% + compliance × 20%. Values are rounded to two decimals.

PO lines copy the selected quotation quantities, prices and discounts. Line taxable value = quantity × unit price − discount; VAT = taxable value × 15%; gross = taxable value + VAT. Non-cancelled quantities across POs may not exceed the approved requisition. Draft orders may be issued or cancelled; orders with receipt, service-acceptance or invoice history cannot be cancelled. Issued receipt status is derived from linked evidence, not manually asserted.

## Receiving, acceptance and matching

Goods receipt lines preserve delivered, accepted, rejected and returned quantities. Delivered must equal accepted plus rejected for delivery events. Rejections require reasons. Returns are appended as separate auditable receipt events and may not exceed net accepted quantities. Outstanding quantity = ordered − accepted + returned. Receipt dates after the PO promised date are Late.

Service acceptance is pre-VAT value-based. Cumulative accepted value may not exceed the service PO line taxable value. Service lines cannot appear in physical goods receipts.

Invoice eligibility is cumulative: remaining eligible quantity/value equivalent = net accepted evidence minus quantities already invoiced across all prior invoice states. Quantity overage and unauthorized price overage have zero tolerance. VAT and line-total differences allow SAR 0.05; document VAT/total differences allow SAR 1.00. Blocking Quantity, Unit Price, VAT, Line Total or Document Total exceptions produce Exception status. Review requires a comment and preserves expected, actual, absolute/percentage variance and review history.

## Analytics formulas

- On-time delivery % = eligible non-return receipt events on/before PO promised date ÷ eligible receipt events.
- Rejected-goods rate = rejected goods quantity ÷ delivered goods quantity.
- Requisition-to-order cycle = average calendar days from valid requisition approval date to PO issue date.
- Invoice exception rate = invoices containing at least one blocking exception ÷ linked invoices.
- RFQ participation = recorded supplier quotations ÷ invited suppliers for eligible issued/closed RFQs.
- Supplier concentration = largest supplier pre-VAT commitment ÷ total filtered pre-VAT commitment.
- Outstanding PO value = eligible committed pre-VAT value − net accepted value, floored at zero.
- Received goods value uses net accepted quantity multiplied by the PO line taxable value per ordered unit, thereby respecting line discounts and returns. Accepted services use recorded pre-VAT acceptance values.

Rates with no valid denominator are Unavailable. Cancelled and Draft POs are excluded. Missing dates are excluded from date-dependent denominators rather than treated as zero performance.
