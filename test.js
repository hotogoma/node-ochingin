var Ochingin = require('.');
var assert = require('assert');
var Shukjitz = require('shukjitz');

describe('Ochingin.prototype.check', function() {
  context('給料日が5日の場合', function() {
    var obj, date;

    before(function(done) {
      var shukjitz = new Shukjitz({}, function() {
        var isHoliday = Shukjitz.prototype.checkSync.bind(shukjitz);
        obj = new Ochingin(5, isHoliday);
        done();
      });
    });

    context('2016年1月', function() {
      before(function() {
        date = new Date(2016, 0);
      });

      it('5日(火) は給料日', function() {
        date.setDate(5);
        assert.equal(obj.check(date), true);
      });

      it('6日(水) は給料日じゃない', function() {
        date.setDate(6);
        assert.equal(obj.check(date), false);
      });
    });

    // 給料日が土日の場合、前の金曜日が給料日になる
    context('2016年3月', function() {
      before(function() {
        date = new Date(2016, 2);
      });

      it('4日(金) は給料日', function() {
        date.setDate(4);
        assert.equal(obj.check(date), true);
      });

      it('5日(土) は給料日じゃない', function() {
        date.setDate(5);
        assert.equal(obj.check(date), false);
      });
    });

    // 給料日が祝日の場合、前の平日が給料日になる
    context('2016年5月', function() {
      before(function() {
        date = new Date(2016, 4);
      });

      it('2日(月) は給料日', function() {
        date.setDate(2);
        assert.equal(obj.check(date), true);
      });

      it('3日(火祝) は給料日じゃない', function() {
        date.setDate(3);
        assert.equal(obj.check(date), false);
      });

      it('4日(水祝) は給料日じゃない', function() {
        date.setDate(4);
        assert.equal(obj.check(date), false);
      });

      it('5日(木祝) は給料日じゃない', function() {
        date.setDate(5);
        assert.equal(obj.check(date), false);
      });
    });
  })

  it('引数を省略すると今日の日付をチェックする', function(done) {
    var shukjitz = new Shukjitz({}, function() {
      var isHoliday = Shukjitz.prototype.checkSync.bind(shukjitz);
      obj = new Ochingin(1, isHoliday);
      var date = new Date();
      assert.equal(obj.check(), obj.check(date));
      done();
    });
  });

  context('お賃金日を返すメソッドの動作をチェックする', function() {
    context('給料日が20日', function() {
      var obj;
      before(function(done) {
        var shukjitz = new Shukjitz({}, function() {
          var isHoliday = Shukjitz.prototype.checkSync.bind(shukjitz);
          obj = new Ochingin(20, isHoliday);
          done();
        });
      });

      context('給料日前', function() {
          it('11/18のとき11/18(金)が返って来る', function() {
            date = new Date(2016, 10, 18);
            assert.equal(obj.nextDate(date).toString(), new Date(2016, 10, 18).toString() );
          });

          it('10/18のとき10/20(木)が返って来る', function() {
            date = new Date(2016, 9, 18);
            assert.equal(obj.nextDate(date).toString(), new Date(2016, 9, 20).toString() );
          });

          it('9/18のとき9/20(木)が返って来る', function() {
            date = new Date(2016, 8, 18);
            assert.equal(obj.nextDate(date).toString(), new Date(2016, 8, 20).toString() );
          });
      });

      context('給料日後', function() {
        it('11/22のとき12/20(火)が返って来る', function() {
            date = new Date(2016, 10, 22);
            assert.equal(obj.nextDate(date).toString(), new Date(2016, 11, 20).toString() );
        });

        it('10/22のとき11/18(金)が返って来る', function() {
            date = new Date(2016, 9, 22);
            assert.equal(obj.nextDate(date).toString(), new Date(2016, 10, 18).toString() );
        });
        it('9/22のとき10/20(木)が返って来る', function() {
            date = new Date(2016, 8, 22);
            assert.equal(obj.nextDate(date).toString(), new Date(2016, 9, 20).toString() );
        });
      });
    });
  it('引数を省略すると今日の日付をチェックする', function(done) {
    var shukjitz = new Shukjitz({}, function() {
      var isHoliday = Shukjitz.prototype.checkSync.bind(shukjitz);
      obj = new Ochingin(1, isHoliday);
      var date = new Date();
      assert.equal(obj.nextDate().toString(), obj.nextDate(date).toString());
      done();
    });
  });


  });
});
