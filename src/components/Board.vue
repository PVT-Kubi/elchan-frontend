<template>
    <div class="Board" >
        <RouterLink :to="path ?? '/b/'"  @click="() => onClick()">
            {{msg}}
        </RouterLink>
    </div>
</template>

<style>
    .Board{
        text-decoration: none;
    }

    .Board a{
        text-decoration: none;
        color: rgb(28, 209, 82);
    }
</style>

<script lang="ts" setup>
    import { RouterLink, RouterView } from 'vue-router'
    import {getPostById} from '../api/index'

    const props = defineProps({
        msg: String,
        path: String
    })

    const onClick = () =>{
        console.log(getPostById(1))
    }
</script>