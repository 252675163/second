/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("Template14_3.Service", []).
        factory("template14_3Service", [
            "$http", "activityFormService", function($http, activityFormService) {

                var service = {};
                service.model =
                {
                    title: "活动规则",
                    description: "1、想让朋友送你礼物吗？点击【我也要圣诞礼物】，填写信息后再点击【立刻分享收获礼物】就能分享给好友，让TA送你礼物啦~<br/>"
                        + "2、自己不能送自己礼物哟~<br/>"
                        + "3、每一位好友只能给你送一份礼物哦，赶紧分享给更多的朋友吧！"
                };


                return service;
            }
        ]);
});