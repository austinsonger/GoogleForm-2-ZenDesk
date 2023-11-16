# GoogleForm-2-ZenDesk

### Purpose of the Code
This code is designed to automate the process of handling responses from a Google Form submission, creating a document based on a template, and generating a ticket in Zendesk (a customer service software).


##### Starting Point - onFormSubmit Function:
   - This function is triggered when a form is submitted.
   - It first checks if the form submission is valid. If not, it logs a message and stops.
   - It then collects the responses from the form and stores them in a structured format (`formData`).


##### Processing Form Responses:
   - The code loops through each response, categorizing them based on their title (like 'Type of Ticket' and 'Ticket Owner').
   - It identifies if the ticket is a 'Change' type and stores the relevant information.


##### Validation Check:
   - It checks if essential information like 'Type of Ticket' and 'Ticket Owner' is present. If not, it logs a message and s

##### Document Creation and Updating:
   - The code then uses a function (`createGoogleDocFromTemplateInSharedDriveFolder`) to create a Google Document from a template. This document is named and stored in a specific folder.
   - It replaces placeholders in the document with the actual form data.
   - The document title is updated with details like the type of ticket, ticket owner, and ticket ID.


##### Zendesk Ticket Creation:
   - A Zendesk ticket is created using the `createZendeskTicket` function.
   - This function constructs a ticket with a subject and a message body containing a link to the Google Document.
   - If the ticket type is 'Access Request', it sets a specific ticket status.


##### Spreadsheet Logging:
   - The `getSpreadsheetUrl` function is used to log the URL of a spreadsheet where form responses might be recorded.


##### Additional Functions:
   - `updateTicketStatus`: Updates the status of a Zendesk ticket.
   - `updateGoogleDocTitle`: Updates the title of the Google Document.
   - `getTemplateIdByTypeOfTicket`: Determines the template ID based on the type of ticket.
  
  
##### Security Note

The code includes sensitive information like a Zendesk token and email addresses, which should be securely managed.
