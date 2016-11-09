"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("SiteAboutUsInfoEdit.directives", [])
        .directive("siteAboutUsInfoEdit", [
            "$window", "$timeout","siteAboutUsInfoService", "uploadImgService",function ($window, $timeout,siteAboutUsInfoService,uploadImgService ) {
                return {
                    restrict: 'EA',
                    scope:{
                        campusInfoModel:"=",
                        removeCampusInfo:"&"
                    },
                    templateUrl: "components/templates/new-micro-site-template/site-about-us-info/site-about-us-info-edit/template.html",
                    link: function (scope, iElement, iAttr) {





                    }

                }
            }]
    )

});

