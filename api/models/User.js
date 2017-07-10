var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,
    tableName: "Users",

    attributes: {
        username: { type: "string", unique: true, size: 180 },
        email: { type: "email", unique: true, size: 180 },
        passports: { collection: "Passport", via: "user" }
    }
};

module.exports = User;
