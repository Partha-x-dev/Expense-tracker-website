require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",  // React frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],      // Allow preflight OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true                                          // Allow credentials (auth token)
};

app.use(cors(corsOptions));

// ✅ Preflight handling
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;  // Use consistent port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
