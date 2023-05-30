# solita pre-assignment

Frontend: React & Typescript

Backend: nodeJS & Express

Database: Mongo

Styling: CSS

---

PROJECT LOG:
  - I have "PROJECT LOG" - file attached to the project. If you are interested for more information than just commits, please check it up! It's kind of diary, where       I've explained what I've done and when, what issues I had and how I solved them - day by day.
  - It might look like I've been working on this project for very long time, but actually I've used only around 1-3h / day on it. I would like to do lot of more in a day, but since I have full day job, family, and other hobbies - it's not possible. But however, this has been very good practice and repeating the things I've learned in the past couple years for me.

IMPORTANT NOTE ABOUT THE DATA SETS FOR THIS ASSIGNMENT:
  - I imported only one of three data sets to mongoDB, because it's free up to 512mb and there was lot of more data in those sets.
  - Deleted a lot of documents without coveredDistance field.
  - There was also lot of documents multiple times, I didn't do anything about it.

ABOUT THE FEATURES I'VE IMPLEMENTED TO THIS PROJECT
  - All recommended features are implemented to the project. I also added most of additional features, and as extra I also added user interfaces and endpoints for adding the new stations and journeys.

IMPORTANT NOTE ABOUT REACT.STRICT MODE:
  - Since strict mode renders components twice when first time rendered on the screen (atleast/only(?) when in dev-mode), there is some problems showing loading spinner and some loading texts when component is rendered. And since that and only because of that you should remove <React.StrictMode> tags in the index.tsx file when running app in dev-mode! Everything else is working just fine also when strict mode is on..

ABOUT JOURNEYS PAGINATION WHEN SORTING (bug):
- Journeylist pagination is NOT currently working as expected when sorting. If navigated to the last page when sorting is "on" ==> throws error. That's something because of mongoDB memory usage limits. I tried to fix that issue on many different ways:
  1. MongoDB built in allowDiskUse(true) ==> No affect at all. That should fix it, but it did not. Perhaps because of free mongoDB.
  2. Find all docs from the collection and then sort them with javascripts built in sort-method. After that manually calculate (pageNumber x itemsPerPage) which ones should be returned to the frontend. Well, that takes years because of size of the data or maybe there was something wrong in my code. I think i'm gonna be back on this later..

Summary: For now don't navigate to the last page when journeys are sorted (:D). I don't know is there any reasons to do that anyway.
 
APP TESTS:
- I've found out that I should mock my database connections when testing app to save time, and especially not to save the data to the real database when testing the application. That's something I should definietly do in my projects in the future.
- The app has just some simple tests. I'm currently learning more about testing, and i'll add more as soon as possible. 
- There is own tests for backend and frontend.
- Run frontend tests simple with "npm test" in the frontend folders terminal on vs-code or some other IDE.
- Run backend tests in the same way as frontend, but in the backend folder.

GOOGLE MAP IN APP:
- It's possible that MAP is not working anymore in JUNE, because of free trial has ended. But if necessary I can active it again.

HOW TO INSTALL AND MANUALLY TEST THE APPLICATION:
- App is built and tested in windows, not sure how it works with linux. Node has to be installed on the computer.

1. Download zip
2. Extract files
3. Add .env file to the backend's root folder (easiest way to do that is vs-code or some other IDE), I'll give you code for that file somehow/somewhere (includes some passwords to the database etc).
4. Navigate to backend folder of app with vs-code terminal or cmd => install with command "npm install"
5. Navigate to frontend folder of app with vs-code terminal or cmd. => install with command "npm install"
6. Start backend: type "npm start" in backend folder => starts nodeJS backend in localhost:5000
7. Start frontend/ui: type "npm start" in frontend folder => starts react app in localhost:3000
8. Open localhost:3000 (actually should happen automatically) in browser => app should be running!
9. LoadingSpinner / loading texts not working correctly in dev-mode because of that react.strict mode "twice rendering" thing. Remove <React.StrictMode> tags in the index.tsx if you like to get better user experience also in dev-mode.

ABOUT THE NAVIGATION FOLDER
 - I had navigation folder starting with lowercase "n" on my local machine, but somehow it starts with uppercase "N" here in github. Since that there was an error when I downloaded app, installed it and started it. It was just about the import in the app.tsx file, where main header was imported with "import MainHeader from './navigation/MainHeader'" - but actual navigation folder started with uppercase "N". That issue was solved with editing folder name to start with Uppercase "N" on the local project and with changing the import in the tsx file, before pushing data to the github again.

Everything should work out now, but if you have any problems with that navigation import when you test the application, look up that navigation folder name and the import in the app.tsx file.
