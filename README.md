# Minimal Trello Clone

## Contents of this documentation

1.  [Problem Statement](#problem-statement)
2.  [Solution Notes](#solution-notes)
3.  [Technical documentation for running the project](#technical-documentation-for-running-the-project)
4.  [Scope for improvement](#scope-for-improvement)

## Problem Statement

Build a trello clone which has the functionality to add new categories and add/edit/move cards

## Solution Notes

- The application is a very minimal clone of trello and only supports limited functionality as listed below
  - Add a new category (displayed as columns in the UI)
  - Add a new card within a category
  - Edit an existing card within a category
  - Move a card between two categories
  - Persist the data between user sessions
- The application does not support the following features
  - Edit or Delete a Category
  - Additional fields like `description` for the cards. Currently, it supports only `title`.
  - Delete a card
  - Move a card within a single category
  - Changing the order of the categories
- Due to the time constraint, the testing strategy for this application focused solely on testing for the happy path. The type of tests written majorly include integrations tests and limited unit tests
- The UX of the application is very simple and has little to no styling. It only supports desktop screens and uses the `Raleway` font, `reset.css` library to remove all default browser styling and some custom css.

## Technical documentation for running the project

### Live Site - https://minimal-trello.netlify.app/

### Prerequisites

- Ensure that the node package used in the machine `17.x.x`. Using the older versions might result into unforseen issues.
- Ensure that you have `npm` installed in your machine. <br /> _Note - You can also use yarn for all the commands mentioned below by replacing `npm` or `npm run` with `yarn`_

### Running the project

- Install all the dependencies for the project.

```sh
npm install
```

- Start the project.

```sh
npm start
```

This will automatically open [http://localhost:3000](http://localhost:3000) on the browser and run the app in development mode. The page will reload if you make edits. You will also see any lint errors
in the console.

### Running the tests

We use [Jest](https://jestjs.io/) and [React Testing Library](https://github.com/testing-library/react-testing-library) as the basic tools for unit and integration testing. To run all the tests, execute the following command in the terminal

```sh
npm run test
```

### Formatting the code

We use prettier to format all the files according to the rules in `.prettierrc.json`. This keeps our code style consistent across the entire project. To format all the files, exceute the following command in the terminal

```sh
npm run prettier
```

## Scope for improvement

This section contains potential topics to improve user experience and developer experience

- Better User Experience by investing in design and adding more features to the application.
- Improve the accessibility of the platform. For example, automatically focusing on inputs when using a mouse, submitting forms using keyboards and more.
- Developer Experience
  - Testing
    - Adding a full suite of integration as well as unit testing to the application. These tests will also cover all the edge cases.
    - Adding e2e tests using tools like [Cypress](https://www.cypress.io/). These tests replicate real world user scenarios thus increasing our confidence in the app.
  - Monitoring and Alerting
    - Integrating tools like [Sentry](https://sentry.io/) or [LogRocket](https://logrocket.com/) for error tracking
    - Adding tools like [LogRocket](https://logrocket.com/) to track application performance metrics
    - Setup automated alerts to catch bugs before they affect a significant user base.
  - Automation
    - Adding linters to the project to maintain a style consistency
    - Introducing a CI/CD workflow using tools like [Github Actions](https://github.com/features/actions) or [Circle CI](https://circleci.com/). It will generate builds, run tests and deploy to testing environment when there are code changes on Github.
