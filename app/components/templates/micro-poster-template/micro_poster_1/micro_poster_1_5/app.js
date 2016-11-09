"use strict";
/**
 * author :yinglechao (小潘修改)
 * time: 2015年10月23日
 * update: 2015年12月10日 19:42:24
 * description:圣诞活动
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_5/directive",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_5/service"
], function() {

    return angular.module("MicroPoster1_5", [
        "ionic",
        "MicroPoster1_5.directives",
        "MicroPoster1_5.Service"
    ]);
});