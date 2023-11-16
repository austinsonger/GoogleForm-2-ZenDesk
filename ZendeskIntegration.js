// Zendesk Integration Module
var ZendeskIntegration = {
    createZendeskTicket: function(formData, docUrl) {
        var zendeskUrl = 'https://[SUBDOMAIN].zendesk.com/api/v2/tickets.json';
        var username = '[EMAIL ADDRESS]/token';
        var token = '[ZENDESK_API_PASSWORD_TOKEN]';

        var subject = formData.typeOfTicket + " - " + (formData.typeOfTicket === 'Access Request' ? (formData['Name'] || 'Unknown') : formData.ticketOwner);
        var messageBody = "Please refer to the linked Google Document for more details: " + docUrl;

        var payload = JSON.stringify({
            "ticket": {
                "subject": subject,
                "comment": { "body": messageBody },
                "type": formData.typeOfTicket === 'Access Request' ? 'task' : 'other_type'
            }
        });

        var options = {
            "method" : "post",
            "contentType" : "application/json",
            "headers" : {
                "Authorization" : "Basic " + Utilities.base64Encode(username + ':' + token)
            },
            "payload" : payload
        };

        try {
            var response = UrlFetchApp.fetch(zendeskUrl, options);
            var responseData = JSON.parse(response.getContentText());
            var ticketId = responseData.ticket.id;

            if (formData.typeOfTicket === 'Access Request') {
                var customStatusId = [CUSTOMSTATUS_ID];  // Looks like this '19099011365655'
                this.updateTicketStatus(ticketId, customStatusId);
            }

            return ticketId;
        } catch (error) {
            Logger.log(error.toString());
            return null;
        }
    },

    updateTicketStatus: function(ticketId, customStatusId) {
        var zendeskUrl = 'https://[SUBDOMAIN].zendesk.com/api/v2/tickets/' + ticketId + '.json';
        var username = '[EMAIL ADDRESS]/token';
        var token = '[ZENDESK_API_PASSWORD_TOKEN]';

        var payload = JSON.stringify({
            "ticket": {
                "custom_status_id": customStatusId
            }
        });

        var options = {
            "method" : "put",
            "contentType" : "application/json",
            "headers" : {
                "Authorization" : "Basic " + Utilities.base64Encode(username + ':' + token)
            },
            "payload" : payload
        };

        try {
            UrlFetchApp.fetch(zendeskUrl, options);
            // Log success or handle as needed
        } catch (error) {
            Logger.log('Error updating ticket status: ' + error.toString());
        }
    }
};
