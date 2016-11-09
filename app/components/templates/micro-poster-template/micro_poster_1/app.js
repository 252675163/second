"use strict";
/**
 * author :陈雪冬
 * time: 2016年7月27日16:28:21
 * description: 秋季班续招海报
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_1/app",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_2/app",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_3/app",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_4/app",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_5/app",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_6/app",

], function() {

    return angular.module("MicroPosterTemplate1", [
        "ionic",

        "MicroPoster1_1",
        "MicroPoster1_2",
        "MicroPoster1_3",
        "MicroPoster1_4",
        "MicroPoster1_5",
        "MicroPoster1_6",


    ]);
});