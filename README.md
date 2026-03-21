# chefs-pot

This is my first React (and TS) project. It aims to showcase what I've learned on my own through studying multiple React and TypeScript books.
## 1. Features
Chef's Pot is a single page web app for recipes. Currently the following features are implemented:
- All recipes view- shows the existing recipes in the app, created by other users(currently populated with mock recipes). The recipes are shown in a lazy loading grid that loads the next batch of items as you scroll to the end of the currently visible ones. The recipes in this view contain only summary data - title, ingredients, likes, date of creation.
- Single recipe view - list the full information of the recipe - ingredients, spices, steps, portions. The ingredients and steps are in two different section that can be switched between in order to focus only on one of the main recipe data.
- Modifying (Personalizing) a recipe - the single recipe view allows the user to make changes to the recipe ingredients/steps and save their own version of the recipe (when it's created by another user). The modified version can be viewed by switching to it's coresponding subview (through the "Original recipe" / "My recipe" switch).
- Creating recipes - the user can create their own original recipes and share them with the rest of the users. Once they are created they are visible in the recipes grid
- Filtering recipes by ingredients - when a user is looking for recipes that including some specific ingredients, they can open the filter menu. It allows them to search trough the ingredients DB and select the ones they want to add to the filter.
- "My recipes" view - this view shows the recipes that the user has created, added to favourites and modified. It allows them to filter which of the three categories (created, favourite, modified) of recipes are going to be shown. It also has the ingredients filter which works with the category filter.
- Profile view - presents the profile data of the user and allows them to change it.
- Log in / Register - allows the user to create a profile and log into it. Only logged in users can create modified recipes, add original recipes, and access the profile view.

## 2. Used Technologies
The project is separated in two parts each with a coresponding directory in the root dir.  

The front-end is in the "src" dir. It's written in React, TypeScript and CSS. The scripts are bundled and transpiled with webpack thanks to the TS loader. The CSS stylesheets are separated based on the React components and are imported in each corresponding script. In order for that to work I used the CSS loader for Webpack.  

The back-end is writen in TypeScript and uses Express.js and MySQL. The sciprts are transpiled directly with the TS node module. There is a separate tsconfig file for the client and the server code.  

The authentication / authorization of users is implemented trough session cookies including JWT. When sending a request to an endpoint that requires authorization, the request goes through a middleware that checks the cookie.

## 3. Requirements
In order to run the project you'll need:
- npm - to install the required modules. They are listed in the package.json file.
- Node - to run the server.
- MySQL Server - to start the DB server.

## 4. Set-up
1. Navigate to the root dir in the terminal and run:
<pre>npm i</pre>
This will install all the required modules.
2. Create copies of the example config files in the src and server direcotries ("config.example.ts" files). Name the copies "config.ts" and edit the dummy values to the ones you need for your set-up.
3. Run the build command with:
<pre>npm run build</pre>
This will create a dist directory in the root dir that mimics the directory structure of the project code but with the transpiled JS files.
4. Start your MySQL server. Conncet to it and create the DB using the schema in the "database.sql" file and the table data in the "database-data.sql" file.
5. Start the server by running:
<pre>node ./dist/server/app.js</pre>
