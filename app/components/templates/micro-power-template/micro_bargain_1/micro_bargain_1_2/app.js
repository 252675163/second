"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description:砍价策略制定输入
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_2/directive",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_2/service"
], function() {

    return angular.module("MicroBargain1_2", [
        "ionic",
        "MicroBargain1_2.directives",
        "MicroBargain1_2.Service",
        //"UploadImg"
    ]);
});