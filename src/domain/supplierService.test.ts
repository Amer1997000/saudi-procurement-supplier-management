import{describe,expect,it}from'vitest'
import{cloneDemoWorkspace}from'../data/demoData'
import{createSupplier,deleteSupplier,findSupplierDuplicates,supplierHasTransactions,updateSupplier,type SupplierInput}from'./supplierService'
const options={id:()=> 'NEW',now:()=> '2026-11-18T09:00:00.000Z'},input:SupplierInput={legalName:'Synthetic Test Supply Co.',city:'Riyadh',categories:['Office Supplies'],contactName:'Demo Desk',email:'desk@test-supply.invalid',paymentTermsDays:30,leadTimeDays:5,status:'Active'}
describe('supplier service',()=>{
 it('creates, edits and deletes an unlinked supplier',()=>{let ws=createSupplier(cloneDemoWorkspace(),input,options),id=ws.suppliers.at(-1)!.id;ws=updateSupplier(ws,id,{...input,status:'Inactive'},options);expect(ws.suppliers.at(-1)?.status).toBe('Inactive');ws=deleteSupplier(ws,id,options);expect(ws.suppliers.some(s=>s.id===id)).toBe(false)})
 it('warns on matching normalized name and city',()=>expect(findSupplierDuplicates(cloneDemoWorkspace(),{...input,legalName:'  Najd Digital Equipment Co.  '})).toHaveLength(1))
 it('protects suppliers with transaction history',()=>{const ws=cloneDemoWorkspace();expect(supplierHasTransactions(ws,'SUP-001')).toBe(true);expect(()=>deleteSupplier(ws,'SUP-001',options)).toThrow('procurement history')})
 it('requires fictional invalid-domain email addresses',()=>expect(()=>createSupplier(cloneDemoWorkspace(),{...input,email:'real@example.com'},options)).toThrow('validation'))
})
