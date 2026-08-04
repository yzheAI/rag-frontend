<script setup>
import {useRouter} from "vue-router"
import {ref} from "vue"
import {login} from "@/api/auth.js"
import {ElMessage} from "element-plus"

const router = useRouter()
const username=ref("")
const password=ref("")


async function submit(){
  try {
    const res =
        await login({

          username: username.value,
          password: password.value

        })


    localStorage.setItem(
        "token",
        res.data.access_token
    )


    ElMessage.success(
        "登录成功"
    )


    router.push("/")
  }catch (error){
    ElMessage.error(
        error.response?.data?.message || "登录失败"
    )
  }
}
</script>



<template>

<el-card>

<h2>
登录
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
@click="submit"
>
登录
</el-button>


</el-card>

  <el-button
text
@click="router.push('/register')"
>
没有账号？去注册
</el-button>

</template>