# Recipe Finder App

#№ Features
- Search Recipes: Users can search for recipes based on a keyword, cuisine, or maximum preparation time.

- Filter Recipes: Allows filtering by cuisine (e.g., Italian, Mexican, Chinese) and maximum preparation time.
-  
-Error Handling: Displays appropriate error messages if no recipes are found or if there's an issue with fetching data from the API.

# Architecture
The app is built using Next.js with the following key components:

#№ Pages:

/ (Home Page): The main page where users can enter search queries, choose a cuisine, and specify a maximum preparation time.

/recipes (Recipes List Page): Displays the list of recipes returned from the API based on the user's search parameters.

/recipes/[id] (Recipe Detail Page): Displays detailed information about a specific recipe when clicked from the list.




## Getting Started
First, install the dependencies:
```bash
npm install

Then, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
