# Phase 1 Demonstration Guide

1. Open the local application and read the synthetic-data and browser-local storage disclosure.
2. Review Executive Overview totals and expand **Value definitions and exclusions**.
3. Compare requested, approved, committed, received and invoiced values. Confirm that no paid-value metric exists.
4. Review the requisition status distribution and supplier PO commitments.
5. Review the demonstration scenarios:
   - completed laptop procurement;
   - high-value request pending simulated Finance Director approval;
   - three-supplier furniture comparison;
   - partial late delivery with rejected goods;
   - invoice quantity and unit-price discrepancies;
   - correct invoice matches;
   - service acceptance.
6. Open each navigation module and confirm it is clearly marked as a later-phase placeholder with linked synthetic record counts.
7. Select **Reset demo**, then **Confirm reset**, to restore the deterministic workspace.

Dataset as-of: 17 November 2026. All identities and records are fictional. Email addresses use reserved `.invalid` domains.

Do not enter real or confidential information. Browser local storage is not encrypted and does not provide authentication, authorization, backup or multi-user collaboration.

## Phase 2 walkthrough

1. Open **Purchase Requisitions**, search or filter the synthetic records, then create a multi-line Draft.
2. Submit it and use the clearly labeled simulated role selector to record each threshold-required decision. Rejections require a reason.
3. Open **Supplier Management**, inspect linked transaction history, and try its search and status/category/city filters.
4. Download CSV templates. Imports are processed only in the browser and show row-level acceptance, warning and error results.
5. Return to **Executive Overview** and confirm committed pre-VAT is SAR 230,000 while gross PO documents are SAR 264,500, including SAR 34,500 demonstration VAT.
6. Use the two-step reset to remove demonstration edits and restore the deterministic fixture.

## Phase 3 walkthrough

1. Open **RFQ & Quotation Comparison** and select `TBS-RFQ-2026-002` to inspect the preserved three-supplier comparison.
2. Review every 50/20/10/20 component, eligibility label, recommendation, and the documented non-highest-score selection.
3. Create a new RFQ only after preparing an Approved requisition without an active RFQ. For values above SAR 25,000, select three matching Active suppliers or document the exception.
4. Issue the RFQ, record itemized quotations, and close it when sourcing is complete.
5. Select an eligible quotation. A lower-scored selection requires written justification and never creates a PO automatically.
6. Open **Purchase Orders**, generate a Draft from an uncommitted selected quotation, review pre-VAT/VAT/gross values, issue it, and open the printable preview.
7. Refresh the browser to confirm persistence, then use the two-step demonstration reset.

## Phase 4 walkthrough

1. Open **Goods Receiving** to inspect the on-time laptop receipt, late partial chair receipt, rejected chairs and service acceptance.
2. Use **Goods receipt** for an eligible issued goods PO; delivered equals accepted plus rejected, and rejected quantities require a reason.
3. Use **Record return** to append—not overwrite—an auditable return event. Use **Accept service** only for service PO lines.
4. Open **Invoice Matching** and inspect `RSO-INV-5510`: quantity and unit-price exceptions show expected, actual and variance values.
5. Record a reviewer comment. Reviewed does not mean matched, paid or approved for payment.
6. Create a synthetic invoice against an eligible PO. The system checks cumulative receipt/service evidence, prices, VAT and totals.
7. Confirm dashboard values remain on a pre-VAT primary basis, refresh to verify persistence, then reset the demo.

## Phase 5 analytics walkthrough

1. Open **Procurement Analytics** and review the nine record-derived KPIs and financial definitions.
2. Filter to Jeddah to see SAR 60,000 committed pre-VAT, the partial receipt, late delivery, rejected goods and invoice exception evidence update together.
3. Change supplier, category, department, PO status and date filters; reset filters to restore all three eligible POs.
4. Inspect monthly, branch, department, supplier and category charts plus the supplier evidence table.
5. Use **Print management summary** for a browser-native report. No backend or reporting service is used.
6. Return to **Executive Overview** and verify approved and committed pre-VAT remain SAR 230,000, PO VAT SAR 34,500 and gross PO total SAR 264,500.

## Five-minute recruiter walkthrough

1. Read the synthetic-data disclosure and baseline KPIs on **Executive Overview**.
2. Open **Purchase Requisitions** to see multi-line requests and simulated threshold approvals.
3. Open **RFQ & Quotation Comparison** and select `TBS-RFQ-2026-002` to inspect transparent supplier scoring and a documented override.
4. Open **Purchase Orders**, view `TBS-PO-2026-002`, and inspect its printable pre-VAT/VAT/gross document.
5. Open **Goods Receiving** to see a late partial delivery with rejected chairs and a separate service acceptance.
6. Open **Invoice Matching**, inspect `RSO-INV-5510`, and review its blocking quantity and price exceptions.
7. Open **Procurement Analytics**, filter to Jeddah, and confirm all applicable values update together.
8. Use **Reset demo** and **Confirm reset** to restore the deterministic baseline.
