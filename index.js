function Ochingin(day, isHoliday) {
  this.isHoliday = isHoliday;
  this.day = day;
}

Ochingin.prototype.check = function(date) {
  // 入力値がなければ、今日の日付を設定
  date = date || new Date();
  // その月の通常の給料日を取得する
  var default_ochingin_date = new Date(date.getTime());
  default_ochingin_date.setDate(this.day);

  // その月の休日を考慮したおちんぎん日を取得する
  var ochingin_date = this.getOchinginDay(default_ochingin_date);

  // おちんぎん日と指定された日付が一致するか判定
  if (ochingin_date.getDate() == date.getDate()) {
    return true;
  }

    return false;
};

Ochingin.prototype.date = function() {
  // 今日の日付を取得
  date = new Date();
  // その月の通常の給料日を取得する
  var default_ochingin_date = new Date(date.getTime());
  default_ochingin_date.setDate(this.day);

  // その月の休日を考慮したおちんぎん日を取得する
  var ochingin_date = this.getOchinginDay(default_ochingin_date);

  // おちんぎん日を返す
  return new Date( ochingin_date.getYear()+1900, ochingin_date.getMonth(), ochingin_date.getDate())
};


// 土日かチェック
Ochingin.prototype.isYasumi = function(date){
    // 土日
  if(date.getDay() == 0 || date.getDay() == 6 || this.isHoliday(date) != null) {
        return true;
  }
  return false;
}

// おちんぎん日取得
Ochingin.prototype.getOchinginDay = function(default_ochingin_date) {
  var date = new Date(default_ochingin_date.getTime());

  // おちんぎん日が平日ならおちんぎん通常日を返す
  if(this.isYasumi(date) === false) {
    return date;
  }
  // 給料日の直前の平日を探す
  while(this.isYasumi(date) === true) {
    date.setDate(date.getDate() - 1);
  }
  return date;
}

module.exports = Ochingin;
