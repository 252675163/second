"use strict"
/**
 * author :
 * time: 
 * description:
 */
define(['ionic'], function () {
    return angular.module('MicroSpellgroup1_1.Filter', [])

  //todo
    .filter('TimeChangeByspellGroup', [function (time) {

        return function (time) {

            var time = Math.round(time);
            var day = 0, hour = 0, min = 0, sec = 0;
            if (time <= 0) {
                day = 0;
                hour = 0;
                min = 0;
                sec = 0;

            } else {
                day = Math.floor(time / 86400);
                hour = Math.floor((time - day * 86400) / 3600);
                min = Math.floor((time - day * 86400 - hour * 3600) / 60);
                sec = time - day * 86400 - hour * 3600 - min * 60;

            }

            var timeStringArr = [];
            timeStringArr.push({ NumArr:day.toString().split(''),unit:"天"});
            timeStringArr.push({ NumArr: hour.toString().split(''), unit: "时" });
            timeStringArr.push({ NumArr: min.toString().split(''), unit: "分" });
            timeStringArr.push({ NumArr: sec.toString().split(''), unit: "秒" });

         
            var timeFormatStringArr = [];
            angular.forEach(timeStringArr, function (obj, index) {
                if (obj.NumArr.length <= 1) {
                    obj.NumArr.unshift(0);
                }
            });
            angular.forEach(timeStringArr, function (obj, index) {
                angular.forEach(obj.NumArr, function (obj, index) {
                    timeFormatStringArr.push('<i class="icon_black_circle">' + obj + '</i> ');
                });
                timeFormatStringArr.push('<em>' + obj.unit + '</em> ');

            });
            return timeFormatStringArr.join('');

        };
    }])
   


})