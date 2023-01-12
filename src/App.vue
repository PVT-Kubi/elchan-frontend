<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BoardsVue from './components/Boards.vue';
</script>

<template>
  <div class="dix">
    <BoardsVue />
    <RouterView/> 
  </div>
</template>

<style>

  dix{
    display: flex;
    align-items: flex-start;
    justify-content: baseline;
  }
</style>

