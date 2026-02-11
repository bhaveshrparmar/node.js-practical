const otpGenerator = require('otp-generator');

exports.generateOTP = () => {
    return otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });
};

exports.verifyOTP = (otp, hashedOtp) => {
    return otp === hashedOtp;
};
