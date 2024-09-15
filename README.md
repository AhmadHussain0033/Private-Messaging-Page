# Private Messaging App

## Overview

The Private Messaging App is a real-time chat application designed to provide secure and anonymous communication. Built using Node.js with Express and Socket.IO, this application ensures that users' identities and messages remain private, even from the server owner. This privacy-centric approach contrasts with the practices of large companies that might track or collect user data. Our app's design helps ensure that no one, including those with malicious intentions, can compromise your privacy.

## Screenshots


![Screenshot_15-9-2024_31749_localhost](https://github.com/user-attachments/assets/0f166029-1f2d-4dc8-9ac7-a3f614bb2174)
![Screenshot_15-9-2024_31854_localhost](https://github.com/user-attachments/assets/94718be0-f6c4-4e33-80ce-689b0f7de7a9)


### Key Privacy Features

- **Anonymous Communication**: Users can create and join chat rooms without needing to reveal personal information. The application does not require any identifiable data, ensuring that interactions remain anonymous.
- **Room-Based Messaging**: Messages are sent and received within specific rooms, reducing the risk of messages being exposed to unintended parties. Only users within the same room can see the messages sent in that room.
- **No Persistent Data Storage**: The server does not store chat history or user information persistently. This means that even if someone gains access to the server, they will not find any stored user data or chat logs.
- **Real-Time Communication**: Leveraging WebSocket technology, the app provides real-time messaging, ensuring that communication is instantaneous and secure.

## Project Structure

The project is organized into several key directories and files:

```
/project-root
  ├── /server
  │   ├── index.js           # Server-side logic, handles HTTP requests and WebSocket connections
  │   ├── webrtc.js          # WebRTC-related functionality for real-time communication (if applicable)
  │   ├── redis.js           # Redis-related logic (if applicable)
      ├── /public
      ├── index.html         # The main HTML file for the application
      ├── app.js             # Client-side JavaScript file for handling UI and Socket.IO interactions
      ├── style.css             # Styles and looks of the site
  ├── package.json           # Project metadata and dependencies
  └── README.md              # This documentation file
```

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (Node Package Manager)

### Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   Navigate to the project root directory and run:

   ```bash
   npm install
   ```

3. **Start the Server**

   Run the following command to start the server:

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000` by default.

## Server-Side (`index.js`)

### Overview

The server-side logic is handled by `index.js` in the `server` directory. It uses Express to serve static files and Socket.IO for managing real-time communication between clients. The server processes incoming connections, manages chat rooms, and facilitates message exchange. The server also includes logic for managing WebRTC connections (if applicable) and interacts with Redis (if applicable) for additional functionalities.

### Privacy and Security

- **Room-Based Management**: The server manages user rooms to ensure that messages are isolated to their respective rooms.
- **Anonymous User Handling**: No identifiable user data is stored or processed, which enhances user privacy.
- **Real-Time Communication**: Messages are transmitted in real-time, minimizing the risk of data breaches associated with persistent storage.

## Client-Side (`app.js` and `index.html`)

### Overview

The client-side code is found in `app.js` and `index.html` within the `public` directory. `index.html` provides the structure and layout of the chat application, while `app.js` handles user interactions, including creating and joining rooms, sending messages, and receiving updates.

### Privacy Features

- **Anonymous Interaction**: Users interact without revealing personal information.
- **No Data Persistence**: The client does not store any chat history or user data, ensuring that communication remains ephemeral.
- **Secure Messaging**: The app uses Socket.IO to ensure that messages are sent securely and in real-time.

## Additional Notes

- **WebRTC and Redis**: Additional features related to WebRTC and Redis are included in their respective files (`webrtc.js` and `redis.js`). These files may include logic for real-time communication and data management, enhancing the overall functionality of the application.
- **No Tracking**: The application is designed to avoid tracking users or collecting personal data, differentiating it from many commercial solutions that may compromise user privacy.

---

Feel free to improve the code
