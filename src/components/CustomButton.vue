<template>
    <button class="buttonStyle" @click="() => onClick()" :type="props.type ?? 'button'">
        {{props.caption}}
    </button>
</template>

<style>
    .buttonStyle {
        /* background-color: rgb(28, 209, 82); */
        background-color:  rgb(46, 46, 95);
        color: rgb(105, 199, 133);
        border-radius: 20px;
        cursor: pointer;
    }

    .buttonStyle:hover{
        color: rgb(28, 209, 82); 
    }
</style>

<script lang="ts" setup>
    import type { ButtonProps } from '@/types';

    interface Props{
        props: ButtonProps
    }

    const defProps = defineProps<Props>();

    const onClick = () => {
        if(defProps.props.enabled) {
            defProps.props.action();
        }else{
            if(defProps.props.disabledAction !== undefined) 
                defProps.props.disabledAction();
        }
    }
</script>