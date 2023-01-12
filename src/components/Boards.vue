<script lang="ts" setup>
    import { ref } from 'vue'
    import BoardVue from './Board.vue'

    const programista = ref("pro");
    const informatyk = ref("inf");
    const elektronik = ref("elek");
    const automatyk = ref("aut");
    const dzwiekowiec = ref("dz");
    const general = ref("b");
    
    const pathGeneral = ref("/b/");
    const pathPro = ref("/pro/");
    const pathElek = ref("/elek/");
    const pathAut = ref("/aut/");
    const pathDz = ref("/dz/");
    const pathInf = ref("/inf/");
</script>

<template>
    <div class="boardsDesk">
        <div class="boards">
            <BoardVue :msg = "general" :path="pathGeneral"/>
            <BoardVue :msg = "programista" :path="pathPro"/>
            <BoardVue :msg = "informatyk" :path="pathInf"/>
            <BoardVue :msg = "elektronik" :path="pathElek"/>
            <BoardVue :msg = "automatyk" :path="pathAut"/>
            <BoardVue :msg = "dzwiekowiec" :path="pathDz"/>
        </div>

    </div>
</template>

<style>
    .boardsDesk{
        width: 100%;
        height: 50px;
        background-color: rgb(46, 46, 95);
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .boards {
        margin-left: 5%;
        display: flex;
        justify-content: baseline;
        
        gap: 5%;
        align-items: center;
        width: 50%;
    }
</style>