# Hacker News Clone

This project is a clone of [Hacker News](https://news.ycombinator.com) rewritten with Angular.

## Tooling
- Angular 9
- [ng-openapi-gen](https://github.com/cyclosproject/ng-openapi-gen) for API client generation
- [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages) to deploy directly to GitHub Pages
- [ngrx](https://github.com/ngrx/platform) for state management

## Data source
- The information is taken from the public [Hacker News API](https://github.com/HackerNews/API).

## Start
Running the app in dev mode including hot module reloading:  
`npm install`  
`npm start`

To run in production mode:  
`npm run build && npm start`

## Test
To execute all tests:  
`npm test`

## Deploy
To deploy to GitHub pages:  
`npm run deploy`
