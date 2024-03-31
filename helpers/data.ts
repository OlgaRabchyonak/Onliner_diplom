//email
export let validEmailForReg = "firstUser@mail.ru";
export let emailWithoutDomainName = "test5";
export let emailWithoutDot = "test5@test";
export let validationTextForInvalidEmail = "Email is invalid. Please, try again!";

//password
export let validPassForReg = "test1test";
export let invalidPassLess8 = "test5";
export let invalidPassWithoutNum = "testtest";
export let validationTextForInvalidPass = "The password must be at least 8 characters and contain at least 1 number";

//username
export let validUsernameForReg = "Olga";
export let emptyUsernameForReg = "";
export let validationTextForInvalidUsername = "The username cannot be empty";

//age
export let validAgeForReg = 28;
export let invalidAgeEqualTo150 = 150;
export let invalidAgeMoreThan150 = 151;
export let invalidAgeEqualTo0 = 0;
export let validationTextForInvalidAge = "Age must be greater than 0 and less than 150 years";

//agreement
export let validationTextForAgreements = "Successful registration requires your agreement to the terms and conditions";

//registration
export let TextForSuccessReg = `The user has been successfully registered. Registration date and time: ${new Date().toLocaleString()}.`;
export let TextForUnSuccessReg = "Error during registration. Check the filled fields again!";