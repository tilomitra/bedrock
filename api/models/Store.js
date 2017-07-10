var Store = {
    tableName: "Stores",

    attributes: {
        name: { type: "string", size: 180 },
        accessToken: { type: "string", unique: true, size: 180 },
        nonce: { type: "string", unique: true, size: 180 }
    }
};

module.exports = Store;
