# SynergySphere Odoo Integration

SynergySphere is a collaborative project management platform built with a modern React frontend and Node.js/Express backend, integrated with Odoo for business logic and automation.

---

## 🗂 Folder Structure

```
.
├── client                  # Frontend
│   ├── public              # Public files
│   └── src                 # Source files
│       ├── components      # Reusable components
│       ├── pages           # Page components
│       ├── App.jsx         # Main app component
│       └── index.js        # Entry point
│
├── server                  # Backend
│   ├── src                 # Source files
│   │   ├── controllers     # Request handlers
│   │   ├── middleware      # Custom middleware
│   │   ├── models          # Database models
│   │   ├── routes          # API routes
│   │   ├── utils           # Utility functions
│   │   ├── config.js       # Configuration
│   │   └── server.js       # Entry point
│   │
│   └── tests                # Test files
│
├── .env                    # Environment variables
├── .gitignore              # Ignored files in Git
├── package.json            # NPM dependencies and scripts
└── README.md               # Project documentation
```

---

## 🚀 Frontend

- Built with **React** and **Tailwind CSS** for a fast, responsive UI.
- Features:
  - Project dashboard
  - Task management
  - Messaging (team and direct chat)
  - User management
  - Notifications
- Connects to backend via REST API (`VITE_BASE_URL` in `.env`).

---

## 🛠 Backend

- Built with **Node.js**, **Express**, and **Prisma ORM**.
- Features:
  - JWT authentication
  - CRUD for users, projects, tasks, messages, notifications
  - Role-based access and business logic
- Connects to Odoo for advanced business automation.

---

## 📚 API Documentation

All API endpoints are documented and testable via Postman Documenter.  
**Use the links below to explore and test each module:**

- **Project:**  
  [Project API Documentation](https://documenter.getpostman.com/view/47243272/2sB3HkrM7m)

- **User:**  
  [User API Documentation](https://documenter.getpostman.com/view/47243272/2sB3HkrM7p)

- **Message:**  
  [Message API Documentation](https://documenter.getpostman.com/view/47243272/2sB3HkrM7s)

- **Notification:**  
  [Notification API Documentation](https://documenter.getpostman.com/view/47243272/2sB3HkrM7r)

- **Task:**  
  [Task API Documentation](https://documenter.getpostman.com/view/47243272/2sB3HkrM7q)

- **Auth:**  
  [Auth API Documentation](https://documenter.getpostman.com/view/47243272/2sB3HkrM7o)

---

## 🔎 User-Specific Data

- You can filter, update, and manage user-specific data (projects, tasks, messages, notifications) via the API and frontend UI.
- All endpoints require a valid JWT token for authentication.

---

## 📝 Getting Started

1. **Clone the repo:**  
   `git clone https://github.com/your-org/SynergySphere-Odoo.git`

2. **Install dependencies:**

   - Backend: `cd server && npm install`
   - Frontend: `cd client && npm install`

3. **Set environment variables:**

   - Backend: `.env` for DB, JWT, Odoo
   - Frontend: `.env` for `VITE_BASE_URL`

4. **Run the app:**

   - Backend: `npm start`
   - Frontend: `npm run dev`

5. **Test APIs:**
   - Use the Postman documentation links above.

---

## 💡 Contributing

- Fork the repo, create a feature branch, and submit a pull request.
- For API changes, update the Postman documentation and code comments.

---

## 📞 Support

For questions or support, contact the team via the workspace or [support channel](https://vijayguhan.vercel.app).

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
