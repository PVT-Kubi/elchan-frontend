import { defineStore } from 'pinia'
import type { PostProps, Store, CommentProps } from '@/types';

const useStore = defineStore("main", {
  state: () => {
    return {
      post: null,
      chosenPost: null,
      chosenPostId: null,
      comment: null,
      deletedComment: null,
      deletedPost: null,
      potentialReply: null,
    } as Store;
  },getters: {
    getPost: (state) => state.post,
    getpotentialReply: (state) => state.potentialReply,
    getChosenPostId: (state) => state.chosenPostId,
    getChosenPost: (state) => state.chosenPost,
    getComment: (state) => state.comment,
    getDeletedComment: (state) => state.deletedComment,
    getDeletedPost: (state) => state.deletedPost
  },actions: {


    setPotentialReply(reply:string) {
      this.potentialReply = reply;
    },

    setPointres(post: PostProps) {
      this.post = post;
    },
    setChosenPost(post: PostProps){
      this.chosenPost = post
    },

    setDeletedPost(deletedPost: PostProps){
      this.deletedPost = deletedPost
    },
    
    setComment(comment: CommentProps) {
      this.comment = comment
    },
    setDeletedComment(deletedComment: CommentProps) {
      this.deletedComment = deletedComment
    },

    setChosenPostId(id: string) {
      this.chosenPostId = id
    }
  }
});

export default useStore;

export type {
  Store
};
