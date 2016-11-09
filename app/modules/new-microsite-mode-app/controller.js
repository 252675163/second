"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/new-microsite-mode-app/services", "services/net/grass"],
    function () {
        return angular.module("MicroSiteModeApp.controllers", ["MicroSiteModeApp.services", "services.net.grass"])
            .controller("microSiteModeAppController", [
                "$scope", "$rootScope", "$ionicPopup", "microSiteModeAppService", "promptBarService", "webSite", "permissionService", "maskService", "commonNetService",
                function ($scope, $rootScope, $ionicPopup, microSiteModeAppService, promptBarService, webSite, permissionService, maskService, commonNetService) {


                    $scope.chooseMode = function (modeId) {
                            changeMode2(modeId);
                    };
                    var changeMode2 = function(modeId){
                        $scope.isConfirm = true;

                        if (modeId == 3) {
                            permissionService.getVip().then(function (isVip) {
                                if (!isVip) {
                                    //去领红包页面
                                    maskService.showMask("您还不是VIP或者您的VIP已过期,<br/>这就带您去做活动兑换VIP哦！", 3000, false, 3).then(function () {
                                        //$rootScope.$state.go("userCenter", {});
                                        $rootScope.$state.go("VIPclub", {});
                                    });
                                    return false;
                                } else {
                                    var newModules = microSiteModeAppService.updteModules(modeId, $scope.siteModel.modules);
                                    $scope.siteModel.modules = newModules;
                                    $scope.siteModel.plan = modeId;
                                    $scope.siteModel.currentModuleIndex = 0;
                                    if ($scope.$state.params.go == "edit") {
                                        $scope.$state.go("newsite.edit", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId });
                                    } else if ($scope.$state.params.go == "preview") {
                                        $scope.$state.go("newsite.preview", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId, isNew: true });
                                    }
                                }
                            });
                        } else {
                            var newModules = microSiteModeAppService.updteModules(modeId, $scope.siteModel.modules);
                            $scope.siteModel.modules = newModules;
                            $scope.siteModel.plan = modeId;
                            $scope.siteModel.currentModuleIndex = 0;
                            if ($scope.$state.params.go == "edit") {
                                $scope.$state.go("newsite.edit", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId });
                            } else if ($scope.$state.params.go == "preview") {
                                $scope.$state.go("newsite.preview", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId, isNew: true });
                            }
                        }
                    };

                    var init = function () {
                        commonNetService.addBackgroundOperationLog("SiteTemList");

                        if (angular.isUndefined($scope.siteModel)) {
                            if (!angular.isUndefined(webSite)) {
                                if (webSite == "") {
                                    // 报错页面，非法进入页面
                                    window.location.href = "/Common/error?mark=microSiteModeAppController_init_webSite_IsNullOrEmpay";
                                } else {
                                    if (webSite.Config == "" || webSite.Config == null) {
                                        $scope.siteModel = microSiteModeAppService.makeNewModel(2);
                                    } else {
                                        $scope.siteModel = JSON.parse(webSite.Config);
                                    }

                                }
                            } else {
                                // 报错页面，非法进入页面
                                window.location.href = "/Common/error?mark=microSiteModeAppController__init_webSite_NotEqual_Undefined";
                            }
                        }

                        $scope.currentModeId = $scope.siteModel.plan;
                        //是否新建
                        $scope.isNew =$scope.$stateParams.go=="preview";
                    };
                    init();
                    $scope.$on("$stateChangeStart", function (event, toState) {
                        if (toState.name.indexOf("newsite") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                            //event.targetScope.isNew = $scope.isNew;
                        }
                    });


                }
            ]);
    });