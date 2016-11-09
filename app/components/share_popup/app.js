"use strict";
/**
 * author :
 * time: 
 * description: 分享弹框组件
 */

define([
    "ionic",
    "components/share_popup/directive",
    "components/share_popup/service",
    "services/net/common"

], function () {

    return angular.module("SharePopup", [
        "ionic",
        "SharePopup.directive",
        "SharePopup.Service",
        "services.net.common"

    ]);
});
