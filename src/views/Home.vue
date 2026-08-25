<script setup>

import KnowledgeBase from "@/components/KnowledgeBase.vue"
import FileUpload from "@/components/FileUpload.vue"
import FileList from "@/components/FileList.vue"
import ChatBox from "@/components/ChatBox.vue"
import SourceList from "@/components/SourceList.vue"
import ConversationList from "@/components/ConversationList.vue"
import TaskList from "@/components/TaskList.vue"


</script>



<template>


<div class="page">


<h1 class="title">
AI知识库助手
</h1>


<KnowledgeBase />


<el-row :gutter="20">


    <!-- 左侧文件管理 -->
    <el-col :span="6">


        <FileUpload />

        <TaskList/>

        <FileList />


    </el-col>


    <el-col :span="4">

      <ConversationList />

    </el-col>



    <!-- 右侧问答 -->
    <el-col :span="14">


        <ChatBox />


        <SourceList />


    </el-col>


</el-row>

</div>



</template>




<style scoped>


.page{

    width:1200px;

    margin:40px auto;

}



.title{

    text-align:center;

    margin-bottom:30px;

}



</style>