"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_4/directive",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_4/service"
], function() {

    return angular.module("MicroPoster2_4", [
        "ionic",
        "MicroPoster2_4.directives",
        "MicroPoster2_4.Service",
        //"UploadImg"
    ]);
});