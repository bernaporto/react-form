# React Form

## Description

The main goal was to keep the final syntax clear and closer to a common html form, taking advantage of the combined strengths of `Typescript` and `React`.

## How To Use

To build a new form you will use the components `<Form/>` and `<Input/>`. These components extends the html elements `<form/>` and `<input/>` with new functionalities, converting them into [controlled components](https://reactjs.org/docs/forms.html#controlled-components).

There's no need to add a `<button/>` or `<input type="submit">`, since it will be added automatically. This choice was made in order to keep the `disabled` control inside the `<Form/>` component.

The `<Form/>` component have an optional `validation` property that accepts either a function, applied to all `<Input/>` fields, or an object with `{ [key: string]: function }` interface, where key is the same name that was given to the `<Input/>` field.

## Styling

There's no special API for styling. All styles can be changed in `App.css` or other css file, applying styles to `label`, `input` and `button` tags directly. If you use `id` or `className` or `style`, as usual, the styles will be applyed only to the `<input/>` tag.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
