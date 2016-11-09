"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年4月20日
 * description: 下拉遮罩组件
 */

define([
    "ionic",
    "components/combobox/directive",
    "components/combobox/service",
    "services/net/common"

], function () {

    return angular.module("Combobox", [
        "ionic",
        "Combobox.directive",
        "Combobox.Service",
        "services.net.common"

    ]);
});
