<template>
    
    <h2 @click="showForm = !showForm" >[<span>Start a New Thread</span>]</h2>
    <form @submit.prevent="" v-if="showForm">
        <div class="inputs">
        <label for="subject">Subject</label>
        <input type="text" v-model="subject" required style="color: rgb(105, 199, 133);">
    </div>
        
    <div class="inputs">
        <label for="content">Content</label>
        <textarea v-model="content" cols="30" rows="10" class="inputs" required ></textarea>
    </div>

    <div class="inputs">
        <label for="image" id="forImage">Image</label>
        <input type="file" :modelValue="image" @input="onInput" id="sex" class="inputs">
    </div>
    
    <div class="inputs">
        <label for="password">Password</label>
        <input type="password" v-model="password" class="inputs" required>
    </div>
        
        <CustomButtonVue
        :props="buttonProps"
        >
            
        </CustomButtonVue>
    </form>
</template>
<style>
    input[type="file"]{
        cursor: pointer;
    }

    input, textarea{
        background-color: rgb(46, 46, 95);
    }

    h2{
        color: rgb(63, 63, 133);
        font-weight: bolder;
    }
    span{
        color: rgb(105, 199, 133);
        cursor: pointer;
    }

    span:hover{
        color: rgb(28, 209, 82); 
    }

    .inputs{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap:5px;
        margin-bottom: 5px;
        color: rgb(28, 209, 82);
    }

    .inputs input{
        width: 100%;
    }

    form{
        margin-bottom: 20px;
    }
</style>

<script lang="ts" setup>
    import CustomButtonVue from '@/components/CustomButton.vue';
    import type { ButtonProps, PostProps, postForm} from "@/types";
    import { ref, type Ref} from "vue";
    import useStore from '@/store';
    import { addPost, getPosts } from '@/api';

    const subject:Ref<string> = ref("");
    const store = useStore();
    const image:Ref<string> = ref("");
    const content:Ref<string> = ref("");
    const password:Ref<string> = ref("");
    const showForm:Ref<boolean> = ref(false);
    
    interface Props{
        props: postForm
    }


    function onInput(e:any) {
        image.value = e.target.value
    }

    const defProps = defineProps<Props>();

    async function sendData(posts:number,data:string, base64data:string) {

            const mojPost: PostProps = {
                id: `${posts}`,
                subject: subject.value,
                content: content.value,
                password: password.value,
                wichBoard: defProps.props.wichBoard,
                dateOfPost: data,
                image: `${base64data}`
            };
            await addPost(subject.value, content.value, password.value, data, defProps.props.wichBoard, `${base64data}`)
                .then(() => {
                    store.post = mojPost;
                    console.log(store.post)
                })
                .catch((Error)=>{
                    console.log(Error);
                })
    }

    console.log(defProps.props.wichBoard)
    async function sendForm() {
        let posts = (await getPosts()).length + 1;
        let date:Date = new Date();
        let data = `${date.getUTCDate()}/${date.getUTCDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        if(subject.value !== '' && content.value !== '' && password.value !== ''){
            var input = document.getElementById("sex") as HTMLInputElement || null;
            let file:File;
            let blob:Blob = new Blob();
            let base64data = '';
            const reader = new FileReader();
            if(input.files !== null && input.files[0] !== undefined){
                file = input.files[0];
                file?.arrayBuffer().then((arrayBuffer) => {
                    blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
                    console.log(blob);
                    reader.readAsDataURL(blob);
                    reader.onloadend = function() {
                        base64data = `${reader.result}`;
                        console.log(base64data);
                        sendData(posts,data,base64data)
                    }
                });
            }
            else{
                blob = new Blob();
                sendData(posts,data,base64data)
            }
        }
    }

    const buttonProps: Ref<ButtonProps> = ref<ButtonProps>({
        caption: 'Prześlij',
        action: () => sendForm(),
        icon: 'fa-solid fa-check',
        enabled: true,
        disabledAction: () => console.log("disabled"),
        type: "submit"
    });
</script>
