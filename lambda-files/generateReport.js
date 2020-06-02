const PDFDocument = require('pdfkit');
const fs = require("fs");
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
const path = require('path');

module.exports = {
    createPdf: function(emailObj, CurrentDate) {
    
    let doc = new PDFDocument;
    
    let fileName = `migration-report-${CurrentDate}.pdf`;

    //We use Lambdas temp folder to store file temporarily.
    //When Lambda execution ends temp is flushed
    let file = fs.createWriteStream("/tmp/" + fileName);

    doc.pipe(file);
    
    doc.fontSize(20);
    doc.text("Scalar Cloud Migration Survey Report");
    doc.moveDown();
    
    doc.fontSize(10);
    doc.text("Name:");
    doc.text(`${emailObj.name}`);
    doc.moveDown();
    
    doc.text("Email:");
    doc.text(`${emailObj.email}`);
    doc.moveDown();
    
    doc.text("Job Title:");
    doc.text(`${emailObj.jobTitle}`);
    doc.moveDown();
    
    doc.text("Company:");
    doc.text(`${emailObj.company}`);
    doc.moveDown();
    
    doc.text("What Cloud Provider do you have in mind?");
    doc.text(`${emailObj.provider}`);
    doc.moveDown();
    
    doc.text("What percentage (%) of your workloads do you plan on migrating?");
    doc.text(`${emailObj.migratingPercentage}`);
    doc.moveDown();
    
    doc.text("Do you have a certified cloud staff?");
    doc.text(`${emailObj.certifiedStaff}`);
    doc.moveDown();
    // # Finalize PDF file 
    doc.end();
    
    uploadToS3(CurrentDate);
    
}
};

function uploadToS3(CurrentDate) {
    let fileName = path.basename(`migration-report-${CurrentDate}.pdf`);
    var fileStream = fs.createReadStream("/tmp/" + fileName);

    return new Promise(function(resolve, reject) {
        fileStream.once('error', reject);
        s3.upload(
            {
                Bucket: "ap-serverless-contact-form",
                Key: "form-records/" + fileName,
                Body: fileStream
            },
            function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            }
        );
    });
    
    }