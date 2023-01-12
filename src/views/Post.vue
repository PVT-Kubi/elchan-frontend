<template>
    <div class="wholePost">
        <div class="reply">
            <Form2Vue :props="commentFormProps"/>
        </div>
        <div class="post" :id="props.id">
            <h2>{{ props.subject }} <span id="spanOfPost">Anonymus {{ props.dateOfPost }}</span></h2>
            <div class="PostNContent">
                <video width="320" height="240" controls v-if="props.image.includes('video')" >
                    <source :src="props.image" type="video/webm">
                </video>
                <img  v-else-if="props.image !== 'undefined'" :src="props.image" alt="" srcset="" >
                <p>{{ props.content }}</p>
            </div>
        </div>
        <div class="comments">
        <div class="replies">
        <span id="kleszcz">{{ replies }} odpowiedzi</span>
        </div>
        <ul>
            <li v-for="todo in todos" :key=todo.id>
                <CommentVue :props="todo.props"/>
            </li>
        </ul>
        </div>
        <div id="postInput" v-if="showDeleteP">
            <CustomButton :props="deleteButtonP" id="deleteButt"/>
            <input type="password"  @keyup.enter="deletePostI" v-model="deletePassP" class="inputs" required>
        </div>
        <div id="postInput" v-else="showDeleteP">
            <CustomButton :props="deleteButtonP" id="deleteButt"/>
        </div>
    </div>
</template>
<style>
    #deleteButt{
        border: none;
        font-size: large;
        background-color: rgb(42, 43, 59);
    }

    #postInput{
        width: 98%;
        margin-top: 2%;
        display: flex;
        justify-content: flex-end;
        padding-right: 15%;
        gap: 5px;
    }


    .PostNContent{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 30px;
    }
    img{
        max-height: 300px;
    }

    .reply{
        width: 100%;
    }

    #spanOfPost{
        color:blueviolet;
        cursor: default;
        margin-left: 5px;
        font-size: 24px;
    }

    .replies{
        display: flex;
        justify-content: baseline;
        gap:10px
    }

    #kleszcz{
        color: rgb(151, 151, 228)
    }

    .wholePost{
        border-top: 0.5px solid rgb(104, 104, 243);
        width: 100%;
        margin-top: 2%;
        margin-bottom: 2%;
        color: rgb(151, 151, 228)
    }

    h2{
        color: rgb(236, 93, 93);
    }

    .post, .comments{
        margin-left: 5%;
    }

    .comments{
        margin-right: 2%;
    }


    p{
        color: rgb(167, 112, 11);
    }
</style>
<script lang="ts" setup>
import CommentVue from '@/components/Comment.vue';
import { ref, type Ref } from "vue";
import type { CommentProps, PostProps, CommentI, commentForm, ButtonProps } from '@/types';
import useStore from '@/store';
import {  getCommentsOfPost, deletePost } from '@/api';
import CustomButton from '@/components/CustomButton.vue';
import Form2Vue from './Form2.vue';

const todos: Ref<CommentI[]> = ref([]);
const replies: Ref<number> = ref(0);
const deletePassP:Ref<string> = ref("");
const showDeleteP:Ref<boolean> = ref(false);

let store = useStore();


interface Props{
    props: PostProps
}

let deleteButtonP:ButtonProps = {
    caption: 'Usuń post',
    action: () => deletePostI(),
    icon: 'fa-solid fa-check',
    enabled: true,
    disabledAction: () => console.log("disabled"),
    type: "button"
}

const defProps = defineProps<Props>();

const commentFormProps:commentForm = {
    id: defProps.props.id,
    ReplyPI: "",
    showForm: false,
    showH2: true
}

showComments()


async function showComments(){
    await getCommentsOfPost(Number(defProps.props.id))
        .then((Comments) =>{
            replies.value = Comments.length;
            Comments.forEach(Comment => {
                let cmt: CommentProps = {
                id:`${Comment.id}`,
                content: Comment.content,
                image: `${Comment.image}`,
                password: Comment.password,
                postId: Comment.postId,
                dateOfComment: Comment.dateOfComment,
                }
                
                if(!todos.value.includes({id: Comment.id, props: cmt})) {
                todos.value.push({id: Comment.id, props: cmt});
                }
                })
    });
}

async function deletePostI() {
    if(!showDeleteP.value) {
        showDeleteP.value = true
    }else{
        if(deletePassP.value !== ""){
            if(defProps.props.password === deletePassP.value){
                deletePost(Number(defProps.props.id))
                store.deletedPost = defProps.props
            }
            else
                alert("Podano nieprawidłowe hasło!")
        }else{
            showDeleteP.value = false
        }
    }
}
</script>