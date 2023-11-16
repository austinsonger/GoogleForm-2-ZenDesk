function onFormSubmit(e) {
    Logger.log('Event object:', e);
    if (!e || !e.response) {
        Logger.log('The function must be triggered by a form response.');
        return;
    }

    var formData = processFormResponses(e.response.getItemResponses());
    if (!formData.typeOfTicket || !formData.ticketOwner) {
        Logger.log('Type of Ticket or Ticket Owner not found or is empty');
        return;
    }

    var docUrl = DocumentManager.createGoogleDocFromTemplate(formData);
    var ticketId = ZendeskIntegration.createZendeskTicket(formData, docUrl);

    DocumentManager.updateGoogleDocTitle(docUrl, formData, ticketId);

    Logger.log('Zendesk Ticket ID: ' + ticketId);
    Logger.log('Spreadsheet URL: ' + Utility.getSpreadsheetUrl());
    Logger.log('Updated Google Doc URL: ' + docUrl);
}
