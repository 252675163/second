"use strict";
/**
 * author :陈雪冬
 * time: 2016年7月27日16:28:21
 * description: 秋季辅导班   微海报
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_1/app",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_2/app",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_3/app",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_4/app",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_5/app",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_6/app",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_7/app",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_8/app",

], function() {

    return angular.module("MicroPosterTemplate2", [
        "ionic",

        "MicroPoster2_1",
        "MicroPoster2_2",
        "MicroPoster2_3",
        "MicroPoster2_4",
        "MicroPoster2_5",
        "MicroPoster2_6",
        "MicroPoster2_7",
        "MicroPoster2_8",


    ]);
});