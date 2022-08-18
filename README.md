# Superhero database

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

And was also made by me.

## Requirements

In order to run this project you need:

- Node.js
- MongoDB

## Run the solution

First, clone the repo or download it. Then there are two ways to run this project. Either in dev version or in production build.

### Production build

This is the easiest way. To start in production use these commands:

```
npm install
npm start
```

This will host the project on ` localhost://5000`.

### Development build

To run this way you need to install packages in both starting directory and client directory. You can do it with
```
npm install
```

Then run either of both commands in starting directory:
```
npm start
npm run dev
```

Then run this in client directory:

```
npm start
```

### Database

To properly work with this project you need to host a mongoDB connection at `localhost://27017` by yourself.

## Testing

To run tests you have to install packages in client directory first. Then inside it run this:

```
npm run test
```