# 🌰 Dry Fruit Store Management System

A simple CRUD-based web application for managing dry fruits inventory, built with **Node.js**, **Express.js**, and **MongoDB Atlas**.

## 📁 Folder Structure (MVC Architecture)

```
dry-fruit-store/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── productController.js  # CRUD logic
├── models/
│   └── Product.js            # Mongoose schema
├── routes/
│   └── productRoutes.js      # API endpoints
├── public/
│   ├── css/style.css         # Custom styles
│   ├── js/main.js            # Frontend logic
│   └── images/               # (optional images)
├── views/
│   ├── index.html            # Home page
│   ├── products.html         # Products listing
│   ├── add.html              # Add product form
│   └── edit.html             # Edit product form
├── .env                      # Environment variables
├── .gitignore
├── package.json
├── server.js                 # Entry point
└── README.md
```

## 🛠️ Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Backend    | Node.js + Express.js |
| Database   | MongoDB Atlas        |
| ODM        | Mongoose             |
| Frontend   | HTML + CSS + Bootstrap 5 |
| API Calls  | Fetch API            |

## 🚀 Setup & Run Locally

### 1. Install Dependencies
```bash
cd dry-fruit-store
npm install
```

### 2. Configure Environment Variables
Edit the `.env` file:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/dryfruitstore?retryWrites=true&w=majority
```

### 3. Start the Server
```bash
npm start
```
Or with auto-reload (development):
```bash
npm run dev
```

### 4. Open in Browser
Visit: `http://localhost:5000`

## 📡 API Documentation

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | /api/products       | Get all products     |
| GET    | /api/products/:id   | Get single product   |
| POST   | /api/products       | Create new product   |
| PUT    | /api/products/:id   | Update product       |
| DELETE | /api/products/:id   | Delete product       |

### Sample Request Body (POST/PUT):
```json
{
  "name": "Almonds",
  "price": 1500,
  "quantity": 25,
  "image": "https://example.com/almonds.jpg"
}
```

## 🗄️ MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user (username + password)
4. Whitelist your IP (or use `0.0.0.0/0` for all)
5. Click **Connect** → **Connect your application**
6. Copy the connection string and paste it in `.env`

## 🌐 Deployment (Vercel)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Create `vercel.json`
```json
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "server.js" }
  ]
}
```

### Step 3: Deploy
```bash
vercel
```

### Step 4: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
- Add `MONGO_URI` with your MongoDB Atlas connection string

## 📤 GitHub Upload

```bash
git init
git add .
git commit -m "Initial commit - Dry Fruit Store"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dry-fruit-store.git
git push -u origin main
```

## 📝 License

This project is for educational purposes (BSCS 4th Semester Assignment).
