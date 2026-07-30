<script setup>

import { ref, onMounted } from "vue"
import axios from "axios"


const kbName = ref("copper_based")

const file = ref(null)

const files = ref([])

const query = ref("")

const messages = ref([])

const loading = ref(false)


// 选中第一个文件存入响应式变量
function chooseFile(e){

    file.value = e.target.files[0]

}


// 将选中文件和当前知识库名称 提交后端接口
async function upload(){

    if(!file.value){
        alert("请选择文件")
        return
    }


    const formData = new FormData()
    // 追加文件字段，后端接收参数字段为 file
    formData.append(
        "file",
        file.value
    )


    formData.append(
        "kb_name",
        kbName.value
    )

    // 发起 POST 请求
    await axios.post(
        "http://127.0.0.1:8000/files/",
        formData
    )


    alert("上传成功")
    // 上传完成后，重新拉取文档列表，刷新页面表格
    await getFiles()

}





async function getFiles(){
    // GET请求，通过url传参kb_name筛选知识库
    const res = await axios.get(
        "http://127.0.0.1:8000/files/files_message",
        {
            params:{
                kb_name:kbName.value
            }
        }
    )


    files.value = res.data.data.files

}




async function deleteFile(id){
    // 发出delete请求，id拼接在url路径上
    await axios.delete(
        `http://127.0.0.1:8000/files/${id}`,
        {
            params:{
                kb_name:kbName.value
            }
        }
    )
    // 删除后刷新列表
    await getFiles()

}



async function chat(){

    if(!query.value)
        return

    // 保存用户输入的问题文本
    const userQuestion=query.value

    // 用户输入聊天记录
    messages.value.push({
        role:"user",
        content:userQuestion
    })

    // 清空输入框
    query.value=""
    // 开启加载状态，锁定发送接口
    loading.value=true

    // 预先创建AI消息对象，后续不断追加文本
    const aiMessage={
        role:"assistant",
        content:""
    }
    messages.value.push(aiMessage)

    // // 调用后端流式对话接口
    const response = await fetch(
        "http://127.0.0.1:8000/chat/chat/stream",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({

                query:userQuestion,

                kb_name:kbName.value

            })
        }
    )

    // 获取响应流读取器，分片读取后端持续推送的数据块
    const reader = response.body.getReader()


    while(true){

        const {
            done,
            value
        } = await reader.read()


        if(done)
            break


        aiMessage.content +=
            new TextDecoder()
            .decode(value)

    }


    loading.value=false

}


/**
 * Vue生命周期钩子：组件页面渲染完成立刻执行
 * 页面打开自动加载当前知识库文档列表
 */
onMounted(()=>{
    getFiles()
})


</script>



<template>


<div class="container">


<h1>
AI知识库助手
</h1>



<el-card>

<h3>
当前知识库
</h3>


<el-input
v-model="kbName"
@change="getFiles"
/>


</el-card>




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
>
上传
</el-button>


</el-card>




<el-card>

<h3>
文件列表
</h3>


<el-table
:data="files"
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





<el-card>


<h3>
智能问答
</h3>



<div class="chat-box">


<div
v-for="(msg,index) in messages"
:key="index"
:class="['message', msg.role]"
>


<b>
{{msg.role==="user"?"用户":"AI"}}
</b>


<p>
{{msg.content}}
</p>


</div>


</div>




<el-input
v-model="query"
placeholder="请输入问题"
@keyup.enter="chat"
/>



<el-button
type="success"
@click="chat"
:loading="loading"
>
发送
</el-button>



</el-card>


</div>


</template>




<style scoped>


.container{

width:900px;

margin:40px auto;

}


.el-card{

margin-bottom:20px;

}


.chat-box{

max-height:400px;

overflow:auto;

margin-bottom:20px;

}



.message{

max-width:70%;

padding:12px 16px;

margin:10px;

border-radius:12px;

}


.user{

margin-left:auto;

background:#409eff;

color:white;

}



.assistant{

margin-right:auto;

background:#f5f5f5;

}



</style>