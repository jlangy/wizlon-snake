const chooseDirection = function(body, directions) {
  let direction = null;
  if (body.you.health > 50){
    let minDanger;
    directions.forEach((directionObject,i) => {
      if(Object.keys(directionObject).length == 0 ) return;
      if (directionObject.danger < minDanger || direction === null){
        minDanger = directionObject.danger;
        direction = i;
      }
    });
  }
  else {
    if(Object.keys(directionObject).length == 0 ) return;
    let maxFood;
    directions.forEach((directionObject,i) => {
      if (directionObject.food > maxFood || direction === null){
        maxFood = directionObject.food;
        direction = i;
      }
    });
  }
  switch (direction) {
    case 0:
      return "up"
    case 1:
      return "right"
    case 2:
      return "down"
    case 3:
      return "left"
  }
};

module.exports = chooseDirection;
