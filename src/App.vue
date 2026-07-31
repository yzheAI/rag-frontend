<script setup>

import KnowledgeBase from "./components/KnowledgeBase.vue";
import FileUpload from "./components/FileUpload.vue";
import FileList from "./components/FileList.vue";
import ChatBox from "./components/ChatBox.vue";
import SourceList from "./components/SourceList.vue";


</script>



<template>


<div class="container">


<h1>
AI知识库助手
</h1>


<KnowledgeBase />


<FileUpload />


<FileList />


<SourceList />


<ChatBox />


</div>



</template>




<style scoped>


.container{

width:900px;

margin:40px auto;

}


</style>