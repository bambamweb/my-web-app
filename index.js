const express = require('express');
const app = express();
const path = require('path');

// Custom middleware to verify working hours (9 AM - 5 PM, Monday to Friday)
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();

    
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        return next(); 
    }


    res.status(403).send('Sorry, our website is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
};


app.use(workingHoursMiddleware);

app.use(express.static('public'));


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index'); 
});


app.get('/services', (req, res) => {
    res.render('services');
});


app.get('/contact', (req, res) => {
    res.render('contact');
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
