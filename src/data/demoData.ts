import type{ApprovalDecision,ProcurementWorkspace,PurchaseOrderLine,RequisitionLine,SupplierInvoiceLine,SupplierQuotationLine}from'../domain/models'
import{calculateDocument,calculateLine,calculateQuotationScore,VAT_RATE}from'../domain/rules'

const created='2026-10-01T08:00:00.000Z',updated='2026-11-17T08:00:00.000Z'
const approval=(id:string,approverId:string,role:ApprovalDecision['role'],decision:ApprovalDecision['decision'],decidedAt?:string):ApprovalDecision=>({id,approverId,role,decision,submissionRound:1,decidedAt})
const reqLine=(id:string,description:string,category:RequisitionLine['category'],quantity:number,cost:number,service=false):RequisitionLine=>({id,description,category,quantity,unitOfMeasure:service?'service':'unit',estimatedUnitCostSar:cost,estimatedTotalSar:quantity*cost,service})
const poLine=(id:string,requisitionLineId:string,description:string,category:PurchaseOrderLine['category'],quantity:number,price:number,discount=0,service=false):PurchaseOrderLine=>({id,requisitionLineId,description,category,quantity,unitPriceSar:price,...calculateLine(quantity,price,discount),service})
const quoteLine=(id:string,requisitionLineId:string,quantity:number,price:number,date:string,compliance=100,discount=0):SupplierQuotationLine=>({id,requisitionLineId,quantity,unitPriceSar:price,discountSar:discount,promisedDeliveryDate:date,specificationCompliance:compliance})
const invoiceLine=(id:string,poLineId:string,quantity:number,price:number,discount=0):SupplierInvoiceLine=>({id,purchaseOrderLineId:poLineId,quantity,unitPriceSar:price,...calculateLine(quantity,price,discount)})

const branches=[
 {id:'BR-RYD',code:'RYD',name:'Riyadh Headquarters',city:'Riyadh',region:'Central',active:true},
 {id:'BR-JED',code:'JED',name:'Jeddah Branch',city:'Jeddah',region:'Western',active:true},
 {id:'BR-DMM',code:'DMM',name:'Dammam Branch',city:'Dammam',region:'Eastern',active:true},
 {id:'BR-MED',code:'MED',name:'Madinah Branch',city:'Madinah',region:'Western',active:true},
 {id:'BR-AHB',code:'AHB',name:'Abha Branch',city:'Abha',region:'Southern',active:true},
] as ProcurementWorkspace['branches']
const departments=[['DEP-IT','IT','Information Technology'],['DEP-ADM','ADM','Administration'],['DEP-OPS','OPS','Operations'],['DEP-FAC','FAC','Facilities'],['DEP-PROC','PROC','Procurement'],['DEP-FIN','FIN','Finance']].map(([id,code,name])=>({id,code,name,active:true}))
const actors:ProcurementWorkspace['actors']=[
 {id:'USR-REQ-RYD',displayName:'Abeer Al-Salem',email:'abeer.alsalem@tawreed.invalid',role:'Requester',departmentId:'DEP-IT',branchId:'BR-RYD',active:true},
 {id:'USR-REQ-JED',displayName:'Faisal Al-Otaibi',email:'faisal.alotaibi@tawreed.invalid',role:'Requester',departmentId:'DEP-ADM',branchId:'BR-JED',active:true},
 {id:'USR-REQ-DMM',displayName:'Maha Al-Qahtani',email:'maha.alqahtani@tawreed.invalid',role:'Requester',departmentId:'DEP-OPS',branchId:'BR-DMM',active:true},
 {id:'USR-REQ-MED',displayName:'Nawaf Al-Harbi',email:'nawaf.alharbi@tawreed.invalid',role:'Requester',departmentId:'DEP-FAC',branchId:'BR-MED',active:true},
 {id:'USR-REQ-AHB',displayName:'Sara Al-Ghamdi',email:'sara.alghamdi@tawreed.invalid',role:'Requester',departmentId:'DEP-ADM',branchId:'BR-AHB',active:true},
 {id:'USR-DM',displayName:'Huda Al-Dossari',email:'huda.aldossari@tawreed.invalid',role:'Department Manager',approvalLimitSar:25000,active:true},
 {id:'USR-PM',displayName:'Omar Al-Zahrani',email:'omar.alzahrani@tawreed.invalid',role:'Procurement Manager',approvalLimitSar:100000,active:true},
 {id:'USR-FD',displayName:'Reem Al-Mutairi',email:'reem.almutairi@tawreed.invalid',role:'Finance Director',active:true},
 {id:'USR-REC',displayName:'Khalid Al-Nasser',email:'khalid.alnasser@tawreed.invalid',role:'Receiving Officer',active:true},
 {id:'USR-INV',displayName:'Lina Al-Rashid',email:'lina.alrashid@tawreed.invalid',role:'Invoice Reviewer',active:true},
]
const suppliers:ProcurementWorkspace['suppliers']=[
 {id:'SUP-001',supplierCode:'SUP-001',legalName:'Najd Digital Equipment Co.',city:'Riyadh',region:'Central',categories:['IT Equipment'],contactName:'Commercial Desk',email:'sales@najd-digital.invalid',paymentTermsDays:30,leadTimeDays:12,status:'Active',createdAt:created,updatedAt:updated},
 {id:'SUP-002',supplierCode:'SUP-002',legalName:'Red Sea Office Solutions',city:'Jeddah',region:'Western',categories:['Furniture','Office Supplies'],contactName:'Bid Office',email:'bids@redsea-office.invalid',paymentTermsDays:45,leadTimeDays:18,status:'Active',createdAt:created,updatedAt:updated},
 {id:'SUP-003',supplierCode:'SUP-003',legalName:'Eastern Workspace Industries',city:'Dammam',region:'Eastern',categories:['Furniture'],contactName:'Commercial Team',email:'quotes@eastern-workspace.invalid',paymentTermsDays:30,leadTimeDays:14,status:'Active',createdAt:created,updatedAt:updated},
 {id:'SUP-004',supplierCode:'SUP-004',legalName:'Madinah Business Furnishings',city:'Madinah',region:'Western',categories:['Furniture','Printing'],contactName:'Quotation Desk',email:'rfq@madinah-furnishings.invalid',paymentTermsDays:60,leadTimeDays:21,status:'Active',createdAt:created,updatedAt:updated},
 {id:'SUP-005',supplierCode:'SUP-005',legalName:'Asir Managed Services',city:'Abha',region:'Southern',categories:['Business Services','Facilities Services'],contactName:'Service Desk',email:'commercial@asir-services.invalid',paymentTermsDays:30,leadTimeDays:7,status:'Active',createdAt:created,updatedAt:updated},
]
const requisitions:ProcurementWorkspace['requisitions']=[
 {id:'REQ-001',requisitionNumber:'TBS-PR-2026-001',branchId:'BR-RYD',departmentId:'DEP-IT',requesterId:'USR-REQ-RYD',requiredDate:'2026-10-20',justification:'Replace end-of-life laptops for the support team.',status:'Approved',lines:[reqLine('RL-001','Business laptop package','IT Equipment',10,5000)],estimatedTotalSar:50000,approvals:[approval('APP-001','USR-DM','Department Manager','Approved','2026-10-02'),approval('APP-002','USR-PM','Procurement Manager','Approved','2026-10-03')],submittedAt:'2026-10-01',approvedAt:'2026-10-03',createdAt:created,updatedAt:updated},
 {id:'REQ-002',requisitionNumber:'TBS-PR-2026-002',branchId:'BR-AHB',departmentId:'DEP-FAC',requesterId:'USR-REQ-AHB',requiredDate:'2027-01-15',justification:'Branch workspace refurbishment and accessibility improvements.',status:'Submitted',lines:[reqLine('RL-002','Branch furniture and fit-out','Furniture',1,150000)],estimatedTotalSar:150000,approvals:[approval('APP-003','USR-DM','Department Manager','Approved','2026-11-10'),approval('APP-004','USR-PM','Procurement Manager','Approved','2026-11-11'),approval('APP-005','USR-FD','Finance Director','Pending')],submittedAt:'2026-11-09',createdAt:'2026-11-09T08:00:00.000Z',updatedAt:updated},
 {id:'REQ-003',requisitionNumber:'TBS-PR-2026-003',branchId:'BR-JED',departmentId:'DEP-ADM',requesterId:'USR-REQ-JED',requiredDate:'2026-11-05',justification:'Replace damaged meeting-room furniture.',status:'Approved',lines:[reqLine('RL-003','Meeting-room chair','Furniture',20,3000)],estimatedTotalSar:60000,approvals:[approval('APP-006','USR-DM','Department Manager','Approved','2026-10-05'),approval('APP-007','USR-PM','Procurement Manager','Approved','2026-10-06')],submittedAt:'2026-10-04',approvedAt:'2026-10-06',createdAt:'2026-10-04T08:00:00.000Z',updatedAt:updated},
 {id:'REQ-004',requisitionNumber:'TBS-PR-2026-004',branchId:'BR-DMM',departmentId:'DEP-OPS',requesterId:'USR-REQ-DMM',requiredDate:'2026-12-01',justification:'Annual managed infrastructure support.',status:'Approved',lines:[reqLine('RL-004','Managed infrastructure support','Business Services',1,120000,true)],estimatedTotalSar:120000,approvals:[approval('APP-008','USR-DM','Department Manager','Approved','2026-09-20'),approval('APP-009','USR-PM','Procurement Manager','Approved','2026-09-21'),approval('APP-010','USR-FD','Finance Director','Approved','2026-09-22')],submittedAt:'2026-09-19',approvedAt:'2026-09-22',createdAt:'2026-09-19T08:00:00.000Z',updatedAt:updated},
 {id:'REQ-005',requisitionNumber:'TBS-PR-2026-005',branchId:'BR-MED',departmentId:'DEP-ADM',requesterId:'USR-REQ-MED',requiredDate:'2026-12-10',justification:'Quarterly office stationery replenishment.',status:'Draft',lines:[reqLine('RL-005','Office stationery bundle','Office Supplies',25,800)],estimatedTotalSar:20000,approvals:[],createdAt:'2026-11-15T08:00:00.000Z',updatedAt:updated},
]
const rfqs:ProcurementWorkspace['rfqs']=[
 {id:'RFQ-001',rfqNumber:'TBS-RFQ-2026-001',requisitionId:'REQ-001',issueDate:'2026-10-04',closingDate:'2026-10-08',invitedSupplierIds:['SUP-001'],status:'Closed',exceptionJustification:'Specialized framework supplier used for a compatible standardized laptop package.'},
 {id:'RFQ-002',rfqNumber:'TBS-RFQ-2026-002',requisitionId:'REQ-003',issueDate:'2026-10-07',closingDate:'2026-10-12',invitedSupplierIds:['SUP-002','SUP-003','SUP-004'],status:'Closed'},
 {id:'RFQ-003',rfqNumber:'TBS-RFQ-2026-003',requisitionId:'REQ-004',issueDate:'2026-09-23',closingDate:'2026-09-28',invitedSupplierIds:['SUP-005'],status:'Closed',exceptionJustification:'Continuation of a documented specialist support service.'},
]
const q1Lines=[quoteLine('SQL-001','RL-001',10,5000,'2026-10-18')],q1Totals=calculateDocument(q1Lines)
const furnitureBids=[{id:'QUO-002',ref:'RSO-441',supplier:'SUP-002',price:3000,date:'2026-11-02',days:18,terms:45,status:'Selected' as const},{id:'QUO-003',ref:'EWI-228',supplier:'SUP-003',price:2850,date:'2026-10-29',days:14,terms:30,status:'Not Selected' as const},{id:'QUO-004',ref:'MBF-109',supplier:'SUP-004',price:3200,date:'2026-11-05',days:21,terms:60,status:'Not Selected' as const}]
const quotations:ProcurementWorkspace['supplierQuotations']=[
 {id:'QUO-001',quotationReference:'NDE-1008',rfqId:'RFQ-001',supplierId:'SUP-001',receivedDate:'2026-10-07',validUntil:'2026-11-07',paymentTermsDays:30,status:'Selected',lines:q1Lines,...q1Totals,score:calculateQuotationScore({bidTotal:50000,lowestEligibleBid:50000,deliveryDays:12,bestDeliveryDays:12,paymentTermsDays:30,bestPaymentTermsDays:30,compliancePercent:100}),selectionJustification:'Only eligible framework quotation under the documented exception.'},
 ...furnitureBids.map(b=>{const lines=[quoteLine(`SQL-${b.id.slice(-3)}`,'RL-003',20,b.price,b.date)],totals=calculateDocument(lines);return{id:b.id,quotationReference:b.ref,rfqId:'RFQ-002',supplierId:b.supplier,receivedDate:'2026-10-11',validUntil:'2026-11-30',paymentTermsDays:b.terms,status:b.status,lines,...totals,score:calculateQuotationScore({bidTotal:totals.taxableAmountSar,lowestEligibleBid:57000,deliveryDays:b.days,bestDeliveryDays:14,paymentTermsDays:b.terms,bestPaymentTermsDays:60,compliancePercent:100}),selectionJustification:b.status==='Selected'?'Selected for documented branch compatibility and commercial terms despite not being the lowest-priced eligible bid.':undefined}}),
 {id:'QUO-005',quotationReference:'AMS-SVC-77',rfqId:'RFQ-003',supplierId:'SUP-005',receivedDate:'2026-09-27',validUntil:'2026-10-31',paymentTermsDays:30,status:'Selected',lines:[quoteLine('SQL-005','RL-004',1,120000,'2026-10-01')],...calculateDocument([{quantity:1,unitPriceSar:120000,discountSar:0}]),score:calculateQuotationScore({bidTotal:120000,lowestEligibleBid:120000,deliveryDays:7,bestDeliveryDays:7,paymentTermsDays:30,bestPaymentTermsDays:30,compliancePercent:100}),selectionJustification:'Specialist service continuation under documented sourcing exception.'},
]
const po1Lines=[poLine('POL-001','RL-001','Business laptop package','IT Equipment',10,5000)],po2Lines=[poLine('POL-002','RL-003','Meeting-room chair','Furniture',20,3000)],po3Lines=[poLine('POL-003','RL-004','Managed infrastructure support','Business Services',1,120000,0,true)]
const purchaseOrders:ProcurementWorkspace['purchaseOrders']=[
 {id:'PO-001',poNumber:'TBS-PO-2026-001',requisitionId:'REQ-001',supplierQuotationId:'QUO-001',supplierId:'SUP-001',branchId:'BR-RYD',departmentId:'DEP-IT',issueDate:'2026-10-09',promisedDate:'2026-10-18',status:'Closed',currency:'SAR',lines:po1Lines,...calculateDocument(po1Lines),createdAt:'2026-10-09T08:00:00.000Z',updatedAt:updated},
 {id:'PO-002',poNumber:'TBS-PO-2026-002',requisitionId:'REQ-003',supplierQuotationId:'QUO-002',supplierId:'SUP-002',branchId:'BR-JED',departmentId:'DEP-ADM',issueDate:'2026-10-13',promisedDate:'2026-11-02',status:'Partially Received',currency:'SAR',lines:po2Lines,...calculateDocument(po2Lines),createdAt:'2026-10-13T08:00:00.000Z',updatedAt:updated},
 {id:'PO-003',poNumber:'TBS-PO-2026-003',requisitionId:'REQ-004',supplierQuotationId:'QUO-005',supplierId:'SUP-005',branchId:'BR-DMM',departmentId:'DEP-OPS',issueDate:'2026-09-29',promisedDate:'2026-10-01',status:'Fully Received',currency:'SAR',lines:po3Lines,...calculateDocument(po3Lines),createdAt:'2026-09-29T08:00:00.000Z',updatedAt:updated},
]
const goodsReceipts:ProcurementWorkspace['goodsReceipts']=[
 {id:'GR-001',receiptNumber:'TBS-GR-2026-001',purchaseOrderId:'PO-001',deliveryReference:'NDE-DN-1001',receiptDate:'2026-10-17',receiverId:'USR-REC',lines:[{id:'GRL-001',purchaseOrderLineId:'POL-001',deliveredQuantity:10,acceptedQuantity:10,rejectedQuantity:0,returnedQuantity:0}],createdAt:'2026-10-17T08:00:00.000Z'},
 {id:'GR-002',receiptNumber:'TBS-GR-2026-002',purchaseOrderId:'PO-002',deliveryReference:'RSO-DN-221',receiptDate:'2026-11-08',receiverId:'USR-REC',lines:[{id:'GRL-002',purchaseOrderLineId:'POL-002',deliveredQuantity:12,acceptedQuantity:10,rejectedQuantity:2,returnedQuantity:0,rejectionReason:'Two chairs arrived with damaged frames.'}],createdAt:'2026-11-08T08:00:00.000Z'},
]
const serviceAcceptances:ProcurementWorkspace['serviceAcceptances']=[{id:'SA-001',acceptanceNumber:'TBS-SA-2026-001',purchaseOrderId:'PO-003',purchaseOrderLineId:'POL-003',acceptedValueSar:120000,acceptanceDate:'2026-10-31',approverId:'USR-DM',comment:'October service milestone accepted for demonstration.'}]
const inv1Lines=[invoiceLine('IL-001','POL-001',10,5000)],inv1Totals=calculateDocument(inv1Lines)
const inv2Lines=[invoiceLine('IL-002','POL-002',12,3100)],inv2Totals=calculateDocument(inv2Lines)
const inv3Lines=[invoiceLine('IL-003','POL-003',1,120000)],inv3Totals=calculateDocument(inv3Lines)
const invoices:ProcurementWorkspace['invoices']=[
 {id:'INV-001',invoiceNumber:'NDE-INV-8801',supplierId:'SUP-001',purchaseOrderId:'PO-001',invoiceDate:'2026-10-18',status:'Match',lines:inv1Lines,...inv1Totals,exceptions:[],createdAt:'2026-10-18T08:00:00.000Z',updatedAt:updated},
 {id:'INV-002',invoiceNumber:'RSO-INV-5510',supplierId:'SUP-002',purchaseOrderId:'PO-002',invoiceDate:'2026-11-10',status:'Exception',lines:inv2Lines,...inv2Totals,exceptions:[{id:'EX-001',invoiceLineId:'IL-002',type:'Quantity',expected:10,actual:12,absoluteVariance:2,percentageVariance:20,severity:'Blocking',resolutionStatus:'Open'},{id:'EX-002',invoiceLineId:'IL-002',type:'Unit Price',expected:3000,actual:3100,absoluteVariance:100,percentageVariance:3.33,severity:'Blocking',resolutionStatus:'Open'}],createdAt:'2026-11-10T08:00:00.000Z',updatedAt:updated},
 {id:'INV-003',invoiceNumber:'AMS-INV-310',supplierId:'SUP-005',purchaseOrderId:'PO-003',invoiceDate:'2026-11-01',status:'Match',lines:inv3Lines,...inv3Totals,exceptions:[],createdAt:'2026-11-01T08:00:00.000Z',updatedAt:updated},
]

export const demoWorkspace:ProcurementWorkspace={schemaVersion:1,branches,departments,actors,suppliers,requisitions,rfqs,supplierQuotations:quotations,purchaseOrders,goodsReceipts,serviceAcceptances,invoices,metadata:{dataClassification:'Synthetic demonstration data',companyScenario:'Fictional',currency:'SAR',schemaVersion:1,asOfDate:'2026-11-17',createdAt:created,updatedAt:updated}}
export const cloneDemoWorkspace=():ProcurementWorkspace=>structuredClone(demoWorkspace)
export const DEMONSTRATION_VAT_RATE=VAT_RATE
