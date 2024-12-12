
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const router = require('./routers/index');
// const config = require('./config/config');
// const session = require('express-session');


// const app = express();


// // Middleware for parsing request body (JSON and URL-encoded form data)
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Session configuration for Passport.js
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // Connect to MongoDB
// mongoose
//   .connect(config.mongoose.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB:', err);
//   });



// // Use routes (make sure your routes are correctly defined)
// app.use('/', router);



// // Error handling middleware (general error handler)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal Server Error',
//     ...(config.env === 'development' && { stack: err.stack }),
//   });
// });

// // Start the server
// const PORT = config.port || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// module.exports = app;


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/index');
const config = require('./config/config');
const session = require('express-session');

const app = express();

// Middleware for parsing request body (JSON and URL-encoded form data)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration for Passport.js
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Default value for development
    resave: false,
    saveUninitialized: false,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Use routes (make sure your routes are correctly defined)
app.use('/', router);

// Error handling middleware (general error handler)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(config.env === 'development' && { stack: err.stack }),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
