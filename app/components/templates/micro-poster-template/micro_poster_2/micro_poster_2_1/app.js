"use strict";
/**
 * author
 * time:
 * update:
 * description:
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_1/directive",
    "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_1/service",


], function() {

    return angular.module("MicroPoster2_1", [
        "ionic",
        "MicroPoster2_1.directives",
        "MicroPoster2_1.Service",
    ]);
});