"use strict";
/**
 * author
 * time:
 * update:
 * description:
 */

define([
    "ionic",
    "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/directive",
    "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/service",
    "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/directives_steps/directive_step1",
    "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/directives_steps/directive_step2",
    "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/directives_steps/directive_step3"

], function () {

    return angular.module("MicroPoster3_1", [
        "ionic",
        "MicroPoster3_1.directives",
        "MicroPoster3_1.Service",
        "MicroPoster3_1Step1.directives",
        "MicroPoster3_1Step2.directives",
        "MicroPoster3_1Step3.directives",
    ]);
});
