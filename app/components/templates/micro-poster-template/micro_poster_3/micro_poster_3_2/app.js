"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description:砍价策略制定输入
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_2/directive",
    "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_2/service"
], function () {

    return angular.module("MicroPoster3_2", [
        "ionic",
        "MicroPoster3_2.directives",
        "MicroPoster3_2.Service",
    ]);
});
