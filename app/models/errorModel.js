let ErrorCode = (error) => {
    if (error.name == 'ValidationError') {
        return 400;
    }

    return 500;
};

let ErrorModel = (code, message) => {
    return {
        status: code,
        message: message,
    };
};

module.exports.code = ErrorCode;
module.exports.model = ErrorModel;