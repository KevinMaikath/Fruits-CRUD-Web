# Fruits-CRUD-Web

Angular front-end interface for the Fruits-CRUD

<p align="center"><a href="https://angular.io" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png" width="300"></a></p>

# Description
This project uses Angular to bring a Front-end interface for the Fruits-CRUD-API. The project includes token authentication with the browser session.

# Set Up
In order to properly set up the project, follow the next steps:
- Make sure you have Node and NPM installed.
- Install npm dependencies:
```
npm install
```
- Configure environment variables (create the files ```src/environments/environment.ts``` & ```src/environments/environment.prod.ts```) with the API URL:
```typescript
// example for environment.ts
export const environment = {
  production: false,
  API_URL: 'http://fruits-crud-api.test/api'
};
```
- Run the project:
```
ng serve
```
