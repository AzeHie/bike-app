
6.4.2023 
Project set up, started new project with react frontend and created server.js for nodeJS backend.

----

7.4.2023 
Imported data to the mongoDB. I had to edit headerline in notepad, because there was a dot in "Duration (sec.) - field. That was converted to an object in mongoDB. Also removed spaces from title's, to make data handling easier in my project.

-----

8.4.2023
Added backend routing, error handling and models. Routes tested with POSTMAN.
  
---- 

9.4.2023
Working with journey-controllers on backend. Added sorting and pagination for data fetching, and possiblity to add new journeys. There was lot of new things for me - and because of that it took awhile but I've learned lot of about pagination and sorting with mongoose. I decided to use query params in both cases (sorting and pagination). Routes tested with POSTMAN and looks quite good, but let's see how it works within / from frontend too.

----

10.4.2023
Started working with frontend. Created folder structure, added components and pages. 

----

11.4.2023
Frontend: Working with journeysList. Started working with routing, navigation.

----

12.4.2023
Finished frontend routing / navigation and added app-wide styling. Working with journeysList and StationsList. I had some problems with props.children since there has been some kind of update after I last time used it - but thankfully we have stackoverflow/youtube (:D). Atleast I know how to set type for that children prop nowadays.

----

13.4.2023
Added template and styling for add station and add journey forms, with hard coded data for now.

----

14.4.2023
Working with additional "add station" and "add journey" forms logic on frontend. Added shared Input component for inputs and shared validation for form-validations. I have never used "time" and "date" form-inputs earlier, handling that data is something new for me.

Installed "moment.js" for date validation on frontend.. And little bit later uninstalled "moment.js" after playing with it for a while ==> decided to validate date and time on the backend, kept only "required" validation on frontend.

----

15.4.2023
Finished add-journey form.

----

16.4.2023
Working with journeyList and loadingspinner on the frontend.
- Added loading spinner
- Modified journeylist data to the wanted form (cleaner timestamp, duration from seconds to minutes, distance from meters to kilometers etc)

----
17.4.2023
Working with journeyList:
- Added ordering per column
- Removed return and departure timestamps from the journeylist and from the model-class (not required for this assignment). 
- Adjusting distance calc. logic (added decimals)
- Created own functions for both - distance and duration calculations.

----
18.4.2023
Working with journeyList:
  - Added pagination

----
19.4.2023
Working on backend:
- Added .env file for API_KEYS and PASSWORDS. 
- Added station endpoints for to fetch stations and add new station (not ready yet though).
- Added google geocoding API for to get coordinates for address when adding new station.

on frontend:
- Added postal code field to the add station form.

----
21.4.2023
Working on frontend:
- Added logic for to sending new station data to the backend. Request body kept being empty when arrived to the backend, but that was just because I didn't set headers to the request on the frontend.

----
22.4.2023
Working on stationList on the frontend AND on backend
- Frontend: Added logic to fetch stationList from the backend/database. 
- Backend: Added / finished routes and controllers for getStations and getStationById. 

Pretty much similar solutions as with journeylist earlier.

----

23.4.2023
Backend & Frontend: Working on Single station view / component. Added logic to fetch data from the backend and render it on the single station view. Had some problems with different data types between database and frontend, but decided to modify the data in the backend before sending it to the frontend.

Frontend: Added generic Modal component, backdrop component (for modal) and generic errorModal component (which uses Modal component). Modal and backdrop are using react portals.

----

24.4.2023
Frontend: 
- Finished with error modal and started using in many different comoponents. Backdrop was not working but just because I forgot to import css-file in it. 
- Fixed an issue with abort conroller in http-hook. "User aborted the request" - error was thrown, it's something around react's strict mode which mounts and unmounts functional components using hooks twice when they are first rendered to the screen.. Or something like that (thanks to google once again)

----

25.4.2023
Frontend & Backend:
- Working with add journey (almost finished, except some validation on the backend and info for the user about the successfully operation.

----

26.4.2023
Frontend & Backend:
- Some bug fixing on "add journey" and "add station" (just basic typos on the data passed from frontend to the backend).
- Fixed bug with error modal when adding new journey or station, if error occurred nothing happened (no error modal - no message). That was because I had user navigation (after form submission) outside the try block - so the navigation happened before throwing an error. After I moved navigation logic inside the try block, it works good. And yes, it was of course also bad user experience, because if something was wrong with the form, user was navigated away anyways. 
- Added backend validation with express-validation.
- Added notification for the user on successful add, when adding journeys or stations. Works out with own generic Modal component.
- Added google map API to the frontend. Created map.tsx and map.css => Started using map in the single station view. I had some problems with using map-api-key on the frontend, since it's not good to use secret details in the frontend app. But I think it's ok to use google_map_api_key (IN THIS CASE) there, because it's pretty much secured on the google platform and allowed to use only javascript map api. Of course in real app I should do it different way, but that's something I have to learn.

----

27.4.
Backend:
  - Added logic to calc avg distances of started and ended journeys from the station (for single station view usage). Somehow it didn't work out with mongoDB query which I should do for sure, but in this case I implemented another solution.
