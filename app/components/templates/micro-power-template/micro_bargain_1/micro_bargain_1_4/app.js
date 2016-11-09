"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */

define([
    "ionic",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_4/directive",
    "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_4/service"
], function() {

    return angular.module("MicroBargain1_4", [
        "ionic",
        "MicroBargain1_4.directives",
        "MicroBargain1_4.Service",
        //"UploadImg"
    ]);
});