"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:18:48
 * description: 新微官网预览模块
 */

define(["ionic", "modules/new-microsite-style-app/services", "services/net/common", "components/footer/service"],
    function() {
        return angular.module("NewMicroSiteStyleApp.controllers", ["NewMicroSiteStyleApp.services", "services.net.common", "MyFooter.Service"])
            .controller("NewMicroSiteStyleAppController", [
                "$scope", "$window", "$rootScope", "$ionicScrollDelegate", "newMicroSiteStyleAppService", "$ionicPopup", "$sce", "webSite", "commonNetService", "promptBarService", "uploadImgService", "permissionService", "myFooterService", "maskService",
                function($scope, $window, $rootScope, $ionicScrollDelegate, newMicroSiteStyleAppService, $ionicPopup, $sce, webSite, commonNetService, promptBarService, uploadImgService, permissionService, myFooterService, maskService) {
                    //缓存$scope.siteModel，数据传递使用
                    var siteModelByCache = {};
                    //是否展开styleList
                    $scope.isOpenStyleList = true;
                    $scope.renderStyleViewFun = {};
                    $scope.triggerIsOpenStyleList = function() {
                        $scope.isOpenStyleList = ! $scope.isOpenStyleList;
                    };
                    $scope.confirm = function() {
                        ////todo 确认取消弹窗，将更新数据
                        //var confirmPopup = $ionicPopup.confirm({
                        //    template: "确定更换风格？",
                        //    cancelText: "取消",
                        //    okText: "确认"
                        //});
                        //confirmPopup.then(function(res) {
                        //    if (res) {
                        $scope.isConfirm = true;
                        $rootScope.$state.go("newsite.edit", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId, isHold: true }, { inherit: false });
                        //    }
                        //});

                    };
                    $scope.chooseStyle = function(styleId) {
                        //重置siteModel，$scope.siteModel.style = styleId;
                        $scope.siteModel.style = styleId;
                        $scope.templateStyleClass = $scope.getTemplateClassByStyleId($scope.siteModel.style);
                        $ionicScrollDelegate.$getByHandle("myStyleContent").scrollTop();

                    };

                    $scope.getTemplateClassByStyleId = function(styleId) {
                        return "newSite_tem" + styleId; //每套风格需要统一的命名规则
                    };


                    var init = function() {
                        if (angular.isUndefined($scope.siteModel)) {
                            if (webSite == "") {
                                // 报错页面，非法进入页面
                                window.location.href = "/Common/error?mark=NewMicroSiteStyleAppController_init_webSite_IsNullOrEmpay";
                            } else {
                                if (webSite.Config == "" || webSite.Config == null) {
                                    $scope.siteModel = newMicroSiteStyleAppService.makeNewModel(1);
                                } else {
                                    $scope.siteModel = JSON.parse(webSite.Config);
                                }
                            }
                        }

                        $scope.footer = webSite.Footer && webSite.Footer.replace(/href\s*?=\s*?[\"'](.*?)[\"']/g, "href='javascript:void(0);'");
                        myFooterService.setFooter($scope.footer);
                        //userId
                        $scope.userId = webSite.UserId || 0;
                        $scope.shareConfigCache = webSite.ShareConfig;


                        //缓存$scope.siteModel，数据传递使用
                        siteModelByCache = angular.copy($scope.siteModel);
                        //重置当前的siteModel，风格预览使用模板默认数据
                        $scope.siteModel = newMicroSiteStyleAppService.makeNewModel(siteModelByCache.plan);
                        $scope.siteModel.style = siteModelByCache.style;

                        //编辑可用的模块
                        $scope.usableModules = $scope.siteModel.modules.filter(function(data) {
                            return (data.isDisabled == false) && (data.isHideInEdit == false);
                        });

                        $scope.templateStyleClass = $scope.getTemplateClassByStyleId($scope.siteModel.style);
                        $scope.styleListModel = newMicroSiteStyleAppService.getStyleListModel();

                    };


                    init();


                    $scope.$on("$stateChangeStart", function(event, toState) {

                        if (toState.name.indexOf("newsite") !== -1) {
                            if ($scope.isConfirm) {
                                //有点击确定时的路由跳转
                                siteModelByCache.style = $scope.siteModel.style;
                                event.targetScope.siteModel = angular.copy(siteModelByCache);
                            } else {
                                //没有有点击确定时的路由跳转
                                event.targetScope.siteModel = angular.copy(siteModelByCache);
                            }
                        }
                    });
                }
            ]);
    });