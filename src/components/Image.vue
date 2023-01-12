<template>
    <div class="image">
        <img v-if ="wichImage == 0" src="../assets/Bane.png" alt="imag">
        <img v-if ="wichImage == 1" src="../assets/madteuszek_demot.jpg" alt="imag"/>
        <img v-if ="wichImage == 2" src="../assets/PlakatWyborczy2.jpg" alt="imag"/>
        <img v-if ="wichImage == 3" src="../assets/templateMeme2.jpg" alt="imag"/>
        <img v-if ="wichImage == 4" src="../assets/FB_IMG_1603628577660.jpg" alt="imag"/>
        <img v-if ="wichImage == 5" src="../assets/bułeczka2.gif" alt="imag"/>
        <img v-if ="wichImage == 6" src="../assets/memeZKeb00seEz.gif" alt="imag"/>
    </div>
</template>
<style>
 .image{
    width: 400px;
    display: flex;
    justify-content: center;
    height: fit-content;
  }

  img{
    max-width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<script lang="ts" setup>
import { ref, type Ref} from "vue";

const p:Ref<string> = ref("");


function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}

let wichImage = getRandomInt(7)

</script>

