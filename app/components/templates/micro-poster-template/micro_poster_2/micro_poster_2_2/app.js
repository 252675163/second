"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description:砍价策略制定输入
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_2/directive",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_2/service"
], function() {

    return angular.module("MicroPoster2_2", [
        "ionic",
        "MicroPoster2_2.directives",
        "MicroPoster2_2.Service",
        //"UploadImg"
    ]);
});