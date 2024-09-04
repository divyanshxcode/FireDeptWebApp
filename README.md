# 🚒 Fire Department Real-Time Monitoring and Evaluation Software

## SIH Problem Statement - 1623

**Title: A real-time monitoring and evaluation software for applications received in the Fire Department relating to inspections, follow-ups, and issue of NOCs (No Objection Certificates).**

---

## 📊 Project Stats

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/divyanshxcode/FireDeptWebApp)
![GitHub last commit](https://img.shields.io/github/last-commit/divyanshxcode/FireDeptWebApp)
![GitHub pull requests](https://img.shields.io/github/issues-pr/divyanshxcode/FireDeptWebApp)

---

## 🌟 Features

- **Real-Time Monitoring:** Track the status of inspections, follow-ups, and NOC issuance in real time.
- **Automated Alerts:** Get notified instantly about pending tasks and deadlines.
- **Data Visualization:** Interactive dashboards for data analysis and reporting.
- **User Management:** Role-based access for Fire Department officials and external users.
- **Secure and Scalable:** Built with security best practices, ensuring scalability and reliability.

## 🛠️ Tech Stack

- **Frontend:** React.js,
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other Tools:** Git, Github

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or above)
- MongoDB (v4.4 or above)
- Docker (Optional)

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/divyanshxcode/FireDeptWebApp.git
   ```
2. Environment Variables: 
Create a config file to add environment variables.

   ```bash
   touch ./FireDeptWebApp/backend/config/config.env
   ```
   Add environment variables in this file -

    ```txt
    PORT=4000
    MONGO_URI=
    FRONTEND_URL=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    JWT_SECRET_KEY=
    JWT_EXPIRE=
    COOKIE_EXPIRE=
    ```

3. Install dependencies

   ```bash
   cd FireDeptWebApp
   npm install bcrypt cloudinary cookie-parser cors dotenv express express-fileupload jsonwebtoken mongoose node-cron nodemailer validator
   ```
4. Start the development server

   ```bash
   npm run dev
   ```
---

_This project is a part of our submission for Smart India Hackathon 2024._
