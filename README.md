# Bubblegrams

## Table of Contents
1. [Inspiration](#inspiration)
2. [What it does](#what-it-does)
3. [How we built it](#how-we-built-it)
4. [Challenges we ran into](#challenges-we-ran-into)
5. [Accomplishment](#accomplishments-that-were-proud-of)
6. [What we learn](#what-we-learned)
7. [Next Steps](#whats-next-for-bubblegram)
8. [Running the application](#running-the-application)

## Inspiration

We wanted to build a scalable application that everyone would use as well as play around with the AWS Amplify framework. We believed that this application would be the best way to understand how to use each component of Amplify (i.e. Cognito for sign in, DataStore and API for CRUD).

## What it does

Bubblegram is a web application created using the ReactJS and AWS framework. Users will first be greeted with a homepage enabling them to sign up, or if they already have an account, sign into your personal page. On this page, users can create bubble, interactive picture post that friends and family can see through their own feed page. Friends and families can like these posts and comment using the pop feature. 

## How we built it

We used the React framework for the frontend. We used the mui api to create our webpages, react-router-dom api to connect our pages together, and easycrop api to enable cropping functionality on the upload and AWS Cognito to build the signin and signup functionality. For the backend design, we went heavy on AWS Amplify. We created a schema using graphQL and test our schema by running `amplify mock api`. We used AWS DataStore and AWS API graphql and AWS API graphoperations to perform CRUD operations on our data as well as synchronize our data throughout the platform. 

## Challenges we ran into

The biggest problem that we had was building the schema. We never really dealt with graphQL so we ended up spending majority of our first day reading up on documentation and playing around with schemas. Then it was learning how to use the AWS framework. All in all, the first two days were spent reading documentation and designing our software with diagram.

## Accomplishments that we're proud of

We manage to build a working schema from nothing. There was a lot of pair programming involved as well as helping each other debug and fix each other's code. 

## What we learned

Reading up on documentation and helping other was the key to building this application. We also have a better understanding about what AWS Amplify is intended for as well as using it because we ended up playing around with the framework a lot.

## What's next for Bubblegram

- Bubbles that stream live data as well as video recordings

## Running the application

Clone the repo to your local drive  
```bash
git clone https://github.com/ncarvajalc/Bubblegram.git
```

Enter the react project
```bash
cd Bubblegram/react-bubblegram
```
Install all the packages  
```bash
npm install
```

Deploy the app  
```bash
npm start
```
