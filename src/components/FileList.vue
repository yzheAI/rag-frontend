<script setup>
import {getFileList} from "@/api/file"
import {onMounted, watch} from "vue"
import {useKnowledgeStore} from "@/stores/knowledge"
import axios from "axios"
import { ElMessageBox, ElMessage } from "element-plus"

const store = useKnowledgeStore()


async function getFiles(){
    // GET请求，通过url传参kb_name筛选知识库
    const res = await getFileList(store.kbName)

    store.files = res.data.data.files

}


onMounted(()=>{
    getFiles()
})

watch(
    ()=>store.kbName,
    ()=>{
        getFiles()
    }
)


async function deleteFile(id){
  try {

    await ElMessageBox.confirm(
        "确定删除这个文件吗？",
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
    )

    // 发出delete请求，id拼接在url路径上
    await axios.delete(
        `http://127.0.0.1:8000/files/${id}`,
        {
          params: {
            kb_name: store.kbName
          }
        }
    )
    // 删除后刷新列表
    await getFiles()
  }catch(error){

        // 用户点击取消时不处理

        if(error !== "cancel"){
            ElMessage.error("删除失败")
        }

    }


}


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