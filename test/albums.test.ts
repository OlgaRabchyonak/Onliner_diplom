import { createNewAlbum, getAlbumById, getAllAlbums, getAllAlbumsByUserId } from "../api/albums";
import { createdAblum } from "../userData/dataForTest/createdAlbum";
import { expectedAblum } from "../userData/dataForTest/expectedAlbum";

describe  ("API tests for albums", () => {
    //Пользователь может получить все альбомы
    test ("Getting all albums", async () => {
        let result = await getAllAlbums();
        expect(result.status).toBe(200);
        expect(result.body).not.toBeNull();
    });
    //Пользователь может получить альбом по его Id
    test ("Getting an album by Id", async () => {
        let result = await getAlbumById(11);
        expect(result.status).toBe(200);
        expect(result.body[0]).toEqual(expectedAblum);
    });
    //Пользователь может получить все альбомы конкретного пользователя по userId
    test ("Getting albums by userId", async () => {
        let result = await getAllAlbumsByUserId(3);
        let numbOfElements = Object.keys(result.body).length;
        expect(result.body).not.toBeNull();
        expect(numbOfElements).toEqual(10); 
        expect(result.status).toBe(200);
    });
    //Пользователь может добавить новый альбом
    test ("Creating a new ablum", async () => {
        let titleforCreation = "test";
        let result = await createNewAlbum(createdAblum.userId, createdAblum.title);
        expect(result.body)
        expect(result.status).toBe(201);
        expect(result.body.id).not.toBeNull();
        expect(result.body.title).toEqual(createdAblum.title);
        expect(result.body.userId).toEqual(createdAblum.userId);
    });
});