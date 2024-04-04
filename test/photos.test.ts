import { getAllPhotosByAlbumId, getPhotoById, uploadNewPhoto } from "../api/photos";
import { expectedPhoto } from "../userData/dataForTest/expectedPhoto";
import { albumId, nonExistentAlbumId, thumbnailUrlForUdload, thumbnailUrlForUdloadNew, urlForUdload, urlForUdloadNew } from "../userData/dataForTest/photosDataForUpload";

describe  ("API tests for photos", () => {
     //Пользователь может получить все фото в альбоме по его Id
     test ("Getting photos by albumId", async () => {
        let result = await getAllPhotosByAlbumId(2);
        let numbOfElements = Object.keys(result.body).length;
        expect(result.body).not.toBeNull();
        expect(numbOfElements).toEqual(50); 
        expect(result.status).toBe(200);
     });
     //Пользователь может получить конкретное фото по его Id
     test ("Getting a photo by id", async () => {
        let result = await getPhotoById(2);
        expect(result.body[0]).toEqual(expectedPhoto);
        expect(result.status).toBe(200);
     });
     //Пользователь может загрузить новое фото
     test ("Uploading a new photo", async () => {
      let result = await uploadNewPhoto(albumId, urlForUdload, thumbnailUrlForUdload);
      expect(result.body.albumId).toEqual(albumId);
      expect(result.body.url).toEqual(urlForUdload);
      expect(result.body.thumbnailUrl).toEqual(thumbnailUrlForUdload);
      expect(result.status).toBe(201);
   });
   //Пользователь может загрузить новое фото, 
   //указав Id несуществующего альбома. В результате будет создан новый альбом с ID = ID_указанный_пользователем
   test ("Uploading a new photo for a non-existent ablumId", async () => {
      let result = await uploadNewPhoto(nonExistentAlbumId, urlForUdloadNew, thumbnailUrlForUdloadNew);
      expect(result.body.albumId).toEqual(nonExistentAlbumId);
      expect(result.body.url).toEqual(urlForUdloadNew);
      expect(result.body.thumbnailUrl).toEqual(thumbnailUrlForUdloadNew);
      expect(result.status).toBe(201);
   });
});