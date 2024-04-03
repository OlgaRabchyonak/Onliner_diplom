import superagent, { Response } from "superagent";

const basedUrlPost = "https://jsonplaceholder.typicode.com/posts";

export async function getAllPosts() {
    let response = await superagent.get(basedUrlPost);
    return response;
};

export async function getPostById(id: number) {
    let response = await superagent.get(basedUrlPost).query( {id: id} );
    return response;
};

export async function getAllPostByUserId(userId: number) {
    let response = await superagent.get(basedUrlPost).query( {userId: userId} );
    return response;
};

export async function createNewPost(userId: number, title: string, body: string) {
    let response = await superagent.post(basedUrlPost).send( {userId: userId, title: title, body: body} );
    return response;
};

export async function updateTitle(id: number, title: string) {
    const url = `${basedUrlPost}/${id}`;
    let response = await superagent.put(url).send( {title: title} );
    return response;
};

export async function deletePost(id: number) {
    const url = `${basedUrlPost}/${id}`;
    let response = await superagent.delete(url);
    return response;
};

