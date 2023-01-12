type CustomButtonType = "button" | "submit" | "reset";

interface ButtonProps {
    caption: string;
    action: () => void;
    disabledAction?: () => void;
    icon: string;
    enabled?: boolean;
    type?: CustomButtonType;
}

interface Board2Props {
    msg: String,
    path: String,
    action: () => void;
}

interface CommentProps {
    id:string;
    content: string;
    password: string;
    dateOfComment: string;
    image: string;
    postId: string;
}

interface Reply {
    id: string,
    inside: string
}

interface PostProps {
    id:string;
    subject: string;
    content: string;
    password: string;
    wichBoard: string;
    dateOfPost: string;
    image: string;
}

interface PostI {
    id: number;
    props: PostProps;
}

interface CommentI {
    id: number;
    props: CommentProps;
}

interface commentForm {
    id: string;
    showForm: boolean;
    ReplyPI: string;
    showH2: boolean;
}

interface postForm {
    wichBoard: string
}

interface Comment{
    id: number;
    wichBoard: string;
    postId: string,
    content:string;
    dateOfComment: string;
    password: string;
    image: string;
}

interface Post{
    id: number;
    title: string;
    description: string;
    password: string;
    dateOfPost: string;
    wichBoard: string;
    image: string;
    commentList: [];
}

interface Store {
    post: PostProps | null;
    chosenPostId: string | null;
    chosenPost: PostProps | null;
    comment: CommentProps | null;
    deletedComment: CommentProps | null;
    deletedPost: PostProps | null;
    potentialReply: string | null;
}

export type{
    CustomButtonType,
    ButtonProps,
    CommentProps,
    PostProps,
    Store,
    Post,
    PostI,
    CommentI,
    Comment,
    Board2Props,
    commentForm,
    postForm,
    Reply
}