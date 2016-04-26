    var paystack = require('paystack')(sails.config.settings.paystack_key);
module.exports = {
    addCustomer: function(customerObj) {
        return paystack.customers.create(customerObj, function(err, customer) {
            if (err) return err;
            return customer;
        });
    },
    listCustomer: function() {
        return paystack.customers.list(function(err, customer) {
            if (err) return err;
            return customer;
        });
    },
    retrieveCustomer: function(customerId) {
        return paystack.customers.get(customerId, function(err, customer) {
            if (err) return err;
            return customer;
        });
    },
    updateCustomer: function(customerId, customerObj) {
        return paystack.customers.update(customerId, customerObj, function(err, customer) {
            if (err) return err;
            return customer;
        });
    },
    deleteCustomer: function(customerObj) {
        return paystack.customers.delete(customerObj, function(err, customer) {
            if (err) return err;
            return customer;
        });
    },

    createToken: function(transactionObj) {
        return paystack.transaction.initialize(transactionObj, function(err, transaction) {
            if (err) return err;
            return transaction;
        });
    },
    charge: function(chargeObj) {
        return paystack.transaction.charge(chargeObj, function(err, transaction) {
            if (err) return err;
            return transaction;
        });
    },
    chargeToken: function(chargeObj) {
        return paystack.transaction.chargeToken(chargeObj, function(err, transaction) {
            if (err) return err;
            return transaction;
        });
    },
    createSubscription: function(customer, planOptions , cb) {
        console.log('subscription paystack called')
        var planObj = planOptions;
        planObj.email = customer;
        return paystack.transaction.initialize(planObj, cb)


    },
    getTransaction: function(transactionId) {
        return paystack.transaction.get(transactionId, function(err, transaction) {
            if (err) return err;
            return transaction;
        });
    },
    listTransaction: function() {
        return paystack.transaction.list(function(err, transaction) {
            if (err) return err;
            return transaction;
        });
    },
    totals: function() {
        return paystack.transaction.totals(function(err, transaction) {
            if (err) return err;
            return transaction;
        });
    },

    verifyTransaction: function(referenceId) {
        return paystack.transaction.verify(referenceId, function(err, transaction) {
            if (err) return err;
            return transaction;
        });
    },
    createPlan: function(planObj) {
        return paystack.plan.create(planObj, function(err, plan) {
            if (err) return err;
            return plan;
        });
    },
    getPlan: function(planId) {
        return paystack.plan.get(function(err, plan) {
            if (err) return err;
            return plan;
        });
    },
    listPlan: function() {
        return paystack.plan.create(function(err, plan) {
            if (err) return err;
            return plan;
        });
    },
    updatePlan: function(planId, planObj) {
        return paystack.plan.update(planId, planObj, function(err, plan) {
            if (err) return err;
            return plan;
        });
    },







}
