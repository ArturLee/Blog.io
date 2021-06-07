# Blog.io App

## Instructions to run the project

Once you've cloned or downloaded the project, navigate to it's folder and run the following commands in a terminal:
```
npm install
```

Before you strat, it's required to add the `clientId` and `clientSecret` keys in order to get the authorization token.
this variables are located at `./src/services/config.js`

```
npm start
```

The project will start in development mode, and you'll be able to access it on this url: [http://localhost:3000](http://localhost:3000)

## Run tests

To run the tests I've written, run the following commands:
```
npm run test
```

## About

The goal of this project is to create a “Proof of Concept” a page/application that showcases display, filter and search functionalities for the created content. 

Due to the size of this project, I've decided just to use React with hooks. However, if this project were to get further developed and the component and code complexity increased, using a more robust state management together with the hooks would be a must.

In `App.js` you can find the most of the state management which is then used in all the main components render and api requests.
Since the number of api request are limited to 1k per hour, I decided to get all the data at once.

Most of the request logic are in the `api.js`, located in `./src/services`. There you will find more documentation about how the request are made.

It is also important to mention that `Filter` component, located inside `./src/component/filters`, handles what is showned on the published articles/case study/brochures/ebooks component.

There was few things that I missed, such as pagination for all published articles. I would've love to do more animation and testing.
It would've been nicer to implente it with scss, I find it easier to manage all the variables such as colors mixins and etc.
