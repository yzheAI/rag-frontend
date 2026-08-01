<script setup>
import { useKnowledgeStore } from "@/stores/knowledge"
import {ref, computed} from "vue";
import { ElMessage } from "element-plus"
const store=useKnowledgeStore()


const query = ref("")
const loading = ref(false)
const messages = computed(
()=>store.messages
)


async function chat(){

    if(!query.value)
        return

    // 保存用户输入的问题文本
    const userQuestion = query.value

    // 用户输入聊天记录
    store.messages.push({
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
    store.messages.push(aiMessage)
  try {
    // 调用后端流式对话接口
    const response = await fetch(
        "http://127.0.0.1:8000/chat/chat/stream",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            query: userQuestion,

            kb_name: store.kbName

          })
        }
    )
    if (!response.ok) {

      throw new Error(
          "服务器响应异常"
      )

    }


    // 获取响应流读取器，分片读取后端持续推送的数据块
    const reader = response.body.getReader()


    while (true) {

      const {
        done,
        value
      } = await reader.read()


      if (done)
        break


      const text =
          new TextDecoder()
              .decode(value)

      const events = text.split("\n\n")


      for (const event of events) {

        if (!event.trim())
          continue


        if (event.startsWith("event: source")) {

          const json =
              event.split("data: ")[1]


          store.sources =
              JSON.parse(json)

        }


        if (event.startsWith("event: message")) {


          const token =
              event.split("data: ")[1]


          aiMessage.content += token

        }

      }
    }
  }catch(error){


        console.error(
            "聊天失败:",
            error
        )


        aiMessage.content =
            "抱歉，服务暂时不可用，请稍后再试。"



    }finally{


        loading.value=false


    }

}

function clearChat(){
  store.messages=[]
  store.sources=[]

  ElMessage.success(
      "对话已清空"
  )

}

</script>

<template>
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

<el-button
type="danger"
@click="clearChat"
>
清空对话
</el-button>

</el-card>
</template>

<style scoped>
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