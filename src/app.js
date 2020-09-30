const path = require('path'); // core module
const express = require('express'); // npm module
const hbs = require('hbs'); // npm Handlebars for Express
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname); -> point current directory
// console.log(__filename); -> point current file
// console.log(path.join(__dirname, '../public')); -> relative path from current dir

// Generate a new instance of application
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


// Page routing for Express
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Yavor Donev'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Yavor Donev'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Helpful message',
    title: 'Help',
    name: 'Yavor Donev'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
  
      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

// Setup wild card routing
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: "Yavor Donev",
    errorMessage: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: "Yavor Donev",
    errorMessage: 'My 404 page'
  });
});

// app.com
// app.com/help
// app.com/about

// Set up server at port 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});