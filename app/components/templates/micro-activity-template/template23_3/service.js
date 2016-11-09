/**
 * 
 */
define(["ionic"], function () {
    return angular.module("Template23_3.Service", []).
        factory("template23_3Service", [
            "$http", "activityFormService", function ($http, activityFormService) {

                var service = {};
                service.model =
                {
                    title: "游戏规则",
                    description: "1、如何邀请朋友帮你捕鱼？点击「帮我捕鱼」，填写信息后再点击「立即喊人来捕鱼」，发送给好友，让Ta帮你捕鱼即可。<br/>"
                        + "2、自己不能为自己捕鱼哟~<br/>"
                        + "3、每位好友只能送你一条鱼哦，赶紧邀请更多的朋友来充实水族馆吧！ "
                };
                return service;
            }
        ]);
});