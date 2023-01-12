<template>
    <div class="allinall">
        <h2 @click="showForm = !showForm"  v-if="props.showH2">[<span>Post a reply</span>]</h2>
        <form @submit.prevent="" v-if="showForm">
        <div class="inputs">
            <label for="content">Content</label>
            <textarea v-model="content" cols="30" rows="10" class="inputs" required>{{ content }}</textarea>
        </div>

        <div class="inputs">
            <label for="image">Image</label>
            <input type="file" :modelValue="image" @input="onInput" id="sexxxx" class="inputs">
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
    </div>
</template>
<style>

    .allinall{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
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
    import type { ButtonProps, PostProps, CommentProps, commentForm} from "@/types";
    import { ref, type Ref } from "vue";
    import useStore from '@/store';
    import { addComment, getPosts } from '@/api';
  

    const store = useStore();
    const content:Ref<string> = ref("");
    const password:Ref<string> = ref("");
    const image:Ref<string> = ref("");
    
    
    interface Props{
        props: commentForm
    }

    function onInput(e:any) {
        image.value = e.target.value
    }

    const defProps = defineProps<Props>();
    const showForm:Ref<boolean> = ref(defProps.props.showForm);

    if(defProps.props.ReplyPI !== '')
        content.value = `>>>${defProps.props.ReplyPI}`

    async function sendData(posts:number, data:string, base64data:string){

        const mojPost: CommentProps = {
            id: `${posts}`,
            content: content.value,
            password: password.value,
            image: base64data,
            postId: `${defProps.props.id}`,
            dateOfComment: data
        };

        // store.setChosenPostId(defProps.props.id)

        await addComment( Number(defProps.props.id), content.value, password.value, data, base64data)
            .then(() => {
                store.comment = mojPost;
                console.log(store.post)
            })
            .catch((Error)=>{
                console.log(Error);
            })
    }

    async function sendForm() {
        if(content.value !== '' && password.value !== ''){
        let posts = (await getPosts()).length + 1;
        let date:Date = new Date();
        let data = `${date.getUTCDate()}/${date.getUTCDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        let input = document.getElementById("sexxxx") as HTMLInputElement || null;
        let file:File;
        let blob:Blob = new Blob();
        let base64data = '';
        const reader = new FileReader();
        
        if(input.files !== null && input.files[0] !== undefined){
            file = input.files[0];
            console.log(file)
            file?.arrayBuffer().then((arrayBuffer) => {
                blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
                reader.readAsDataURL(blob);
                reader.onloadend = function() {
                    base64data = `${reader.result}`;
                    sendData(posts,data, `${base64data}`)
                }
            });

        }
        else{
            console.log("here")
            blob = new Blob();
            sendData(posts,data, `noPicture`)
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
