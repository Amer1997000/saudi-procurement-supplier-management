import{describe,expect,it}from'vitest'
import{initializeWorkspace,resetWorkspace,saveWorkspace,STORAGE_KEY,type StorageLike}from'./workspaceStorage'
class MemoryStorage implements StorageLike{values=new Map<string,string>();getItem(k:string){return this.values.get(k)??null}setItem(k:string,v:string){this.values.set(k,v)}removeItem(k:string){this.values.delete(k)}}
describe('versioned local storage',()=>{
 it('initializes and persists a safe synthetic workspace',()=>{const storage=new MemoryStorage(),workspace=initializeWorkspace(storage);expect(workspace.schemaVersion).toBe(1);expect(storage.getItem(STORAGE_KEY)).not.toBeNull();workspace.metadata.updatedAt='changed';saveWorkspace(storage,workspace);expect(initializeWorkspace(storage).metadata.updatedAt).toBe('changed')})
 it('recovers malformed, incompatible and incomplete data',()=>{const storage=new MemoryStorage();for(const value of['{broken',JSON.stringify({schemaVersion:9}),JSON.stringify({schemaVersion:1,branches:[]})]){storage.setItem(STORAGE_KEY,value);expect(initializeWorkspace(storage).requisitions).toHaveLength(5)}})
 it('resets to an independent demonstration copy',()=>{const storage=new MemoryStorage(),workspace=initializeWorkspace(storage);workspace.requisitions.pop();saveWorkspace(storage,workspace);expect(resetWorkspace(storage).requisitions).toHaveLength(5)})
})
