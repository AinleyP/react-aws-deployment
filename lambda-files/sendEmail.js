'use strict';
var aws = require("aws-sdk");
var ses = new aws.SES();
const nodemailer = require('nodemailer');
const sesConfirmedAddress = "ainley.pena@scalar.ca";


module.exports = {
    
    sendEmailSA: function(emailObj, CurrentDate) {
        
        var mailOptions = {
            from: sesConfirmedAddress,
            subject: `Cloud Migration Survey: ${emailObj.name}`,
            html: `
                <p>Hi there,</p>
                <br/ >
                <p>Please see the attached cloud migration report from ${emailObj.email}</p>`,
            to: sesConfirmedAddress,
            attachments: [
                {
                    filename: `migration-report-${CurrentDate}.pdf`,
                    path: `/tmp/migration-report-${CurrentDate}.pdf`,
                    contentType: 'application/pdf'
                }
            ]
        };
    
        // create Nodemailer SES transporter
        var transporter = nodemailer.createTransport({
            SES: ses
        });
    
        // send email
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log("Error sending email");
                callback(err);
            } else {
                console.log("Email sent successfully");
                callback();
            }
        });
        
    },
    
    sendEmailClient: function (emailObj, CurrentDate) {
        
        var mailOptions = {
            from: sesConfirmedAddress,
            subject: `Cloud Migration Survey: ${emailObj.name}`,
            html: 
                `<p>Hi there,</p><br/ >
                <p>Thank you for taking the time to complete our cloud migration survey. Attached to this email is a report outlining your responses</p>`,
            to: sesConfirmedAddress, //once code is out in sandbox, you can add an email address here
            attachments: [
                {
                    filename: `migration-report-${CurrentDate}.pdf`,
                    path: `/tmp/migration-report-${CurrentDate}.pdf`,
                    contentType: 'application/pdf'
                }
            ]
            };
    
        // create Nodemailer SES transporter
        var transporter = nodemailer.createTransport({
            SES: ses
        });
    
        // send email
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log("Error sending email");
                callback(err);
            } else {
                console.log("Email sent successfully");
                callback();
            }
        });
    }
};

