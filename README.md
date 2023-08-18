# 📢 Sysdig's Full-Stack Exercise
First of all, welcome to Sysdig Secure full-stack exercise 🎉
This small feature will give you a glimpse of what we do here in Sysdig and how we do it. It will test your ability to face new technologies, languages, and frameworks.

## The Application
You will write an application that will show all **public** repositories of the GitHub "Public-HW-Exercise" organisation.
You can see the design below, looks easy right?

![image](https://user-images.githubusercontent.com/63792578/156155303-9717a2a6-daa2-4ac5-93da-deee50013553.png)

## TODO
We've already prepared both the backend & the frontend apps for you.
All you need to do, is fill in the blanks. You'll find several TODO assignment in the code of both apps.
You need to fetch the organization's repositories and show them in a table. The table columns are:
* Repository Name - the repo's name
* Description - the repo's description
* URL - a link to the actual repo. Once clicked, it will open the repository in a new tab

## Technical Requirements
* You are required to build the UI in react. No worries if you don't know react or Javascript, after a short investigation, we are sure you'll find the solutions to fill the TODO task with HTML & JS code.
* You are required to write the backend in [GO](https://go.dev/).
* Please use the [go-github](https://github.com/google/go-github) package to connect to GitHub and fetch the repositories.
* Think about the code structure, error handling, etc.
* Please clone this repository and create a branch from the main branch. Once you are done, open a Pull Request to the main branch with your working code.


## Tips
* To run the react app, from the terminal go to the frontend library and run ```npm install && npm start```
* Run the backend app use ```go run .```

## 🎁 Bonus 
If you finished the task ahead of time, add a "Refresh" button as appears in the design above. It should re-fetch the repositories and update the list in case a repo was added\removed.


Good luck! we are counting on you 🖖
