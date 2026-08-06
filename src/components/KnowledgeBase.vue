<script setup>

import {ref, onMounted} from "vue"
import {useKnowledgeStore} from "@/stores/knowledge"

import {
    getAllKnowledgeBases,
    createKnowledgeBase,
    deleteKnowledgeBase,
}
from "@/api/knowledgeBase"

import {ElMessage, ElMessageBox} from "element-plus"

const store = useKnowledgeStore()

const kbInput = ref(store.kbName)


// 获取列表
async function loadKB(){

    const res =
    await getAllKnowledgeBases()

    store.knowledgeBases =
        res.data.data

}

// 创建
async function createKB(){

    if(!kbInput.value)
        return


    try{

        const res =
        await createKnowledgeBase(
            kbInput.value
        )


        store.kbName =
            kbInput.value


        ElMessage.success(
            "创建成功"
        )


        await loadKB()


    }catch(error){

        console.error(error)

        ElMessage.error(
            "创建失败"
        )

    }

}



// 切换

function switchKB(name){

    store.kbName=name

    store.conversationId=null
    store.messages=[]


    ElMessage.success(
        "切换成功"
    )

}



// 删除

async function removeKB(name){


    await ElMessageBox.confirm(
        "删除后文档和索引都会删除",
        "确认删除"
    )


    await deleteKnowledgeBase(
        name
    )


    ElMessage.success(
        "删除成功"
    )


    await loadKB()

}

onMounted(()=>{
    loadKB()
})

</script>

<template>
<el-card>

<h3>
知识库管理
</h3>


<el-input
    v-model="kbInput"
    placeholder="输入知识库名称"
/>

  <el-button
type="primary"
@click="createKB"
>
创建
</el-button>



<h4>
知识库列表
</h4>


<el-table
:data="store.knowledgeBases"
>


<el-table-column
prop="name"
label="名称"
/>


<el-table-column
label="操作"
>


<template #default="scope">


<el-button
@click="switchKB(scope.row.name)"
>
切换
</el-button>


<el-button
type="danger"
@click="removeKB(scope.row.name)"
>
删除
</el-button>




</template>


</el-table-column>


</el-table>


</el-card>


</template>