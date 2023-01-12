import type {Post, Comment} from '@/types'

export async function getPostById(postId:number): Promise<Post> {
    const res = await fetch(`http://192.168.21.2:8080/posts/${postId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });

    const data = res.body ? await res.json() : null;
    if(!data || !res.status || !res.status.toString().startsWith('2')) {
        console.log('error')
    } else {
        console.log(data);
    }

    return data;
}

export async function getCommentsOfPost(postId:number): Promise<Comment[]> {
    const res = await fetch(`http://192.168.21.2:8080/posts/${postId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });

    const data = res.body ? await res.json() : null;
    if(!data || !res.status || !res.status.toString().startsWith('2')) {
        console.log('error')
    } else {
        console.log(data);
    }

    return data.commentList;
}

export async function getPosts(): Promise<Post[]>{
    const res = await fetch(`http://192.168.21.2:8080/posts/allPosts`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });

    const data = res.body ? await res.json() : null;
    if(!data || !res.status || !res.status.toString().startsWith('2')) {
        console.log('error')
    } else {
        console.log(data);
    }

    return data;
}

export async function addPost(title:string, descritpion:string, password:string, dateOfPost:string, wichBoard:string, image:string) {
    const res = await fetch('http://192.168.21.2:8080/posts', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            title: title,
            description: descritpion,
            dateOfPost: dateOfPost,
            wichBoard: wichBoard,
            password: password,
            image: `${image}`
        })
    });

    // 200 - GET
    // 201 - POST, UPDATE, PUT
    const data = res.body ? await res.json() : null;
    if(!data || !res.status || !res.status.toString().startsWith('2')) {
        console.log('error')
    } else {
        console.log(data);
    }
}

export async function addComment(postId:number, content:string, password:string, dateOfComment:string, image:string) {
    const res = await fetch(`http://192.168.21.2:8080/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            content: content,
            dateOfComment: dateOfComment,
            image: image,
            postId: `${postId}`,
            password: password
        })
    });

    const data = res.body ? await res.json() : null;
    if(!data || !res.status || !res.status.toString().startsWith('2')) {
        console.log('error')
    } else {
        console.log(data);
    }
}

export async function deleteCommentOfPost(postId:number, commentId:number) {
    console.log(postId)
    const res = await fetch(`http://192.168.21.2:8080/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });

    const data = res.body ? await res.json() : null;
    if(!data || !res.status || !res.status.toString().startsWith('2')) {
        console.log('error')
    } else {
        console.log(data);
    }
}

export async function deletePost(postId:number) {
    console.log(postId)
    const res = await fetch(`http://192.168.21.2:8080/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });

    const data = res.body ? await res.json() : null;
    if(!data || !res.status || !res.status.toString().startsWith('2')) {
        console.log('error')
    } else {
        console.log(data);
    }
}