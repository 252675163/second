/**
 * Created by huijuan on 2016/3/7.
 */
define(['ionic'], function () {
    return angular.module('services.net.userOrderList', []).
        factory('userOrderListNetService', ['$http',function ($http) {
            //VIP订单列表
            function getVipOrderList(pageIndex, pageSize, type) {
                var data = {
                    Page: {PageIndex: pageIndex, PageSize: pageSize},
                    Filter: {Type: type}
                };
                //todo
                return $http.post("/Customer/GetVipOrder", data);
            }  
            
            return {
                getVipOrderList: getVipOrderList
            }

        }
        ]
    )
});