"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "modules/microsite-publish-app/services", "services/net/common"],
    function() {
        return angular.module("MicroSitePublishApp.controllers", ["MicroSitePublishApp.services", "services.net.common"])
            .controller("MicroSitePublishAppController", [
                "$scope", "$rootScope", "MicroSitePublishAppService", "$ionicPopup", "commonNetService",
                function($scope, $rootScope, microSitePublishAppService, $ionicPopup, commonNetService) {
                    $scope.isShowError = false;
                    $scope.isSelectSynchro = false;
                    $scope.isErrorByMessage = false;
                    $scope.isPublish = false;
                    $scope.isPublishFail = false;
                    $scope.isShowTip = false;
                    $scope.calMessage = "";
                    $scope.ToInit = function() {
                        $scope.isShowError = false;
                        $scope.isErrorByMessage = false;
                        $scope.isPublish = false;
                        $scope.isPublishFail = false;
                        $scope.isShowTip = false;
                        $scope.calMessage = "";
                    }; //发布流程
                    $scope.savePublish = function(type, id, secret) {
                        $scope.calMessage = "";
                        $scope.countdown = 3;
                        if (!type) {
                            //只发布微官网
                            //转成bizmodel
                            var data = microSitePublishAppService.uiModelToBizModel($scope.siteModel, $scope.$stateParams.userId, $scope.$stateParams.templateId, $scope.$stateParams.websiteId);
                            microSitePublishAppService.saveWeb(data).success(function(result) {
                                var myTime;
                                if (result.status == 1) {
                                    //正常保存
                                    $scope.isPublish = true;
                                    myTime = setInterval(function() {
                                        $scope.countdown--;
                                        if ($scope.countdown == 0) {
                                            clearInterval(myTime);
                                            $rootScope.$state.go("index", {  }, { reload: true, inherit: false });
                                        }
                                    }, 1000); //数据统计
                                    commonNetService.saveBackLog({ OriginId: result.data, Type: "Website", Operation: "Save" });
                                } else {
                                    if (result.error == 1) {
                                        //有敏感词，保存报错，跳到编辑
                                        $scope.isPublish = true;
                                        $scope.isPublishFail = true;
                                        $scope.calMessage = result.message;
                                        myTime = setInterval(function() {
                                            $scope.countdown--;
                                            if ($scope.countdown == 0) {
                                                clearInterval(myTime);
                                                $rootScope.$state.go("site.edit", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId, isHold: true }, { reload: true, inherit: false });
                                            }
                                        }, 1000);
                                    } else {
                                        //未知错误，保存报错
                                        $scope.remind = "oops...好像哪里不对，请您检查设备或网络连接是否存在异常。若有疑问，可以联系我们的客服MM哦~";
                                        $scope.isShowError = true;
                                    }
                                }
                            });
                        } else {
                            //发布加同步微信公众号 
                            //数据统计
                            commonNetService.saveBackLog({ OriginId: $scope.$stateParams.websiteId, Type: "Website", Operation: "Publish" });
                            var confirmPopup = $ionicPopup.confirm({
                                template: "确认<span style='color:red'>彻底清空并替换<span>您的微信公众号菜单信息吗？",
                                cancelText: "取消",
                                okText: "确认"
                            });
                            confirmPopup.then(function(res) {
                                if (res) {
                                    if (id == "" || secret == "" || id == undefined || secret == undefined) {
                                        //保存为空
                                        $scope.isPublish = true;
                                        $scope.isErrorByMessage = true;
                                        $scope.isPublishFail = true;
                                        $scope.calMessage = "您的应用ID和应用密钥不能为空。";
                                        var myTime = setInterval(function() {
                                            $scope.countdown--;
                                            if ($scope.countdown == 0) {
                                                clearInterval(myTime);
                                                $scope.ToInit();
                                                angular.element(".lockMask_box").hide();
                                            }
                                        }, 1000);
                                    } else {
                                        //转成bizmodel
                                        var data = microSitePublishAppService.uiModelToBizModel($scope.siteModel, $scope.$stateParams.userId, $scope.$stateParams.templateId, $scope.$stateParams.websiteId, id, secret);
                                        microSitePublishAppService.saveWebAndPublish(data).success(function(result) {
                                            console.log(result);
                                            var myTime;
                                            if (result.status == 1) {
                                                //成功发布
                                                $scope.isPublish = true;
                                                $scope.isPublishFail = false;
                                                $scope.isErrorByMessage = false;
                                                myTime = setInterval(function() {
                                                    $scope.countdown--;
                                                    if ($scope.countdown == 0) {
                                                        clearInterval(myTime);
                                                        $rootScope.$state.go("index", {}, { reload: true, inherit: false });
                                                    }
                                                }, 1000);
                                            } else {
                                                if (result.error == 1) {
                                                    //有敏感词，发布报错，跳到编辑
                                                    $scope.isPublish = true;
                                                    $scope.isPublishFail = true;
                                                    $scope.calMessage = result.message;
                                                    myTime = setInterval(function() {
                                                        $scope.countdown--;
                                                        if ($scope.countdown == 0) {
                                                            clearInterval(myTime);
                                                            $rootScope.$state.go("site.edit", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId, isHold: true }, { reload: true, inherit: false });
                                                            $scope.isPublishFail = false;
                                                        }
                                                    }, 1000);
                                                }
                                                if (result.error == 0) {
                                                    //未知错误，保存报错
                                                    $scope.remind = "oops...好像哪里不对，请您检查设备或网络连接是否存在异常。若有疑问，可以联系我们的客服MM哦~";
                                                    $scope.isShowError = true;
                                                    myTime = setInterval(function() {
                                                        $scope.countdown--;
                                                        if ($scope.countdown == 0) {
                                                            clearInterval(myTime);
                                                            $scope.ToInit();
                                                        }
                                                    }, 1000);
                                                }
                                                if (result.error == 2) {
                                                    //用户信息报错
                                                    $scope.isPublish = true;
                                                    $scope.isPublishFail = true;
                                                    $scope.isErrorByMessage = true;
                                                    $scope.calMessage = "您的应用ID和应用密钥不匹配。";
                                                    myTime = setInterval(function() {
                                                        $scope.countdown--;
                                                        if ($scope.countdown == 0) {
                                                            clearInterval(myTime);
                                                            $scope.ToInit();
                                                            angular.element(".lockMask_box").hide();
                                                        }
                                                    }, 1000); //$scope.isErrorByMessage = true;
                                                }

                                            }
                                        });
                                    }
                                }
                            });
                        }
                    };

                    var init = function() {
                        if (!angular.isUndefined($scope.siteModel)) {
                            microSitePublishAppService.getMessage().success(function(result) {
                                $scope.publicId = result.AppId;
                                $scope.publicPassword = result.AppSecret;
                            });
                        } else {
                            // 报错页面，非法进入页面
                            window.location.href = "/Common/error";
                        }
                    };
                    init();

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