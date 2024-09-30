# Supplementary Specification (FURPS+)

## Functionality

_Specifies functionalities that:_

- _are common across several US/UC;_
- _are not related to US/UC, namely: Audit, Reporting and Security._

### Localization

* “The application must support the English language.”


### Workflow

* "The client schedules a service, selecting a time, date, and location."
* "The hairstylist will receive the request and can either accept or reject it."
* "After the service, both the client and the hairstylist can leave a rating."



### Reporting

* “All transactions will be saved as log files.”


### Security

* “All those who wish to use the application must be authenticated with a secure password.”
* “To be a trusted user, there will be a authentication process”
* “All prices will the in euros”


### Printing

* "All services and products that a Salon/HairStylist publish will be visible to all clients who visit their work."


## Usability

_Evaluates the user interface. It has several subcategories,
among them: error prevention; interface aesthetics and design; help and
documentation; consistency and standards._

* The application Backend must be developed in Rust language. 
* The application graphical interface is to be developed in React (javascript).
* All those who wish to use the application must be authenticated with a secure password.
* During the system development, the team must:
* * adopt best practices for identifying requirements, and for 00 software analysis and design;
* * adopt recognized coding conventions and standards;
* * development of unit tests before implementation.


## Reliability
_Refers to the integrity, compliance and interoperability of the software. The requirements to be considered are: frequency and severity of failure, possibility of recovery, possibility of prediction, accuracy, average time between failures._

* The application should use object serialization to ensure data persistence between two runs of the application.
* The development team will implement unit tests for all methods, except for methods that implement Input and/or Output operations.

## Performance
_Evaluates the performance requirements of the software, namely: response time, start-up time, recovery time, memory consumption, CPU usage, load capacity and application availability._

* “The application should use object serialization to ensure data persistence between two runs of the application.”


## Supportability
_The supportability requirements gathers several characteristics, such as:
testability, adaptability, maintainability, compatibility,
configurability, installability, scalability and more._

* “The application to be developed in this project will be a web page, but in the future will the converted into a mobile app.”


## +

### Design Constraints

_Specifies or constraints the system design process. Examples may include: programming languages, software process, mandatory standards/patterns, use of development tools, class library, etc._

| **_Subcategory_**       | **_Function_**                   | **_Description/Example_**                                                          |
|:------------------------|:---------------------------------|------------------------------------------------------------------------------------|
| **Best Practices**      | CamelCase coding standard        | The implementation must adopt recognized coding standards, in this case CamelCase. |
| **Best Practices**      | OO software analysis and design  | The implementation must adopt OO standards.                                        |
| **Best Practices**      | Tests  | The implementation must include smoke tests and boot loaders   |


### Implementation Constraints

_Specifies or constraints the code or construction of a system
such as: mandatory standards/patterns, implementation languages,
database integrity, resource limits, operating system._

| **_Subcategory_**            | **_Function_**                  | **_Description/Example_**                                                              |
|:-----------------------------|:--------------------------------|----------------------------------------------------------------------------------------|
| **Implementation Languages** | Rust | The application must be developed in Java language. |
| **Implementation Languages** | React   | The application graphical interface is to be developed in React (javascript).|
| **Standards Compliance**     | Javadoc documentation           | The Java code must use Javadoc to generate useful documentation.                       |
| **Standards Compliance**     | Rust test | The unit tests should be implemented using the rust test. |


### Interface Constraints

_Specifies or constraints the features inherent to the interaction of the
system being developed with other external systems._

| **_Subcategory_**            | **_Function_**                  | **_Description/Example_**                                                              |
|:-----------------------------|:--------------------------------|----------------------------------------------------------------------------------------|
| **Implementation Languages** | React graphical interface   | The application graphical interface is to be developed in React.                   |


### Physical Constraints

_Specifies a limitation or physical requirement regarding the hardware used to house the system, as for example: material, shape, size or weight._

| **_Subcategory_**        | **_Function_**   | **_Description/Example_**                                                                                          |
|:-------------------------|:-----------------|--------------------------------------------------------------------------------------------------------------------|
| **Object Serialization** | Data Persistance | •	The application should use object serialization to ensure data persistence between two runs of the application.  |
