# BioGRID - Annotation and Curation Engine (ACE)
This is the repository for the BioGRID Annotation and Curation Engine (ACE) a tool for handling literature curation tasks and managing annotation resources required to complete those tasks.

![BioGRID Ace Logo](https://raw.githubusercontent.com/BioGRID/BioGRID-ACE/main/static/images/biogridace_logo_large_light.png)

## STATUS
+ IN PROGRESS
+ Version: 0.0.4 ALPHA
+ State: Unstable

## REQUIREMENTS
+ GIT 2.23+ (https://git-scm.com/download)
+ Node.js 10.16.3+ (https://nodejs.org/en/)

## ENVIRONMENT VARIABLES
To launch the application, you must generate a .env file in the root folder and enter the following variables

#### Main Application ENVIRONMENT Variables
+ NUXT_ENV_APP_TITLE_SHORT (a short name for the app. Ex. ```BioGRID ACE```)
+ NUXT_ENV_APP_TITLE_LONG (a longer name for the app. Ex. ```BioGRID Annotation and Curation Engine```)

#### Google FireBase ENVIRONMENT Variables
To use this application, you must register a new Firebase application. After completing registration, you must fill out these corresponding environment variables in your .env file.
+ NUXT_ENV_FIREBASE_API_KEY
+ NUXT_ENV_FIREBASE_AUTH_DOMAIN
+ NUXT_ENV_FIREBASE_PROJECT_ID
+ NUXT_ENV_FIREBASE_STORAGE_BUCKET
+ NUXT_ENV_FIREBASE_MESSAGE_SENDING_ID
+ NUXT_ENV_FIREBASE_APP_ID

#### Miscellaneous ENVIRONMENT Variables
##### Default Login Credentials:
If you want to have the username and password fields filled in by default, set the following two environment variables. Useful for development environments requiring constant login and logout.
+ NUXT_ENV_LOGIN_DEFAULT (optional)
+ NUXT_ENV_PASSWORD_DEFAULT (optional)

## BUILD SETUP
1. Manually install all of the requirements listed above
2. Create a directory for development
3. Clone this repository `git clone https://github.com/BioGRID/BioGRID-Ace.git` or you can download it directly and extract it locally
4. Create ENVIRONMENT files as specified above
5. Run `npm install` to install all dependencies
6. Run `npm run dev` to serve a development version of the site with hot reload capabilities located at `localhost:3000`
7. Run `npm run build` to build for production
8. Run `npm run start` to launch node.js and serve the production version of the application.

## Firebase Setup
1. To utilize this application, you must setup and configure firebase for authentication.
2. Make sure you have a firebase account: **https://firebase.google.com/**
3. Enable firebase authentication and the `email/password` authentication option
4. Enable firebase functions (this requires swapping from the free to `pay-as-you-go` option, but limits are still very high before costs)
5. Enter all firebase configuration settings for your application in the `.env` file as specified above
6. Download and install firebase-tools `npm install firebase-tools -g`
7. Run: `firebase login` and proceed with the login confirmation
8. From the `biogrid-ace` directory, run `firebase deploy --only functions` to deploy the required cloud functions
9. Proceed to setup initial new users for the system

## TESTING
This application contains tests that you can run to check the stability of the application building in new features. 
1. To run the tests, from the root enter `npm run test`