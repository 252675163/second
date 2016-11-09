"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template2_2_2/directive",
    "components/templates/micro-activity-template/template2_2_2/service",
], function () {

    return angular.module("microOldNewTemplate222", [
        "ionic",
        "microOldNewTemplate2_2_2.directives",
        "microOldNewTemplate2_2_2.service"

    ]);
});
