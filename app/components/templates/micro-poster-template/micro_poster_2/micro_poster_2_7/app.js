"use strict";
/**
 * author :yinglechao (小潘修改)
 * time: 2015年10月23日
 * update: 2015年12月10日 19:42:24
 * description:圣诞活动
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_7/directive",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_7/service"
], function() {

    return angular.module("MicroPoster2_7", [
        "ionic",
        "MicroPoster2_7.directives",
        "MicroPoster2_7.Service"
    ]);
});