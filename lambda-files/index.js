'use strict';
var aws = require("aws-sdk");
const helpers = require('./sendEmail.js');
const pdf = require('./generateReport.js');
const moment = require('moment')

exports.handler = (event, context, callback) => {
    
    var CurrentDate = moment().format('YYYY-MM-DD_h:mm:ss');
    var emailObj = JSON.parse(event.body);
    
    pdf.createPdf(emailObj, CurrentDate);
    
    if (emailObj.migratingPercentage == "<30%" && emailObj.certifiedStaff == "Yes"){
        helpers.sendEmailClient(emailObj, CurrentDate);
    } else {
        helpers.sendEmailSA(emailObj, CurrentDate);
    }
    
};