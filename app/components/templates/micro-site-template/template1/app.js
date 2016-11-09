"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日
 * description:
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/template1/directive",
    "components/templates/new-micro-site-template/template1/service",
    "services/net/active-form"
], function() {

    return angular.module("MicroTemplate1", [
        "ionic",
        "MicroTemplate1.directives",
        "MicroTemplate1.Service",
        "services.net.activityForm"

    ]);
});