var mandrill = require('mandrill-api/mandrill'),
    ejs = require('ejs'),
    fs = require('fs'),
    SparkPost = require('sparkpost'),
    spClient = new SparkPost(sails.config.settings.sparkPostKey);
emailClient = sails.config.settings.emailClient;

module.exports = {
    mandrillClient: mandrill_client = new mandrill.Mandrill(sails.config.settings.mandrillKey),
    sparkPostClient: mandrill_client = new mandrill.Mandrill(sails.config.settings.mandrillKey),

    /**
     * Send email
     */
    sendSingleEmail: function(subject, message, fromData, toData, replyToEmail, async, cb) {
        if (emailClient.toLowerCase() == 'sparkpost') {
            this.sendSingleEmailSparkpost(subject, message, fromData, toData, replyToEmail, async, cb)
        } else {
            this.sendSingleEmailMandrill(subject, message, fromData, toData, replyToEmail, async, cb)
        }
    },
    sendSingleEmailMandrill: function(subject, message, fromData, toData, replyToEmail, async, cb) {
        var msgObj = {
            html: message,
            auto_text: true,
            subject: subject,
            from_email: fromData.email,
            from_name: fromData.name,
            to: [{
                "email": toData.email,
                "name": toData.name,
                "type": "to"
            }],
            headers: {
                "Reply-To": "noreply@policecheck.com"
            },
        };
        return this.client.messages.send({
            "message": msgObj,
            "async": async
        }, function(result) {
            return cb(null, result);
        }, function(err) {
            return cb(err);
        });
    },
    sendSingleEmailSparkpost: function(subject, message, fromData, toData, replyToEmail, async, cb) {

        var reqOpts = {
            transmissionBody: {
                recipients: [{
                    address: {
                        email: toData.email,
                        name: toData.name
                    }
                }],
                content: {
                    from: {
                        name: fromData.name,
                        email: fromData.email
                    },
                    subject: subject,
                    html: message
                }
            }
        };
        spClient.transmissions.send(
            reqOpts,
            function(err, res) {
                if (err) {
                    return cb(err);
                }
                return cb(null, result);

            });
    },

    sendSingleTemplateEmail: function(toData, templateName, globalMergeVars, cb) {
        if (emailClient.toLowerCase() == 'sparkpost') {
            this.sendSingleTemplateEmailSparkpost(toData, templateName, globalMergeVars, cb)
        } else {
            this.sendSingleTemplateEmailMandrill(toData, templateName, globalMergeVars, cb)
        }
    },
    sendSingleTemplateEmailMandrill: function(toData, templateName, globalMergeVars, cb) {
        var cb = cb || function() {};
        var msgObj = {
            auto_text: true,
            from_email: 'noreply@policecheck.ng',
            from_name: 'Policecheck',
            to: [{
                "email": toData.email,
                "name": toData.firstname + ' ' + toData.lastname,
                "type": "to"
            }],
            headers: {
                "Reply-To": "noreply@policecheck.ng"
            },
            "global_merge_vars": globalMergeVars,
            "merge": true,
            "merge_language": "handlebars",
        };
        return this.client.messages.sendTemplate({
            "message": msgObj,
            "async": false,
            "template_name": templateName,
            "template_content": []
        }, function(result) {
            return cb(null, result);
        }, function(err) {
            return cb(err);
        });
    },
    sendSingleTemplateEmailSparkpost: function(toData, templateName, globalMergeVars, cb) {
        var cb = cb || function() {};
        var msgObj = {
            auto_text: true,
            from_email: 'noreply@policecheck.ng',
            from_name: 'Policecheck',
            to: [{
                "email": toData.email,
                "name": toData.firstname + ' ' + toData.lastname,
                "type": "to"
            }],
            headers: {
                "Reply-To": "noreply@policecheck.ng"
            },
            "global_merge_vars": globalMergeVars,
            "merge": true,
            "merge_language": "handlebars",
        };
        return this.client.messages.sendTemplate({
            "message": msgObj,
            "async": false,
            "template_name": templateName,
            "template_content": []
        }, function(result) {
            return cb(null, result);
        }, function(err) {
            return cb(err);
        });
    },
    sendBatchTemplateEmail: function(toData, templateName, globalMergeVars, mergeVars, cb) {
        if (emailClient.toLowerCase() == 'sparkpost') {
            this.sendBatchTemplateEmailSparkpost(toData, templateName, globalMergeVars, mergeVars, cb)
        } else {
            this.sendBatchTemplateEmailMandrill(toData, templateName, globalMergeVars, mergeVars, cb)
        }
    },


    sendBatchTemplateEmailMandrill: function(toData, templateName, globalMergeVars, mergeVars, cb) {
        var cb = cb || function() {};
        var msgObj = {
            auto_text: true,
            from_email: 'noreply@policecheck.ng',
            from_name: 'policecheck',
            to: toData,
            headers: {
                "Reply-To": "noreply@policecheck.ng"
            },
            "global_merge_vars": globalMergeVars,
            "merge_vars": mergeVars,
            "merge": true,
            "merge_language": "handlebars",
        };
        return this.client.messages.sendTemplate({
            "message": msgObj,
            "async": false,
            "template_name": templateName,
            "template_content": []
        }, function(result) {
            return cb(null, result);
        }, function(err) {
            return cb(err);
        });
    },
    sendBatchTemplateEmailSparkpost: function(toData, templateName, globalMergeVars, mergeVars, cb) {
        var cb = cb || function() {};
        var msgObj = {
            auto_text: true,
            from_email: 'noreply@policecheck.ng',
            from_name: 'policecheck',
            to: toData,
            headers: {
                "Reply-To": "noreply@policecheck.ng"
            },
            "global_merge_vars": globalMergeVars,
            "merge_vars": mergeVars,
            "merge": true,
            "merge_language": "handlebars",
        };
        return this.client.messages.sendTemplate({
            "message": msgObj,
            "async": false,
            "template_name": templateName,
            "template_content": []
        }, function(result) {
            return cb(null, result);
        }, function(err) {
            return cb(err);
        });
    },

    /*
     * Send email to multiple recipients
     */
    sendBatchEmail: function(subject, message, fromData, to, replyToEmail, async, cb) {
        if (emailClient.toLowerCase() == 'sparkpost') {
            this.sendBatchEmailSparkpost(subject, message, fromData, to, replyToEmail, async, cb)
        } else {
            this.sendBatchEmailMandrill(subject, message, fromData, to, replyToEmail, async, cb)
        }
    },
    sendBatchEmailMandrill: function(subject, message, fromData, to, replyToEmail, async, cb) {
        var msgObj = {
            html: message,
            auto_text: true,
            subject: subject,
            from_email: fromData.email,
            from_name: fromData.name,
            to: to,
            headers: {
                "Reply-To": "noreply@policecheck.com"
            },
        };
        return this.client.messages.send({
            "message": msgObj,
            "async": async
        }, function(result) {
            return cb(null, result);
        }, function(err) {
            return cb(err);
        });
    },
    sendBatchEmailSparkpost: function(subject, message, fromData, to, replyToEmail, async, cb) {
        var msgObj = {
            html: message,
            auto_text: true,
            subject: subject,
            from_email: fromData.email,
            from_name: fromData.name,
            to: to,
            headers: {
                "Reply-To": "noreply@policecheck.com"
            },
        };
        return this.client.messages.send({
            "message": msgObj,
            "async": async
        }, function(result) {
            return cb(null, result);
        }, function(err) {
            return cb(err);
        });
    },

    /**
     * Send email with attachment
     */

    sendEmailAttachment: function(subject, message, fromData, toData, replyToEmail, attachment, async, cb) {
        if (emailClient.toLowerCase() == 'sparkpost') {
            this.sendEmailAttachmentSparkpost(subject, message, fromData, toData, replyToEmail, attachment, async, cb)
        } else {
            this.sendEmailAttachmentMandrill(subject, message, fromData, toData, replyToEmail, attachment, async, cb)
        }
    },
    sendEmailAttachmentMandrill: function(subject, message, fromData, toData, replyToEmail, attachment, async, cb) {
        var msgObj = {
            html: message,
            auto_text: true,
            subject: subject,
            from_email: fromData.email,
            from_name: fromData.name,
            to: [{
                "email": toData.email,
                "name": toData.name,
                "type": "to"
            }],
            headers: {
                "Reply-To": "noreply@policecheck.com"
            },
            attachments: {
                "type": attachment.type,
                "name": attachment.name,
                "content": attachment.content
            },
        };
        return this.client.messages.send({
            "message": msgObj,
            "async": async
        }, function(result) {
            return cb(null, result);
        }, function(err) {
            return cb(err);
        });
    },
    sendEmailAttachmentSparkpost: function(subject, message, fromData, toData, replyToEmail, attachment, async, cb) {
        var msgObj = {
            html: message,
            auto_text: true,
            subject: subject,
            from_email: fromData.email,
            from_name: fromData.name,
            to: [{
                "email": toData.email,
                "name": toData.name,
                "type": "to"
            }],
            headers: {
                "Reply-To": "noreply@policecheck.com"
            },
            attachments: {
                "type": attachment.type,
                "name": attachment.name,
                "content": attachment.content
            },
        };
        return this.client.messages.send({
            "message": msgObj,
            "async": async
        }, function(result) {
            return cb(null, result);
        }, function(err) {
            return cb(err);
        });
    },

    sendPasswordReset: function(email, tempData, cb) {
        if (emailClient.toLowerCase() == 'sparkpost') {
            this.sendPasswordResetSparkpost(email, tempData, cb)
        } else {
            this.sendPasswordResetMandrill(email, tempData, cb);
        }
    },
    sendPasswordResetMandrill: function(email, tempData, cb) {
        var cb = cb || function() {};
        var subject = "Password Reset"
        var from = {
            email: 'noreply@policecheck.com',
            name: 'Policecheck'
        };
        var to = {
            email: email,
            name: null
        };
        // generate message from template and send
        var tempFile = 'assets/templates/email/password-reset.ejs';
        fs.readFile(tempFile, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            var msg = ejs.render(data, tempData);
            return this.sendSingleEmail(subject, msg, from, to,
                'noreply@policecheck.com', false, cb);
        }.bind(this));
    },
    sendPasswordResetSparkpost: function(email, tempData, cb) {
        var cb = cb || function() {};
        var subject = "Password Reset"
        var from = {
            email: 'noreply@policecheck.com',
            name: 'Policecheck'
        };
        var to = {
            email: email,
            name: null
        };
        // generate message from template and send
        var tempFile = 'assets/templates/email/password-reset.ejs';
        fs.readFile(tempFile, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            var msg = ejs.render(data, tempData);
            return this.sendSingleEmail(subject, msg, from, to,
                'noreply@policecheck.com', false, cb);
        }.bind(this));
    },

    /**
     * Send user registration verification email
     * @param {String} email employer email
     * @param {Object} tempData data to bind in template
     * @param {Function} cb callback
     */

    sendRegistrationEmailVerification: function(email, tempData, cb) {
        if (emailClient.toLowerCase() == 'sparkpost') {
            this.sendRegistrationEmailVerificationSparkpost(email, tempData, cb)
        } else {
            this.sendRegistrationEmailVerificationMandrill(email, tempData, cb);
        }
    },

    sendRegistrationEmailVerificationMandrill: function(email, tempData, cb) {
        var cb = cb || function() {};
        var subject = "Verify Your Account"
        var from = {
            email: 'noreply@verifyng.com',
            name: 'VerifyNG'
        };
        var to = {
            email: email,
            name: null
        };
        if (tempData.reVerify == true) {
            var template = 'assets/templates/email/resend-verification.ejs';
        } else {
            var template = 'assets/templates/email/verify-registration.ejs';
        }

        // generate message from template and send
        fs.readFile(template, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            var msg = ejs.render(data, tempData);
            return this.sendSingleEmail(subject, msg, from, to,
                'noreply@verifyng.com', false, cb);
        }.bind(this));
    },

    sendRegistrationEmailVerificationSparkpost: function(email, tempData, cb) {
        var reqOpts = {
            transmissionBody: {
                recipients: [{
                    address: {
                        email: email,
                    }
                }],
                content: {
                    from: {
                        name: 'Verifi',
                        email: 'registration@verifi.ng'
                    },
                    subject: subject,
                    html: '<html>Your Verifi Account has been successfully created. </html>'
                }
            }
        };
        spClient.transmissions.send(
            reqOpts,
            function(err, res) {
                if (err) {
                    return cb(err);
                }
                return cb(null, result);

            });
    },

    /**
     * Send Invitation email to contacts
     * @param {String} email employer email
     * @param {Object} tempData data to bind in template
     * @param {Function} cb callback
     */
    sendInvitationEmail: function(contacts, sender, cb) {
        if (emailClient.toLowerCase() == 'sparkpost') {
            this.sendInvitationEmailSparkpost(contacts, sender, cb)
        } else {
            this.sendInvitationEmailMandrill(contacts, sender, cb);
        }
    },

    sendInvitationEmailMandrill: function(contacts, sender, cb) {
        var cb = cb || function() {};
        var subject = "Try out policecheck."
        var from = {
            email: 'noreply@policecheck.com',
            name: 'Policecheck'
        };

        var to = [];
        _.forEach(contacts, function(email) {
            to.push(email);
        });

        var template = 'assets/templates/email/send-invitations.ejs';

        // generate message from template and send
        fs.readFile(template, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            var msg = ejs.render(data, { sender: sender });
            return this.sendBatchEmail(subject, msg, from, to, 'noreply@policecheck.com', false, cb);
        }.bind(this));
    },
    sendInvitationEmailSparkpost: function(contacts, sender, cb) {
        var cb = cb || function() {};
        var subject = "Try out policecheck."
        var from = {
            email: 'noreply@policecheck.com',
            name: 'Policecheck'
        };

        var to = [];
        _.forEach(contacts, function(email) {
            to.push(email);
        });

        var template = 'assets/templates/email/send-invitations.ejs';

        // generate message from template and send
        fs.readFile(template, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            var msg = ejs.render(data, { sender: sender });
            return this.sendBatchEmail(subject, msg, from, to, 'noreply@policecheck.com', false, cb);
        }.bind(this));
    },
}
