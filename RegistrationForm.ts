import { networkInterfaces } from "os";

class RegistrationForm {
    email: string | null;
    password: string | null;
    username: string | null;
    age: number | null;
    termsAgreement: boolean = false; 
    registered: boolean = false; 

    constructor (email: string | null, password: string | null, username: string | null, 
        age: number | null, termsAgreement: boolean, registered: boolean) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.age = age;
        this.termsAgreement = false;
        this.registered = false;
    };
    //methods
    setEmail (email: string): any {
        let finalMessage: string;
        const email_Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(email_Regex.test(email)) {
            this.email = email;
            finalMessage = "Email entered successfully!"
        } else {
            this.email = null;
            finalMessage = "Email is invalid. Please, try again!";
        };
        return finalMessage;
    };
    setPassword(password: string): any {
        let finalMessage: string;
        const pass_Regex = /\d/;
        if(password.length >= 8 && pass_Regex.test(password)) {
            this.password = password;
            finalMessage = "Password entered successfully!";
        } else {
            this.password = null;
            finalMessage = "The password must be at least 8 characters and contain at least 1 number";
        };
        return finalMessage;
    };
    setUsername(username: string): any {
        let finalMessage: string;
        if(username.trim() !== '') {
            this.username = username;
            finalMessage = "Username entered successfully!"
        } else {
            this.username = null;
            finalMessage = "The username cannot be empty"; 
        };
        return finalMessage;
    };
    setAge(age: number): any {
        let finalMessage: string;
        if(age > 0 && age < 150) {
            this.age = age;
            finalMessage = "Age entered successfully!";
        } else {
            this.age = null;
            finalMessage = "Age must be greater than 0 and less than 150 years";
        };
        return finalMessage;
    };
    agreeWithTerms(agreement: boolean): any {
        let finalMessage: string;
        if(agreement) {
            this.termsAgreement = true;
            finalMessage = "Consent successfully saved";
        } else {
            this.termsAgreement = false;
            finalMessage = "Successful registration requires your agreement to the terms and conditions";
        };
        return finalMessage;
    };
    register(): any {
        let finalMessage: string;
    if (this.email !== null && this.password!== null && this.username !== null && 
        this.age!== null && this.termsAgreement !== false) {
        this.registered = true;
        finalMessage = `The user has been successfully registered. Registration date and time: ${new Date().toLocaleString()}.`;  
      } else {
        this.registered = false;
        finalMessage  = "Error during registration. Check the filled fields again!";
      };
      return finalMessage;
    };
};

export let emptyUserForRegistration = new RegistrationForm(null, null, null, null, false, false);

// const Form = new RegistrationForm();
// Form.setEmail("fghj@fghj.ru")
// Form.setPassword("sdfghjkl41")
// Form.setUsername("Jkmnhyuik")
// Form.setAge(6)
// Form.agreeWithTerms(true)
// Form.register();
// console.log(Form)
