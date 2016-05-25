function Ochingin(day) {
  this.day = day;
}

Ochingin.prototype.check = function(date) {
  if(this.day === date.getDate()){
    return true;
  } else {
    return false;
  }
};

module.exports = Ochingin;
