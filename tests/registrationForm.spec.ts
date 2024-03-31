import { emptyUserForRegistration } from "../RegistrationForm";
import { TextForSuccessReg, TextForUnSuccessReg, emailWithoutDomainName, emailWithoutDot, emptyUsernameForReg, invalidAgeEqualTo0, 
         invalidAgeEqualTo150, invalidAgeMoreThan150, 
         invalidPassLess8, invalidPassWithoutNum, validAgeForReg, validEmailForReg, 
         validPassForReg, validUsernameForReg, validationTextForAgreements, validationTextForInvalidAge, 
         validationTextForInvalidEmail, 
         validationTextForInvalidPass, validationTextForInvalidUsername } from "../helpers/data";

describe ("tests for checking email", () => {
    //positive
    test("entering a valid email", () => {
        emptyUserForRegistration.setEmail(validEmailForReg);
        expect(emptyUserForRegistration.email).toEqual(validEmailForReg);
    });
    //negative
    test("entering an email without domain name", () => {      
        let result = emptyUserForRegistration.setEmail(emailWithoutDomainName);
        expect(result).toEqual(validationTextForInvalidEmail);
        expect(emptyUserForRegistration.email).toBeNull;
    });
    //negative
    test("entering an email without a dot", () => {      
        let result = emptyUserForRegistration.setEmail(emailWithoutDot);
        expect(result).toEqual(validationTextForInvalidEmail);
        expect(emptyUserForRegistration.email).toBeNull;
    });
describe ("tests for checking password", () => {
    //positive
    test("entering a valid password ", () => {
        emptyUserForRegistration.setPassword(validPassForReg);
        expect(emptyUserForRegistration.password).toEqual(validPassForReg);
    });
    //negative
    test("entering a password without using numbers", () => {
        let result = emptyUserForRegistration.setPassword(invalidPassWithoutNum);
        expect(result).toEqual(validationTextForInvalidPass);
        expect(emptyUserForRegistration.password).toBeNull;
    });
    //negative
    test("enter a password of less than 8 characters", () => {
        let result = emptyUserForRegistration.setPassword(invalidPassLess8);
        expect(result).toEqual(validationTextForInvalidPass);
        expect(emptyUserForRegistration.password).toBeNull;
    });
});
describe ("tests for checking username", () => {
    //positive
    test("entering a valid username ", () => {
        emptyUserForRegistration.setUsername(validUsernameForReg);
        expect(emptyUserForRegistration.username).not.toBeNull;
        expect(emptyUserForRegistration.username).toEqual(validUsernameForReg);
    });
    //negative
    test("entering an empty field instead of username", () => {
        let result = emptyUserForRegistration.setUsername(emptyUsernameForReg);
        expect(result).toEqual(validationTextForInvalidUsername);
    });
});
describe ("tests for checking age", () => {
    //positive
    test("entering a valid age ", () => {
        emptyUserForRegistration.setAge(validAgeForReg);
        expect(emptyUserForRegistration.age).toBeGreaterThan(0);
        expect(emptyUserForRegistration.age).toBeLessThan(150);
        expect(emptyUserForRegistration.age).toEqual(validAgeForReg);
    });
    //negative
    test("entering an age equal to 150", () => {
        let result = emptyUserForRegistration.setAge(invalidAgeEqualTo150);
        expect(emptyUserForRegistration.age).not.toBe(invalidAgeEqualTo150);
        expect(result).toEqual(validationTextForInvalidAge);
    });
    //negative
    test("entering an age more than 150", () => {
        let result = emptyUserForRegistration.setAge(invalidAgeMoreThan150);
        expect(emptyUserForRegistration.age).not.toBe(invalidAgeMoreThan150);
        expect(result).toEqual(validationTextForInvalidAge);
    });
});
    //negative
    test("entering an age equal to 0", () => {
        let result = emptyUserForRegistration.setAge(invalidAgeEqualTo0);
        expect(emptyUserForRegistration.age).not.toBe(invalidAgeEqualTo0);
        expect(result).toEqual(validationTextForInvalidAge);
});
describe ("tests for checking agreements", () => {
    //positive
    test("choosing true for terms agreement", () => {
        emptyUserForRegistration.agreeWithTerms(true);
        expect(emptyUserForRegistration.agreeWithTerms).toBeTruthy;
    });
    //negative
    test("choosing false for terms agreement", () => {
        let result = emptyUserForRegistration.agreeWithTerms(false);
        expect(emptyUserForRegistration.agreeWithTerms).toBeFalsy;
        expect(result).toEqual(validationTextForAgreements);
    });
});
describe ("tests for registration", () => {
    //positive
    test("successful user registration", () => {
        emptyUserForRegistration.setEmail(validEmailForReg);
        emptyUserForRegistration.setPassword(validPassForReg);
        emptyUserForRegistration.setUsername(validUsernameForReg);
        emptyUserForRegistration.setAge(validAgeForReg);
        emptyUserForRegistration.agreeWithTerms(true);
        let result = emptyUserForRegistration.register();
        expect(emptyUserForRegistration.registered).toBeTruthy;
        expect(result).toEqual(TextForSuccessReg);
    });
    //negative
    test("unsuccessful user registration - without agreement", () => {
        emptyUserForRegistration.setEmail(validEmailForReg);
        emptyUserForRegistration.setPassword(validPassForReg);
        emptyUserForRegistration.setUsername(validUsernameForReg);
        emptyUserForRegistration.setAge(validAgeForReg);
        emptyUserForRegistration.agreeWithTerms(false);
        let result = emptyUserForRegistration.register();
        expect(emptyUserForRegistration.registered).toBeFalsy;
        expect(result).toEqual(TextForUnSuccessReg);
    });
    //negative
    test("unsuccessful user registration - with invalid email", () => {
        emptyUserForRegistration.setEmail(emailWithoutDomainName);
        emptyUserForRegistration.setPassword(validPassForReg);
        emptyUserForRegistration.setUsername(validUsernameForReg);
        emptyUserForRegistration.setAge(validAgeForReg);
        emptyUserForRegistration.agreeWithTerms(true);
        let result = emptyUserForRegistration.register();
        expect(emptyUserForRegistration.registered).toBeFalsy;
        expect(result).toEqual(TextForUnSuccessReg);
    });
    //negative
    test("unsuccessful user registration - with a password  without using numbers", () => {
        emptyUserForRegistration.setEmail(validEmailForReg);
        emptyUserForRegistration.setPassword(invalidPassWithoutNum);
        emptyUserForRegistration.setUsername(validUsernameForReg);
        emptyUserForRegistration.setAge(validAgeForReg);
        emptyUserForRegistration.agreeWithTerms(true);
        let result = emptyUserForRegistration.register();
        expect(emptyUserForRegistration.registered).toBeFalsy;
        expect(result).toEqual(TextForUnSuccessReg);
    });
    //negative
    test("unsuccessful user registration - with a password less than 8 characters", () => {
        emptyUserForRegistration.setEmail(validEmailForReg);
        emptyUserForRegistration.setPassword(invalidPassLess8);
        emptyUserForRegistration.setUsername(validUsernameForReg);
        emptyUserForRegistration.setAge(validAgeForReg);
        emptyUserForRegistration.agreeWithTerms(true);
        let result = emptyUserForRegistration.register();
        expect(emptyUserForRegistration.registered).toBeFalsy;
        expect(result).toEqual(TextForUnSuccessReg);
    });
    //negative
    test("unsuccessful user registration - entering an empty field instead of username", () => {
        emptyUserForRegistration.setEmail(validEmailForReg);
        emptyUserForRegistration.setPassword(validPassForReg);
        emptyUserForRegistration.setUsername(emptyUsernameForReg);
        emptyUserForRegistration.setAge(validAgeForReg);
        emptyUserForRegistration.agreeWithTerms(true);
        let result = emptyUserForRegistration.register();
        expect(emptyUserForRegistration.registered).toBeFalsy;
        expect(result).toEqual(TextForUnSuccessReg);
    });
    //negative
    test("unsuccessful user registration - entering an age equal to 150", () => {
        emptyUserForRegistration.setEmail(validEmailForReg);
        emptyUserForRegistration.setPassword(validPassForReg);
        emptyUserForRegistration.setUsername(validUsernameForReg);
        emptyUserForRegistration.setAge(invalidAgeEqualTo150);
        emptyUserForRegistration.agreeWithTerms(true);
        let result = emptyUserForRegistration.register();
        expect(emptyUserForRegistration.registered).toBeFalsy;
        expect(result).toEqual(TextForUnSuccessReg);
    });
    test("unsuccessful user registration - entering an age equal to 0", () => {
        emptyUserForRegistration.setEmail(validEmailForReg);
        emptyUserForRegistration.setPassword(validPassForReg);
        emptyUserForRegistration.setUsername(validUsernameForReg);
        emptyUserForRegistration.setAge(invalidAgeEqualTo0);
        emptyUserForRegistration.agreeWithTerms(true);
        let result = emptyUserForRegistration.register();
        expect(emptyUserForRegistration.registered).toBeFalsy;
        expect(result).toEqual(TextForUnSuccessReg);
    });
    test("unsuccessful user registration - entering an age more than 150", () => {
        emptyUserForRegistration.setEmail(validEmailForReg);
        emptyUserForRegistration.setPassword(validPassForReg);
        emptyUserForRegistration.setUsername(validUsernameForReg);
        emptyUserForRegistration.setAge(invalidAgeMoreThan150);
        emptyUserForRegistration.agreeWithTerms(true);
        let result = emptyUserForRegistration.register();
        expect(emptyUserForRegistration.registered).toBeFalsy;
        expect(result).toEqual(TextForUnSuccessReg);
    });
  });
});


