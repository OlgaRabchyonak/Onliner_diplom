import superagent, { Response } from "superagent";

const basedUrlAlbums = "https://jsonplaceholder.typicode.com/albums";

export async function getAllAlbums() {
    let response = await superagent.get(basedUrlAlbums);
    return response;
};

export async function getAlbumById(id: number) {
    let response = await superagent.get(basedUrlAlbums).query( {id: id} );
    return response;
};

export async function getAllAlbumsByUserId(userId: number) {
    let response = await superagent.get(basedUrlAlbums).query( {userId: userId} );
    return response;
};

export async function createNewAlbum(userId: number, title: string) {
    let response = await superagent.post(basedUrlAlbums).send( {userId: userId, title: title} );
    return response;
};