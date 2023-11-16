// Document Management Module
var DocumentManager = {
    createGoogleDocFromTemplate: function(formData) {
        var sharedDriveFolderId = '[SharedDrive_Folder_ID]';
        var currentDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MMM-dd");
        var docName = currentDate + " - " + formData['Type of Ticket'] + " - " + formData['Ticket Owner'];

        var destinationFolder = DriveApp.getFolderById(sharedDriveFolderId);
        var template = DriveApp.getFileById(Utility.getTemplateIdByTypeOfTicket(formData.typeOfTicket));
        var doc = DocumentApp.openById(template.makeCopy(docName, destinationFolder).getId());

        this.replacePlaceholdersInDocument(doc, formData, formData.typeOfTicket);

        var subject = formData['Type of Ticket'] + " - " + formData['Ticket Owner'];
        doc.setName(docName + " - Ticket #" + formData.ticketId);

        return doc.getUrl();
    },

    updateGoogleDocTitle: function(docUrl, formData, ticketId) {
        var currentDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MMM-dd");
        var newDocTitle = currentDate + " - " + formData.typeOfTicket + " - " + formData.ticketOwner + " - Ticket #" + ticketId;

        var docId = DocumentApp.openByUrl(docUrl).getId();
        var doc = DriveApp.getFileById(docId);
        doc.setName(newDocTitle);
    },

    replacePlaceholdersInDocument: function(doc, formData, typeOfTicket) {
        var body = doc.getBody();
        
        if (typeOfTicket === 'Change') {
            body.replaceText('{{Ticket Owner}}', formData['Ticket Owner'] || '');
            body.replaceText('{{Type of Change}}', formData['Type of Change'] || '');
            body.replaceText('{{Customer Name}}', formData['Customer Name'] || '');
            body.replaceText('{{URL of Customer Instance}}', formData['URL of Customer Instance'] || '');
            body.replaceText('{{Customer ID}}', formData['Customer ID (CID)'] || '');
            body.replaceText('{{Notes}}', formData['Notes'] || '');
        } else if (typeOfTicket === 'Access Request') {
            body.replaceText('{{Name}}', formData['Name'] || '');
            body.replaceText('{{Email Address}}', formData['Ticket Owner'] || '');
            body.replaceText('{{Department}}', formData['Department'] || '');
            body.replaceText('{{Direct Supervisor Email}}', formData['Direct Supervisor Email'] || '');
            body.replaceText('{{System}}', formData['System'] || '');
            body.replaceText('{{Access Level}}', formData['Access Level'] || '');
            body.replaceText('{{Duration of Access}}', formData['Duration of Access'] || '');
            body.replaceText('{{Reason for Access}}', formData['Reason for Access'] || '');
            body.replaceText('{{User Agreement}}', formData['User Agreement'] || '');
        }
        // Add more 'else if' conditions for other types if needed
    }
};
