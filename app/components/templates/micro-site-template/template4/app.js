"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/template4/directive",
    "components/upload_img/app"
], function () {

    return angular.module("MicroTemplate4", [
        "ionic",
        "MicroTemplate4.directive",
        "UploadImg"
    ]);
});
