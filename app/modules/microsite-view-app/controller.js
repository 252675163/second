"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:58
 * description:
 */

define(["slip", "ionic", "modules/microsite-view-app/services", "services/net/common"],
    function() {
        return angular.module("MicroSiteViewApp.controllers", ["MicroSiteViewApp.services", "services.net.common"])
            .controller("MicroSiteViewAppController", [
                "$scope", "$rootScope", "MicroSiteViewAppService", "webSite", "commonNetService",
                function($scope, $rootScope, microSiteViewAppService, webSite, commonNetService) {

                    $scope.isBottom = false;
                    $scope.$watchGroup(["siteModel.currentSectionIndex", "siteModel.currentPageIndex"], function(nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length == nv[0] + 1) {
                            $scope.isBottom = true;
                        } else {
                            $scope.isBottom = false;
                        }
                        if (window.slipInstance) {
                            window.slipInstance.jump(parseInt(nv[0]));
                        }
                        
                    }, true);

                    //修复bug ：当前导航栏在此点击。不会弹回第一屏 ，会导致是否最后一屏的计算错误  2015年10月19日 15:01:26
                    $scope.pickPage = function(index) {
                        if ($scope.siteModel.currentPageIndex != index) {
                            $scope.siteModel.currentSectionIndex = 0;

                        }
                        $scope.siteModel.currentPageIndex = index;
                    };
                    $scope.openView = function() {
                        window.open($scope.data.Footer);
                    };
                    $scope.init = function() {
                        $scope.data = webSite;
                        if (webSite.Config == null || webSite.Config == "") {
                            $scope.siteModel = microSiteViewAppService.makeNewModel(webSite.OrgName);
                            $scope.siteModel.currentPageIndex = $rootScope.$stateParams.currentPageIndex ? $rootScope.$stateParams.currentPageIndex : 0;
                        } else {
                            $scope.siteModel = JSON.parse($scope.data.Config);
                            $scope.siteModel.currentPageIndex = $rootScope.$stateParams.currentPageIndex ? $rootScope.$stateParams.currentPageIndex : 0;
                        }

                        //新增需求，页面title可自定义 2015年10月19日 20:52:21 
                        if ($scope.data.ShareConfig) {
                            $scope.$state.current.title = angular.fromJson($scope.data.ShareConfig).title;
                        }

                        if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length == 1) {
                            $scope.isBottom = true;
                        }
                        //if (angular.isUndefined($rootScope.$stateParams.id)) {
                        //    $scope.siteModel = microSiteViewAppService.makeNewModel();
                        //} else {
                        //    $scope.data = webSite;
                        //    $scope.siteModel = JSON.parse($scope.data.Config)
                        //}
                    };
                    $scope.init();


                }
            ]);
    });