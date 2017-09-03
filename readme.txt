How to run the application:

Open the browser and enter the URL 'https://people.rit.edu/ug1086/Project2.html'.

API used: http://www.ist.rit.edu/api/

Methods invoked: getAbout(), getFooter(), getUMinors(), getUDegree(), getGDegree(), getEmployment(), getPeople(), getResearch()

Plugins used: Accordion, DataTables, Dialog Box.

Why you went above and beyond "B" work?

When this project was assigned, I decided to take it on in a planned manner. I divided the problem into smaller tasks and assigned myself deadlines to complete each of the task. Starting early and planning helped me meet the basic requirements at an early stage. While researching to meet the requirements, I also came across a lot of innovative ideas that I added to my 'good-to-have' task list. Since, I was learning a lot from my initial task list, I continued my research and evolved my initial designs for the project. I took this project as an opportunity to learn and understand Javascript and jQuery more thoroughly. I made sure that the features/functionalities I implement work properly and at the same time wanted the website to function smoothly, look professional and is easy to use.     

About the project:

The project is a Web Application designed using the jQuery library to consume a web service (https://www.ist.edu/api/). The web app is created dynamically and uses AJAX request to pull in the data (from JSON supplied from the web service). In addition, some jQuery UI plug-ins (Dialog, Accordion, etc) and the DataTable plug-in have been incorporated to augment the design. 

The page has seven sections:

1) Home page - a short introduction to the website. It includes the footer displaying the department's social presence and a contact form to query information from the department.

2) Undergraduate Degrees - displays the undergraduate degrees offered by the department. The concentrations for the different degrees can be obtained by clicking the individual degree name which displays a Dialog box with the specific concentrations.

3) Graduate Degrees - displays the graduate degrees offered by the department. The concentrations for the different degrees can be obtained by clicking the individual degree name which displays a Dialog box with the specific concentrations.

4) Undergraduate Minors - displays the undergraduate minors available in the department. The jQuery Accordion plug-in has been used to display the information.

5) Employment - displays the degree statistics, employers, careers and the co-op and employment tables. The Co-op and Employment tables are displayed using the DataTables plug-in which has some in-built search and pagination features making it easier to query the table data.

6) People - which displays the department's Faculty and Staff members. The individual pictures are clickable and diplay additional information about a specific member through the Dialog plug-in.

7) Research - displays the various Research Areas and Research done by faculty members. It again uses the Dialog plug-in to display the research content.

Cool features about the website:

The website is different from the conventional one page applications. It is divided into 7 sections and the call is made to the page data after navigating to the target page. This increases the loading time of the data on the website since only the specific page data has to be invoked in comparison to one page applications where all the data has to be invoked at once. 

The website is partially responsive. A menu option is dynamically generated to make navigation easier when the size of the page is reduced.

For the navigation panel, bootstrap's affix and scrollspy plug-ins have been used to change the color of the bar and other content on the navbar on scrolling down the web page.

The scrollbar has also been styled to further enhance the design.

References:

Referred the free template available at https://blackrockdigital.github.io/startbootstrap-creative/ for the design.

