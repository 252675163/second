"use strict";
/**
 * author :陈雪冬
 * time: 2016年7月27日16:28:21
 * description: 秋季班续招海报
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/app",
    "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_2/app",
], function () {

    return angular.module("MicroPosterTemplate3", [
        "ionic",
        "MicroPoster3_1",
        "MicroPoster3_2",
    ]);
});