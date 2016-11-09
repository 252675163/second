"use strict";
/**
 * author :yinglechao
 * time: 2016年5月11日
 * description: 咨询记录的备注字段
 */
define([
    "ionic",
   "components/consult_item/consult_content/directive"

], function () {

    return angular.module("ConsultContent", [
        "ionic",
        "ConsultContent.directive"
    ]);
});
