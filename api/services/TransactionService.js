module.exports = {

    log: function(organization, user, action, collection, description, object) {
        var log = {
            organization: organization,
            user: user,
            action: action.toUpperCase(),
            collection: collection.toUpperCase(),
            description: description,
            transactionObject: object
        };

        Transaction.create(log).then(function(createdLog) {
                if (!createdLog) {
                    return console.log("Could not create Audit Trail");
                }
            })
            .catch(function(err) {
                return console.log(err);
            })
    }

}
