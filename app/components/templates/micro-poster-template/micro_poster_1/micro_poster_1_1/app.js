"use strict";
/**
 * author
 * time:
 * update:
 * description:
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_1/directive",
    "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_1/service",

], function() {

    return angular.module("MicroPoster1_1", [
        "ionic",
        "MicroPoster1_1.directives",
        "MicroPoster1_1.Service",
    ]);
});