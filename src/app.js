const express = require('express');
const cors = require('cors');

const app = express()

const contactController = require('./controllers/contact.controller')
const ApiError = require('./api-error.js')
    
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ 'message': 'Welcome' })
});

app.route('/api/contacts')
    .get(contactController.list)
    .post(contactController.create)
    .delete(contactController.deleteAll)

app.route('/api/contacts/favorite')
    .get(contactController.findAllFavorite)

app.route('/api/contacts/:id')
    .get(contactController.read)
    .put(contactController.update)
    .delete(contactController.delete)

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'))
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal server error'
    })
})

module.exports = app;