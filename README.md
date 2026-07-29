# 💊 MediFind

An AI-powered Medicine Recommendation and Pharmacy Locator web application built using **Spring Boot**, **React**, and **MySQL**.

MediFind helps users discover suitable medicine alternatives based on active ingredients, dosage, dosage form, category, and therapeutic use while also locating nearby pharmacies that stock the selected medicine.

---

## ✨ Features

- 🔍 Search medicines instantly
- 🤖 AI-based medicine recommendation engine
- 🔄 Compare two medicines side-by-side
- 💊 Find the best alternative medicine
- 🏥 Locate nearby pharmacies
- 🗺️ Interactive map using Leaflet + OpenStreetMap
- 📦 View pharmacy inventory and stock availability
- 🔐 Secure Admin Login using JWT Authentication
- 📊 Admin Dashboard with medicine, inventory and pharmacy statistics
- ➕ Add / Update / Delete Medicines
- ➕ Manage Pharmacy Database
- ➕ Manage Inventory

---

# Screenshots

> Screenshots will be added soon.

---

# Tech Stack

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Maven

### Frontend

- React
- Vite
- Axios
- React Router
- Leaflet
- OpenStreetMap

### Database

- MySQL

---

# Project Structure

```
MediFind
│
├── backend
│   ├── Controllers
│   ├── Services
│   ├── Repositories
│   ├── Entities
│   ├── Security
│   ├── DTOs
│   └── Data Loaders
│
├── frontend
│   ├── Components
│   ├── Pages
│   ├── Services
│   └── Assets
│
└── README.md
```

---

# Getting Started

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/MediFind.git
```

---

## Backend

Open the backend folder.

Create

```
application-local.properties
```

and add

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD
```

Run

```bash
mvn spring-boot:run
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# AI Recommendation Logic

Medicines are recommended using multiple factors including:

- Active Ingredient
- Dosage
- Dosage Form
- Therapeutic Category
- Similar Drug Class

Recommendations are ranked according to similarity rather than random matching.

---

# Maps

The application uses:

- Leaflet
- OpenStreetMap

Google Maps is only opened when users request navigation directions.

---

# Demo Data

The project contains demo datasets for:

- Medicines
- Pharmacies
- Inventory

These datasets simulate a real pharmacy ecosystem.

In a production deployment, pharmacies would connect their own inventory databases through APIs or secure database integrations instead of using demo data.

---

## 📸 Screenshots

### Home
![Home](screenshots/home.png)

---

### Medicine Recommendations
![Recommendations](screenshots/recommendations.png)

---

### Compare Medicines
![Compare](screenshots/compare.png)

---

### Pharmacy Locator
![Pharmacy Map](screenshots/pharmacy-map.png)

---

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

---

# Future Improvements

- Barcode Scanner
- OCR Prescription Reading
- User Accounts
- Medicine Reminder
- Pharmacy Inventory Integration
- Online Ordering
- Drug Interaction Checker
- AI Chat Assistant
- Multi-language Support

---

# Open Source

Contributions are welcome!

Feel free to:

- Improve the recommendation algorithm
- Fix bugs
- Improve UI/UX
- Add new features
- Optimize performance

Please open an Issue before making major changes.

---

# License

This project is licensed under the MIT License.

---

# Author

**Ashutosh Roy**

Applied Electronics & Instrumentation Engineering

Netaji Subhash Engineering College



