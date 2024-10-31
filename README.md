# Take home assignment for Frontend Developer role

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v20.11.0 or above)
- **npm** (comes with Node.js)

## Getting started

### `npm install`

Installs all the dependencies required for the project to run.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### My Approach

- I have used React for the frontend and have used the following libraries:

  - **axios**: For making API requests
  - **react-router-dom**: For routing
  - **tailwindcss**: For styling
  - **Zustand**: For state management, I used Zustand instead of Redux because it's a lightweight state management library and it's easier to use and setup. I used it to manage the state of the application and to share the state between components so that I can manage the state of the cart and products in a more organized way.

- This role is for a Frontend Developer so I decided to use plain CSS for styling instead of using any UI library like Material-UI or Ant Design with the intention of showcasing my ways of implementing custom components and styling.
- Challenges faced:
- Since I'm working fulltime, I had to manage my time effectively to complete the assignment, the time I had was limited so there're some points that I had to skip like adding tests, adding more features like pagination, etc. I'll be happy to discuss these points in the interview if needed.
- Boostraping the project using Create React App and setting up the project structure and dependencies are pretty straightforward but I faced some issues with the compatibility of create-react-app (Webpack) with other libraries like Tanstack Router, there're other settings that are more straightforward with Vite than Webpack.
- Didn't apply any UI library takes more time to customize the components and adjust the styles.

Deployed version: [https://take-home-test-jv4w9ctta-heomeco2014s-projects.vercel.app/](https://take-home-test-jv4w9ctta-heomeco2014s-projects.vercel.app/)
