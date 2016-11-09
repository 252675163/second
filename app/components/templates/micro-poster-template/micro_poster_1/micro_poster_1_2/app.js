"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description:砍价策略制定输入
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_2/directive",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_2/service"
], function() {

    return angular.module("MicroPoster1_2", [
        "ionic",
        "MicroPoster1_2.directives",
        "MicroPoster1_2.Service",
        //"UploadImg"
    ]);
});