<script setup>
import { useKnowledgeStore } from "@/stores/knowledge"
import {ref, computed} from "vue";
import { ElMessage } from "element-plus"
import {createConversation, getConversations} from "@/api/chat";

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
            "Content-Type": "application/json",
            "Authorization":
            `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({

            query: userQuestion,

            kb_name: store.kbName,

            conversation_id:
              store.conversationId

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

    let buffer = ""

    const decoder = new TextDecoder()


    const aiIndex =
        store.messages.length - 1

    while (true) {

      const {
        done,
        value
      } = await reader.read()


      if (done)
        break


       buffer += decoder.decode(value)

      const events = buffer.split("\n\n")

      buffer = events.pop()


      for (const event of events) {

        if (!event.trim())
          continue

        if(event.startsWith("event: conversation")){


          const json =
              event.split("data: ")[1]


          const data =
              JSON.parse(json)


          store.conversationId =
              data.conversation_id

        }


        if (event.startsWith("event: source")) {

          const json =
              event.split("data: ")[1]


          store.sources =
              JSON.parse(json)

        }


        if (event.startsWith("event: message")) {


          const token =
              event.split("data: ")[1]


          store.messages[aiIndex].content += token

        }

      }
    }
  }catch(error){


        console.error(
            "聊天失败:",
            error
        )


        store.messages[aiIndex].content = "抱歉，服务暂时不可用，请稍后再试。"



    }finally{


        loading.value=false


    }

}

async function newConversation(){

    const res =
        await createConversation(
            store.kbName
        )


    store.conversationId =
        res.data.conversation_id


    store.messages=[]
    store.sources=[]

  const conversations =
        await getConversations(
            store.kbName
        )


    store.conversations =
        conversations.data


    ElMessage.success(
        "新会话创建成功"
    )

}

function clearChat(){
  store.messages=[]
  store.sources=[]
  store.conversationId=null

  ElMessage.success(
      "已创建新对话"
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
type="primary"
@click="newConversation"
>
新建会话
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