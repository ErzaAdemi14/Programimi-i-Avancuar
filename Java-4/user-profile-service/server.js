require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/src/routes/userRoutes');
const authRoutes = require('./src/src/routes/authRoutes');
const errorHandler = require('./src/src/utils/errorHandler');
const productRoutes = require('./src/src/routes/productRoutes');
 // Import the authentication middleware


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRoutes);

// Routes
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User Profile Service running on port ${PORT}`);
});
