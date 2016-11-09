"use strict";
/**
 * author :wss
 * time: 2016年8月12日
 * description:强依赖模块合并
 */

define([
    "ionic",
     "components/templates/new-micro-site-template/site-cover/default_data_service",
    "components/templates/new-micro-site-template/site-cover/service",
    "components/templates/new-micro-site-template/site-cover/directive",   
    "components/templates/new-micro-site-template/site-qr-code/service",
     "components/templates/new-micro-site-template/site-qr-code/directive",
     
], function () {

    return angular.module("siteQrCove", [
        "ionic",
        "siteCover.directives",
        "siteCover.Service",
        "siteQrCode.directives",
        "siteQrCode.Service",
    ]);
});
