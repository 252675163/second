"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价活动介绍
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_3/directive",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_3/service"
], function() {

    return angular.module("MicroPoster2_3", [
        "ionic",
        "MicroPoster2_3.directives",
        "MicroPoster2_3.Service",
        //"UploadImg"
    ]);
});