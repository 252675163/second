"use strict";
/**
 * author :小潘
 * time: 2015年11月7日 16:47:13
 * description: 输入框获取焦点时，弹出新的输入框
 */


define(["ionic"], function () {
    angular.module("IsShaked.directive", [])
        .directive("isShaked", [
            "$window", "$timeout", function ($window, $timeout) {
                return {
                    restrict: "E",
                    //隔离作用域
                    scope: {
                        callback: '&',
                        isWatch: "="
                    },
                    templateUrl: "components/is_shaked/is_shaked.html",
                    link: function (scope, iElement, iAttr) {

                        if ($window.DeviceMotionEvent) {
                            $window.addEventListener('devicemotion', deviceMotionHandler, false);
                        }
                        else {
                            alert("手机不支持摇一摇");
                        }
                        var SHAKE_THRESHOLD = 800;
                        var last_update = 0;
                        var x, y, z, last_x, last_y, last_z;
                        var stopFunction = {};

                        function deviceMotionHandler(eventData) {
                            if (!scope.isWatch) {
                                return
                            }
                            var acceleration = eventData.accelerationIncludingGravity;
                            var curTime = new Date().getTime();
                            if ((curTime - last_update) > 300) {
                                var diffTime = curTime - last_update;
                                last_update = curTime;
                                x = acceleration.x;
                                y = acceleration.y;
                                z = acceleration.z;
                                var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                                if (speed > SHAKE_THRESHOLD) {
                                    $timeout.cancel(stopFunction);//如果返回值是true，说明是开始摇，如果为false，摇一摇中
                                    stopFunction = $timeout(function () {
                                        //结束摇一摇
                                        if (ionic.Platform.isIOS() && document.activeElement && document.activeElement.tagName.toLocaleLowerCase() == "input") {
                                            return
                                        }
                                        scope.callback();

                                    }, 400, false);
                                }
                                last_x = x;
                                last_y = y;
                                last_z = z;
                            }
                        }

                        scope.$on("$destroy", function () {
                            $window.removeEventListener('devicemotion', deviceMotionHandler);
                        });


                    }


                };
            }
        ]
    );
});