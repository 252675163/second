"use strict";
/**
 * author :yinglechao
 * time: 2015年12月2日
 * description: 新微官网咨询的表单提交页面
 */

define([
    "ionic",
    "components/site_form/directive",
    "components/site_form/service",
    "services/net/common"

], function () {

    return angular.module("SiteForm", [
        "ionic",
        "SiteForm.directive",
        "SiteForm.Service",
        "services.net.common"

    ]);
});
