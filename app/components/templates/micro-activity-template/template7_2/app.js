"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template7_2/directive",
    "components/templates/micro-activity-template/template7_2/service",
], function () {

    return angular.module("microOldNewTemplate7_2", [
        "ionic",
        "microOldNewTemplate7_2.directives",
        "microOldNewTemplate7_2.service"

    ]);
});
