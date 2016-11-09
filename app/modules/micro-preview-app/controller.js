"use strict";
/**
 * author :小潘
 * time: 2016年3月21日 20:25:30
 * description: 微活动前台预览（无鉴权）
 */

define(["ionic", "modules/micro-preview-app/services", "services/net/common"],
    function() {
        return angular.module("MicroPreviewApp.controllers", ["MicroPreviewApp.services", "services.net.common"])
            .controller("MicroPreviewAppController", [
                "$scope", "$window", "$rootScope", "$timeout", "MicroPreviewAppService", "$ionicPopup", "$sce", "webSite", "commonNetService", "promptBarService", "maskService", "uploadImgService", "myFooterService","activityBusinessService",
                function($scope, $window, $rootScope, $timeout, microPreviewAppService, $ionicPopup, $sce, webSite, commonNetService, promptBarService, maskService, uploadImgService, myFooterService,activityBusinessService) {
                    $scope.isOpen = true;

                    $scope.templateId = $scope.$state.params.templateId;
                    $scope.calMessage = "";
                    $scope.$watchGroup(["siteModel.currentSectionIndex", "siteModel.currentPageIndex"], function(nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length == nv[0] + 1) {
                            $scope.isBottom = true;
                        } else {
                            $scope.isBottom = false;
                        }
                    }, true);

                    //控制音乐开关
                    $scope.closeAndOpenMusic = function() {
                        $scope.isOpen = !$scope.isOpen;
                        if ($scope.isOpen) {
                            $scope.audioHandle.play();
                        } else {
                            $scope.audioHandle.pause();

                        }
                    };

                    //向下翻页
                    $scope.sectionJump = function() {
                        $window.slipInstance.jump(++$scope.siteModel.currentSectionIndex);
                    };


                    var init = function() {
                        $scope.audioHandle = {};

                        if (!webSite || !webSite.Config) {
                            // 报错页面，非法进入页面
                            window.location.href = "/Common/error?mark=MicroPreviewAppController_webSiteOrwebSite.config_IsNull";
                        } else {
                            //$scope.siteModel = JSON.parse(webSite.Config);
                            //modelToUiModel by yinglechao 2016.6.6
                            $scope.siteModel = activityBusinessService.siteModelToUiSiteModel(JSON.parse(webSite.Config));
                            //templateModel扩展
                            activityBusinessService.extendActivityTemplateModel($scope.siteModel, webSite.TemplateModelExtConfig);
                            $scope.siteModel.currentSectionIndex = 0;
                        }
                        if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length == 1) {
                            $scope.isBottom = true;
                        }
                        //UserId
                        $scope.userId = webSite.UserId || 0;
                        $scope.musicUrl = $sce.trustAsResourceUrl($scope.siteModel.pages[0].backgroundAudio);

                        //2016.4.21 增加模板的扩展配置信息（title是否写死，是否使用页脚，是否使用滑动组件,是否开启截止日功能……）by yinglechao
                        $scope.templateExtConfig = activityBusinessService.parseJsonToObjForTemplateExtConfig(webSite.UiConfig);
                        $scope.templateCode =webSite.TemplateCode;
                        $scope.activityType=webSite.ActivityType;
                        //根据配置获取背景音乐位置
                        $scope.audioPosClass = activityBusinessService.getBgAudioPosClassName($scope.templateExtConfig);
                        // $scope.$state.current.title = $scope.siteModel.title ? $scope.siteModel.title : "预览我的秀";
                        $scope.footer = webSite.Footer && webSite.Footer.replace(/href\s*?=\s*?[\"'](.*?)[\"']/g, "href='javascript:void(0);'");
                        myFooterService.setFooter($scope.footer);


                        $scope.shareConfigCache = webSite.ShareConfig;
                        $scope.lastModifiedDate = webSite.CreatedAt == "/Date(-62135596800000)/" ? (new Date()).toJSON() : webSite.CreatedAt;


                        //页面title可自定义
                        //2016.1.29 春节活动title写死 by yinglechao
                        if ($scope.templateId == 18) {
                            $scope.$state.current.title = "送春联，拜大年";
                        } else if ($scope.templateId == 19) {
                            //种菜title写死 2016.3.9 by yinglechao
                            $scope.$state.current.title = "快来农场帮我种菜，收成就靠你了";
                        }else if($scope.templateExtConfig.titleConfig.isHardcoded){
                            //2016.4.21 title根据数据库中的template的templateExtConfig渲染挑剔 by yinglechao
                            $scope.$state.current.title=$scope.templateExtConfig.titleConfig.titleContent;
                        } else if ($scope.shareConfigCache) {
                            $scope.$state.current.title = angular.fromJson($scope.shareConfigCache).title || microPreviewAppService.getTemplateDefaultTitle($scope.$state.params.templateId).title;
                        } else {
                            $scope.$state.current.title = microPreviewAppService.getTemplateDefaultTitle($scope.$state.params.templateId).title;
                        }





                        //更新微信的分享链接为当前的url 2015.11.30 by yinglechao
                        //warning 对新种草和圣诞活动 做特殊逻辑 by xp 2015年12月15日 02:09:46
                        //种菜路由
                        var config = angular.fromJson($scope.shareConfigCache);
                        var shareRouter = "CreativePreview" + +new Date + "Share";
                        if ($scope.templateId == 13 || $scope.templateId == 14 || $scope.templateId == 18) {
                            config.link = window.shareServer + "/" + shareRouter + "?p=" + location.hash.slice(2);
                        } else if ($scope.templateId == 19||$scope.activityType == 3) {
                            config.link = window.shareServer + "/" + shareRouter + "?p=" + location.hash.slice(2);
                        } else {
                            var activityPreviewShareRouter = "ActivityPreview" + +new Date + "Share";
                            config.link = window.activityServer + "/" + activityPreviewShareRouter + "?p=" + location.hash.slice(2);
                        }

                        //新增需求，微信自定义分享链接
                        //微信自定义分享
                        commonNetService.setShareMessageReception(config);


                    };

                    init();


                    $scope.$on("$stateChangeStart", function(event, toState) {
                        if (toState.name.indexOf("activity") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                        }
                    });


                }
            ]);
    });