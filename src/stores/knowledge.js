import { defineStore } from "pinia"

export const useKnowledgeStore = defineStore(
"knowledge",
{
 state:()=>({
     kbName:"copper_based",

     knowledgeBases:[],
     files:[],
     sources:[],
     messages:[],
     tasks:[],

     conversationId:null,
     conversations:[]
 })
})