<script setup>
import {useKnowledgeStore} from "@/stores/knowledge"


const store = useKnowledgeStore()

</script>

<template>
<el-card>

<h3>
参考来源
</h3>


<div
v-for="item in store.sources"
:key="item.chunk_id"
>

文件:
{{item.source}}

<br>

相关度:
{{item.score.toFixed(3)}}


</div>


</el-card>
</template>

<style scoped>

</style>