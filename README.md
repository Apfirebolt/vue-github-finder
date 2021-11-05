# Github User Finder App - Vue JS and Vuesax ⚡️

## Project Briefing

Inspired by the Github Finder app written by Brad Traversy in React. This is the Vue version of the app with pretty much the same features as the one created by Brad here [Github Finder by Brad Traversy](https://github.com/bradtraversy/github-finder). This uses Vuesax UI library in Vue for UI components.

Made with ❤️ by **[@apfirebolt](https://github.com/Apfirebolt/)**
## Features

- Makes use of Github public API to search for users and repositories on Github. 
- Github Search User functionality is provided.
- Search detail results is available for each user where you can see various details of the user and the recent repositories on which the user has worked on.
- Vuesax components used for Cards, Buttons, Grids and More in this app. 

## Built With

* [Vue](https://vuejs.org//)
* [Vuesax](https://vuesax.com//)

## Project setup

Simply install node modules for the app and run the serve script.

```
npm install
npm run serve
```

For production, run the build npm command and serve the static files through a production or development server.

```
npm run build
npm start
```

## Docker deployment instructions

Docker container based systems make it easy for you to deploy production ready apps with few one liners. Make sure you have Docker installed on your syBuild an image from the existing Docker file inside this repo. 

```
sudo docker build . -t vue-github
sudo docker run --detach -p 80:80 vue-github
```

- First command would create an image from the existing docker file, image would be tagged by name 'vue-github' for identification. If this is skipped, then image would be created with an ID which would be hard to identify.
- Second step would create a container from the image and run it on port 80 on your system.
- Make sure there are no servers running on your system like nginx and/or Apache. Docker script is configured to serve the build through Nginx on port 80.
- detach flag is used to indicate that this process would be running in background in non-interactive mode.

## Project Screenshots

Please find some of the screenshots of the application. Below is the screenshot of the Search Page.

![alt text](./screenshots/search_page.png)

Screenshot of the user detail page where you can view Github user details of a user and the repositories they've worked on most recently.

![alt text](./screenshots/detail_page.png)

