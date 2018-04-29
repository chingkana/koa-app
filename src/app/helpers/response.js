exports.error = message => {
    return {
        message
    };
};

exports.success = (message, data = []) => {
    return {
        message,
        data
    };
};
