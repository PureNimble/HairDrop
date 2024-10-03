# Analysis

The process of building the domain model is based on the client's specifications, especially the nouns (for concepts) and verbs (for relationships) used.

## Rationale for identifying domain conceptual classes ##

To identify domain conceptual classes, start by making a list of candidate conceptual classes inspired by the list of categories suggested in the book "Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design and Iterative Development".

### **Rationale for identifying associations between conceptual classes** ###

An association is a relationship between instances of objects that indicates a relevant connection that is worth remembering, or is derivable from the Common Associations List:


| Concept (A)     |  Association       |  Concept (B)       |
| --------------- |:------------------:| ------------------:|
| Appointment     | has                | AppointmentDate    |
| Appointment     | has                | AppointmentTime    |
| Appointment     | has                | Client             |
| Appointment     | has                | HairStylist        |
| Authentication  | applies            | PasswordPolicy     |
| Authentication  | authenticated by   | Email              |
| Authentication  | authenticated by   | Password           |
| Authentication  | generates          | CreatedOn          |
| Authentication  | generates          | Token              |
| Authentication  | uses               | PasswordEncoder    |
| Billing         | has                | Address            |
| Billing         | has                | CardCVC            |
| Billing         | has                | CardExpirationDate |
| Billing         | has                | CardNumber         |
| Billing         | has                | Email              |
| Billing         | has                | FullName           |
| Billing         | has                | PhoneNumber        |
| Client          | has                | Address            |
| Client          | has                | Billing            |
| Client          | has                | Email              |
| Client          | has                | FirstName          |
| Client          | has                | LastName           |
| Client          | has                | PhoneNumber        |
| Client          | has                | Appointment        |
| Client          | has                | Review             |
| Client          | has                | Photo              |
| Client          | is a               | User               |
| HairSalon       | has                | Address            |
| HairSalon       | has                | CompanyCode        |
| HairSalon       | has                | CompanyName        |
| HairSalon       | has                | Email              |
| HairSalon       | has                | PhoneNumber        |
| HairSalon       | has                | Review             |
| HairSalon       | has                | Service            |
| HairSalon       | manages            | Appointment        |
| HairSalon       | manages            | Schedule           |
| HairSalon       | has                | Photo              |
| HairSalon       | has                | HairStylist        |
| HairSalon       | is a               | User               |
| HairStylist     | has                | Appointment        |
| HairStylist     | has                | Email              |
| HairStylist     | has                | FirstName          |
| HairStylist     | has                | LastName           |
| HairStylist     | has                | PhoneNumber        |
| HairStylist     | has                | Review             |
| HairStylist     | has                | Schedule           |
| HairStylist     | provides           | Service            |
| HairStylist     | has                | Photo              |
| HairStylist     | is a               | User               |
| Password        | applies            | PasswordPolicy     |
| Password        | uses               | PasswordEncoder    |
| Review          | has                | Comment            |
| Review          | has                | Photo              |
| Review          | has                | Rate               |
| Schedule        | has                | ScheduleDate       |
| Schedule        | has                | ScheduleFinalTime  |
| Schedule        | has                | ScheduleInitialTime|
| Service         | has                | Photo              |
| Service         | has                | Price              |
| Service         | has                | Review             |
| Service         | has                | ServiceName        |
| User            | authenticated by   | Authentication     |
| User            | can be             | IsActive           |
| User            | has                | Address            |
| User            | has                | Email              |
| User            | has                | Password           |
| User            | has                | Role               |


## Domain Model

![Domain Model](svg/domain-model.svg)
