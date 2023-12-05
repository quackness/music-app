<img width="200px" src="https://w0244079.github.io/nscc/nscc-jpeg.jpg">

# INET 5010 - Chinook App Backend Assignment 3

**Final of Three Cumulative Assignments**

Welcome to the Chinook App Backend Assignment 3! This marks the concluding phase of our cumulative assignments, where you'll play a pivotal role in enhancing the backend logic of the Chinook App. Your task is to ensure seamless integration with the final set of frontend/client files provided, along with accommodating the latest changes made to the Chinook database.

## Assignment Background

The UI/Frontend team has diligently worked on the final set of pages, covering the complete lifecycle of Artists, Albums, and Tracks. The database team has introduced new elements, including a `ReleaseYear` column in the `albums` table and a new table called `themes`. Your mission is to adapt the backend to these changes and provide the necessary functionality to support the comprehensive set of frontend features.

## New Requirements

1. **Support Artist Operations:**
   - Create Express.js endpoints to handle the creation, updating, and deletion of artists. Use the frontend files as a guide for endpoint requirements.
   - Ensure the backend seamlessly integrates with the corresponding frontend pages.
   - Implement and use robust validation schemas using a known validation library to ensure data integrity.
   - Use the respective frontend pages and the in-class code examples as a guide to inform your implmentation of each needed endpoint.
   - Note: The database team has implemented a `CASCADE DELETE` for artists meaning that when an artist is deleted, all related albums and tracks are also deleted automatically.

2. **Support Album Operations:**
   - Create Express.js endpoints to handle the creation, updating, and deletion of albums. Use the frontend files as a guide for endpoint requirements.
   - Ensure the backend seamlessly integrates with the corresponding frontend pages.
   - Implement and use robust validation schemas using a known validation library to ensure data integrity.
   - Use the respective frontend pages and the in-class code examples as a guide to inform your implmentation of each needed endpoint.
   - Note: The database team has implemented a `CASCADE DELETE` for albums meaning that when an album is deleted, all related tracks are also deleted automatically.

3. **Support Track Operations:**
   - Create Express.js endpoints to handle the creation, updating, and deletion of albums. Use the frontend files as a guide for endpoint requirements.
   - Ensure the backend seamlessly integrates with the corresponding frontend pages.
   - Implement and use robust validation schemas using a known validation library to ensure data integrity.
   - Use the respective frontend pages and the in-class code examples as a guide to inform your implmentation of each needed endpoint.

4. **Accommodate Database Changes:**
   - The frontend pages have implemented the concept of themes which allows the end-user to select from a list of styling themes. These themes are defined in a new `themes` table in the provided database.
   - Implement necessary server code to interact with the new `themes` table in the database.
   - Correct implementation of the necessary endpoint will enable theme selection in the frontend pages.

5. **Endpoint Refactoring:**
   - Refactor your server code by removing endpoints from `app.js`. 
   - Re-implement these endpoints using respective Express Routers. Refer to in-class examples and class discussion for guidance.
   - Once completed, `app.js` should resemble more of a configuration file rather than a file containing endpoints. All endpoint code and libraries/packages supporting these endpoints should be relocated in an appropriate route file.

6. **Testing and Validation:**
   - Utilize tools like Postman and browser developer tools to thoroughly test each endpoint's functionality.
   - Confirm that the backend seamlessly supports the complete set of frontend features.
   - Ensure robust validation using a known validation library for all CRUD operations.

## Important Considerations

1. **Code Migration:**
   - Begin this assignment by copying your existing `server` code from Assignment 2 as a starting point.
   - Refrain from copying the database or static frontend files, as new versions are provided in the latest repository.

2. **Database Alterations:**
   - Acknowledge the new `ReleaseYear` column in the `albums` table and the introduction of the `themes` table.

3. **Important Note: Do Not Modify Frontend Files**
   - The provided frontend files are considered final and complete. Do not alter or modify these files. Focus solely on the backend server-side implementation.

## Need Help?

If you encounter difficulties or have questions, don't hesitate to reach out to your instructor for guidance. They are here to assist you throughout the assignment.

## Your Impact

By successfully completing this assignment, you'll contribute to the comprehensive functionality of the Chinook App, enabling the frontend to manage Artists, Albums, and Tracks seamlessly. This assignment is the final step in the cumulative series, reflecting the culmination of your efforts.

Best of luck, and enjoy the final coding stretch!
