"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "modules/microsite-index-app/services", "services/net/common"],
    function() {
        return angular.module("MicroSiteIndexApp.controllers", ["MicroSiteIndexApp.services", "services.net.common"])
            .controller("MicroSiteIndexAppController", [
                "$scope", "$rootScope", "MicroSiteIndexAppService", "webSite", "commonNetService","promptBarService",
                function($scope, $rootScope, microSiteIndexAppService, webSite, commonNetService,promptBarService) {
                    $scope.isShowShareTitlePop = false;
                    $scope.isShare = false;
                    //关闭自定义分享title的标题
                    $scope.colseShareTitlePop = function(){
                        $scope.isShowShareTitlePop = false;
                    };
                    var verifyChangeShareTitle = function () {
                        if (!$scope.showShareTitlePopModel.shareTitle) {
                            promptBarService.showErrorBar("分享标题不能为空哦~！", 3000);
                            return false;
                        } else if ($scope.showShareTitlePopModel.shareTitle.length > 18) {
                            promptBarService.showErrorBar("分享标题不能多于18个字哦~！", 3000);
                            return false;
                        }
                        return true;
                    };
                    //分享
                    $scope.share = function() {
                        $scope.countdown = 3;
                        if ($rootScope.WebIdByTemplate == 0) {
                            var data = microSiteIndexAppService.uiModelToBizModel($scope.siteModel, $rootScope.UserSign, $rootScope.TemplateId, 0);
                            microSiteIndexAppService.saveWeb(data).success(function(result) {
                                if (result.status == 1) {
                                    $scope.saveSiteShareTitleAndShare = function() {
                                        if (!verifyChangeShareTitle()) {
                                            return;
                                        }
                                        var shareConfig = microSiteIndexAppService.shareConfigModel($scope.showShareTitlePopModel.shareTitle);


                                        microSiteIndexAppService.updateShareConfig(result.data, $rootScope.UserSign, JSON.stringify(shareConfig)).then(function(res) {
                                            if (res.data.status == 1) {
                                                $scope.isShare = true;
                                                $scope.isShowShareTitlePop = false;
                                                //数据统计
                                                commonNetService.saveBackLog({ OriginId: result.data, Type: "Website", Operation: "Share" });
                                                var myTime = setInterval(function() {
                                                    $scope.countdown--;
                                                    if ($scope.countdown == 0) {
                                                        clearInterval(myTime);
                                                        $rootScope.$state.go("site.view", { currentPageIndex: 0, id: result.data }, { reload: true, inherit: false });
                                                    }
                                                }, 1000);

                                            } else if (res.data.error == 1) {
                                                promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);
                                            }

                                        }, null);
                                    }
                                    $scope.isShowShareTitlePop = true;
                                    var shareConfig = {};
                                    if ($scope.data.ShareConfig) {
                                        shareConfig = JSON.parse($scope.data.ShareConfig);
                                    } else {
                                        shareConfig = microSiteIndexAppService.shareConfigModel();
                                    }
                                    $scope.showShareTitlePopModel = {
                                        shareTitle: shareConfig.title ? shareConfig.title : "校宝秀，秀出精彩官网~",
                                        saveShareTitleFunction: $scope.saveSiteShareTitleAndShare,
                                        imageUrl: "http://schoolpal.oss-cn-hangzhou.aliyuncs.com/shiningstar/Website/20151019214653-b7c17.jpg"
                                    };


                                } else {
                                    window.location.href = "/Common/error";
                                }
                            });
                        } else {
                            $scope.saveSiteShareTitleAndShare = function(){
                                if(!verifyChangeShareTitle()) {
                                    return;
                                }
                                var shareConfig = microSiteIndexAppService.shareConfigModel( $scope.showShareTitlePopModel.shareTitle);

                                microSiteIndexAppService.updateShareConfig($scope.data.Id,$scope.data.UserSign,JSON.stringify(shareConfig)).then(function(res){
                                    if(res.data.status == 1){
                                        //数据统计
                                        //数据统计
                                        $scope.isShowShareTitlePop = false;
                                        $scope.isShare = true;
                                        commonNetService.saveBackLog({ OriginId: $rootScope.WebIdByTemplate, Type: "Website", Operation: "Share" });
                                        var myTime = setInterval(function () {
                                            $scope.countdown--;
                                            if ($scope.countdown == 0) {
                                                clearInterval(myTime);
                                                $rootScope.$state.go("site.view", { currentPageIndex: 0, id: $rootScope.WebIdByTemplate }, { reload: true, inherit: false });
                                            }
                                        }, 1000);
                                    }else if (res.data.error == 1) {
                                        promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);
                                    }

                                },null);
                            }
                            $scope.isShowShareTitlePop = true;
                            var shareConfig = {};
                            if($scope.data.ShareConfig){
                                shareConfig = JSON.parse($scope.data.ShareConfig);
                            }else{
                                shareConfig = microSiteIndexAppService.shareConfigModel() ;
                            }
                            $scope.showShareTitlePopModel = {
                                shareTitle: shareConfig.title ? shareConfig.title : "校宝秀，秀出精彩官网~",
                                saveShareTitleFunction: $scope.saveSiteShareTitleAndShare,
                                imageUrl: "http://schoolpal.oss-cn-hangzhou.aliyuncs.com/shiningstar/Website/20151019214653-b7c17.jpg"
                            };




                        }
                    };

                    

                    //进入编辑页面
                    $scope.goToPreview = function() {
                        $rootScope.$state.go("site.preview", {}, { reload: true, inherit: false });
                    };
                    //进入预览页面
                    $scope.editView = function() {
                        $rootScope.$state.go("site.edit", {}, { reload: true, inherit: false });
                    };
                    //进入数据统计页面
                    $scope.statistics = function () {
                        //数据统计
                        commonNetService.saveBackLog({ OriginId: $rootScope.WebIdByTemplate, Type: "Website", Operation: "Statistics" });
                        $rootScope.$state.go("site.statistics", { id: $rootScope.WebIdByTemplate }, { reload: true, inherit: false });
                    };
                    $scope.init = function() {
                        if (angular.isUndefined($scope.siteModel)) {
                            $scope.footer = webSite.Footer;
                            if (webSite.Websites.length != 0) {
                                if (webSite.Websites[0].Config == "" || webSite.Websites[0].Config == null) {
                                    $scope.siteModel = microSiteIndexAppService.makeNewModel(webSite.Websites[0].OrgName);
                                    $rootScope.WebIdByTemplate = 0;
                                    $rootScope.UserSign = $scope.$stateParams.id;
                                    $rootScope.TemplateId = webSite.Websites[0].TemplateId;
                                    $scope.data = webSite.Websites[0];
                                } else {
                                    $scope.data = webSite.Websites[0];
                                    $rootScope.WebIdByTemplate = $scope.data.Id;
                                    $rootScope.UserSign = $scope.data.UserSign;
                                    $rootScope.TemplateId = $scope.data.TemplateId;
                                    $scope.siteModel = JSON.parse($scope.data.Config);
                                }
                            } else {
                                window.location.href = "/Common/error";
                            }
                        } else {
                            if (!angular.isUndefined(webSite)) {
                                $scope.data = webSite.Websites[0];
                                $rootScope.WebIdByTemplate = webSite.Websites[0].Id;
                                $rootScope.UserSign = webSite.Websites[0].UserSign;
                                $rootScope.TemplateId = webSite.Websites[0].TemplateId;
                            }
                        }
                        //修复bug：微官网首页，点击编辑后，跳转到下一页，不能再当前页编辑 by xp 2015年10月26日 15:23:52
                        $scope.siteModel.currentPageIndex = 0;
                        $scope.siteModel.currentSectionIndex = 0;


                    };
                    $scope.init();

                    $scope.$on("$stateChangeStart", function (event, toState) {
                        if (toState.name.indexOf("site") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                        }
                        
                    });
                }
            ]);
    });
