<script setup>

import {useKnowledgeStore} from "@/stores/knowledge"
import {
    getConversations,
    getMessages
} from "@/api/chat"

import {onMounted, watch} from "vue"


const store =
    useKnowledgeStore()



async function loadConversations(){

    const res =
        await getConversations(
            store.kbName
        )

    store.conversations =
        res.data

}



async function selectConversation(item){

    store.conversationId=item.conversation_id


    const res =
        await getMessages(item.conversation_id)


    store.messages=res.data

}



onMounted(()=>{

    loadConversations()

})

// 新增
watch(
    ()=>store.kbName,
    ()=>{

        loadConversations()

    }
)

</script>


<template>


<el-card>


<h3>
历史对话
</h3>


<el-button
    v-for="item in store.conversations"
    :key="item.conversation_id"
    style="width:100%;margin-bottom:10px"
    @click="selectConversation(item)"
>
    {{item.title || "新会话"}}
</el-button>


</el-card>


</template>