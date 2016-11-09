"use strict";
/**
 * author :huijuan
 * time:2016/3/7
 * description:VIP订单列表
 */


define(["ionic", "services/net/user-orderlist"], function () {
    return angular.module("UserOrderListApp.services", ["services.net.userOrderList"])
        .service("userOrderListAppService", [
            "$rootScope", "$filter", "userOrderListNetService",
            function ($rootScope, $filter, userOrderListNetService) {
                var service = {};
  
                //获得订单列表(1-全部，2-邀请记录，3-VIP码兑换记录) 
                service.getVipOrderList = function (pageIndex, pageSize, type) {
                    return userOrderListNetService.getVipOrderList(pageIndex, pageSize, type);
                };
                return service;
            }
        ]);
});


