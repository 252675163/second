"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "modules/microsite-edit-app/services", "services/net/common"],
    function() {
        return angular.module("MicroSiteEditApp.controllers", ["MicroSiteEditApp.services", "services.net.common"])
            .controller("MicroSiteEditAppController", [
                "$scope", "$rootScope", "MicroSiteEditAppService", "$ionicModal", "$ionicPopup", "$timeout", "webSite", "commonNetService", "uploadImgService", "promptBarService",
                function($scope, $rootScope, microSiteEditAppService, $ionicModal, $ionicPopup, $timeout, webSite, commonNetService, uploadImgService, promptBarService) {
                    $scope.isShowError = false;
                    $scope.isOpenChangeBack = false;
                    $scope.isShowEdit = false;
                    //$scope.changeIsShowEdit = function(){
                    //    $scope.isShowEdit = !$scope.isShowEdit;
                    //};
                    $scope.showEdit = function(event) {
                        event.stopPropagation();
                        if (!$scope.isShowEdit) {
                            $("body").one("click", function() {
                                $timeout(function() {
                                    $scope.isShowEdit = false;
                                }, 0);

                            });
                            $scope.isShowEdit = true;
                        } else {
                            $scope.isShowEdit = false;
                        }
                    };
                    ////打开背景模型
                    //$scope.changeBackGround = function() {
                    //    $rootScope.$state.go("site.back", {}, { reload: true, inherit: false });
                    //};

                    //打开模板模型
                    $scope.addPage = function() {
                        $rootScope.$state.go("site.add", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId }, { reload: true, inherit: false });
                    };

                    //删除页面
                    $scope.delCurrentPage = function() {
                        if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length == 1) {

                        } else {
                            var confirmPopup = $ionicPopup.confirm({
                                title: "提醒",
                                template: "确认删除该页面?",
                                cancelText: "取消",
                                okText: "确认"
                            });
                            confirmPopup.then(function(res) {
                                if (res) {
                                    $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.splice($scope.siteModel.currentSectionIndex, 1);
                                    if ($scope.siteModel.currentSectionIndex == 0) {
                                        //重置模板
                                        $scope.siteModel.templateRender = Date.now();
                                    } else {
                                        $scope.siteModel.currentSectionIndex--;
                                    }
                                }
                            });
                        }
                    };

                    //预览模块跳转
                    $scope.preview = function() {
                        var count = 0;
                        for (var j = 0; j < $scope.siteModel.pages.length; j++) {
                            for (var i = 0; i < $scope.siteModel.pages[j].sections.length; i++) {
                                if ($scope.siteModel.pages[j].sections[i].templateName == "micro-template1") {
                                    count++;
                                }
                            }
                        }
                        if (count == 0) {
                            $scope.remind = "请至少添加一个报名页面！";
                            $scope.isShowError = true;
                        } else {
                            $rootScope.$state.go("site.preview", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId, isHold: true }, { reload: true, inherit: false });
                        }
                    };

                    //新增功能：暂存  by xp 2015年10月27日 16:16:02
                    $scope.save = function() {
                        var data = microSiteEditAppService.uiModelToBizModel($scope.siteModel, $scope.$stateParams.templateId, $scope.$stateParams.websiteId, $scope.userId);
                        microSiteEditAppService.save(data).success(function(result) {
                            if (result.error === 1) {
                                promptBarService.showErrorBar("存在敏感词！请重新编辑", 3000);

                            } else {
                                if (result.status) {
                                    $scope.$stateParams.websiteId = result.data.Id || 0;
                                    $scope.userId = result.data.UserId;
                                    $scope.$stateParams.isHold = false;
                                    promptBarService.showSuccessBar("暂存成功！", 2000);
                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }

                            }
                        });
                    };


                    $scope.upIcon = function() {
                        $scope.siteModel.currentSectionIndex--;
                    };

                    $scope.downIcon = function() {
                        $scope.siteModel.currentSectionIndex++;
                    };
                    $scope.leftIcon = function() {
                        $scope.siteModel.currentPageIndex--;
                        $scope.siteModel.currentSectionIndex = 0;
                    };
                    $scope.rightIcon = function() {
                        $scope.siteModel.currentPageIndex++;
                        $scope.siteModel.currentSectionIndex = 0;
                    };
                    $scope.OpenLockMark = function() {
                        $scope.isOpenChangeBack = !$scope.isOpenChangeBack;
                    };

                    //自定义背景 begin
                    $scope.changeBackGroundByMyself = function(e) {
                        uploadImgService.upLoadImg(microSiteEditAppService.getImgConfig(), 0, $scope.changeBackGroundFinish, $scope.cancelFunction);

                    };
                    $scope.cancelFunction = function() {
                        $timeout(function() {
                            $scope.isOpenChangeBack = false;
                        }, 0);
                    };
                    $scope.changeBackGroundFinish = function(url) {
                        $timeout(function() {
                            $scope.isOpenChangeBack = false;
                            $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections[$scope.siteModel.currentSectionIndex].backgroundImage = url;
                        }, 0);
                    };
                    $scope.changeBackGround = function() {
                        $scope.isOpenChangeBack = false;
                        $rootScope.$state.go("site.back", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId }, { reload: true, inherit: false });


                    };

                    var init = function() {
                        //如果stateParams中不包含siteModel信息，则返回首页
                        //if (angular.isUndefined($scope.siteModel)) {
                        //    window.location.href = "/Common/error";
                        //} else {
                        //    //数据统计
                        //    commonNetService.saveBackLog({ OriginId: $scope.$stateParams.websiteId, Type: 'Website', Operation: 'Edit' });
                        //    //TODO 根据需求设置当前索引，如果需求为返回编辑页面，保留上一次编辑的位置则直接赋值即可

                        //}


                        if (!($scope.$stateParams.isHold && !angular.isUndefined($scope.siteModel))) {
                            if (!angular.isUndefined(webSite)) {
                                if (webSite == "") {
                                    // 报错页面，非法进入页面
                                    window.location.href = "/Common/error";
                                } else {

                                    if (webSite.Config == "" || webSite.Config == null) {
                                        $scope.siteModel = microSiteEditAppService.makeNewModel(webSite.OrgName, $scope.$stateParams.templateId);
                                    } else {
                                        $scope.siteModel = JSON.parse(webSite.Config);

                                    }
                                   
                                }
                            } else {
                                // 报错页面，非法进入页面
                                window.location.href = "/Common/error";
                            }
                        }
                        //userId
                        $scope.userId = webSite.UserId || 0;

                    };
                    init();


                    //向上翻页
                    $scope.onSwipeUp = function(event) {
                        if ($scope.siteModel.currentSectionIndex != ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length - 1)) {
                            $scope.downIcon();
                        }
                    };
                    //向下翻页
                    $scope.onSwipeDown = function(event) {
                        if ($scope.siteModel.currentSectionIndex !== 0) {
                            $scope.upIcon();
                        }
                    };

                    $scope.$on("$stateChangeStart", function(event, toState) {
                        //用于删除框没点击时跳转到别的页面关闭
                        if ($ionicPopup._popupStack[0] != undefined) {
                            $ionicPopup._popupStack[0].responseDeferred.promise.close();
                        }
                        if (toState.name.indexOf("site") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                        }

                    });

                }
            ]);
    });