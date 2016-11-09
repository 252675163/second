"use strict";
/**
 * author :yinglechao
 * time: 2015年1月6日
 * description: 新微官网点赞
 */

define([
    "ionic",
    "components/site_praise/directive",
    "components/site_praise/service",
    "services/net/common"

], function () {

    return angular.module("SitePraise", [
        "ionic",
        "SitePraise.directive",
        "SitePraise.Service",
        "services.net.common"

    ]);
});
