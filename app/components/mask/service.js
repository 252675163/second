/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("Mask.Service", []).
        factory("maskService", [
            "$http", "$timeout", "$q", function($http, $timeout, $q) {

                var maskService = {};
                maskService.mask = {
                    isShow: false,
                    info: "",
                    isShowLoading: false
                };
                maskService.showMask = function(info, time, isShowLoading, type,callback) {

                    var defer = $q.defer();

                    var len = arguments.length;

                    maskService.mask.type = type || 1;
                    maskService.mask.info = info;
                    maskService.mask.isShowLoading = isShowLoading ? true : false;
                    maskService.mask.isShow = true;

                    //初始化时带上隐藏遮罩回调函数
                    if (len >= 5) {
                        maskService.mask.callback = callback;
                    }

                    if (time) {
                        $timeout(function() {
                            maskService.mask.isShow = false;
                            defer.resolve();
                        }, time);
                    } else {
                        defer.resolve();
                    }
                    return defer.promise;
                };
                //关闭遮罩
                maskService.hideMask = function() {
                    $timeout(function() {
                        maskService.mask.isShow = false;
                    }, 0);
                };


                return maskService;
            }
        ]);
})