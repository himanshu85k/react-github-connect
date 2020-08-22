# React Github Connect

React application integrated with Github API using which one can see the list of users who forked Facebook's React respository and also follow users.

## Steps to run the application:
1. clone the repository
2. run 'npm i' on the root of the project
3. run 'npm start' on the root of the project


## Usage:
The  app has single page which shows the list of first 10 users
Users can navigate using the paginate component

To follow a user a github personal access token needs to provided. Enter your personal token in the input box provided right below the heading of the application. Ensure that 'user:follow' scope is enabled for this token
After you have entered your personal token you would be able to follow a user

### Note: React has 30000+ forks and I am showing 10 forks per page. But for some reason going to any page above 2950 the api gives an empty response. So I have left this issue as is.
