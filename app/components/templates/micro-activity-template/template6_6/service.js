/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template6_6.Service', []).
        factory('template6_6Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title: "神秘邀请帖",
                description: "享西方美食，玩亲子游戏\n" +
                " 一起来参与吧！\n\n" +
                "游戏一：蔓越桔竞赛\n游戏二：玉米游戏\n游戏三：南瓜赛跑\n\n" +
                "美食、大礼等着你来抢！\n" +
                "时间：2015年11月26日\n" +
                "地点：浙江省杭州市XXX"
            };
            return service

        }]);
})