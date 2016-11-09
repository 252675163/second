"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/template1/app",
    "components/templates/new-micro-site-template/template2/app",
    "components/templates/new-micro-site-template/template3/app",
    "components/templates/new-micro-site-template/template4/app",
    "components/templates/new-micro-site-template/template5/app",
    "components/templates/new-micro-site-template/template6/app"
], function () {

    return angular.module("NewMicroTemplate", [
        "ionic",
        "MicroTemplate1",
        "MicroTemplate2",
        "MicroTemplate3",
        "MicroTemplate4",
        "MicroTemplate5",
        "MicroTemplate6"
    ]);
});
