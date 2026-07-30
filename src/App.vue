<script setup>

import { ref } from "vue"
import axios from "axios"


const kbName = ref("copper_based")

const file = ref(null)

const query = ref("")

const answer = ref("")


function chooseFile(e){
    file.value = e.target.files[0]
}



async function upload(){

    const formData = new FormData()

    formData.append(
        "file",
        file.value
    )

    formData.append(
        "kb_name",
        kbName.value
    )


    await axios.post(
        "http://127.0.0.1:8000/files/",
        formData
    )


    alert("上传成功")

}




async function chat(){

    answer.value=""
    // 请求后端流式接口, fetch:流式输出
    const response = await fetch(
        "http://127.0.0.1:8000/chat/chat/stream",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query:query.value,
                kb_name:kbName.value
            })
        }
    )


    const reader = response.body.getReader()

    while(true){

        const {
            done,
            value
        } = await reader.read()


        if(done){
            break
        }


        answer.value +=
            new TextDecoder().decode(value)

    }

}


</script>


<template>

<div class="container">


<h1>
AI知识库助手
</h1>


<el-card>

<h3>
知识库
</h3>


<el-input
    v-model="kbName"
/>


</el-card>



<el-card>

<h3>
上传文件
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
智能问答
</h3>


<el-input
    v-model="query"
    placeholder="请输入问题"
/>


<el-button
type="success"
@click="chat"
>
发送
</el-button>



<h3>
回答:
</h3>


<div class="answer">

{{answer}}

</div>


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


.answer{

    min-height:100px;
    padding:20px;
    background:#f5f5f5;

}

</style>