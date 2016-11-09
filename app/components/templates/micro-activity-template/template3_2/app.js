"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template3_2/directive",
    "components/templates/micro-activity-template/template3_2/service",
], function () {

    return angular.module("Template3_2", [
        "ionic",
        "Template3_2.directives",
        "Template3_2.Service",
    ]);
});
