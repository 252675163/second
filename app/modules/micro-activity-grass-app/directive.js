"use strict";
/**
 * author :小宝
 * time: 2015年9月11日
 * description: 种草活动
 */


define(["ionic", /*"modules/microactivityapp/services",*/ "services/net/grass"], function() {
    angular.module("MicroActivityGrassApp.directives", ["MicroActivityApp.services", "services.net.grass"])
        .directive("previewBtn", [
                "$window", "$timeout", "$rootScope","microActivityAppService", "$state","$sce", "grassNetService", "commonNetService", "permissionService", "promptBarService", "uploadImgService","maskService", function ($window, $timeout,$rootScope, microActivityAppService, $state,$sce, grassNetService, commonNetService, permissionService, promptBarService, uploadImgService,maskService) {
                    return {
                        restrict: "EA",
                        templateUrl: "modules/micro-activity-grass-app/directivehtml.html",
                        link: function($scope, iElement, iAttr) {
                            function init (){
                                $scope.model = microActivityAppService.getGrassPreview();
                                $scope.isShowShare = "none";
                                $scope.isPublishFail = true;
                                $scope.calMessage = "";
                                $scope.shareConfigCache = $scope.model.ShareConfig;
                                $scope.config = JSON.parse($scope.model.Config);
                                //$scope.audioElemnet = document.getElementById("myaudio");
                                //$scope.musicUrl = $sce.trustAsResourceUrl($scope.config.musicId);
                                //$scope.isOpen= true;
                                //setTimeout(function () {
                                //    $scope.audioElemnet.load();
                                //}, 0);
                                //$scope.$on("$stateChangeStart", function (event) {
                                //    event.targetScope.isChange = true;
                                //    $scope.audioElemnet.pause();
                                //    $scope.audioElemnet.setAttribute("src", "");
                                //});
                            }
                            init();


                            $scope.closeAndOpenMusic = function() {
                                $scope.isOpen = !$scope.isOpen;
                                if ($scope.isOpen) {
                                    $scope.audioElemnet.play();
                                } else {
                                    $scope.audioElemnet.pause();

                                }
                            }; //返回编辑页面



                            //自定义分享title
                            $scope.changeShareTitle = function () {
                                
                                $scope.isShowShareTitlePop = true;
                                   
                                if ($scope.shareConfigCache) {
                                    $scope.shareConfig = JSON.parse($scope.shareConfigCache);
                                } else {
                                    $scope.shareConfig = microActivityAppService.shareConfigModel();
                                }
                                //增加默认分享链接地址

                                var defaultShareModel = microActivityAppService.getTemplateDefaultTitle($scope.model.TemplateId);
                                $scope.showShareTitlePopModel = {
                                    shareTitle: $scope.shareConfig.title ? $scope.shareConfig.title : defaultShareModel.title,
                                    saveShareTitleFunction: $scope.saveShareTitleFunction,
                                    imageUrl: $scope.shareConfig.imgUrl ? $scope.shareConfig.imgUrl : defaultShareModel.imgUrl,
                                    desc: $scope.shareConfig.desc ? $scope.shareConfig.desc : defaultShareModel.desc,
                                    createdAt:($scope.model.CreatedAt == "/Date(-62135596800000)/" ?(new Date()).toJSON() : $scope.model.CreatedAt||(new Date()).toJSON())
                                };
                                
                            };
                            //
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
                                $scope.save(type);
                            
                            };
                            //关闭自定义分享title的标题
                            $scope.colseShareTitlePop = function() {
                                $scope.isShowShareTitlePop = false;
                            };

                    
                           






                            $scope.updateShareConfig = function (id, shareConfig, type) {
                                $scope.countdown = 3;
                                //更新自定义分享标题
                                grassNetService.updateShareConfig(id, angular.toJson(shareConfig)).then(function (res) {
                                    if (res.data.status == 1) {
                                        $scope.isShowShareTitlePop = false;
                                        var myTime;
                                        if (type == "goIndex") {
                                            //  到首页
                                            //2015.11.16 成功弹窗修改 by yinglechao
                                            maskService.showMask(["保存成功！","正在为您跳转到我的场景"],3000,false,5).then(function(){
                                                $rootScope.$state.go("index", {}, { reload: true, inherit: false });
                                            });
                                            //$scope.isShowShare = "block";
                                            //myTime = setInterval(function () {
                                            //    $scope.countdown--;
                                            //    if ($scope.countdown == 0) {
                                            //        clearInterval(myTime);
                                            //        $state.go("index", {}, { reload: true, inherit: false });
                                            //
                                            //    }
                                            //}, 1000);
                                        } else if (type == "goShare") {
                                            commonNetService.saveBackLog({
                                                OriginId: id,
                                                Type: "Activity",
                                                Operation: "Share"
                                            });
                                            $scope.isShare = true;
                                            //微信自定义分享
                                            commonNetService.setShareMessage(shareConfig).then(function () {
                                                $scope.shareConfigCache = angular.toJson(shareConfig);
                                                $scope.isShare = false;
                                            });
                                          
                                        }
                                    } else {
                                        if (res.data.error == 1) {
                                            promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);

                                        }
                                    }
                                }, null);
                            };



                            $scope.save = function(type) {


                                    //保存至数据库\
                                    $scope.model.Config = $scope.model.Config;
                                    //写死成20个，最大种草数量
                                    //响应需求，修改为200 by xp 2015年10月15日 16:00:36
                                    $scope.model.Caps = 200;
                                    //$scope.model:"{"Config":"{\"musicId\":1,\"title\":\"这是默认文案~记得去确认哦！！\"}","TemplateId":2,"UserId":0,"Caps":200}"
                                    grassNetService.save($scope.model).success(function(result) {

                                        commonNetService.saveBackLog({
                                            OriginId: result.data.Id,
                                            Type: "Activity",
                                            Operation: "Save"
                                        }).success(function(result) {
                                            //console.log("保存按钮统计成功")
                                        });
                                        if (result.status == 1) {
                                            $scope.shareConfig.link = window.shareServer + "/Home/GrassShareRoute?p=activity/grassindex/" + result.data.Id;
                                            $scope.updateShareConfig(result.data.Id, $scope.shareConfig, type);
                                        } else {
                                            //保存失败
                                            $scope.isShowShare = "block";
                                            $scope.isPublishFail = false;
                                            $scope.$on("$stateChangeStart", function(event) {
                                                event.targetScope.isChange = true;
                                            });
                                            $timeout(function() {
                                                $scope.isShowShare = "none";
                                                $state.go("activity.grass", {
                                                    userId: $scope.model.UserId,
                                                    templateId: $scope.model.TemplateId
                                                });
                                            }, 3000);
                                            $scope.calMessage = result.message;
                                        }
                                    });
                                
                            };

                            //选草
                            $scope.goToEdit = function () {
                                $scope.$on("$stateChangeStart", function(event) {
                                    event.targetScope.isChange = true;
                                });
                                $state.go("activity.grass", {
                                    userId: $scope.model.UserId,
                                    templateId: $scope.model.TemplateId
                                });
                            };

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
                                $timeout(function () {
                                    $scope.$apply(function () {
                                        $scope.showShareTitlePopModel.imageUrl = url;
                                    });
                                }, 0);
                            };
                        }

                    };
                }
            ]
        );
});