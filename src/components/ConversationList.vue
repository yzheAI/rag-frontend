<script setup>

import {useKnowledgeStore} from "@/stores/knowledge"
import {
    getConversations,
    getMessages,
    deleteConversation
} from "@/api/chat"

import {onMounted, watch} from "vue"
import {ElMessageBox, ElMessage} from "element-plus"


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


async function removeConversation(item){

    try{

        await ElMessageBox.confirm(
            "删除后聊天记录无法恢复",
            "确认删除",
            {
                type:"warning"
            }
        )


        await deleteConversation(
            item.conversation_id
        )


        // 如果删除的是当前会话
        if(
            store.conversationId === item.conversation_id
        ){

            store.conversationId=null
            store.messages=[]
            store.sources=[]

        }


        await loadConversations()


        ElMessage.success(
            "删除成功"
        )


    }catch(error){

        if(error !== "cancel"){
            ElMessage.error(
                "删除失败"
            )
        }

    }

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


<div
    v-for="item in store.conversations"
    :key="item.conversation_id"
    style="width:100%;margin-bottom:10px"
    @click="selectConversation(item)"
>


    <el-button
        style="flex:1"
        @click="selectConversation(item)"
    >
        {{item.title || "新会话"}}
    </el-button>


    <el-button
        type="danger"
        size="small"
        @click="removeConversation(item)"
    >
        删除
    </el-button>


</div>


</el-card>



</template>