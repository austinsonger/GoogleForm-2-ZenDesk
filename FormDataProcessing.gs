// Form Data Processing Module
function processFormResponses(itemResponses) {
    var formData = {};
    var typeOfTicket = '';
    var ticketOwner = '';
    var isChangeType = false;

    for (var i = 0; i < itemResponses.length; i++) {
        var itemResponse = itemResponses[i];
        var itemTitle = itemResponse.getItem().getTitle();
        var itemValue = itemResponse.getResponse();
        formData[itemTitle] = itemValue;

        if (itemTitle === 'Type of Ticket') {
            typeOfTicket = itemValue;
            if (itemValue === 'Change') {
                isChangeType = true;
            }
        } else if (itemTitle === 'Ticket Owner') {
            ticketOwner = itemValue;
        }
    }

    return { formData, typeOfTicket, ticketOwner, isChangeType };
}
