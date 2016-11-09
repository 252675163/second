"use strict";
/**
 * author :yinglechao (小潘修改)
 * time: 2015年10月23日
 * update: 2015年12月10日 19:42:24
 * description:圣诞活动
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_6/directive",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_6/service"
], function() {

    return angular.module("MicroBargain1_6", [
        "ionic",
        "MicroBargain1_6.directives",
        "MicroBargain1_6.Service"
    ]);
});