const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./routes/api/members_data');
const app = express();

//init middleware
//app.use(logger)

//handlebar middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');
// Homepage route
app.get('/', (req,res) => res.render('index', {
    title: 'Member App',
    members: members
}));

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// apis for members
app.use('/api/members', require('./routes/api/members'))

// set static folder
app.use(express.static(path.join(__dirname, 'public')))


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started at ${PORT}`));