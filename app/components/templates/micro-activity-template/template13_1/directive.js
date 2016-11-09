"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic","components/templates/micro-activity-template/template13_5/service"], function() {
    angular.module("Template13_1.directives", [])
        .directive("template13by1", [
            "$window", "$timeout", "$rootScope", "$q", "$ionicScrollDelegate", "template13_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "template13_5Service",
            function($window, $timeout, $rootScope, $q, $ionicScrollDelegate, template13_1Service, uploadImgService, maskService, promptBarService, commonNetService,template13_5Service) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-activity-template/template13_1/template.html",
                    link: function(scope, iElement, iAttr) {

                        var defaultHeadImg = window.resourceDoMain + "/app/img/header_default2.png"; //默认的用户头像

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        scope.renderGrassHat = function(score) {
                            scope.grassUrl = template13_1Service.getGrassUrlByGrassCount(score);
                            scope.grassClass = template13_1Service.getGrassClasByGrassCount(score);
                        };

                        function init() {
                            //屏蔽相关菜单
                            window.wx && window.wx.hideMenuItems({
                                menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:QZone"]
                            });

                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template13_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;
                            //背景图片
                            var docEl = document.documentElement;
                            var clientWidth = docEl.clientWidth;
                            iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + docEl.clientHeight + "px";

                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }
                            scope.step = $rootScope.$stateParams.step || 1;

                            //如果是查看页面
                            if (scope.status == "view") {
                                //请求

                                var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;
                                template13_1Service.getActivityUserInfo(userId, scope.userType).success(function(result) {
                                    if (result.status == 1) {
                                        if (scope.userType == "new") {
                                            scope.userInfo1 = {
                                                name: result.data.Name || "",
                                                headImg: result.data.Config ? JSON.parse(result.data.Config).headImg : defaultHeadImg,
                                                grassCount: result.data.Score,
                                                rank: result.data.Rank
                                            };
                                        } else {
                                            scope.userInfo1 = {
                                                name: scope.templateModel.name,
                                                headImg: scope.templateModel.imageUrl[0] || defaultHeadImg,
                                                grassCount: result.data.Score,
                                                rank: result.data.Rank
                                            };
                                        }

                                        //warning 设置userInfo 至排行榜，数据互通 
                                        template13_5Service.setUserInfo(scope.userInfo1);
                                        scope.renderGrassHat(scope.userInfo1.grassCount);
                                    }
                                });


                            }

                        }

                        init();

                        //图片上传
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function(url) {
                            $timeout(function() {
                                scope.$apply(function() {
                                    scope.templateModel.imageUrl[scope.imgIndex] = url;
                                });
                            });
                        };
                        scope.updateImg = function(imgIndex) {
                            if (!scope.isEdit) {
                                return;
                            }
                            scope.imgIndex = imgIndex;
                            uploadImgService.upLoadImg(template13_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                        };


                        //显示选择草
                        scope.showGrassList = function() {
                            if (scope.isEdit) {
                                return;
                            }
                            scope.isShowGrassList = true;

                            $ionicScrollDelegate.scrollTop();
                            $ionicScrollDelegate.freezeAllScrolls(true);
                        };
                        //关闭选择草的列表
                        scope.closeGrass = function() {
                            scope.isShowGrassList = false;
                            $ionicScrollDelegate.freezeAllScrolls(false);

                        };
                        //选择草
                        scope.chooseGrassAction = function(index) {
                            if (scope.isHaveAddGrass == true) {
                                scope.closeGrass();
                                promptBarService.showErrorBar("你已经种过草啦！");
                                return;
                            }
                            //是否在种草请求中
                            if (scope.isAddGrassing == true) {
                                return;
                            }

                            var tempObj = template13_1Service.getGrassUrl(index);
                            scope.grassGrowUrl = tempObj.grassGrowUrl;
                            scope.grassDanceUrl = tempObj.grassDanceUrl;
                            scope.isAddGrassing = true;

                            scope.closeGrass();

                            scope.isGrow = true;
                            scope.isDance = false;
                            $timeout(function() {
                                scope.isGrow = false;
                            }, 900);

                            scope.isHideDddGrassButton = true;
                            scope.addGrass().then(function() {
                                scope.isAddGrassing = false;
                                scope.isDance = true;
                                //重新渲染种草记录
                                //                                    template13_4Service.render();
                                //重新渲染排行榜 不重新渲染排行榜
                                //                                    template13_5Service.render();
                            }, function() {
                                scope.closeGrass();
                                scope.isAddGrassing = false;
                            });
                        };
                        scope.addGrass = function() {
                            var d = $q.defer();
                            if (scope.status == "preview") {
                                d.resolve();
                            } else {
                                var userId = $rootScope.$stateParams.oldUser || $rootScope.$stateParams.Id;
                                template13_1Service.updateScore(userId, scope.userType).success(function(result) {

                                    if (result.status == 1) {
                                        scope.isHaveAddGrass = true;
                                        scope.userInfo1.grassCount = result.data;
                                        d.resolve();
                                    } else {
                                        d.reject();
                                        promptBarService.showErrorBar(result.message);
                                        if (result.error != 7) {
                                            scope.isHideDddGrassButton = false;
                                        }
                                    }
                                });
                            }
                            return d.promise;
                        };
                        //跳转到信息填写页面
                        scope.goForm = function() {
                            if (scope.isEdit) {
                                return;
                            }
                            if (scope.status == "preview") {
                                $rootScope.$state.go("activity.oldandnewpreview", { step: "2" });
                            } else if (scope.status == "view") {
                                $rootScope.$state.go("activity.oldandnewview", { step: "2" });
                            }
                        };

                    }

                };
            }
        ]);
});