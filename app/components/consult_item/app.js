"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日                 
 * description:
 */

define([
    "ionic",
   "components/consult_item/directive",
    "components/consult_item/consult_content/app"

], function () {

    return angular.module("ConsultItem", [
        "ionic",
        "ConsultItem.directive",
        "ConsultContent"
    ]);
});
