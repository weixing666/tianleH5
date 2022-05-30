<template>
    <div>
        <button @click="handleClick">button 获取用户</button>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        methods:{
            async handleClick(){
                // 代理 /myapi/users  最终地址会被合并成:   http://localhost:4000/users
                let {data} = await axios.get('/myapi/users')
                console.log(data)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>