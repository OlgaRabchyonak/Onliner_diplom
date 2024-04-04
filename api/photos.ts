import superagent, { Response } from "superagent";

const basedUrlPhotos = "https://jsonplaceholder.typicode.com/photos";

export async function getAllPhotosByAlbumId(albumId: number) {
    let response = await superagent.get(basedUrlPhotos).query( {albumId: albumId} );
    return response;
};

export async function getPhotoById(id: number) {
    let response = await superagent.get(basedUrlPhotos).query( {id: id} );
    return response;
};

export async function uploadNewPhoto(albumId: number, url: string, thumbnailUrl: string) {
    let response = await superagent.post(basedUrlPhotos).send( {albumId: albumId, url: url, thumbnailUrl: thumbnailUrl} );
    return response;
};

