<script setup>

import {ref} from "vue"
import {register} from "@/api/auth.js"
import {ElMessage} from "element-plus"
import {useRouter} from "vue-router"


const router = useRouter()

const username = ref("")
const password = ref("")


async function submit(){

    try{

        await register({

            username: username.value,
            password: password.value

        })


        ElMessage.success(
            "注册成功，请登录"
        )


        router.push("/login")


    }catch(error){

        ElMessage.error(
            error.response?.data?.message || "注册失败"
        )

    }

}


</script>


<template>

<el-card>

<h2>
注册
</h2>


<el-input
v-model="username"
placeholder="用户名"
/>


<el-input
v-model="password"
type="password"
placeholder="密码"
/>


<el-button
type="primary"
@click="submit"
>
注册
</el-button>


</el-card>

</template>