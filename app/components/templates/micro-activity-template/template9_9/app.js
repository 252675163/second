"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template9_9/directive",
    "components/templates/micro-activity-template/template9_9/service",
], function () {

    return angular.module("Template9_9", [
        "ionic",
        "Template9_9.directives",
        "Template9_9.Service",

    ]);
});
