"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "modules/new-microsite-edit-app/services", "services/net/common"],
    function () {
        return angular.module("NewMicroSiteEditApp.controllers", ["NewMicroSiteEditApp.services", "services.net.common"])
            .controller("NewMicroSiteEditAppController", [
                "$scope", "$rootScope", "newMicroSiteEditAppService", "$ionicModal", "$ionicPopup", "$timeout", "webSite", "commonNetService", "uploadImgService", "promptBarService", "userTermsService",
                function ($scope, $rootScope, newMicroSiteEditAppService, $ionicModal, $ionicPopup, $timeout, webSite, commonNetService, uploadImgService, promptBarService, userTermsService) {
                    $scope.isShowError = false;
                    $scope.isOpenChangeBack = false;
                    $scope.isShowEdit = false;
                    //$scope.changeIsShowEdit = function(){
                    //    $scope.isShowEdit = !$scope.isShowEdit;
                    //};
                    //免责声明弹窗
                    $scope.isShowDisclaimerBox = false;
                    var disclaimerBoxConfigKey = "isShowDisclaimerBox";

                    var saveShareConfig = function (websiteId) {
                        var link = window.shareServer + "/Home/ShareRoute?p=newsite/view?id=" + websiteId;
                        var coverModel = $scope.siteModel.modules.filter(function (data) {
                            return data.templateName == "site-cover";
                        });
                        var shareConfigByCover = {};
                        if (coverModel[0]) {
                            shareConfigByCover = {
                                imgUrl: coverModel[0].templateModel.imageUrl[0],
                                title: coverModel[0].templateModel.description[0],
                                desc: coverModel[0].templateModel.description[2]
                            };
                        }
                        var defaultShareModel = newMicroSiteEditAppService.getDefaultShareModel($scope.$stateParams.templateId, $scope.siteModel.style);
                        //var shareConfig = newMicroSiteEditAppService.shareConfigModel(shareConfigByCover.title || defaultShareModel.title, shareConfigByCover.desc || defaultShareModel.desc, link, shareConfigByCover.imgUrl || defaultShareModel.imgUrl);
                        //没有标题或副标题则置空，不补默认数据2015.1.19
                        var shareConfig = newMicroSiteEditAppService.shareConfigModel(shareConfigByCover.title , shareConfigByCover.desc , link, shareConfigByCover.imgUrl || defaultShareModel.imgUrl);
                        newMicroSiteEditAppService.updateShareConfig(websiteId, angular.toJson(shareConfig));


                    };
                    $scope.showEdit = function (event) {
                        event.stopPropagation();
                        if (!$scope.isShowEdit) {
                            $("body").one("click", function () {
                                $timeout(function () {
                                    $scope.isShowEdit = false;
                                }, 0);

                            });
                            $scope.isShowEdit = true;
                        } else {
                            $scope.isShowEdit = false;
                        }
                    };


                    //预览模块跳转
                    $scope.preview = function () {
                        //数据不为空校验,确认取消弹窗
                        if (!newMicroSiteEditAppService.vierifyNewsiteModulesFunction($scope.usableModules)) {
                            var confirmPopup = $ionicPopup.confirm({
                                template: "您尚未完成编辑，是否继续预览?",
                                cancelText: "返回编辑",
                                okText: "继续预览"
                            });
                            confirmPopup.then(function (res) {
                                if (res) {
                                    $rootScope.$state.go("newsite.preview", {
                                        templateId: $scope.$stateParams.templateId,
                                        websiteId: $scope.$stateParams.websiteId,
                                        isNew: false
                                    }, { inherit: false});
                                } else {
                                    return;
                                }
                            });
                        } else {
                            $rootScope.$state.go("newsite.preview", {
                                templateId: $scope.$stateParams.templateId,
                                websiteId: $scope.$stateParams.websiteId,
                                isNew: false
                            }, { inherit: false});

                        }
                    };
                    //goChooseStyle 跳转到选择风格模块
                    $scope.goChooseStyle = function () {
                        $rootScope.$state.go("newsite.style", {
                            templateId: $scope.$stateParams.templateId,
                            websiteId: $scope.$stateParams.websiteId,
                            isNew: false
                        }, { inherit: false});

                    };


                    //新增功能：暂存  by xp 2015年10月27日 16:16:02
                    $scope.save = function () {
                        ////数据不为空校验
                        if (!newMicroSiteEditAppService.vierifyNewsiteModulesFunction($scope.usableModules)) {
                            $scope.siteModel.isEditDone = false;
                        } else {
                            $scope.siteModel.isEditDone = true;
                        }
                        var data = newMicroSiteEditAppService.uiModelToBizModel($scope.siteModel, $scope.$stateParams.templateId, $scope.$stateParams.websiteId, $scope.userId, $scope.schoolPalOrgUserId);
                        newMicroSiteEditAppService.save(data).success(function (result) {
                            if (result.error === 1) {
                                promptBarService.showErrorBar("存在敏感词！请重新编辑", 3000);

                            } else {
                                if (result.status == 1) {
                                    //不管有没有保存过，先保存ShareConfig 2015.1.19
                                    //if ($scope.$stateParams.websiteId == "0") {
                                    saveShareConfig(result.data.Id);
                                    //}
                                    $scope.$stateParams.websiteId = result.data.Id || 0;
                                    $scope.userId = result.data.UserId;
                                    $scope.schoolPalOrgUserId = result.data.SchoolPalOrgUserId;

                                    // $scope.$stateParams.isHold = false;
                                    promptBarService.showSuccessBar("保存成功！", 2000);
                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }

                            }
                        });
                    };
                    $scope.chooseMode = function () {
                        $scope.$state.go("newsite.chooseMode", {websiteId: $scope.$stateParams.websiteId, go: "edit"});
                    };


                    $scope.upIcon = function () {
                        //数据不为空校验(检验当前页的数据)
                        var ModulesList = [$scope.usableModules[$scope.siteModel.currentModuleIndex]];
                        //if (!newMicroSiteEditAppService.vierifyNewsiteModulesFunction(ModulesList)) {
                        //    return;
                        //}
                        $scope.siteModel.currentModuleIndex--;
                    };

                    $scope.downIcon = function () {
                        //数据不为空校验(检验当前页的数据)
                        var ModulesList = [$scope.usableModules[$scope.siteModel.currentModuleIndex]];
                        //if (!newMicroSiteEditAppService.vierifyNewsiteModulesFunction(ModulesList)) {
                        //    return;
                        //}
                        $scope.siteModel.currentModuleIndex++;
                    };

                    $scope.OpenLockMark = function () {
                        $scope.isOpenChangeBack = !$scope.isOpenChangeBack;
                    };


                    var init = function () {
                        newMicroSiteEditAppService.getUserConfig(disclaimerBoxConfigKey).success(function (result) {
                            if (result.status == 1) {
                                $scope.isShowDisclaimerBox = result.data.ConfigValue == "false" ? false : true;
                            }
                            else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
                        if (angular.isUndefined($scope.siteModel)) {
                            if (!angular.isUndefined(webSite)) {
                                if (webSite == "") {
                                    // 报错页面，非法进入页面
                                    window.location.href = "/Common/error?mark=NewMicroSiteEditAppController_init_webSite_IsNullOrEmpay";
                                } else {

                                    if (webSite.Config == "" || webSite.Config == null) {
                                        $rootScope.siteModel = newMicroSiteEditAppService.makeNewModel(1);
                                    } else {
                                        $rootScope.siteModel = JSON.parse(webSite.Config);
                                    }

                                }
                            } else {
                                // 报错页面，非法进入页面
                                window.location.href = "/Common/error?mark=NewMicroSiteEditAppController_init_webSite_NotEqual_Undefined";
                            }
                        }
                        //如果是新建且未编辑未保存过    $scope.isNew从预览页面传递过来
                        if ($scope.$stateParams.isNew == "true") {
                            $scope.siteModel.modules.forEach(function (data) {
                                data.templateModel = {};
                            });
                            $scope.$stateParams.isNew = "false";
                        }

                        //编辑可用的模块
                        $scope.usableModules = $scope.siteModel.modules.filter(function (data) {
                            return (data.isDisabled == false) && (data.isHideInEdit == false);
                        });
                        //userId
                        $scope.userId = webSite.UserId || 0;
                        $scope.schoolPalOrgUserId = webSite.SchoolPalOrgUserId || 0;

                        //hack安卓手机不隐藏菜单栏问题，再次隐藏微信菜单栏 by xp
                        if (ionic.Platform.isAndroid()) {
                            window.wx && window.wx.hideOptionMenu();
                        }
                    };
                    init();


                    //上一页
                    $scope.onSwipeUp = function (event) {
                        if ($scope.siteModel.currentModuleIndex != ($scope.usableModules.length - 1)) {
                            $scope.downIcon();
                        }
                    };
                    //下一页
                    $scope.onSwipeDown = function (event) {
                        if ($scope.siteModel.currentModuleIndex !== 0) {
                            $scope.upIcon();
                        }
                    };

                    $scope.$on("$stateChangeStart", function (event, toState) {
                        //用于删除框没点击时跳转到别的页面关闭
                        if ($ionicPopup._popupStack[0] != undefined) {
                            $ionicPopup._popupStack[0].responseDeferred.promise.close();
                        }
                        if (toState.name.indexOf("newsite") !== -1) {
                            //event.targetScope.isNew = false;
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                        }

                    });

                    //显示用户条款弹窗
                    $scope.showUserTerms = function () {
                        userTermsService.showUserTerms();
                    }
                    //关闭免责声明弹窗
                    $scope.hideDisclaimerBox = function () {
                        $scope.isShowDisclaimerBox = false;
                        newMicroSiteEditAppService.updateUserConfig(disclaimerBoxConfigKey, "false").success(function (result) {
                            if (result.status == 1) {
                            }
                            else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        })
                    }

                }
            ]);
    });