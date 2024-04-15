export const testUserLogin: string = "pexid76512@etopys.com";
export const testUserPassword: string = "pexid76512";
export const userToken: string = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozODA1Nzg0LCJ1c2VyX3R5cGUiOiJ1c2VyIiwiZmluZ2VycHJpbnQiOiIyZGUyNTdlMTljNDc4ZTU3NzI2MTdkMWMyNzVmNmZhYiIsImV4cCI6MjAyODUxOTc2NywiaWF0IjoxNzEzMTU5NzY3fQ.P0TUq-_tmUX27tYweGZ-LyPXkBsHms2Febz5NJbdcRZOa-52s17c1tSH3dN80Q8C2KhIR-fbwP_REJKf7OwF5A";
export const cookiesForAuth_oss = 
{
      name: "oss",
      value: userToken,
      domain: ".onliner.by",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Lax"
    };
    export const cookiesForAuth_logged_in =
    {
      name: "logged_in",
      value: "1",
      domain: ".onliner.by",
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "Lax"
    };

export let itemForSearching: string = "Apple iPhone 15 Pro Max";
export let item: string  = "Карты памяти";
export let pageName = "Оформление заказа";

//Данные для оформления заказа
export let streetName = "ул. Ржавецкая";
export let houseNumber = "10";
export let personName = "Ольга";
export let phoneNumber = "336337236";  
