<script setup>

import {useKnowledgeStore} from "@/stores/knowledge"


const store = useKnowledgeStore()


</script>

<template>
<el-card>

<h3>
当前知识库
</h3>


<el-input
v-model="store.kbName"
/>


</el-card>
</template>

<style scoped>

</style>