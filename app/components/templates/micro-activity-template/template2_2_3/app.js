"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template2_2_3/directive",
    "components/templates/micro-activity-template/template2_2_3/service",
], function () {

    return angular.module("microOldNewTemplate223", [
        "ionic",
        "microOldNewTemplate2_2_3.directives",
        "microOldNewTemplate2_2_3.service"

    ]);
});
