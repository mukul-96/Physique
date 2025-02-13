# Physique 🏋️‍♂️

## Overview  
Physique is a gym management system designed to help gym owners and managers efficiently handle memberships, expenses, trainers, and other operational tasks. The platform provides a seamless experience for tracking branch-wise statistics, plans, and customer enrollments.  

## Features 🚀  
- 🏢 **Multi-Branch Support** – Manage multiple gym branches effortlessly.  
- 📊 **Expense Tracking** – Log and analyze branch-wise expenses.  
- 📅 **Membership Plans** – Define and track different plans with pricing.  
- 🏋️ **Trainer Management** – Assign trainers and monitor performance.  
- 💳 **Payment Integration** – Secure online payments for membership plans.  
- 📈 **Analytics & Reports** – View real-time insights on enrollments and revenue.  

## Tech Stack 🛠️  
- **Frontend:** React (TypeScript), Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (via Prisma ORM)  
- **Payment Gateway:** Razorpay  

---

## **User Roles & Default Login Credentials**  

- Use the credentials below for easy access to head and manager profiles or  you can also resgister as a new gym member  

| **Role**           | **Email (ID)**            | **Password**   | **Access Level** |
|--------------------|--------------------------|---------------|------------------|
| **Head Admin**     | `mukul@gmail.com`        | `bigmuscles`  | Full access to all branches, financials, and reports. |
| **Branch Manager** | `manager1@gmail.com`     | `manager1`    | Manage gym operations for their assigned branch (members, trainers, payments, expenses). |
| **Gym Member**     | `mukul@gmail.com`        | `mukul`       | Access personal profile, check membership status, and make payments. |

---

## **Walkthrough of Features 🏋️‍♂️**  

### 1️⃣ **Dashboard 📊**  
#### **Overview:**  
The dashboard is the central hub, summarizing gym operations:  
✅ **Total Members** – Displays active gym members.  
✅ **Branch Performance** – Compares different branches.  
✅ **Revenue Tracking** – Shows earnings from memberships & payments.  

#### **How to Use:**  
1. Log in as a **manager** or **admin**.  
2. The dashboard loads **real-time statistics** automatically.  
3. Click on any section to view **detailed analytics**.  

---

### 2️⃣ **Multi-Branch Management 🏢**  
#### **Overview:**  
Manage multiple gym branches under one system.  

#### **How to Use:**  
1. Navigate to **Branches** in the menu.  
2. Click **Add New Branch** to register a new location.  
3. Assign a manager & set up the **daily fee** for the branch.  

---

### 3️⃣ **Membership Plans 💳**  
#### **Overview:**  
Create & manage membership plans with flexible pricing & duration.  

#### **How to Use:**  
1. Go to **Plans** in the navigation bar.  
2. Click **Add Plan** & enter details:  
   - **Plan Name:** Monthly, Annual, etc.  
   - **Price:** Auto-calculated based on the branch’s daily fee.  
   - **Duration:** (e.g., 30 days, 90 days).  
3. Save & apply the plan to new members.  

---

### 4️⃣ **Trainer Management 🏋️**  
#### **Overview:**  
Assign trainers to branches & track their activities.  

#### **How to Use:**  
1. Navigate to **Trainers**.  
2. Click **Add Trainer** & enter:  
   - **Name, Contact Details, Specialization**  
3. Assign the trainer to a branch & specify working hours.  

---

### 5️⃣ **Payment Integration 💰**  
#### **Overview:**  
Physique supports **secure online payments** via **Razorpay**.  

#### **How to Use:**  
1. Go to **Payments** in the dashboard.  
2. Click **Collect Payment** for a member.  
3. Select the membership plan & proceed with payment.  
4. The user is redirected to a **secure payment page** (Razorpay).  
5. After a successful payment, the system updates the **member's subscription status**.  

---

### 6️⃣ **Expense Tracking 📑**  
#### **Overview:**  
Monitor gym expenses like **salaries, rent, & equipment purchases**.  

#### **How to Use:**  
1. Go to **Expenses**.  
2. Click **Add Expense** & enter details:  
   - **Expense Type:** Rent, Salaries, Equipment, etc.  
   - **Amount, Date**  
3. View **expense charts** to analyze spending trends.  

---

### 7️⃣ **Member Enrollment & Management 👥**  
#### **Overview:**  
Register & manage gym members, track progress, & handle renewals.  

#### **How to Use:**  
1. Go to **Members**.  
2. Click **Add Member** & enter:  
   - **Name, Contact Info, Membership Plan**  
3. The system assigns a **Member ID & start date** automatically.  
4. View a **member’s attendance & payment history**.  

---

### 8️⃣ **Reports & Analytics 📈**  
#### **Overview:**  
Generate reports on **membership trends, revenue, & gym usage**.  

#### **How to Use:**  
1. Go to **Main admin Page**.
2. If you want to get reports for all branches just toggle the analytics button on **Navbar**
3. else select a specific branch and then toggle the analytics button  
4. Select a **date range** for analytics.  
5.  Reports for financial analysis will appear.  

---
