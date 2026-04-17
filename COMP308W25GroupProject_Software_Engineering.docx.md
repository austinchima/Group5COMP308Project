  
**Group Project – Developing Apps Using Emerging Web Technologies**

**Due Date:**	Group presentation and demonstration in Week 14

Purpose:	The purpose of this project is to:

* Design and code web apps or web games using emerging web frameworks  
* Build a **Graph QL API using Express** or Next.js  
* Build a Front-End (React or Svelte) that utilizes the Graph QL API   
* Apply appropriate design patterns and principles  
* Use **Deep Learning to make intelligent use of data**

  References:	Read the reference textbooks, lecture slides, class examples, and additional references provided here. This material provides the necessary information that you need to complete the project. You may need to read and use more materials and tools to implement a good solution. 

Be sure to read the following general instructions carefully:

- This Project **may be completed in groups of 4-5 students**.  
- This project can be **replaced with your capstone project** (COMP-231 or COMP-313), if you use and implement the **same front-end/back-end technologies shown in this document**.  
- You will have to **present and demonstrate your solution in Week 14** and upload the solution on Luminate course shell. Bonus marks will be given if you also **publish the app on Heroku, Microsoft Azure, Amazon, or another Cloud platform.**  
- **Your VS Code project should be named “YourGroupNameCOMP308Project” and should be zipped in a file YourGroupNameCOMP308Project.zip**.

**Project Specifications For Software Engineering Technology Students**

Your client wants an AI-driven web app that fosters **community engagement by connecting people within neighborhoods and local communities**. The platform will allow users to **share local news**, **organize events**, **offer help**, and **support local businesses**. The application should also leverage AI to personalize content, detect trends, and provide community insights:

1. **User registration/login using JWT (or OAuth for Google/GitHub sign-in)**

   **User Roles:**

* **Resident:** Can post local news, join discussions, and view community insights.  
* **Business Owner:** Can list their business, post deals, and respond to reviews.  
* **Community Organizer:** Can create and manage events and group activities.  
     
2. **Community Features:**

   ### 

   ### **For Residents:**

   1. **Local News & Discussions:**  
* Users can post local updates, news, and discuss topics.  
* AI-generated topic summarization for long discussions.


  2. **Neighborhood Help Requests:**  
* Residents can post help requests (e.g., "Need a pet sitter for the weekend").  
* AI matches volunteers based on their interests and location.  
  3. **Emergency Alerts:**  
* Residents can report urgent issues (e.g., missing pets, safety alerts).  
* Real-time notifications sent to nearby users.

### 

### **For Business Owners:**

a. **Business Listings & Deals:**

* Create business profiles with descriptions, images, and offers.  
* Promote special deals to the local community.  
    
  b. **Customer Engagement & Reviews:**  
* Business owners can respond to customer reviews.  
* AI-powered sentiment analysis on reviews to provide business feedback.

### 

### **For Community Organizers:**

a. **Event Management System:**

* Create and promote events (e.g., workshops, meetups, clean-up drives).  
* AI predicts the best event timing based on local engagement patterns.  
  b. **Volunteer Matching:**  
* AI suggests volunteers based on interests and previous event participation.

3. **Backend Requirements:**  
* **Database**: MongoDB for document-based storage.  
* **API**: GraphQL implemented with Express.js or Next.js.  
* **Microservices** **Architecture**:  
  * **User Authentication Service** (handles login, registration).  
  * **Community Engagement Service** (news, discussions, help requests).  
  * **Business & Events Service** (listings, events, deals).  
  * **AI Personalization Service** (recommendations, trend detection).


4. **Frontend Requirements:**  
* Choose from:  
  - React 18.2 or higher, using functional components  
  - Next.js 14 or higher (https://nextjs.org/docs)  
  - Remix 1.17.0 or higher (https://remix.run/docs/en/1.17.0)  
  - Svelte 3.5 or higher ([https://v2.svelte.dev/](https://v2.svelte.dev/))   
* **Micro Frontends** Approach for modular UI components.  
  * Authentication & User Management micro frontend  
  * Community & Business Engagement micro frontend  
  * Events & Administration	micro frontend


5. **AI Integrations:**  
* AI Summarization: Auto-generate summaries for long discussions.  
* Sentiment Analysis: AI analyzes user posts and reviews.  
* The Gemini API can be used for both summarization and sentiment analysis  
6. **UI & Design:**  
* Use Tailwind CSS or React Bootstrap for styling.  
* Responsive Web Design to support all device sizes.

7. Using **TypeScript** is optional. 

									                                      					 											**(100 marks)**

**Evaluation of software solution for each component (all items need to be shown during the group**   
**presentation):**

| Evaluation Component | Weight |
| ----- | :---: |
| User registration/login | 10 |
| Local News & AI Summarization	 | 5 |
| Neighborhood Help Requests & AI Volunteer Matching | 5 |
| Emergency Alerts System (Real-time Notifications) | 5 |
| Business Listings & Deals | 10 |
| Customer Engagement & AI Sentiment Analysis | 10 |
| Event Management System | 10 |
| Volunteer Matching AI for Events | 5 |
| MongoDB Database (Proper Document Structure & Modeling) | 5 |
| GraphQL API Implementation (Express.js or Next.js) | 10 |
| Frontend Implementation (React, Next.js, Remix, Svelte) | 10 |
| UI/UX Design & Responsiveness (Tailwind, React Bootstrap) | 5 |
| Project Presentation according to presentation guidelines | 10 |
| Total | 100 |

|  |  |  |  |  |
| :---- | :---- | :---- | :---- | :---- |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

							  
**References:**

1. [https://docs.mongodb.com/manual/data-modeling/](https://docs.mongodb.com/manual/data-modeling/)

2. [https://expressjs.com/en/5x/api.html](https://expressjs.com/en/5x/api.html)

3. [http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)

4. [https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express\_Nodejs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

5. [https://react.dev/](https://react.dev/)  
     
6. https://docs.pmnd.rs/react-three-fiber/getting-started/introduction

7. [https://svelte.dev/](https://svelte.dev/)

8. [https://nextjs.org/](https://nextjs.org/)

9. [https://www.tensorflow.org/js/](https://www.tensorflow.org/js/)

10. [https://www.tensorflow.org/js/tutorials](https://www.tensorflow.org/js/tutorials)  
      
11. [https://ai.google.dev/prompts/sentiment-analysis](https://ai.google.dev/prompts/sentiment-analysis)  
      
12. [https://dev.to/rutamhere/sentiment-analysis-app-using-gemini-ahp](https://dev.to/rutamhere/sentiment-analysis-app-using-gemini-ahp)  
      
13. [https://habr.com/en/articles/764692/](https://habr.com/en/articles/764692/)  
      
14. [https://developer.mozilla.org/en-US/docs/Games/Techniques/3D\_on\_the\_web/Building\_up\_a\_basic\_demo\_with\_Three.js](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Building_up_a_basic_demo_with_Three.js)  
      
      
      
      
    

