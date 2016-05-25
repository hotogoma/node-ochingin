var Shukjitz = require('shukjitz'); 
function Ochingin(day) {
  this.day = day;
}

Ochingin.prototype.check = function(date) {
  if(isYasumi(date, this.day) === true) {
    if(date.getDay() === 5 ){
      return true;
    }
  } else{
    if(this.day === date.getDate()){
      return true;
    } 
  }
    return false;
};

// 給料日が土日かチェック
function isYasumi(date, day){
  var ochingin_date = new Date(date.getTime());
  ochingin_date.setDate(day);
    // 土日
  if(ochingin_date.getDay() == 0 || ochingin_date.getDay() == 6) {
        return true;
  }
  return false;
}

module.exports = Ochingin;
