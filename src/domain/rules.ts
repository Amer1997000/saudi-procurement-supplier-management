import type{ApprovalDecision,AuthorityRole,ProcurementWorkspace,PurchaseOrderLine,PurchaseRequisition,QuotationScore,RequisitionStatus,SupplierQuotation}from'./models'

export const VAT_RATE=.15
export const LINE_ROUNDING_TOLERANCE_SAR=.05
export const DOCUMENT_ROUNDING_TOLERANCE_SAR=1
export const QUOTATION_WEIGHTS={price:.5,delivery:.2,paymentTerms:.1,compliance:.2} as const
export const requisitionTransitions:Record<RequisitionStatus,RequisitionStatus[]>={Draft:['Submitted','Cancelled'],Submitted:['Approved','Rejected','Cancelled'],Approved:['Cancelled'],Rejected:['Draft','Cancelled'],Cancelled:[]}
export const requiredApprovalRoles=(valueSar:number):ApprovalDecision['role'][]=>valueSar<=25000?['Department Manager']:valueSar<=100000?['Department Manager','Procurement Manager']:['Department Manager','Procurement Manager','Finance Director']
export const hasRequiredApprovals=(requisition:PurchaseRequisition)=>requiredApprovalRoles(requisition.estimatedTotalSar).every(role=>requisition.approvals.some(a=>a.role===role&&a.decision==='Approved'))
export const requiresThreeSupplierInvites=(valueSar:number)=>valueSar>25000
export function calculateLine(quantity:number,unitPriceSar:number,discountSar=0){const subtotal=round(quantity*unitPriceSar),taxableAmountSar=round(subtotal-discountSar),vatAmountSar=round(taxableAmountSar*VAT_RATE);return{subtotalSar:subtotal,discountSar:round(discountSar),taxableAmountSar,vatAmountSar,totalSar:round(taxableAmountSar+vatAmountSar)}}
export function calculateDocument(lines:Array<{quantity:number;unitPriceSar:number;discountSar:number}>){return lines.reduce((total,line)=>{const value=calculateLine(line.quantity,line.unitPriceSar,line.discountSar);return{subtotalSar:round(total.subtotalSar+value.subtotalSar),discountSar:round(total.discountSar+value.discountSar),taxableAmountSar:round(total.taxableAmountSar+value.taxableAmountSar),vatAmountSar:round(total.vatAmountSar+value.vatAmountSar),totalSar:round(total.totalSar+value.totalSar)}},{subtotalSar:0,discountSar:0,taxableAmountSar:0,vatAmountSar:0,totalSar:0})}
export function calculateQuotationScore(input:{bidTotal:number;lowestEligibleBid:number;deliveryDays:number;bestDeliveryDays:number;paymentTermsDays:number;bestPaymentTermsDays:number;compliancePercent:number}):QuotationScore{const price=input.lowestEligibleBid/input.bidTotal*100,delivery=input.bestDeliveryDays/input.deliveryDays*100,paymentTerms=input.paymentTermsDays/input.bestPaymentTermsDays*100,compliance=input.compliancePercent;return{price:round(price),delivery:round(delivery),paymentTerms:round(paymentTerms),compliance:round(compliance),total:round(price*.5+delivery*.2+paymentTerms*.1+compliance*.2)}}
export const isEligibleQuotation=(quotation:SupplierQuotation,asOfDate:string)=>quotation.status!=='Noncompliant'&&quotation.validUntil>=asOfDate&&quotation.lines.every(line=>line.specificationCompliance===100)
export const acceptedQuantityForLine=(workspace:ProcurementWorkspace,poLineId:string)=>workspace.goodsReceipts.flatMap(receipt=>receipt.lines).filter(line=>line.purchaseOrderLineId===poLineId).reduce((sum,line)=>sum+line.acceptedQuantity-line.returnedQuantity,0)
export const receivedValueForLine=(workspace:ProcurementWorkspace,line:PurchaseOrderLine)=>round(acceptedQuantityForLine(workspace,line.id)*line.unitPriceSar)
export const authorityIsDemonstrationOnly=(role:AuthorityRole)=>`${role} is a simulated workflow role, not authenticated production authority.`
const round=(value:number)=>Math.round((value+Number.EPSILON)*100)/100
