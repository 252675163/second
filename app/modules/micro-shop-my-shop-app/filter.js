"use strict"
/**
 * author :
 * time: 
 * description:
 */
define(['ionic'], function () {
    return angular.module('MicroShopMyShopApp.Filter', [])

    .filter('btnStateStr', [function () {

        return function (ite) {
            switch (ite.productStateCodeModel.code) {
                case 0:
                    if (ite.marketMode == 2) {
                        return "购买";
                    }
                    return "马上参加";
                case 1:
                    return "已参加";
                case 2:
                    return "已售罄";
                case 3:
                    return "已结束";
            }
        };
    }])
    .filter('marketModeStr', [function () {

        return function (code) {
            switch (code) {
                case 1:
                    return "一元砍价";
                case 2:
                    return "一口价";
                default: return "一元砍价";
            }
        };
    }])
})