
db.createUser({
    user: 'MongoDBUSER',
    pwd: 'SuperSecretDatabasePassword',
    roles: [{
        role: 'readWrite',
        db: 'ButtonStorage'
    }]

})
