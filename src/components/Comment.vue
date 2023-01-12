<template>
    <div class="comment" :id="props.id">
        <h2><span id="spanOfComment">Anonymus <span id="spanForCommentId">id: {{ props.id }}</span> {{ props.dateOfComment }} </span><CustomButtonVue id="rest" :props="buttonPrp"/></h2>
        <div class="CommentNContent">
            <video width="320" height="240" controls v-if="props.image.includes('video')" >
                <source :src="props.image" type="video/webm">
            </video>
            <img v-else-if="props.image !== ''" :src="props.image" alt="" srcset=""/>
            <div>
                <ul>
                    <li v-for="reply in replies" :key=reply.id id="liForReply">
                        <span id="replies"> >>>{{ reply.inside }} </span>
                        <CommentVue id="commentInside" :props = "cmtPrp"/>
                    </li>
                </ul>
                <Form2Vue v-if="replId !== ''" :props="commentFormProps"/>
                <p>{{ props.content }}</p>
            </div>
        </div>
        <div id="commentInput" v-if="showDelete">
            <CustomButtonVue :props="deleteButton" id="deleteBut"/>
            <input type="password"  @keyup.enter="deleteComment" v-model="deletePass" class="inputs" required>
        </div>
        <div id="commentInput" v-else="!showDelete">
            <CustomButtonVue :props="deleteButton" id="deleteBut"/>
        </div>
    </div>
</template>

<style>

#deleteBut{
    border: none;
}

#commentInput{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
}

#commentInput{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
}


h2{
    display: flex;
}
#rest{
    margin-left: auto;
    border:none;
    font-size: large;
}


#spanForCommentId{
    color: rgb(236, 93, 93);

}

#liForReply{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

#commentInside{
    display: none;
    position: absolute;
    margin-left: 50px;
}

#replies{
    color: rgb(105, 199, 133);
    cursor: pointer;
}

#replies:hover + #commentInside{
    display: block;
}

img{
    max-height: 300px;
}

.CommentNContent{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
}
.comment{
    background-color: rgb(46, 46, 95);
    border: 1px solid rgb(65, 65, 95);
    min-width: 30%;
    padding: 5px;
    margin-top: 20px;
    border-radius: 10px;
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
}

#spanOfComment{
        color:blueviolet;
        cursor: default;
        font-size: large;
    }
</style>
<script lang="ts" setup>
    import type {CommentProps, Reply, ButtonProps, commentForm} from '../types'
    import { getCommentsOfPost, deleteCommentOfPost } from '@/api';
    import { ref, type Ref, computed, type ComputedRef, watch } from "vue";
    import CommentVue from '@/components/Comment.vue';
    import uniqid from 'uniqid';
    import useStore from '@/store';
    import CustomButtonVue from './CustomButton.vue';
    import Form2Vue from '@/views/Form2.vue';

    const store = useStore();
    const deletePass:Ref<string> = ref("");
    const showDelete:Ref<boolean> = ref(false);
    
    interface Props{
        props: CommentProps
    }


    const defProps = defineProps<Props>();

    let replies:Ref<Reply[]> = ref([]);
    let replId:Ref<string> = ref("");

    let cmtPrp:CommentProps;
    let commentFormProps:commentForm;

    let buttonPrp:ButtonProps = {
        caption: 'Reply',
        action: () => setReplyId(),
        icon: 'fa-solid fa-check',
        enabled: true,
        disabledAction: () => console.log("disabled"),
        type: "button"
    }

    let deleteButton:ButtonProps = {
        caption: 'Usuń komentarz',
        action: () => deleteComment(),
        icon: 'fa-solid fa-check',
        enabled: true,
        disabledAction: () => console.log("disabled"),
        type: "button"
    }

    console.log(defProps.props.image.split(',')[0].replace('data:', '').substring(6,10).replace(';', ''))

    let conentTab = defProps.props.content.split(" ");
    let newConent = '';
    conentTab.forEach(async element =>{
        if(element.includes(">>>")){
            let possibleId = element.replace(">>>", '');
            let comments = await getCommentsOfPost(Number(defProps.props.postId));
            console.log(defProps.props.postId);

            comments.forEach(ellement => {
                if(ellement.id == Number(possibleId)) { 
                    replies.value.push({id: `${uniqid()}r`,inside: `${ellement.id}`})
                    // console.log(ellement.id)
                    cmtPrp = {
                        id:`${ellement.id}`,
                        content: ellement.content,
                        image: `${ellement.image}`,
                        password: ellement.password,
                        postId: ellement.postId,
                        dateOfComment: ellement.dateOfComment,
                    }

                    defProps.props.content = defProps.props.content.replace(`>>>${ellement.id}`, '')
                }
            });
        }
    })

    function setReplyId(){
        commentFormProps = {
            id: defProps.props.postId,
            ReplyPI: `${defProps.props.id}`,
            showForm: true,
            showH2: false
        }
        if(replId.value === '')
            replId.value = `${defProps.props.id}`
        else
            replId.value = ''
        // store.setPotentialReply(`${defProps.props.id}`)
    }

    async function deleteComment() {
        if(!showDelete.value) {
            showDelete.value = true
        }else{
            if(deletePass.value !== ""){
                if(defProps.props.password === deletePass.value){
                    deleteCommentOfPost(Number(defProps.props.postId), Number(defProps.props.id))
                    store.deletedComment = defProps.props
                }
                else
                    alert("Podano nieprawidłowe hasło!")
            }else{
                showDelete.value = false
            }
        }
    }
</script>