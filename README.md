# team-project-team-15
team-project-team-15 created by GitHub Classroom

Use Case
------------
Implement an end2end Airport Management system that can be configured for a given airport (Web interface or Mobile app interface with supporting Backend APIs), that integrates Airline Flight Schedules, Gate Assignments, Baggage Claim assignment for arriving flights.

## Team members:
 - Lalitha Ramya
 - Sai Vamsi Dutt Patibandla
 - Abhighna Kapilavai
 - Sourya Jammula

## Contributions:
- The entire Frontend has been equally divided and done by "   " and " "
- The entire Backend has been equally divided and done by " " and " "
- The architecture of the project and database design has been discussed with the entire team and finalized.
- Other than that, diagrams has been done by " " and " "
- Entire Documentation has been done by " " and " "
- Cloud deployment has been done by " " and " "
- UI wireframes has been taken care by " " and " "

## Scrum Task Board

### <a href="https://docs.google.com/spreadsheets/d/1weY_GHhofU0jSJJvLD5lhG5FmmLjOBSH/edit?usp=share_link&ouid=100184353065011251171&rtpof=true&sd=true">Sprint Task Board & Burndown Chart</a>

## Project Journals
### <a href="https://docs.google.com/document/d/1cpyHVhgdqCCyZ_bRKQo0pA0WiOWOcQ3n/edit?usp=share_link&ouid=100184353065011251171&rtpof=true&sd=true">Entire Team Project Journal</a>

## Technology Stack
- Frontend: ReactJS
- Backend: Express, Node.js
- Database: RDS MySQL
- REST API: Postman(Testing APIs)
- Cloud: AWS EC2

## XP values
###### Communication 
* We had weekly scrum calls over zoom to discuss the tasks and progress. 
* We communicated important updates regarding the project over whatsapp and gmail.
###### Feedback 
* We constantly had mid-week meetings to check the work that was done and gave constructive feedback if required. 
* We also conducted Sprint restrospective at the end of the week to discuss what went well, what could be improved.
###### Respect 
* We conducted our meetings, discussion professionally having respect towards each other.
* We values everyone's opinion in the project and setup a meeting to discuss whenever there is a conflict of opinion. 

## Architecture Diagram
![image](https://user-images.githubusercontent.com/100327244/205541570-c73a389d-c6b0-40d7-a613-b7bedfa472c7.png)

## DB Design

## Use Case Diagram

## Component diagram

## Deployment diagram
![image](https://user-images.githubusercontent.com/100327244/205541945-97b78fc9-9897-4b6a-a1fc-fbd911dc6fab.png)


## UI Wireframes


## Scrum
- We used two-week sprints with scrum calls every week.

## Design Decision

- For Backend:
NodeJs:  Node.js can easily be used as a server-side proxy, handling a large number of simultaneous connections in a non-blocking manner. It's particularly useful for proxying different services with varying response times or gathering data from multiple sources.

- For Frontend: 
React : We used React to simplify ui/ux development by creating application components. We were able to improve code maintainability and refactoring by dividing entire pages into different components.

- For Database:
Amazon RDS: We chose RDS because it is simple to set up and use, and it provides excellent support for database synchronization, associations, transactions, and migrations while reducing development time and preventing SQL injections. 

## Feature Set of our project:
1. 3 categories of users: Normal customers, Airline employees and Airport Employees. Users to access the System with role based authentication. 
2. Retrive flight arrivals and departures and gate assignments based on time selected by user. This information can be viewed by all kind of users.
3. Gate and Baggage Claim information will be displayed in the homepage which can viewed by all kind of users.
4. Airport Employees: They can enable or disable one or more gates for maintenance.
5. Airport Employees: They can assign Baggage Carousel number to Arriving flights and the system would prevent conflicting assignments.
6. Airline Employees: Add or update the schedule of flights belonging to their airlines.
7. Implemented a scheduler for Random Gate assignment for Arriving and Departing flights. We have designed this to prevent conflicting assignments.
8. Implemented a scheduler to remove gates and baggages automatically after the flights have been departed.


## Our Project UI screenshots:


