# Frontend of my website

This project is related to my website, which is being served at https://www.dieterjordens.com/

## Local Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## Build

Run `npm run-script build` to build the project. 
The build artifacts will be stored in the `dist/` directory. 
Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run-script test` to execute the unit tests via Jest. 
Because this is a personal project and mainly used for experimentation, not everything is under test. 
I do not recommend working this way, as a website gets more complex when it grows. Because I'm the 
only maintainer, I'm aware of the risks and advantages of this approach. In general I prefer to work
test-driven 100% of the time.

## Deploy

The JenkinsFile will trigger a build on Jenkins. The Jenkins file will then push the artifacts
to a private cloud Docker registry.
