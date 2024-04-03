import superagent, { Response } from "superagent";

const basedUrlComments = "https://jsonplaceholder.typicode.com/comments";

export async function getAllCommentsByPostId(postId: number) {
    let response = await superagent.get(basedUrlComments).query( {postId: postId} );;
    return response;
};
