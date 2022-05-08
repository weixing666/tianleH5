<template>
    <div class="app">
        <h1>hello vue2+vite</h1>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/test">test</router-link>
        <router-view />

        
    </div>
</template>

<script>
    export default {
        
    }
</script>
<style lang="scss">
    .App {
        ul {
            li {
                list-style: none;
            }
        }
    }
</style>

