<script setup>
import request from "@/api/request"
import {ref} from "vue"
import {useKnowledgeStore} from "@/stores/knowledge"
import {getFileList} from "@/api/file"
import {ElMessage} from "element-plus"
const store=useKnowledgeStore()
const file = ref(null)
const uploading = ref(false)
const documentType = ref('')


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

    formData.append(
        'document_type',
        documentType.value
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
<el-form-item label="文档类型">
  <el-select
    v-model="documentType"
    placeholder="请选择文档类型"
  >
    <el-option label="设备手册" value="equipment" />
    <el-option label="操作手册" value="operation" />
    <el-option label="诊断手册" value="diagnosis" />
    <el-option label="调试手册" value="commissioning" />
    <el-option label="编程手册" value="programming" />
    <el-option label="参数手册" value="parameter" />
    <el-option label="功能手册" value="function" />
    <el-option label="安全手册" value="safety" />
    <el-option label="安装手册" value="installation" />
  </el-select>
</el-form-item>


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