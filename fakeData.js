const casual = require('casual');

const getPayload = function() {
    return {
        name: casual.name,
        address: casual.address,
        message: casual.text,
        title: casual.title
    }
}

module.exports = {
    getPayload: getPayload
}
