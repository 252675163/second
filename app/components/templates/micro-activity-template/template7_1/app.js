"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:父母微课堂
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template7_1/directive",
    "components/templates/micro-activity-template/template7_1/service",
], function () {

    return angular.module("microOldNewTemplate7_1", [
        "ionic",
        "microOldNewTemplate7_1.directives",
        "microOldNewTemplate7_1.service"

    ]);
});
