# WhatsApp Clone 💬

Welcome to the GitHub repository of my WhatsApp Clone. This project is a simplified version of the popular messaging application WhatsApp. It aims to demonstrate the core features of real-time messaging. Please notice that while I write this, the project is still in its MVP and does not count the functionalities I intend to add.

## ⚙️ Features

- **User Authentication:** Sign up and log in functionality.
- **Real-time Messaging:** Send and receive messages instantly.
- **Group Chats:** Create group chats and add members to them.
- **Profile Picture:** Upload a profile picture of your own and store it in cloud.

## 🛠️ Technologies used
This project is built using:
- **Frontend:** React with Redux for efficient state management.
- **Backend:** Java with Spring Boot, providing a robust framework for building the application.
- **Database:** MySQL for relational data storage.
- **File Storage:** Cloudinary for storing and managing media files.
- **Real-time Communication:** Stomp.js over WebSockets for real-time bi-directional communication.
- **Authentication:** JWT for token-based authentication and Spring Security for authorization.

## 🔧 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- Java 
- JDK
- Maven
- MySQL

### Installation

1. Clone the repository: 
```bash
   git clone https://github.com/pdroacordi/whatsapp-clone.git
```
2. Install NPM packages:
```bash
npm install
```

3. Install Maven dependencies:
```bash
mvn clean install
```
Or open the project with your preferred IDE and install the dependencies automatically.

4. Start the back-end application:
```bash
mvn spring-boot:run
```
Or do it using the IDE. The application will be running at the port 8080.
5. Start the front-end server:
```bash
npm start
```
The application will be running at `http://localhost:3000`

Remember to add your own API keys and secret key.

