# Github User Finder App - Vue 3, Tailwind and Headless UI  ⚡️

![Vue](https://img.shields.io/badge/Vue-3.0-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue)
![HeadlessUI](https://img.shields.io/badge/HeadlessUI-1.0-purple)
![Docker](https://img.shields.io/badge/Docker-19.03-blue)
![Nginx](https://img.shields.io/badge/Nginx-1.18-green)

## Project Briefing

![Github Finder](./src/assets/github_white.png)

Inspired by the Github Finder app written by Brad Traversy in React. This is the Vue version of the app with pretty much the same features as the one created by Brad here [Github Finder by Brad Traversy](https://github.com/bradtraversy/github-finder). This uses Headless UI library in Vue 3 for UI components. It uses Tailwind CSS framework with custom theme colors.

Contrary to some of my other Vue 3 projects, this project uses the old school options API. 

Made with ❤️ by **[@apfirebolt](https://github.com/Apfirebolt/)**

## Features

- Makes use of Github public API to search for users and repositories on Github. 
- Github Search User functionality is provided.
- Search detail results is available for each user where you can see various details of the user and the recent repositories on which the user has worked on.
- Headless UI components used for Cards, Buttons, Grids and More in this app. 
- Dark Mode available

## Project Screenshots

Please find some of the screenshots of the application. Below is the screenshot of the Search Page.

![alt text](./screenshots/1.png)

Screenshot of the user detail page where you can view Github user details of a user and the repositories they've worked on most recently.

![alt text](./screenshots/2.png)

## Built With

* [Vue](https://vuejs.org//)
* [Tailwind CSS](https://tailwindcss.com/)
* [Headless UI](https://headlessui.dev/)
* [Docker](https://www.docker.com//)

## Project setup

Simply install node modules for the app and run the dev script. This makes use of Vite for superfast build process.

```
npm install
npm run dev
```

For production, run the build npm command and serve the static files through a production or development server.

```
npm run build
npm start
```

## Docker deployment instructions

Docker container based systems make it easy for you to deploy production ready apps with few one liners. Make sure you have Docker installed on your system. Build an image from the existing Docker file inside this repo. 

```
sudo docker build . -t vue-github
sudo docker run --detach -p 80:80 vue-github
```

- First command would create an image from the existing docker file, image would be tagged by name 'vue-github' for identification. If this is skipped, then image would be created with an ID which would be hard to identify.
- Second step would create a container from the image and run it on port 80 on your system.
- Make sure there are no servers running on your system like nginx and/or Apache. Docker script is configured to serve the build through Nginx on port 80.
- detach flag is used to indicate that this process would be running in background in non-interactive mode.

## Contribute

We welcome contributions to enhance the functionality and features of this project. To contribute, please follow these steps:

1. **Fork the repository**: Click on the 'Fork' button at the top right corner of this repository page to create a copy of this repository in your GitHub account.
2. **Clone the repository**: Clone the forked repository to your local machine using the following command:
    ```
    git clone https://github.com/apfirebolt/vue-github-finder.git
    ```
3. **Create a new branch**: Create a new branch for your feature or bug fix:
    ```
    git checkout -b feature-name
    ```
4. **Make your changes**: Implement your feature or fix the bug in your branch.
5. **Commit your changes**: Commit your changes with a descriptive commit message:
    ```
    git commit -m "Description of the feature or fix"
    ```
6. **Push to your fork**: Push your changes to your forked repository:
    ```
    git push origin feature-name
    ```
7. **Create a Pull Request**: Open a pull request from your forked repository to the main repository. Provide a clear description of your changes and the problem they solve.

We will review your pull request and provide feedback. Once approved, your changes will be merged into the main branch.

Thank you for your contributions!

