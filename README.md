# Tasklist Project
*This is a demo task list project written in React, Django Rest Framework 
 and containerised through docker.*

# Quick start
Just run:
        
        sudo make staging
There is one superuser created with the following credentials:

        email: admin@admin.com
        password: Adminr00t
That's it. Now you can navigate and do whatever you want in the app, or at 
the django admin site.

# Development mode:

This project supports webpack hot reloading for the frontend.
Every change that happens in Frontend is imidiatelly reflected at the browser.

In order to run the whole project in development mode you have to run the following command:

        sudo make dev

* The backend is running in http://localhost:8001
* The frontend is running in http://localhost:8000


Once the project is up and running you have full control at developing.
You can make any change at the source code on Backend or Frontend and it will be loaded immediately.

In order to kill all running containers and bring the project down please enter
the following command at the root of the project:

        sudo make kill_dev

# Production mode:

Now in the production side you have to insert at the root of the repo:

        sudo make staging

Now the project is accessible at http://localhost:8000

What do we have here?

* The frontend and the backend are running in the private docker network
* An Nginx container is sitting in gfront of the services and proxing 
the requests that are done by the browser as appropriate.
  
In order to kill all running containers and bring the project down please enter
the following command at the root of the project:

        sudo make kill_staging
        
# Production mode:

Don't try this yet. It's under construction.

# Basic Structure

* ###  Backend
         This is the django application. There are no surprises in this point.
* ### Frontend
         This is the frontend application as it states. Everything that we care about developement is
         located at the src folder. In both production and developement mode whatever change there has 
         to be done should live in this folder. Everything that interacts at the
         frontend has to be in backend/api directory. Any other directories in the 
         backend has to do with django admin and models definitions.


              ├── frontend
              │   ├── src
              |
              ├── backend
              │   ├── api
* ### Config
        In this directory for now lives the Nginx configuration. We need this configuration to overide the 
        default configuration Nginx has.

* ### ETC
        If you want to clean the logging folders and the bundles created 
        in the frontend builds then you have to run:
                sudo make clean

* ### TODO's
        * Add sign up functionality for user
        * Add email support when the user tries to use the contact us form.
        * Add verification of email on sign up of the user.
        * Some styling changes in tasks views and in contact us.
