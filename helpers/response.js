exports.response = (res, data, success, message = '', code = 200) => {
    // fix to handle errors manifests
    if (typeof (message) !=='string') {
        message  = message.message;
    }

    let response = {
        success: success,
        status: {
            code: code,
            message: message
        },
        data: data
    }

    return res.status(code).json(response);
}