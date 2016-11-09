 "use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic","components/new_site_nav/service"], function() {
    angular.module("NewSiteNav.directive", ['NewSiteNav.Service'])
        .directive("newSiteNav", [
                "$window", "$timeout", "$ionicScrollDelegate","$location","newSiteNavService",function($window, $timeout,$ionicScrollDelegate,$location,newSiteNavService) {
                    return {
                        restrict: "E",
                        scope: {
                            //"activityTemplateId":"="
                            modeId : "="
                        },
                        templateUrl: "components/new_site_nav/template.html",
                        link: function(scope, iElement, iAttr) {
                            scope.navData = newSiteNavService.navData;
                            scope.moduleElemnetId = ["site-cover","site-news","site-org-info","site-course-info","site-teacher-info","site-about-us-Info","site-qr-code"];

                            scope.goAnchor = function(Anchor){
                                $location.hash(scope.moduleElemnetId[Anchor]);
                                $ionicScrollDelegate.anchorScroll(true);
                            };
                            scope.isUseableList = newSiteNavService.getIsUseableModulesByModeId(scope.modeId);




                        }

                    };
                }
            ]
        );
});