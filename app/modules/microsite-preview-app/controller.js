"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:58
 * description:
 */

define(["slip", "ionic", "modules/microsite-preview-app/services", "services/net/common"],
    function () {
        return angular.module("MicroSitePreviewApp.controllers", ["MicroSitePreviewApp.services", "services.net.common"])
            .controller("MicroSitePreviewAppController", [
                "$scope", "$window", "$rootScope", "MicroSitePreviewAppService", "$ionicPopup", "$sce", "webSite", "commonNetService", "promptBarService", "uploadImgService","permissionService",
                function ($scope, $window, $rootScope, microSitePreviewAppService, $ionicPopup, $sce, webSite, commonNetService, promptBarService, uploadImgService,permissionService) {
              

                    $scope.isOpen = true;
                    $scope.isPublish = false;
                    $scope.isPublishFail = false;
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
                    //$scope.closeAndOpenMusic = function() {
                    //    $scope.isOpen = !$scope.isOpen;
                    //    if ($scope.isOpen) {
                    //        document.getElementById("myaudio").play();
                    //    } else {
                    //        document.getElementById("myaudio").pause();

                    //    }
                    //};

                    //返回编辑页面
                    $scope.goToEdit = function () {
                        //判断是否有绑定手机号
                        if (permissionService.hasPhone()) {
                            $rootScope.$state.go("site.edit", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId, isHold: true }, { reload: true, inherit: false });
                        }
                    };

                    //打开发布模型
                    $scope.goToPublish = function () {
                        //判断是有绑定手机号
                        if (permissionService.hasPhone()) {
                            $rootScope.$state.go("site.publish", { templateId: $scope.$stateParams.templateId, userId: $scope.userId, websiteId: $scope.$stateParams.websiteId }, { reload: true, inherit: false });
                        }
                        
                    }

                    //向下翻页
                    $scope.sectionJump = function() {
                        $window.slipInstance.jump(++$scope.siteModel.currentSectionIndex);
                    };
                    //自定义分享title
                    $scope.changeShareTitle = function() {
                        $scope.isShowShareTitlePop = true;
                        if ($scope.shareConfigCache) {
                            $scope.shareConfig = JSON.parse($scope.shareConfigCache);
                        } else {
                            $scope.shareConfig = microSitePreviewAppService.shareConfigModel();
                        }
                        //增加默认分享链接地址
                        var defaultShareModel = microSitePreviewAppService.getTemplateDefaultTitle($scope.$stateParams.templateId);
                        $scope.showShareTitlePopModel = {
                            shareTitle: $scope.shareConfig.title ? $scope.shareConfig.title : defaultShareModel.title,
                            saveShareTitleFunction: $scope.saveShareTitleFunction,
                            imageUrl: defaultShareModel.imgUrl,
                            desc: defaultShareModel.desc
                        };
                    };
                    $scope.saveShareTitleFunction = function(type) {
                        //type："goIndex" 、 "goShare"
                        if (!verifyChangeShareTitle()) {
                            return;
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
                    var verifyChangeShareTitle = function() {
                        if (!$scope.showShareTitlePopModel.shareTitle) {
                            promptBarService.showErrorBar("分享标题不能为空哦~！", 3000);
                            return false;
                        } else if ($scope.showShareTitlePopModel.shareTitle.length > 40) {
                            promptBarService.showErrorBar("分享标题不能多于40个字哦~！", 3000);
                            return false;
                        }
                        return true;
                    };

                    $scope.updateShareConfig = function (id, shareConfig,type) {
                        //更新自定义分享标题
                        microSitePreviewAppService.updateShareConfig(id, shareConfig).then(function (res) {
                            if (res.data.status == 1) {
                                $scope.isShowShareTitlePop = false;
                                var myTime;
                                if (type == "goIndex") {
                                    //  到首页
                                    $scope.isPublish = true;
                                    myTime = setInterval(function () {
                                        $scope.countdown--;
                                        if ($scope.countdown == 0) {
                                            clearInterval(myTime);
                                            $rootScope.$state.go("index", {}, { reload: true, inherit: false });

                                        }
                                    }, 1000);
                                } else if (type == "goShare") {
                                    commonNetService.saveBackLog({
                                        OriginId: result.Id,
                                        Type: "Activity",
                                        Operation: "Share"
                                    });
                                    $scope.isShare = true;
                                    myTime = setInterval(function () {
                                        $scope.countdown--;
                                        if ($scope.countdown == 0) {
                                            clearInterval(myTime);

                                            delete ($rootScope.siteModel);

                                            $rootScope.$state.go("activity.oldandnewview", { Id: id }, {
                                                reload: true,
                                                inherit: false
                                            });

                                        }
                                    }, 1000);
                                }
                            } else {
                                if (res.data.error == 1) {
                                    promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);

                                }
                            }
                        }, null);
                    }

                    //TODO 微官网预览暂无保存功能 完成流程，检验敏感词
                    $scope.finish = function(type) {
                        //type："goIndex" 、 "goShare"
                        //数据统计
                        document.getElementById("myaudio").pause();
                        $scope.countdown = 3;
                        commonNetService.saveBackLog({ OriginId: $scope.$stateParams.websiteId, Type: "Activity", Operation: "Save"
                    });
                        $scope.siteModel.currentSectionIndex = 0;
                        var data = microSitePreviewAppService.uiModelToBizModel($scope.siteModel, $scope.userId, $scope.$stateParams.templateId, $scope.$stateParams.websiteId);
                        if ($scope.myResult) {
                            $scope.updateShareConfig($scope.myResult.data, JSON.stringify($scope.shareConfig),type);
                        }
                        else{
                            microSitePreviewAppService.Save(data).success(function (result) {
                                $scope.myResult = result;
                                if (result.status == 1) {
                                    //正常保存
                                    $scope.$stateParams.websiteId = result.data.Id;
                                    $scope.userId =  result.data.UserId;
                                    $scope.updateShareConfig(result.data,  JSON.stringify($scope.shareConfig),type);

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
                                                $rootScope.$state.go("site.edit", { templateId: $scope.$stateParams.templateId, websiteId: $scope.$stateParams.websiteId, isHold: true }, {
                                                    reload: true,
                                                    inherit: false
                                                });
                                            }
                                        }, 1000);
                                    }
                                }
                            });
                        }
                    };


                    $scope.pickPage = function (index) {
                        if ($scope.siteModel.currentPageIndex !== index) {
                             $scope.siteModel.currentSectionIndex = 0;
                             $scope.siteModel.currentPageIndex = index;
//                             $scope.siteModel.isShowFooter = showFooter();
                        }
                    };

                    var init = function () {
                        if (!($scope.$stateParams.isHold && !angular.isUndefined($scope.siteModel))) {
                            if (webSite == "") {
                                // 报错页面，非法进入页面
                                window.location.href = "/Common/error";
                            } else {
                                if (webSite.Config == "" || webSite.Config == null) {
                                    $scope.siteModel = microSitePreviewAppService.makeNewModel(webSite.OrgName, $scope.$stateParams.templateId);
                                    $scope.siteModel.currentPageIndex = 0;
                                    $scope.siteModel.currentSectionIndex = 0;
                                } else {
                                    $scope.siteModel = JSON.parse(webSite.Config);
                                }
                               
                            }
                        }
                        $scope.musicUrl = $sce.trustAsResourceUrl($scope.siteModel.pages[0].backgroundAudio);
                        $scope.footer = webSite.Footer && webSite.Footer.replace(/href\s*?=\s*?[\"'](.*?)[\"']/g, "href='javascript:void(0);'");

                        //userId
                        $scope.userId = webSite.UserId || 0;

                        $scope.shareConfigCache = webSite.ShareConfig;
                        // preview页面 title重新赋值
                        $scope.$state.current.title = $scope.siteModel.title ? $scope.siteModel.title : "预览我的场景";
                    };

                    init();
                  

                    $scope.$on("$stateChangeStart", function(event, toState) {
                        //document.getElementById("myaudio").pause();
                        //document.getElementById("myaudio").setAttribute("src", "");

                        if (toState.name.indexOf("site") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
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
                    $scope.changeShareImage = function (imgIndex) {
                        $scope.imgIndex = imgIndex;
                        uploadImgService.upLoadImg($scope.config, 1, $scope.upLoadFinish);
                    };
                    $scope.upLoadFinish = function (url) {
                        console.log("上传成功");
                        console.log(url);
                        console.log($scope.imgIndex);
                        $scope.showShareTitlePopModel.imageUrl = url;
                        $scope.$apply();
                    }
                }
            ]);
    });