<script setup>
import {useKnowledgeStore} from "@/stores/knowledge"


const store = useKnowledgeStore()

</script>

<template>

<el-card>

<h3>
参考来源
</h3>


<el-empty
v-if="store.sources.length===0"
description="暂无引用来源"
/>



<el-card
v-for="item in store.sources"
:key="item.chunk_id"
class="source-item"
shadow="hover"
>

  <div class="header">


<span>
📄 {{item.source}}
</span>

<el-tag type="success">

匹配度:
{{(item.score*100).toFixed(1)}}%

</el-tag>

</div>

<p>

{{item.content || "暂无文本内容"}}

</p>

</el-card>

  </el-card>

</template>

<style scoped>

.source-item{

margin-bottom:15px;

}


.header{

display:flex;

justify-content:space-between;

align-items:center;

font-weight:bold;

}


p{

line-height:1.6;

color:#666;

}


</style>