"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价活动介绍
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_3/directive",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_3/service"
], function() {

    return angular.module("MicroBargain1_3", [
        "ionic",
        "MicroBargain1_3.directives",
        "MicroBargain1_3.Service",
        //"UploadImg"
    ]);
});