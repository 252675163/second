"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_4/directive",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_4/service"
], function() {

    return angular.module("MicroPoster1_4", [
        "ionic",
        "MicroPoster1_4.directives",
        "MicroPoster1_4.Service",
        //"UploadImg"
    ]);
});