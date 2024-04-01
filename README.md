## Contact Management
You can run the app by executing `yarn dev` on the terminal inside of each individual server and frontend project.

#### For the client side (frontend), I used the following:

- Next.js with TypeScript.
- Redux for state management.
- Tailwind CSS for styling.
- Axios for API calls.

#### For the server side, I used:

- Express.js
- TypeScript
- uuidv4

#### Features

- Login and authentication.
- View contact list and contact details.
- Edit contact details.
- Create contact.

#### Bugs

- Creating a contact does not display the newly created contact.
- Responsiveness for mobile devices and some visual improvements are needed.
- Redirect when you access to a page without login is not working.
- Disabling CORS represents a security vulnerability.

#### Suggested Upgrades

- Change the label on the login page from 'Add' to 'Username', as it may lead to misunderstandings for users trying to login.
- Add an 'Add contact' button on the contacts page, even if contacts already exist, as there is currently no way to add contacts if some already exist.
- Currently, I used an endpoint to fetch user contacts, but it would be a great improvement to store them as a state variable. This change will improve the scalability of the app because it reduces the number of API calls needed.
- Integrate a NoSQL database, such as MongoDB.
- Modularize and refactor the components to make them clearer and easier to use and reuse.

#### Final Thoughts
- Based on my experience developing this project and my research on Next.js, I believe it would be a better approach to implement the backend using Next.js API and its features. Using Next.js API instead of a separate backend server can simplify the project setup. Additionally, it's easier to test the API endpoints during development.
- Incorporating Redux was challenging. Instead, based on my research, I would use the API context from Redux. 
- It would be beneficial to add more logic to the server side to reduce the amount of processing the client needs to perform. This can improve the application's performance, especially on devices with limited resources or on slow networks. 