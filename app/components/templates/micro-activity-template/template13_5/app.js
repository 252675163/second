"use strict";
/**
 * author :小潘
 * time: 2015年12月5日 15:02:19
 * description:种草排行榜 
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template13_5/directive",
    "components/templates/micro-activity-template/template13_5/service",

], function () {

    return angular.module("Template13_5", [
        "ionic",
        "Template13_5.directives",
        "Template13_5.Service"
    ]);
});
