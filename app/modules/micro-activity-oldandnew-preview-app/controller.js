"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:58
 * description:
 */

define(["ionic", "modules/micro-activity-oldandnew-preview-app/services", "services/net/common"],
    function() {
        return angular.module("MicroActivityOldAndNewPreviewApp.controllers", ["MicroActivityOldAndNewPreviewApp.services", "services.net.common","Services.common"])
            .controller("MicroActivityOldAndNewPreviewAppController", [
                "$scope", "$window", "$rootScope", "$timeout", "MicroActivityOldAndNewPreviewAppService", "$ionicPopup", "$sce", "webSite", "commonNetService", "promptBarService", "maskService", "uploadImgService", "permissionService", "myFooterService","activityBusinessService","leafletDownloadService","singleThreadedNetService",
                function($scope, $window, $rootScope, $timeout, microActivityOldAndNewPreviewAppService, $ionicPopup, $sce, webSite, commonNetService, promptBarService, maskService, uploadImgService, permissionService, myFooterService,activityBusinessService,leafletDownloadService,singleThreadedNetService) {
                    $scope.isOpen = true;
                    $scope.isPublish = false;
                    $scope.isPublishFail = false;
                    $scope.templateId = $scope.$state.params.templateId;
                    $scope.calMessage = "";
                    $scope.$watchGroup(["siteModel.currentSectionIndex", "siteModel.currentPageIndex"], function(nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        if ($scope.siteModel) {
                            if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length == nv[0] + 1) {
                                $scope.isBottom = true;
                            } else {
                                $scope.isBottom = false;
                            }
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

                    //返回编辑页面
                    $scope.goToEdit = function() {
                        //判断当前用户是否为vip，并且使用的模板是vip模板

                        permissionService.getVip().then(function (isVip) {
                            if (!isVip && $scope.$stateParams.isVip == "1") {
                                //去领红包页面
                                maskService.showMask("您还不是VIP或者您的VIP已过期,<br/>这就带您去做活动兑换VIP哦！", 3000, false, 3).then(function () {
                                    $rootScope.$state.go("VIPclub", {});
                                });
                                return false;
                            }
                            $rootScope.$state.go("activity.oldandnewedit", {
                                userId: $scope.userId,
                                templateId: $scope.$stateParams.templateId,
                                activityId: $scope.$stateParams.activityId,
                                isHold: true,
                                activityType: $scope.activityType
                            });
                        });
                    };
                    //向下翻页
                    $scope.sectionJump = function() {
                        $window.slipInstance.jump(++$scope.siteModel.currentSectionIndex);
                    };

                    //自定义分享title
                    $scope.changeShareTitle = function() {
                        //判断当前用户是否为vip，并且使用的模板是vip模板

                        permissionService.getVip().then(function (isVip) {
                            if (!isVip && $scope.$stateParams.isVip == "1") {
                                //去领红包页面
                                maskService.showMask("您还不是VIP或者您的VIP已过期,<br/>这就带您去做活动兑换VIP哦！", 3000, false, 3).then(function () {
                                    $rootScope.$state.go("VIPclub", {});
                                });
                                return false;
                            }
                            $scope.isShowShareTitlePop = true;
                            if ($scope.shareConfigCache) {
                                $scope.shareConfig = JSON.parse($scope.shareConfigCache);
                            } else {
                                $scope.shareConfig = microActivityOldAndNewPreviewAppService.shareConfigModel();
                            }
                            //增加默认分享链接地址
                            var defaultShareModel = microActivityOldAndNewPreviewAppService.getTemplateDefaultTitle($scope.$stateParams.templateId);
                            $scope.showShareTitlePopModel = {
                                shareTitle: $scope.shareConfig.title ? $scope.shareConfig.title : defaultShareModel.title,
                                saveShareTitleFunction: $scope.saveShareTitleFunction,
                                imageUrl: $scope.shareConfig.imgUrl ? $scope.shareConfig.imgUrl : defaultShareModel.imgUrl,
                                desc: $scope.shareConfig.desc ? $scope.shareConfig.desc : defaultShareModel.desc
                            };
                        });

                    };

                    $scope.saveShareTitleFunction = function(type) {
                        //type："goIndex" 、 "goShare"
                        if (!$scope.showShareTitlePopModel.shareTitle) {
                            promptBarService.showErrorBar("分享标题不能为空哦~！", 3000);

                            return false;
                        } else if ($scope.showShareTitlePopModel.shareTitle.length > 40) {
                            promptBarService.showErrorBar("分享标题不能多于40个字哦~！", 3000);
                            return false;
                        }

                        $scope.shareConfig.title = $scope.showShareTitlePopModel.shareTitle;
                        $scope.shareConfig.desc = $scope.showShareTitlePopModel.desc;
                        $scope.shareConfig.imgUrl = $scope.showShareTitlePopModel.imageUrl;
                        $scope.finish(type);

                    };
                    //关闭自定义分享title的标题
                    $scope.colseShareTitlePop = function() {
                        $scope.isShowShareTitlePop = false;
                    };


                    $scope.updateShareConfig = function(id, shareConfig, type) {
                        //更新自定义分享标题
                        microActivityOldAndNewPreviewAppService.updateShareConfig(id, angular.toJson(shareConfig)).then(function(res) {
                            if (res.data.status == 1) {
                                $scope.isShowShareTitlePop = false;
                                var myTime;
                                //将当前页面的title改成自定义之后的title
                                $scope.$state.current.title = shareConfig.title;

                                if (type == "goIndex") {
                                    //  到首页
                                    //2015.11.16 成功弹窗修改 by yinglechao
                                    maskService.showMask(["保存成功！", "正在为您跳转到我的场景"], 3000, false, 5).then(function() {
                                        $rootScope.$state.go("index", {}, { inherit: false });
                                    });

                                } else if (type == "goShare") {
                                    commonNetService.saveBackLog({
                                        OriginId: $scope.$stateParams.activityId,
                                        Type: "Activity",
                                        Operation: "Share"
                                    });
                                    $scope.isShare = true;
                                    //微信自定义分享
                                    commonNetService.setShareMessage(shareConfig).then(function() {
                                        $scope.shareConfigCache = angular.toJson(shareConfig);
                                        $scope.isShare = false;
                                    });
                                }
                            } else {
                                if (res.data.error == 1) {
                                    promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);

                                }
                                else {
                                    promptBarService.showErrorBar(res.data.message, 3000);
                                }
                            }
                        }, null);
                    };

                    //完成流程，检验敏感词
                    $scope.finish = singleThreadedNetService(function(type) {

                        //type："goIndex" 、 "goShare"
                        //数据统计
                        // document.getElementById("myaudio").pause();
                        $scope.countdown = 3;

                        $scope.siteModel.currentSectionIndex = 0;
                        //preview新建数据
                        var data = microActivityOldAndNewPreviewAppService.uiModelToBizModel($scope.siteModel, $scope.$stateParams.templateId, $scope.$stateParams.activityId, $scope.userId, $scope.templateCode, $scope.activityOtherConfig, false, $scope.schoolPalOrgUserId);
                        if (!$scope.$stateParams.activityId) {

                            return microActivityOldAndNewPreviewAppService.Save(data).success(function(result) {
                                    if (result.status == 1) {
                                        //正常保存
                                        $scope.$stateParams.activityId = result.data.Id;
                                        $scope.userId = result.data.UserId;
                                        $scope.schoolPalOrgUserId = result.data.SchoolPalOrgUserId;
                                        $scope.shareConfig.link = activityBusinessService.getActivityShareLink($scope.$stateParams.templateId, $scope.$stateParams.activityId, $scope.activityType, true, $scope.templateCode);
                                        $scope.updateShareConfig(result.data.Id, $scope.shareConfig, type);

                                    } else {
                                        $scope.isShowShareTitlePop = false;
                                        if (result.error == 1) {
                                            promptBarService.showErrorBar("存在敏感词！请重新编辑", 3000);

                                        } else {
                                            $scope.isPublish = true;
                                            $scope.isPublishFail = true;
                                            $scope.calMessage = result.message;
                                            var myTime = setInterval(function() {
                                                $scope.countdown--;
                                                if ($scope.countdown == 0) {
                                                    clearInterval(myTime);
                                                    $rootScope.$state.go("activity.oldandnewedit", { templateId: $scope.$stateParams.templateId, activityId: $scope.$stateParams.activityId, isHold: true, activityType: $scope.activityType });
                                                }
                                            }, 1000);
                                        }
                                    }
                                })
                                .then(function() {
                                    commonNetService.saveBackLog({ OriginId: $scope.$stateParams.activityId, Type: "Activity", Operation: "Save" });
                                });
                        } else {
                            return microActivityOldAndNewPreviewAppService.Save(data).success(function(result) {
                                    if (result == "<input type='hidden' id='ErrorCode' value='497' />") {
                                        window.location.href = "/Common/error?mark=MicroActivityOldAndNewPreviewAppController_finish_save_result_Equal_497";
                                        return;
                                    }
                                    if (result.status == 1) {
                                        //正常保存
                                        $scope.$stateParams.activityId = result.data.Id;
                                        $scope.shareConfig.link = activityBusinessService.getActivityShareLink($scope.$stateParams.templateId, $scope.$stateParams.activityId, $scope.activityType, true, $scope.templateCode);

                                        $scope.updateShareConfig(result.data.Id, $scope.shareConfig, type);

                                    } else {
                                        $scope.isShowShareTitlePop = false;
                                        if (result.error == 1) {
                                            promptBarService.showErrorBar("存在敏感词！请重新编辑", 3000);

                                        } else {
                                            $scope.isPublish = true;
                                            $scope.isPublishFail = true;
                                            $scope.calMessage = result.message;
                                            var myTime = setInterval(function() {
                                                $scope.countdown--;
                                                if ($scope.countdown == 0) {
                                                    clearInterval(myTime);
                                                    $rootScope.$state.go("activity.oldandnewedit", { templateId: $scope.$stateParams.templateId, activityId: $scope.$stateParams.activityId, isHold: true, activityType: $scope.activityType });
                                                }
                                            }, 1000);
                                        }
                                    }
                                })
                                .then(function() {
                                    commonNetService.saveBackLog({ OriginId: $scope.$stateParams.activityId, Type: "Activity", Operation: "Save" });
                                });
                        }


                    });
                    $scope.setLeafletImgBoxIsShow = function(isShowMask){
                        $scope.leafletImgBox.isShowMask =isShowMask;
                    };
                    //下载 2016.5.19 yinglechao todo
                    $scope.goDownload = function () {
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/leafletDownload"]);
                        }
                        //判断当前用户是否为vip，并且使用的模板是vip模板

                        permissionService.getVip().then(function (isVip) {
                            if (!isVip && $scope.$stateParams.isVip == "1") {
                                //去领红包页面
                                maskService.showMask("您还不是VIP或者您的VIP已过期,<br/>这就带您去做活动兑换VIP哦！", 3000, false, 3).then(function () {
                                    $rootScope.$state.go("VIPclub", {});
                                });
                                return false;
                            }
                            //save、生成传单
                            $scope.leafletImgBox = {
                                isShowMask: true,
                                imgUrl: [],
                                isLoading: true
                            };
                            //先保存，再下载图片
                            $scope.siteModel.currentSectionIndex = 0;
                            //isTemp 是否暂存，如果是新建，暂存会将模板的shareConfig保存至实例
                            var isTemp = true;
                            var data = microActivityOldAndNewPreviewAppService.uiModelToBizModel($scope.siteModel, $scope.$stateParams.templateId, $scope.$stateParams.activityId, $scope.userId, $scope.templateCode, $scope.activityOtherConfig, isTemp, $scope.schoolPalOrgUserId);

                            microActivityOldAndNewPreviewAppService.Save(data).success(function (result) {
                                if (result.status == 1) {
                                    //正常保存
                                    $scope.$stateParams.activityId = result.data.Id;
                                    $scope.userId = result.data.UserId;
                                    $scope.schoolPalOrgUserId = result.data.SchoolPalOrgUserId;
                                    //todo
                                    leafletDownloadService.getLeafletImgUrlListByActivityId($scope.$stateParams.activityId).then(function (result2) {
                                        if (result2.data.status == 1) {
                                            //是否需要先加载出图片，再关闭loading

                                            $scope.leafletImgBox = {
                                                isShowMask: true,
                                                imgUrl: result2.data.data,
                                                isLoading: false
                                            };
                                            //todo
                                        } else {
                                            $scope.leafletImgBox = {
                                                isShowMask: false,
                                                imgUrl: [],
                                                isLoading: true
                                            };
                                        }
                                    })
                                } else {
                                    $scope.leafletImgBox = {
                                        isShowMask: false,
                                        imgUrl: [],
                                        isLoading: true
                                    };
                                    $scope.isShowShareTitlePop = false;
                                    if (result.error == 1) {
                                        promptBarService.showErrorBar("存在敏感词！请重新编辑", 3000);

                                    } else {
                                        $scope.isPublish = true;
                                        $scope.isPublishFail = true;
                                        $scope.calMessage = result.message;
                                        var myTime = setInterval(function () {
                                            $scope.countdown--;
                                            if ($scope.countdown == 0) {
                                                clearInterval(myTime);
                                                $rootScope.$state.go("activity.oldandnewedit", { templateId: $scope.$stateParams.templateId, activityId: $scope.$stateParams.activityId, isHold: true, activityType: $scope.activityType });
                                            }
                                        }, 1000);
                                    }
                                }
                            })
                                .then(function () {
                                    commonNetService.saveBackLog({ OriginId: $scope.$stateParams.activityId, Type: "Activity", Operation: "Save" });
                                });
                        });
                    };


                    var init = function() {
                        leafletDownloadService.resetLeafletModelList();
                        $scope.audioHandle = {};
                        if (webSite) {
                            $scope.userId = webSite.UserId || 0;
                            $scope.schoolPalOrgUserId = webSite.SchoolPalOrgUserId || 0;
                            $scope.activityType = webSite.ActivityType || 0;
                            $scope.templateExtConfig=activityBusinessService.parseJsonToObjForTemplateExtConfig(webSite.UiConfig);
                            $scope.templateCode =webSite.TemplateCode;
                        }
                        //根据配置获取背景音乐位置
                        $scope.audioPosClass = activityBusinessService.getBgAudioPosClassName($scope.templateExtConfig);
                        //if (!($scope.$stateParams.isHold)) {
                        //    if (!angular.isUndefined(webSite) && !angular.isUndefined(webSite.Config) && webSite.Config) {
                        //        //$scope.siteModel = JSON.parse(webSite.Config);
                        //        //modelToUiModel by yinglechao 2016.6.6
                        //        $scope.siteModel = activityBusinessService.siteModelToUiSiteModel(JSON.parse(webSite.Config));
                        //        //新建微活动templateModel扩展
                        //        if (angular.isUndefined($scope.$stateParams.activityId) && !$scope.$stateParams.activityId) {
                        //            activityBusinessService.extendActivityTemplateModel($scope.siteModel, webSite.TemplateModelExtConfig);
                        //        }
                        //        $scope.siteModel.currentSectionIndex = 0;
                        //    } else {
                        //        // 报错页面，非法进入页面
                        //        window.location.href = "/Common/error";
                        //    }
                        var activityExtConfig = {};
                        try {
                            activityExtConfig = JSON.parse(webSite.ExtConfig);
                        } catch (err) {
                            activityExtConfig = {};
                        }

                        //}
                        if (!$scope.siteModel) {
                            if (!angular.isUndefined(webSite) && !angular.isUndefined(webSite.Config) && webSite.Config) {
                                //$scope.siteModel = JSON.parse(webSite.Config);
                                //modelToUiModel by yinglechao 2016.6.6
                                $scope.siteModel = activityBusinessService.siteModelToUiSiteModel(JSON.parse(webSite.Config));
                                //新建微活动templateModel扩展
                                if (angular.isUndefined($scope.$stateParams.activityId) && !$scope.$stateParams.activityId) {
                                    activityBusinessService.extendActivityTemplateModel($scope.siteModel, webSite.TemplateModelExtConfig);
                                }
                                $scope.siteModel.currentSectionIndex = 0;
                                //2016.6.27 可由指令修改的场景配置信息 里面的字段对应数据库中的字段
                                $scope.activityOtherConfig = {
                                    activityExtConfig: activityExtConfig,//场景(活动)扩展配置信息
                                    endDate: webSite.EndDate//场景(活动)截止日
                                }
                            } else {
                                // 报错页面，非法进入页面
                                window.location.href = "/Common/error?mark=MicroActivityOldAndNewPreviewAppController_init_webSite.Config_isUndefined";
                            }
                        }


                        if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length == 1) {
                            $scope.isBottom = true;
                        }

                        $scope.musicUrl = $sce.trustAsResourceUrl($scope.siteModel.pages[0].backgroundAudio);

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
                            $scope.$state.current.title = angular.fromJson($scope.shareConfigCache).title || microActivityOldAndNewPreviewAppService.getTemplateDefaultTitle($scope.$state.params.templateId).title;
                        } else {
                            $scope.$state.current.title = microActivityOldAndNewPreviewAppService.getTemplateDefaultTitle($scope.$state.params.templateId).title;
                        }


                        //hack安卓手机不隐藏菜单栏问题，再次隐藏微信菜单栏 by xp
                        if (ionic.Platform.isAndroid()) {
                            window.wx && window.wx.hideOptionMenu();
                        }
                    };

                    init();

                    $scope.$on("$stateChangeStart", function(event, toState) {
                        //document.getElementById("myaudio").pause();
                        //document.getElementById("myaudio").setAttribute("src", "");


                        if (toState.name.indexOf("activity") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                            event.targetScope.activityOtherConfig = angular.copy($scope.activityOtherConfig);

                        } else {
                            $scope.siteModel = null;
                            $scope.activityOtherConfig = null;

                        }
                    });


                    //更改share image
                    $scope.config = {
                        aspectRatio: 1 / 1,
                        autoCropArea: 0.7,
                        strict: true,
                        guides: false,
                        center: true,
                        highlight: false,
                        dragCrop: false,
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        zoom: -0.2,
                        checkImageOrigin: true,
                        background: false,
                        //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                        minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                        minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300
                    };
                    $scope.changeShareImage = function(imgIndex) {
                        $scope.imgIndex = imgIndex;
                        uploadImgService.upLoadImg($scope.config, 1, $scope.upLoadFinish);
                    };
                    $scope.upLoadFinish = function(url) {
                        $timeout(function() {
                            $scope.$apply(function() {
                                $scope.showShareTitlePopModel.imageUrl = url;
                            });
                        }, 0);
                    };


                }
            ]);
    });