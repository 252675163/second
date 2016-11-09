"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日                 
 * description:
 */

define([
    "ionic",
   "components/new_site_nav/directive"

], function () {

    return angular.module("NewSiteNav", [
        "ionic",
        "NewSiteNav.directive"
    ]);
});
