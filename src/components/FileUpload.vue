<script setup>
import axios from "axios";
import {ref} from "vue";
import {useKnowledgeStore} from "@/stores/knowledge";
import {getFileList} from "@/api/file"
import {ElMessage} from "element-plus";
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
    // 追加文件字段，后端接收参数字段为 file
    formData.append(
        "file",
        file.value
    )


    formData.append(
        "kb_name",
        store.kbName
    )

    // 发起 POST 请求
    await axios.post(
        "http://127.0.0.1:8000/files/",
        formData
    )


    alert("上传成功")
    // 上传完成后，重新拉取文档列表，刷新页面表格
    const res = await getFileList(store.kbName)


    store.files = res.data.data.files
  }catch(error){

        ElMessage.error("上传失败")

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