import validator from 'validator';
class ValidatorService {

    isEmail(emailId) {
        return validator.isEmail(emailId);
    }

    isValidPassword(password) {
        return password.length > 6;
    }

}

export default new ValidatorService();