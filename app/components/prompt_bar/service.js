/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("PromptBar.Service", []).
        factory("promptBarService", [
            "$http", "$timeout", function($http, $timeout) {

                var service = {};
                service.promptBarInfo = {
                    isShow: false,
                    info: "",
                    type:""//0:error,1:success
                };
                //增加设置回调函数的参数  by xp 2015年12月23日 17:30:54
                service.showPromptBar = function (info, time, type, callback) {
                    if (!time) {
                        time = 3000;
                    }
                    service.promptBarInfo.info = info;
                    service.promptBarInfo.type = type ? type : 0;//默认为error提示框
                    service.promptBarInfo.isShow = true;
                    $timeout(function () {
                        service.promptBarInfo.isShow = false;
                        callback && callback();
                    }, time);
                   
                };
                service.showErrorBar = function(info, time,callback){
                    service.showPromptBar(info, time,0,callback);
                };

                
                service.showSuccessBar = function (info, time, callback) {
                    service.showPromptBar(info, time, 1, callback);
                };

                //警告提示条  常显
                service.showStateWarnBar = function (info) {
                    service.promptBarInfo.info = info;
                    service.promptBarInfo.type = 2;
                    service.promptBarInfo.isShow = true;
                };

                service.closeStateWarnBar = function () {
                    service.promptBarInfo.isShow = false;
                };

                //新增常显错误提示条 by xp 2015年12月8日 15:16:05 
                service.showErrorBar2= function(info) {
                    service.promptBarInfo.info = info;
                    service.promptBarInfo.type =  0;//默认为error提示框
                    service.promptBarInfo.isShow = true;
                };

                service.hideErrorBar2 = function () {
                    service.promptBarInfo.isShow = false;
                };


                return service;
            }
        ]);
});