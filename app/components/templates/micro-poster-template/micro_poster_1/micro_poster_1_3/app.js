"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价活动介绍
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_3/directive",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_3/service"
], function() {

    return angular.module("MicroPoster1_3", [
        "ionic",
        "MicroPoster1_3.directives",
        "MicroPoster1_3.Service",
        //"UploadImg"
    ]);
});