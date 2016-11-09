/**
 * Created by xj on 2016/3/4.
 */
define(['ionic'], function () {
    return angular.module('services.net.userRedeemCodeExchange', []).
        factory('userRedeemCodeExchangeNetService', ['$http', function ($http) {

            //vip兑换码验证
            function exchangeVip(VipCode) {
                return $http.post("/Customer/ExchangeVip", { quivive: VipCode });
            }
            
            //获取用户信息
            function getUserInfoByUserId() {
                return $http.post("/Home/GetUserInfo");
            }

            return {
                exchangeVip: exchangeVip,
                getUserInfoByUserId: getUserInfoByUserId,
            }

        }])
});