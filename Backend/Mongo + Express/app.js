const express = require('express');
const cors = require('cors');

// routes
const hotelRoutes = require('./routes/hotelRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const AppError = require('./utils/appError');
const ERROR_TYPES = require('./utils/errorTypes');

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - body: ${JSON.stringify(req.body)}`)
    next()
})

// http://localhost:8100/api

app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Welcome to the Hotel API. Use /api/health or /api/* routes.'
    })
})

// '/api/health' GET
app.get('/api/health', (req, res) => {
    res.json({
        status: "OK",
        message: "Hotel API is Live!"
    })
})

// route handlers
app.use('/api/hotels', hotelRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/auth', authRoutes)

app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || (err.statusCode >= 400 && err.statusCode < 500 ? 'fail' : 'error');

    if (err.name === 'CastError') {
        err.message = 'Invalid ID format';
        err.statusCode = 400;
        err.errorType = ERROR_TYPES.CAST_ERROR;
    } else if (err.code === 11000) {
        err.message = 'Duplicate field value entered';
        err.statusCode = 409;
        err.errorType = ERROR_TYPES.DUPLICATE_KEY;
    } else if (err.name === 'ValidationError') {
        err.message = Object.values(err.errors).map((error) => error.message).join(', ');
        err.statusCode = 400;
        err.errorType = ERROR_TYPES.VALIDATION_ERROR;
    } else if (err.statusCode === 404) {
        err.errorType = err.errorType || ERROR_TYPES.NOT_FOUND;
    } else if (err.statusCode === 400) {
        err.errorType = err.errorType || ERROR_TYPES.BAD_REQUEST;
    } else {
        err.errorType = err.errorType || ERROR_TYPES.INTERNAL_ERROR;
    }

    res.status(err.statusCode).json({
        status: err.status,
        errorType: err.errorType,
        message: err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});

module.exports = app