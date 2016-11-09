"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template7_5/directive",
    "components/templates/micro-activity-template/template7_5/service",
], function () {

    return angular.module("microOldNewTemplate7_5", [
        "ionic",
        "microOldNewTemplate7_5.directives",
        "microOldNewTemplate7_5.service"

    ]);
});
