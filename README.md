# Connectwise Manage API - Workflow rules

##### RULE 01 - Remove email connectors from the 'cc' field of a ticket

    - Runs using the ticket callback API.
    - Every changes made to the ticket will trigger the callback.
    - If one of the following emails are added to the 'cc' section of a ticket:
        - accounts@bepoz.com.au
        - support@bepoz.com.au
        - support@vectron.com.au
        - workshop@bepoz.com.au
    - Then the funtion will run and remove those emails from the 'cc' section.
    - The ticket gets updated using the ticket PATCH API.
