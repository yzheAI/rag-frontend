<script setup>

import {onMounted,onUnmounted} from "vue"
import {useKnowledgeStore} from "@/stores/knowledge"
import {getTasks} from "@/api/task"


const store = useKnowledgeStore()


async function loadTasks(){

    const res =
    await getTasks()

    console.log(res.data)

    store.tasks=res.data.data

}


let timer=null


onMounted(()=>{

    loadTasks()

    timer=setInterval(
        loadTasks,
        3000
    )

})


onUnmounted(()=>{

    clearInterval(timer)

})


</script>


<template>

<el-card>

<h3>
任务状态
</h3>


<el-table
:data="store.tasks"
>


<el-table-column
prop="filename"
label="文件"
/>


<el-table-column
prop="status"
label="状态"
/>


</el-table>


</el-card>


</template>