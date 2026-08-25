<script setup>
import request from "@/api/request"
import {ref} from "vue"
import {useKnowledgeStore} from "@/stores/knowledge"
import {getFileList} from "@/api/file"
import {ElMessage} from "element-plus"
const store=useKnowledgeStore()
const file = ref(null)
const uploading = ref(false)


function chooseFile(e){

    file.value = e.target.files[0]

}


// 将选中文件和当前知识库名称 提交后端接口
async function upload(){

    if(!file.value){
        alert("请选择文件")
        return
    }

    uploading.value=true
  try {

    const formData = new FormData()

    formData.append(
        "file",
        file.value
    )

    formData.append(
        "kb_name",
        store.kbName
    )


    await request.post(
        "/files/",
        formData
    )


    ElMessage.success(
        "文件已提交处理"
    )


}catch(error){

    console.error(error)

    ElMessage.error(
        error.response?.data?.detail
        || "上传失败"
    )

}finally{

    uploading.value=false

}

}
</script>

<template>
<el-card>

<h3>
上传文档
</h3>


<input
type="file"
@change="chooseFile"
/>


<el-button
type="primary"
@click="upload"
:loading="uploading"
>
上传
</el-button>


</el-card>

</template>

<style scoped>

</style>