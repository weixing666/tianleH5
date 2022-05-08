<template>
    <div>
        <h1>Test</h1>
        <h3>{{ username }}</h3>
        <h3>count: {{ $store.state.count }}</h3>
        <button @click="changeName">changeName</button>
        <button @click="add">addCount</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username: '小白'
            }
        },
        methods: {
            changeName(){
                this.username = '小黑'
            },
            add(){
                this.$store.commit('addCount',10)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>