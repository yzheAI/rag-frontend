<script setup>
import {getFileList} from "@/api/file"
import {ref,onMounted} from "vue"
import {useKnowledgeStore} from "@/stores/knowledge"
import axios from "axios"

const store = useKnowledgeStore()


async function getFiles(){
    // GET请求，通过url传参kb_name筛选知识库
    const res =
    await getFileList(store.kbName)


    store.files =
    res.data.data.files

}


async function deleteFile(id){
    // 发出delete请求，id拼接在url路径上
    await axios.delete(
        `http://127.0.0.1:8000/files/${id}`,
        {
            params:{
                kb_name:store.kbName
            }
        }
    )
    // 删除后刷新列表
    await getFiles()

}

onMounted(()=>{
    getFiles()
})

</script>

<template>
<el-card>

<h3>
文件列表
</h3>


<el-table
:data="store.files"
>


<el-table-column
prop="filename"
label="文件"
/>


<el-table-column
label="操作"
>


<template #default="scope">


<el-button
type="danger"
size="small"
@click="deleteFile(scope.row.doc_id)"
>
删除
</el-button>


</template>


</el-table-column>


</el-table>



</el-card>
</template>

<style scoped>

</style>