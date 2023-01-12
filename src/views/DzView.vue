<template>
  <div class="random">
    <h1>Welcome to /dz/ - Dźwiękowcy</h1>
    <ImageVue />
    <FormVue :props="prp"/>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
              <PostVue :props="todo.props"/>
        </li>
    </ul>
  </div>
</template>

<style>

h1{
  color: rgb(28, 209, 82);
  font-weight: bold;
}

.random{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
}

ul{
  margin:0;
  text-decoration: none;
  list-style-type: none;
  width: 100%;
  padding: 0;
}

li{
  margin:0;
  width: 100%;
}
</style>

<script lang="ts" setup>
import FormVue from './Form.vue';
import useStore from '@/store';
import PostVue from './Post.vue';
import type { PostProps,PostI, postForm } from '@/types';
import { ref, type Ref, computed, type ComputedRef, watch } from "vue";
import ImageVue from '@/components/Image.vue';
import { getPosts } from '@/api';

const store = useStore();
const todos: Ref<PostI[]> = ref([]);
const prp:postForm = {
  wichBoard: "dz"
}

showPosts()

store.$subscribe(async(mutation, state) => {
    todos.value = []
    if(state.post != null || state.comment != null || state.deletedComment !=null || state.deletedPost != null) {
      showPosts();
    }
});
 


  async function showPosts(){
    let id = 0;
    if(store.deletedPost !== null){
      id = Number(store.deletedPost.id)
    }
    let Posts = await getPosts();
    Posts.reverse();
    Posts.forEach(Post => {
   
      if(Post.wichBoard == "dz" && Post.id != id){
        let pst: PostProps = {
          id:`${Post.id}`,
          subject: Post.title,
          content: Post.description,
          dateOfPost: Post.dateOfPost,
          wichBoard: Post.wichBoard,
          image: Post.image,
          password: Post.password
        }

        if(!todos.value.includes({id: Post.id, props: pst})) {
          todos.value.push({id: Post.id, props: pst});
        }
      }
    });
  }

</script>
