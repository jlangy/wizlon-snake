const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const app = express();
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js');
// Helper functions
const chooseDirection = require('./chooseDirection.js');
const rankFood = require('./rankFood.js');
const { getOpenSquares } = require('./getOpenSquares.js');
const getDanger = require('./getDanger.js');

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', process.env.PORT || 9001);
app.enable('verbose errors');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(poweredByHandler);

// --- SNAKE LOGIC GOES BELOW THIS LINE ---
const directionsTest = [
  {},
  {},
  {},
  {}
]
// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game
  // Response data
  const data = {
    color: '#DFFF00'
  };

  return response.json(data);
});

//test route you can mess around with 
app.post('/test', (request, response) => {
  // NOTE: Do something here to start the game
  const info = request.body;
  // Response data
  const directions = rankFood(info.you.body[0], info.board.food, info);
  const dangerDirections = getDanger(info, directions, getOpenSquares(info));
  console.log(dangerDirections)
  const direction = chooseDirection(info, dangerDirections);
  return response.json(direction);
});

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  const info = request.body;
  //rank food returns the [{N}, {S}, {E}, {W}] array with food keys
  const directions = rankFood(info.you.body[0], info.board.food, info);
  //adds danger keys to each direction
  const dangerDirections = getDanger(info, directions, getOpenSquares(info));
  //returns "up", "down", etc.
  const direction = chooseDirection(info, dangerDirections);
  const data = { move:direction };
  return response.json(data);
});

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({});
});

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  return response.json({});
});

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'));
});
