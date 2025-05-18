# Twitter-Clone
Twitter Clone
A Twitter-inspired web application built with HTML, CSS, and JavaScript, replicating the classic Twitter interface with core social media functionalities. This project was created for educational purposes to demonstrate front-end development skills and UI/UX design inspired by Twitter's classic blue branding.
Features

Tweet Functionality: Compose, post, like, retweet, and delete tweets with persistence using localStorage.
Delete Mode: Toggle a mode to delete tweets with a confirmation prompt and fade-out animation.
Search: Filter tweets by text, username, or handle in real-time.
Follow System: Follow/unfollow users with state persistence using localStorage.
Navigation: Switch between sections (Home, Explore, Notifications, Messages, Bookmarks, Lists, Profile, More) with dynamic content switching.
Modal Interface: Compose tweets via a modal popup.
XLSX Processing: Process Excel files (XLSX) to extract and filter data, converting it to CSV format (requires base64-encoded file data).
Responsive Design: Mimics Twitter's classic layout with a fixed left sidebar, central tweet feed, and right sidebar for trends and suggestions.

Technologies Used

HTML5: Structure of the web application.
CSS3: Styling with a focus on Twitter's classic blue theme and responsive layout.
JavaScript: Core functionality, including tweet management, event handling, and XLSX processing.
Font Awesome: Icons for navigation and tweet actions.
SheetJS (XLSX): Library for processing Excel files (loaded via CDN).
LocalStorage: Persistent storage for tweets and followed users.

Setup Instructions

Clone the Repository:
git clone https://github.com/abdulmsoomro1/Twitter-Clone.git
cd Twitter-Clone


Serve the Application:Since the app uses localStorage and dynamic features, it must be served via a web server. You can use:

Python's HTTP server:python -m http.server


Or a tool like Live Server in VS Code.


Open in Browser:Navigate to http://localhost:8000 (or the port provided by your server) to view the application.

Dependencies:

The app uses external CDNs for:
Font Awesome (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css)
SheetJS (https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js)


No additional installations are required as all dependencies are loaded via CDN.


XLSX Processing:

The loadFileData function processes XLSX files stored as base64 strings in gk_fileData.
To test, populate gk_fileData with base64-encoded XLSX data and set gk_isXlsx = true in script.js.



Lessons Learned
Creating this Twitter Clone provided valuable insights into front-end development and UI/UX design:

Dynamic UI Management: Learned to manipulate the DOM efficiently to render tweets dynamically, handle real-time search, and toggle between content sections.
State Persistence: Gained experience using localStorage to persist user data (tweets and followed users) across sessions.
Event Handling: Mastered complex event delegation for tweet actions (like, retweet, delete) and modal interactions.
CSS Styling: Improved skills in creating a responsive, Twitter-like layout with hover effects, animations, and a consistent color scheme.
XLSX Integration: Understood how to process Excel files client-side using SheetJS, including filtering out blank rows and converting data to CSV.
Modular Code: Learned the importance of separating HTML, CSS, and JavaScript into distinct files for maintainability and scalability.
User Experience: Focused on replicating Twitter's intuitive interface, including modal popups, delete confirmation prompts, and visual feedback for user actions.
Challenges Overcome: Addressed issues like preventing event bubbling during tweet deletion and ensuring smooth transitions for dynamic content updates.

Links

Live Demo: [GitHub Pages]
Source Code: https://github.com/abdulmsoomro1/Twitter-Clone

Notes

The XLSX processing feature requires external file data to be fully functional. You can extend it by adding a file input to upload and process XLSX files.
The live demo link assumes the project is hosted on GitHub Pages. Update the link if hosted elsewhere.
This project is for educational purposes and does not connect to any real Twitter/X API.

Author
Created by Abdul Rahim Soomro for educational purposes.
