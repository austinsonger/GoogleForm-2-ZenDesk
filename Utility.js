// Utility Module
var Utility = {
    getSpreadsheetUrl: function() {
        var spreadsheetId = '[SPREADSHEET_ID]';
        var sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
        var lastRow = sheet.getLastRow();

        if (lastRow) {
            var sheetUrl = "https://docs.google.com/spreadsheets/d/" + spreadsheetId;
            return sheetUrl + "#gid=" + sheet.getSheetId() + "&range=A" + lastRow;
        } else {
            return "No response found";
        }
    },

    getTemplateIdByTypeOfTicket: function(typeOfTicket) {
        var templateId;
        switch (typeOfTicket) {
            case 'Access Request':
                templateId = '[TEMPLATE_ID]';
                break;
            case 'Incident':
                templateId = '[TEMPLATE_ID]';
                break;
            case 'Change':
                templateId = '[TEMPLATE_ID]';
                break;
            default:
                templateId = '[TEMPLATE_ID]'; // Default template
        }
        return templateId;
    }
};
