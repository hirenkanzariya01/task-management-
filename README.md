
# TaskFlow – Kanban Task Manager

TaskFlow is a simple task management application built with React. It helps users organise their work, manage multiple projects, and track tasks using a Kanban board.

The application allows users to create boards, add tasks, assign team members, set priorities, and move tasks between different stages using drag and drop.

## Features

- Create, edit, and delete boards
- Create, edit, and delete tasks
- Three task stages: To Do, In Progress, and Done
- Drag and drop tasks between columns
- Assign team members to tasks
- Set task priority and due dates
- Search tasks by title
- Save boards and tasks using LocalStorage
- Fetch team members from DummyJSON API
- Responsive user interface

## Tech Stack

- React.js
- JavaScript
- Vite
- Tailwind CSS
- React Router DOM
- @dnd-kit/core
- Lucide React
- DummyJSON API
- LocalStorage

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd kanban-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in your terminal to view the application.

## How It Works

### Boards
Users can create multiple boards for different projects. Each board maintains its own tasks.

### Tasks
Each task contains information such as title, description, priority, due date, assigned team member, and status.

### Drag and Drop
Tasks can be moved between To Do, In Progress, and Done columns using drag and drop.

### Team Members
The application fetches sample user data from the DummyJSON API. Users can assign these team members to tasks.

### Data Storage
Boards and tasks are saved in browser LocalStorage. This means the data remains available after refreshing the page in the same browser.

## Project Structure

```text
src/
├── components/
│   ├── BoardModal.jsx
│   ├── KanbanColumn.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── TaskCard.jsx
│   └── TaskModal.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── BoardPage.jsx
│   └── BoardsPage.jsx
│
├── services/
│   └── userService.js
│
├── App.jsx
├── main.jsx
└── index.css
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run the development server |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build |

## API Used

**DummyJSON Users API**

https://dummyjson.com/users?limit=30

This API is used to fetch sample team member information for task assignments.
