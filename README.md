# Rebel-Demo
## Summary
This is my interprtation of the "accounting" portion of this development challenge: (https://github.com/rebeldotcom/roster-challenge-api-and-ui). Although you will notice an "analytics" section in the frontend application, that portion was not completed in the time alloted.

I decided to create a ficticious company, called Rebel, using the logo from rebel.com (the real company). This application allows a user from the hypethetical "accounting" department to access the artist data for their record label, and the associated attributes for each artist. Atrists contain the following attributes: "artist", "rate", "streams", and "overdue". Note that I modified the original JSON file, in order to include a new category (key/value pair), called "overdue". I generated a random number between 1 and 10 for each artist, and assigned them that value. This could be interpreted as a company where the business model alots their artists royalties on a per-chunk basis (ie: if you reach a certain amount of revenue, between the combination of your streams and your rate, say $1000 worth of streams, then you would be payed out 1 chunk or unit of $1000). The CRUD operations are persistant on the backend server (written to a JSON file), as well as a database (running SQLServer). The focus with this project was mostly on the frontend, in trying to make a user interface which looked nice and was easy to operate.

## Important Details:
Website Link: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; http://143.110.220.37/  
Database Credentials: - Server: sql9.freemysqlhosting.net  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Name: sql9599342  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Username: sql9599342  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Password: IPQQUZdtfw  
Original Challenge: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://github.com/rebeldotcom/roster-challenge-api-and-ui  
                      
## Requirements
1) LEMP Stack (Linux distro, Nginx, MySQL, PHP)
2) NodeJS (NPM is also recommended, for subsiquent installatoin)
3) The following NodeJS modules: body-parser, cors, express
   note: I reccomend also installing pm2 to run node services
4) A MySQL database 

## Installation / How to run the program
Step 1) On the server where you have the website hosted, direct traffic to your desired content folder (in my case it was the default /var/www/html that comes with NGINX), and place your file there. In my case, I decided to keep the default configuration for NGINX (/etc/nginx/sites-available/default), and I just added a server block for a NodeJS service (express server), which is used as part of the backend. The NodeJS service is an Express server, which listens on port 3000, here is what my server block looks like:

server {

        listen 3000;


        location / {


        proxy_pass http://143.110.220.37/:3000;
        proxy_http_version 1.1;
        proxy_set_header connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        # Send the ipaddress upstream
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;


         }
}

Step 2) I reccommend you install Node modules and other dependencies within the root folder (in my case, it is /var/wwww/html/). Install the required Node modules.
Step 3) When you are ready to start the backend API (which handles CRUD operations), you can start a service with the following command: node js/server-side-functionality.js which will allow you to biew the various echos from PHP, and console logs from express and other thinggs useful for debugging. Otherwise, you can run in the background or use pm2 (ie: pm2 start js/server-side-functionality.js).
Step 4) Now, when you vist the frontend application (http://143.110.220.37/), you will be able to make changes to the artist roster (persistant).



## Layout
### General Layout
There are three main parts to this appliction, which follow the M.V.C. design philosophy. In this case, the model is represented by the mySQL database, as well as the current JSON file being maintained (one could be considered a backup). The View, or frontend of the application, is the webpage hosted here: (http://143.110.220.37/). The front end uses html, css, and javascript to provide the user with a way to manage the current artist roster. For CRUD operations, the frontend submits an HTTP POST request to the backend (Express server, running through NGINX on port 3000). Once the backend (controller) receives the CRUD request, it first applies the new or revised JSON objects to the exisintg roster (current_roster.json), then the backend forks a child process (nodeJS calls Ubunutu system call), which opens a PHP script. This PHP script is passed in a command line argument (accesible at $argv[1]) which contains the CRUD information (one record/artist/script at a time), and then the CRUD information is converted into an SQL query, which is then submitted to the remote database.

#### Note about refreshing:
When ever you perform any CRUD operations, in order to resfresh the data (you may also need to clear your cache) you will ne to refresh the table. If you click on the "Accounting" button, this will also refresh the table data (there is an onClick() handler that destroys the html content where the table was, and creates new html content with the updated table data using Ajax).
