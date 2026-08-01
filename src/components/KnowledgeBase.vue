<script setup>

import {ref} from "vue"
import {useKnowledgeStore} from "@/stores/knowledge"
import {ElMessage} from "element-plus"

const store = useKnowledgeStore()

const kbInput = ref(
    store.kbName
)

function changeKnowledgeBase(){
    if(!kbInput.value){
          ElMessage.warning(
              "请输入知识库名称"
          )
          return
      }

    store.kbName = kbInput.value

    ElMessage.success(
        "知识库已切换"
    )

}

</script>

<template>
<el-card>

<h3>
当前知识库
</h3>


<el-input
    v-model="kbInput"
    placeholder="输入知识库名称"
    @keyup.enter="changeKnowledgeBase"
/>


</el-card>
</template>
