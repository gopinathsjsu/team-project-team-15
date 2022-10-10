# team-project-team-15
team-project-team-15 created by GitHub Classroom

Use Case
------------
Implement an end2end Airport Management system that can be configured for a given airport (Web interface or Mobile app interface with supporting Backend APIs), that integrates Airline Flight Schedules, Gate Assignments, Baggage Claim assignment for arriving flights

Components
-------------

- **APIs:**  
  - Input and output of API should be in JSON and should include error handling and validation of inputs  
  - APIs will be demonstrated using a Web/mobile UI.  
  - UI is accessed by Passengers (Customers) and Airline employees and Airport employees (3 roles)  

- **APIs should support followingfunctionality:**  
  - Retrieve Flight arrivals and departures and Gate assignments - based on time durations (next hour, next 2 hours, next 4 hours) - this data will be displayed in multiple monitors throughout the airport - viewable by all users  .
  - Implement a Random Gate assignment for Arriving and Departing flights - designed to prevent conflicting assignments - allow for an hour for each flight to be at the gate (for arrivals and for departures)  

- **Airport employees:**  
  - Enable or disable one or more gates for maintenance  
  - Assign Baggage Carousel number to Arriving flights - the system should prevent conflicting assignments  
  - Baggage Claim information will be displayed in multiple monitors in the Arrival area  

- **Airline employees:**  
  - Add or update the schedule of flights belonging to their airline relevant to that airport (arrivals and departures)  
  - APIs and UI functionality will be available based on Roles specified above  
  - Assume Gates are distributed in multiple terminals (1, 2, 3 to keep it simple)  
  - Assume Gates are labeled as A1-A32, B1-B32 and C1-C32  
  - Deploy API to AWS in an Auto Scaled EC2 Cluster with Load Balancer (or another cloud provider)  
  - Develop a Web or mobile UI that will make use of the APIs  
  - Create your own database with mock data - use SFO or SJC as an example airport for your data  
 
**Sprint Task Sheet:** https://docs.google.com/spreadsheets/d/1a7e6MloN57nmLVhD6L4VbmJtouL7KFBX/edit?usp=sharing&ouid=118107494258115268955&rtpof=true&sd=true

Team Members
-------------
 - Sourya
 - Lalitha Ramya
 - Sai Vamsi Dutt Patibandla
 - Abhigna

### <a href="https://github.com/gopinathsjsu/team-project-code_team15">Github Repo</a>


## XP Core Values

- **_Communication_** : We conducted meetings every week in-person to discuss crucial aspects of the project by collaborating and communicating with each other.
- **_Feedback_** : Team members delivered software frequently, got feedback about it, and refractored the code to make improvements for working code and fix bugs.

<b>How the team kept the core value? </b>
- Team meetings were held during which diagrams were created to depict the structure of the tables in the back-end. <br>
- Mock-ups of how the front-end will look like on Figma. <br>
- Every Standup contains a discussion of the work completed, the obstacles encountered, and any deviations from the diagrams and mockups in the implementation.

## TECH STACK USED:

- Frontend: ReactJS
- Backend: Java SpringBoot
- Database: RDS MySQL
- REST API: Postman(Testing APIs)
- Cloud: AWS EC2

