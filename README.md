# Social Media 

Real-Time Social App
This is a full-stack real-time social media application built with:

Frontend: React (TypeScript), Vite, and MUI (Material UI)

Backend: Node.js, Express.js, and MongoDB

Realtime Communication: Socket.IO

 Features
 User Authentication (JWT)

Create, update, and delete posts in real-time

 One-to-one chat system with live messaging

Socket.IO-based communication for instant updates

Clean and responsive UI using Material UI (MUI)

 Fast dev environment with Vite and TypeScript

Tech Stack
Tech	Role
React + Vite	Frontend (SPA)
TypeScript	Type safety & DX
Material UI	UI Components
Node.js + Express	REST API Backend
MongoDB + Mongoose	Database
Socket.IO	Real-time communication

Live Actions
When a user creates, updates, or deletes a post, it instantly reflects for all connected users.

Real-time chat messages between users using Socket.IO.

Modular code with scalability in mind.

# Server Side

## Installation

Use the package manager npm to install dependencies.

```bash
npm install
```
## install nodemon dev dependency
```bash
npm install --save-dev nodemon
```
 ## Starts server with nodemon
```bash
npm run dev
```

## make .env file in root directory

```python
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_KEY=your_access_secret
JWT_REFRESH_KEY=your_refresh_secret

```
# Client Side

## install dependencies
```
npm install
```
## Start vite App
```
npm run dev
```
