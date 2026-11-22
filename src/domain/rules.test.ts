import{describe,expect,it}from'vitest'
import{calculateDocument,calculateLine,calculateQuotationScore,requiredApprovalRoles,requiresThreeSupplierInvites}from'./rules'
describe('procurement business rules',()=>{
 it('applies approved requisition thresholds',()=>{expect(requiredApprovalRoles(25000)).toEqual(['Department Manager']);expect(requiredApprovalRoles(25000.01)).toEqual(['Department Manager','Procurement Manager']);expect(requiredApprovalRoles(100000.01)).toEqual(['Department Manager','Procurement Manager','Finance Director'])})
 it('requires three supplier invitations above SAR 25,000',()=>{expect(requiresThreeSupplierInvites(25000)).toBe(false);expect(requiresThreeSupplierInvites(25000.01)).toBe(true)})
 it('calculates line and document values with 15% VAT',()=>{expect(calculateLine(2,1000,100)).toEqual({subtotalSar:2000,discountSar:100,taxableAmountSar:1900,vatAmountSar:285,totalSar:2185});expect(calculateDocument([{quantity:2,unitPriceSar:1000,discountSar:100}]).totalSar).toBe(2185)})
 it('uses the approved transparent quotation weights',()=>{const score=calculateQuotationScore({bidTotal:100,lowestEligibleBid:90,deliveryDays:10,bestDeliveryDays:8,paymentTermsDays:30,bestPaymentTermsDays:60,compliancePercent:100});expect(score.total).toBe(86)})
})
