import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 导入ElementPlus的样式CSS（必须导入，否则组件没有样式）
import './style.css' // 导入全局自定义样式文件
import App from './App.vue'

// 创建Vue应用实例，传入根组件App
const app = createApp(App)

// 创建Vue应用实例，传入根组件App
app.use(ElementPlus)

app.mount('#app')
