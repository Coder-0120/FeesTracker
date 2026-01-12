# 🎓 **FreeTracker** – Smart College Fees Tracking System 💸📊

FreeTracker is a **modern, digital fee management platform** designed to help **college students and administrators** manage fee records efficiently.  
It replaces manual paperwork with a **secure, transparent, and easy-to-use system** for tracking fees and sending real-time alerts.
<img width="1898" height="1080" alt="Screenshot (77)" src="https://github.com/user-attachments/assets/e8b98a43-d0f3-4653-950c-ac96b833cc82" />


---

## ✨ **Why FreeTracker?**
📌 No more confusion about pending fees  
📌 Instant alerts & confirmations  
📌 Centralized admin control  
📌 Powerful analytics for decision making  

---

## 🚀 **Key Features**

### 👨‍🎓 **Student Portal**
✅ View complete fee details digitally  
🔔 Get alerts for **pending fees**  
📩 Receive **fee submission confirmation**  
🔐 Secure login using **JWT Authentication**  
📊 Clean and simple fee status dashboard  

---

### 🧑‍💼 **Admin Panel**
🏫 Track student fees **branch-wise & year-wise (1️⃣–4️⃣ year)**  
🗂️ View and manage all student records  
✔️ Mark fees as **paid semester-wise**  
🔔 Send alerts & notifications to students  
➕ Register new students  
❌ Delete student records  
📈 Advanced **Analytics Dashboard** for insights  

---

## 🔐 **Authentication & Security**
🔒 JWT-based authentication  
👥 Role-based access (**Admin / Student**)  
🛡️ Secure APIs for all fee operations  

---

## 📊 **Analytics & Insights**
📌 Paid vs Pending fees overview  
📌 Branch-wise fee distribution  
📌 Year-wise student fee analysis  
📌 Helps admins make **data-driven decisions**  

---

## 🛠️ **Tech Stack**
🖥️ **Frontend**: React.js  
⚙️ **Backend**: Node.js, Express.js  
🗄️ **Database**: MongoDB  
🔐 **Authentication**: JSON Web Token (JWT)  

---

## ⚡ Getting Started

Clone the repository  
```bash
git clone https://github.com/Coder-0120/FeesTracker.git
cd FeesTracker
```

Install backend dependencies
```bash
cd server
npm install
cd--
```

Install frontend dependencies
```bash
cd client
npm install
```

Create a .env file in the root directory:  
- PORT=5000  
- MONGO_URI=your_mongodb_connection_string

Run the development server
```bash
npm run dev
```
Frontend will run at http://localhost:3000  
Backend will run at http://localhost:5000
