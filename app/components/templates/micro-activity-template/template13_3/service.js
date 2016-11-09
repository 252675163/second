/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("Template13_3.Service", []).
        factory("template13_3Service", [
            "$http", "activityFormService", function($http, activityFormService) {

                var service = {};
                service.model =
                {
                    title: "游戏规则",
                    description: "1、想让朋友帮你种草吗？点击【我也要喊人种草】，填写信息后再点击【立即喊人种草】就能分享给好友，让TA帮你种草啦~<br/>"
                        + "2、自己不能给自己种草哟~<br/>"
                        + "3、每一位好友只能给你种一棵草哦，赶紧分享给更多的朋友吧！"
                };


                return service;
            }
        ]);
});