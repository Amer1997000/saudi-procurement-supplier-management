export type SaudiRegion='Central'|'Western'|'Eastern'|'Southern'
export type SaudiCity='Riyadh'|'Jeddah'|'Dammam'|'Madinah'|'Abha'
export type ProcurementCategory='IT Equipment'|'Office Supplies'|'Furniture'|'Business Services'|'Facilities Services'|'Printing'
export type AuthorityRole='Requester'|'Department Manager'|'Procurement Manager'|'Finance Director'|'Receiving Officer'|'Invoice Reviewer'
export type RequisitionStatus='Draft'|'Submitted'|'Approved'|'Rejected'|'Cancelled'
export type RfqStatus='Draft'|'Issued'|'Closed'|'Cancelled'
export type SupplierQuotationStatus='Received'|'Selected'|'Not Selected'|'Expired'|'Noncompliant'
export type PurchaseOrderStatus='Draft'|'Issued'|'Partially Received'|'Fully Received'|'Cancelled'|'Closed'
export type InvoiceStatus='Match'|'Exception'|'Reviewed'

export interface Branch{id:string;code:string;name:string;city:SaudiCity;region:SaudiRegion;active:boolean}
export interface Department{id:string;code:string;name:string;active:boolean}
export interface ProcurementActor{id:string;displayName:string;email:string;role:AuthorityRole;departmentId?:string;branchId?:string;approvalLimitSar?:number;active:boolean}
export interface Supplier{id:string;supplierCode:string;legalName:string;city:SaudiCity;region:SaudiRegion;categories:ProcurementCategory[];contactName:string;email:string;paymentTermsDays:number;leadTimeDays:number;status:'Active'|'Suspended'|'Inactive';createdAt:string;updatedAt:string}
export interface RequisitionLine{id:string;description:string;category:ProcurementCategory;quantity:number;unitOfMeasure:string;estimatedUnitCostSar:number;estimatedTotalSar:number;service:boolean}
export interface ApprovalDecision{id:string;approverId:string;role:Extract<AuthorityRole,'Department Manager'|'Procurement Manager'|'Finance Director'>;decision:'Approved'|'Rejected'|'Pending';submissionRound?:number;decidedAt?:string;comment?:string}
export interface PurchaseRequisition{id:string;requisitionNumber:string;branchId:string;departmentId:string;requesterId:string;requiredDate:string;justification:string;status:RequisitionStatus;lines:RequisitionLine[];estimatedTotalSar:number;approvals:ApprovalDecision[];submissionRound?:number;rejectionReason?:string;exceptionJustification?:string;submittedAt?:string;approvedAt?:string;createdAt:string;updatedAt:string}
export interface RequestForQuotation{id:string;rfqNumber:string;requisitionId:string;issueDate:string;closingDate:string;invitedSupplierIds:string[];status:RfqStatus;exceptionJustification?:string}
export interface SupplierQuotationLine{id:string;requisitionLineId:string;quantity:number;unitPriceSar:number;discountSar:number;promisedDeliveryDate:string;specificationCompliance:number}
export interface QuotationScore{price:number;delivery:number;paymentTerms:number;compliance:number;total:number}
export interface SupplierQuotation{id:string;quotationReference:string;rfqId:string;supplierId:string;receivedDate:string;validUntil:string;paymentTermsDays:number;status:SupplierQuotationStatus;lines:SupplierQuotationLine[];subtotalSar:number;discountSar:number;taxableAmountSar:number;vatAmountSar:number;totalSar:number;score:QuotationScore;selectionJustification?:string}
export interface PurchaseOrderLine{id:string;requisitionLineId:string;description:string;category:ProcurementCategory;quantity:number;unitPriceSar:number;discountSar:number;taxableAmountSar:number;vatAmountSar:number;totalSar:number;service:boolean}
export interface PurchaseOrder{id:string;poNumber:string;requisitionId:string;supplierQuotationId:string;supplierId:string;branchId:string;departmentId:string;issueDate:string;promisedDate:string;paymentTermsDays?:number;status:PurchaseOrderStatus;currency:'SAR';lines:PurchaseOrderLine[];subtotalSar:number;discountSar:number;taxableAmountSar:number;vatAmountSar:number;totalSar:number;createdAt:string;updatedAt:string}
export interface GoodsReceiptLine{id:string;purchaseOrderLineId:string;deliveredQuantity:number;acceptedQuantity:number;rejectedQuantity:number;returnedQuantity:number;rejectionReason?:string}
export interface GoodsReceipt{id:string;receiptNumber:string;purchaseOrderId:string;deliveryReference:string;receiptDate:string;receiverId:string;lines:GoodsReceiptLine[];createdAt:string}
export interface ServiceAcceptance{id:string;acceptanceNumber:string;purchaseOrderId:string;purchaseOrderLineId:string;acceptedValueSar:number;acceptanceDate:string;approverId:string;comment:string}
export interface SupplierInvoiceLine{id:string;purchaseOrderLineId:string;quantity:number;unitPriceSar:number;discountSar:number;taxableAmountSar:number;vatAmountSar:number;totalSar:number}
export interface MatchException{id:string;invoiceLineId?:string;type:'Quantity'|'Unit Price'|'VAT'|'Line Total'|'Document Total';expected:number;actual:number;absoluteVariance:number;percentageVariance?:number;severity:'Blocking'|'Warning';resolutionStatus:'Open'|'Reviewed';reviewComment?:string}
export interface SupplierInvoice{id:string;invoiceNumber:string;supplierId:string;purchaseOrderId:string;invoiceDate:string;status:InvoiceStatus;lines:SupplierInvoiceLine[];subtotalSar:number;discountSar:number;taxableAmountSar:number;vatAmountSar:number;totalSar:number;exceptions:MatchException[];createdAt:string;updatedAt:string}
export interface WorkspaceMetadata{dataClassification:'Synthetic demonstration data';companyScenario:'Fictional';currency:'SAR';schemaVersion:number;asOfDate:string;createdAt:string;updatedAt:string}
export interface ProcurementWorkspace{schemaVersion:number;branches:Branch[];departments:Department[];actors:ProcurementActor[];suppliers:Supplier[];requisitions:PurchaseRequisition[];rfqs:RequestForQuotation[];supplierQuotations:SupplierQuotation[];purchaseOrders:PurchaseOrder[];goodsReceipts:GoodsReceipt[];serviceAcceptances:ServiceAcceptance[];invoices:SupplierInvoice[];metadata:WorkspaceMetadata}
