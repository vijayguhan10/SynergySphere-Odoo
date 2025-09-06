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

## 📚 API Collections

All API endpoints are documented and testable via Postman.  
**Use the links below to explore and test each module:**

- **User Management:**  
  [User API Collection](https://odoo-synergysphere.postman.co/workspace/Team-Workspace~40f9dd26-5c9c-4e42-89e4-3fdad0248a13/collection/47243272-0f128185-b874-4b04-a3cd-2a0638c72d07?action=share&source=copy-link&creator=47243272)

- **Messaging:**  
  [Message API Collection](https://odoo-synergysphere.postman.co/workspace/Team-Workspace~40f9dd26-5c9c-4e42-89e4-3fdad0248a13/collection/47243272-3dbddf1f-472c-4c4f-8691-599be9823d04?action=share&source=copy-link&creator=47243272)

- **Authentication:**  
  [Auth API Collection](https://odoo-synergysphere.postman.co/workspace/Team-Workspace~40f9dd26-5c9c-4e42-89e4-3fdad0248a13/collection/47243272-56017a47-dd9c-4f68-8bee-6400268ddc57?action=share&source=copy-link&creator=47243272)

- **Notifications:**  
  [Notification API Collection](https://odoo-synergysphere.postman.co/workspace/Team-Workspace~40f9dd26-5c9c-4e42-89e4-3fdad0248a13/collection/47243272-27ff60ee-05a2-429a-9943-6558c378c3ed?action=share&source=copy-link&creator=47243272)

- **Projects:**  
  [Projects API Collection](https://odoo-synergysphere.postman.co/workspace/Team-Workspace~40f9dd26-5c9c-4e42-89e4-3fdad0248a13/collection/47243272-fc971ca6-0763-40d7-8b97-e8f615d5840b?action=share&source=copy-link&creator=47243272)

- **Tasks:**  
  [Tasks API Collection](https://odoo-synergysphere.postman.co/workspace/Team-Workspace~40f9dd26-5c9c-4e42-89e4-3fdad0248a13/collection/47243272-e2330af6-736a-4627-bfe0-82fc56713073?action=share&source=copy-link&creator=47243272)

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
   - Use the Postman collections above.

---

## 💡 Contributing

- Fork the repo, create a feature branch, and submit a pull request.
- For API changes, update the Postman collection and documentation.

---

## 📞 Support

For questions or support, contact the team via the workspace or [support channel](https://vijayguhan.vercel.app).

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
