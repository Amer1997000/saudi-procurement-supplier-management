# Business Requirements

## Scenario and problem

Tawreed Business Solutions is a fictional Saudi B2B organization. Purchasing records are assumed to be fragmented across spreadsheets, making requisition approval, supplier comparison, PO tracking, receipt control and invoice reconciliation difficult to monitor consistently.

## Stakeholders

- Requesters create purchase requirements.
- Department Managers review all submitted requisitions.
- Procurement Managers review requisitions above SAR 25,000 and control sourcing.
- Finance Directors review requisitions above SAR 100,000.
- Receiving Officers record goods receipts.
- Invoice Reviewers evaluate two-way and three-way matches.
- Executives review procurement commitments and exceptions.

These are simulated workflow roles, not authenticated production authority.

## Approved Phase 1 scope

Application foundation, responsive navigation, complete domain types, deterministic synthetic data, versioned local storage, record-derived Executive Overview, documentation and automated tests. Operational workflows remain read-only placeholders.

## Approved business rules

1. Currency is SAR only.
2. Requisitions up to SAR 25,000 require Department Manager approval.
3. Values above SAR 25,000 through SAR 100,000 require Department and Procurement Manager approval.
4. Values above SAR 100,000 also require Finance Director approval.
5. Purchases above SAR 25,000 normally invite three eligible suppliers; exceptions require documented justification.
6. Quotation scoring weights are price 50%, delivery 20%, payment terms 10%, and specification compliance 20%.
7. Demonstration VAT is 15%; production treatment requires professional review.
8. Quantity invoiced above net accepted quantity is a blocking exception.
9. Unauthorized unit-price overage is a blocking exception.
10. Line rounding tolerance is SAR 0.05; document rounding tolerance is SAR 1.00.
11. Services use service acceptance rather than physical goods receipts.
12. PO closure requires completed receipt/acceptance and no unresolved blocking invoice exceptions.
13. Returns reduce net accepted quantity and received value without erasing receipt history.
14. Requested, approved, committed, received and invoiced values remain distinct. Paid value is unsupported.
15. No banking, payment execution, accounting posting, savings claim or compliance certification is supported.

## Success criteria

- Every synthetic transaction retains valid relationships.
- Dashboard values reconcile with source records.
- Corrupt local data safely resets to the known fixture.
- The interface distinguishes current functionality from later phases.
- Automated tests, typecheck, lint and build pass.

## Phase 2 operational scope

Users can maintain requisitions and fictional suppliers locally in the browser. Approval threshold logic must prevent approval until every required simulated role has approved, preserve all decisions, and require rejection reasons. Approved requisitions cannot be freely edited. Suppliers with transaction history cannot be deleted. CSV operations never transmit data, never silently overwrite or merge records, and neutralize spreadsheet formula prefixes on export.

Primary financial management comparisons are pre-VAT. VAT-inclusive totals remain document-control disclosures rather than being compared directly with pre-VAT requisition estimates.

## Phase 3 sourcing scope

Procurement users can create RFQs from Approved requisitions, invite eligible suppliers, record quotations, compare published weighted scores, make documented selections, generate controlled POs and print synthetic documents. Recommendations are deterministic procurement rules, not AI. Goods receipt and invoice operations remain read-only downstream evidence until later phases.

## Phase 4 operational scope

Receiving users can record partial goods deliveries, rejection reasons, returns and service acceptance without deleting evidence. Invoice users can create synthetic invoices, inspect two-way/three-way discrepancies, and record reviewed exceptions. No review action executes payment, approves accounting entries or establishes regulatory compliance.

## Phase 5 reporting scope

Management can filter record-derived procurement indicators by period, organization, supplier, category and PO status. Pre-VAT commitment, receipt and invoice values remain the primary comparison basis; VAT-inclusive totals are separate disclosures. Supplier indicators are objective transaction evidence and must not be represented as verified real-world performance or subjective quality scores.
