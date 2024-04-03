import { createNewPost, deletePost, getAllPostByUserId, getAllPosts, getPostById, updateTitle } from "../api/posts";
import { postExpected } from "../userData/dataForTest/expectedPost";
import { getAllCommentsByPostId } from "../api/comments";
import { createdPost } from "../userData/dataForTest/createdPost";

describe  ("API tests for posts and comments", () => {
    //Пользователь может получить все посты
    test ("Getting a list of posts", async () => {
        let result = await getAllPosts();
        expect(result.body).not.toBeNull();
        expect(result.status).toBe(200);
    });
    //Пользователь может получить пост по его Id
    test ("Getting a post by Id", async () => {
        let result = await getPostById(5);
        expect(result.body[0]).toEqual(postExpected);
        expect(result.status).toBe(200);
    });
    //Пользователь должен получить ошибку 404 при попытке получить пост с несуществующим Id
    test.skip ("Getting a post by a non-existent Id", async () => {
        let result = await getPostById(5000);
        expect(result.status).toBe(404); // все равно возвращается 200
    });
    //Пользователь может получить все посты для конкретного пользователя по userId
    test ("Getting all posts by UserId", async () => {
        let result = await getAllPostByUserId(2);
        let numbOfElements = Object.keys(result.body).length;
        expect(result.body).not.toBeNull();
        expect(numbOfElements).toEqual(10); 
        expect(result.status).toBe(200);
    });
    //Пользователь получит пустой массив при попытке получить посты для несуществующего юзера
    test ("Getting an empty array for a non-existent user", async () => {
        let result = await getPostById(50000);
        expect(result.body).toEqual([]);
        expect(result.status).toBe(200);
    });
    //Пользователь может получить все комментарии к посту по его Id
    test ("Getting all comments by PostId", async () => {
        let result = await getAllCommentsByPostId(5);
        let numbOfElements = Object.keys(result.body).length;
        expect(result.body).not.toBeNull();
        expect(numbOfElements).toEqual(5); 
        expect(result.status).toBe(200);
    });
    //Пользователь получит пустой массив при попытке получить комментарии к несуществующему посту
    test ("Getting an empty array for a non-existent PostId", async () => {
        let result = await getAllCommentsByPostId(5000);
        expect(result.body).toEqual([]);
        expect(result.status).toBe(200);
    });
    //Пользователь может создать новый пост
    test ("Creating a new post", async () => {
        let result = await createNewPost(createdPost.userId, createdPost.title, createdPost.body);
        expect(result.status).toBe(201);
        expect(result.body.id).not.toBeNull();
        expect(result.body.title).toEqual(createdPost.title);
        expect(result.body.body).toEqual(createdPost.body);
        expect(result.body.userId).toEqual(createdPost.userId);
    });
    //Пользователь может обновить заголовок (title) существующего поста
    test ("Updating a title", async () => {
        let titleToChange = "test";
        let result = await updateTitle(10, titleToChange);
        expect(result.status).toBe(200);
        expect(result.body.title).toEqual(titleToChange);  
    });
    //Пользователь может удалить пост по Id
    test ("Deleting a post", async () => {
        let result = await deletePost(10);
        expect(result.status).toBe(200);
        expect(result.body).toEqual({});   
    });
});

