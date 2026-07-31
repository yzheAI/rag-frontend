import { defineStore } from "pinia"

export const useKnowledgeStore = defineStore(
"knowledge",
{
 state:()=>({
     kbName:"copper_based",
     files:[],
     sources:[]
 })
})