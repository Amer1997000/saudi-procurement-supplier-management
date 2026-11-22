import{cloneDemoWorkspace}from'../data/demoData'
import type{ProcurementWorkspace}from'../domain/models'

export const SCHEMA_VERSION=1
export const STORAGE_KEY='tawreed-procurement-workspace-v1'
export interface StorageLike{getItem(key:string):string|null;setItem(key:string,value:string):void;removeItem(key:string):void}
const collections=['branches','departments','actors','suppliers','requisitions','rfqs','supplierQuotations','purchaseOrders','goodsReceipts','serviceAcceptances','invoices'] as const
export function isWorkspace(value:unknown):value is ProcurementWorkspace{if(!value||typeof value!=='object')return false;const item=value as Partial<ProcurementWorkspace>,metadata=item.metadata as Partial<ProcurementWorkspace['metadata']>|undefined;return item.schemaVersion===SCHEMA_VERSION&&collections.every(key=>Array.isArray(item[key])&&item[key].every(record=>record&&typeof record==='object'&&typeof(record as{id?:unknown}).id==='string'))&&metadata?.schemaVersion===SCHEMA_VERSION&&metadata.dataClassification==='Synthetic demonstration data'&&metadata.companyScenario==='Fictional'&&metadata.currency==='SAR'&&typeof metadata.asOfDate==='string'}
export function saveWorkspace(storage:StorageLike,workspace:ProcurementWorkspace){storage.setItem(STORAGE_KEY,JSON.stringify(workspace))}
export function initializeWorkspace(storage:StorageLike):ProcurementWorkspace{const stored=storage.getItem(STORAGE_KEY);if(stored)try{const parsed:unknown=JSON.parse(stored);if(isWorkspace(parsed))return parsed}catch{/* replace malformed local data with safe synthetic fixture */}const workspace=cloneDemoWorkspace();saveWorkspace(storage,workspace);return workspace}
export function resetWorkspace(storage:StorageLike){storage.removeItem(STORAGE_KEY);return initializeWorkspace(storage)}
