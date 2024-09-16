# WhatsApp Clone 💬

Welcome to the GitHub repository of my WhatsApp Clone. This project is a simplified version of the popular messaging application WhatsApp. It aims to demonstrate the core features of real-time messaging. Please notice that while I write this, the project is still in its MVP and does not count with the functionalities I intend to add and has some bugs regarding group chats.

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
- **CI/CD:** Docker-compose for easy environmnents.

## 🔧 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

- Docker
- Docker-compose

### Installation

1. Clone the repository: 
```bash
   git clone https://github.com/pdroacordi/whatsapp-clone.git
```

2. Add your own `.env` file at the root of the project containing the environment variables present in the docker-compose.yml file. Alternatively, you can replace the `${...}` in the docker-compose.yml file for the values.


3. Build the docker-compose container:
```bash
sudo docker-compose up --build -d
```

The process of building the containers might take a litte while. If you want to keep up of the building process, you can check the logs:

```bash
sudo docker logs whatsapp-backend
```
or
```bash
sudo docker logs whatsapp-frontend
```

Even after finishing the building, the front-end app will take a minute to be up, but you may find it at `http://localhost:3000` or other port you may have defined it.