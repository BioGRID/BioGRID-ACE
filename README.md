# BioGRID - Annotation and Curation Engine (ACE)
This is the repository for the BioGRID Annotation and Curation Engine (ACE) a tool for handling literature curation tasks and managing annotation resources required to complete those tasks.

## STATUS
+ IN PROGRESS
+ Version: 0.0.2 ALPHA

## REQUIREMENTS
+ GIT 2.23+ (https://git-scm.com/download)
+ Node.js 10.16.3+ (https://nodejs.org/en/)

## ENVIRONMENT VARIABLES
To launch the application, you must generate a .env file in the root folder and enter the following variables

+ NUXT_ENV_APP_TITLE_SHORT (a short name for the app. Ex. ```BioGRID ACE```)
+ NUXT_ENV_APP_TITLE_LONG (a longer name for the app. Ex. ```BioGRID Annotation and Curation Engine```)

## BUILD SETUP
1. Manually install all of the requirements listed above
2. Create a directory for development
3. Clone this repository `git clone https://github.com/BioGRID/IMS4.git` or you can download it directly and extract it locally
4. Create ENVIRONMENT files as specified above
5. Run `npm install` to install all dependencies
6. Run `npm run dev` to serve a development version of the site with hot reload capabilities located at `localhost:3000`
7. Run `npm run build` to build for production
8. Run `npm run start` to launch node.js and serve the production version of the application.