/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("Template19_3.Service", []).
        factory("template19_3Service", [
            "$http", "activityFormService", function($http, activityFormService) {

                var service = {};
                service.model =
                {
                    title: "游戏规则",
                    description: "1、如何邀请朋友帮你种菜？点击「帮我种菜」，填写信息后再点击「立即喊人种菜」，发送给好友，让Ta帮你种菜即可。<br/>"
                        + "2、自己不能给自己种菜哟~<br/>"
                        + "3、每位好友只能给你种一棵菜哦，赶紧邀请更多的朋友来种菜吧！"
                };
                return service;
            }
        ]);
});