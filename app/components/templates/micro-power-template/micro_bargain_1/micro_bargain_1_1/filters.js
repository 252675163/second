"use strict"
/**
 * author :
 * time: 
 * description:
 */
define(['ionic'], function () {
    return angular.module('MicroBargain1_1.Filter', [])

    .filter('ButtonInfo', [function (input) {

        return function (input) {
            switch (input) {
                case 0:
                    return "领取优惠";
                case 1:
                    return "继续努力";
                case 2:
                    return "抢完啦";
                case 3:
                    return "已领取";
                case 4:
                    return "已结束";
            }
        };
    }])
    .filter('TimeChange', [function (time) {

        return function (time) {
            var time = Math.round(time);
            var day = Math.floor(time / 86400);
            var hour = Math.floor((time - day * 86400) / 3600);
            var min = Math.floor((time - day * 86400 - hour * 3600) / 60);
            var sec = time - day * 86400 - hour * 3600 - min * 60;

            if (time <= 0) {
                return "0天0小时0分钟0秒";
            }
            else {
                return day + "天" + hour + "小时" + min + "分钟" + sec + "秒";
            }
        };
    }])
    .filter('MoneyLeft', [function (money) {

        return function (money) {

            return money.toFixed(2);
        };
    }])

})