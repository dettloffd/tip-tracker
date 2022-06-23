## Tip Tracker 

A full stack web application which allows service industry workers and employees to track and analyze tips received over time. Built with the MERN stack which includes React on the frontend along with ChakraUI for styling. The backend is comprised of Node, Express, and MongoDB. 

## Demo

In order to demo the application without requiring signup, enter "demo@demo.com" as the email address and "demo1234" at the live application located:

`https://tip-tracker-mern.herokuapp.com/`  

#### Example:

This project is currently in development. Users can filter tweets by username and keyword and see visual data representation. Functionality to sort by additional parameters is in progress.


## Features
- Ability to add, delete, and edit entries into a log/history which keeps a record of the total number of transactions, the total number of tips received, and then calculates the average tip for that working period.
- Several graphical representations of the data entered which includes data shown in several metrics, including average tip, number of transactions, total tips received, and more for several time periods including day, month, week, year. 
- Graphical representations of data can be filtered to only include entries in between dates of the users choosing. 
- A heatmap of a variable amount of time representing dates worked and the entry data for that date at a glance. 
- JSON web tokens to enable user authorization and authentication. 

## Project Screen Shot(s)

#### Example:   

SS1

SS2

## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation will require running

`npm install`  

both in the client and server folders in order to install dependencies for both.


To Start Server:

`npm run server`

will initiate a script which runs 

`nodemon server.js`

To Start Client and Server Concurrently:

`npm run dev`

To Visit App:

`https://tip-tracker-mern.herokuapp.com/`  

Note: Please allow 5 - 10 seconds for server to awake.

## Reflection

  - What was the context for this project? (ie: was this a side project? was this for Turing? was this for an experiment?)
  - What did you set out to build?
  - Why was this project challenging and therefore a really good learning experience?
  - What were some unexpected obstacles?
  - What tools did you use to implement this project?
      - This might seem obvious because you are IN this codebase, but to all other humans now is the time to talk about why you chose webpack instead of create react app, or D3, or vanilla JS instead of a framework etc. Brag about your choices and justify them here.  

#### Example:  

This was a 3 week long project built during my third module at Turing School of Software and Design. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new features.  

Originally I wanted to build an application that allowed users to pull data from the Twitter API based on what they were interested in, such as 'most tagged users'. I started this process by using the `create-react-app` boilerplate, then adding `react-router-4.0` and `redux`.  

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into OAuth, Auth0, and two-factor authentication using Firebase or other third parties. Due to project time constraints, I had to table authentication and focus more on data visualization from parts of the API that weren't restricted to authenticated users.

At the end of the day, the technologies implemented in this project are React, React-Router 4.0, Redux, LoDash, D3, and a significant amount of VanillaJS, JSX, and CSS. I chose to use the `create-react-app` boilerplate to minimize initial setup and invest more time in diving into weird technological rabbit holes. In the next iteration I plan on handrolling a `webpack.config.js` file to more fully understand the build process.