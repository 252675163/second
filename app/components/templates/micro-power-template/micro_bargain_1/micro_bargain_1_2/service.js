/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description:砍价策略制定输入
 */
define(['ionic'], function () {
    return angular.module('MicroBargain1_2.Service', []).
        factory('microBargain1_2Service', ['$http', 'activityFormService', function ($http, activityFormService) {


            var service = {};
            service.model =
            {
                InitialSpecialPower:"200"//初始价到特惠价助力人数
            };
            
            //活动扩展字段
            //与后端ExtConfig字段的结构保持一致
            service.activityExtConfig = {
                InitialPrice: "1000",//初始价
                PreferentialPricePowerCount: "55",//优惠价的助力人数
                PreferentialPriceStock: "50",//优惠价的库存
                PreferentialPrice: "817",//优惠价
                SpecialPricePowerCount: "145",//特惠价的助力人数
                SpecialPriceStock: "10",//特惠价的库存
                SpecialPrice: "520",//特惠价
                Version: 2//2016.10.24 区分新老砍价规则

            }

            return service;

        }]);
});



