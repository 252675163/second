"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template14_5/service"], function() {
    angular.module("Template14_1.directives", [])
        .directive("template14by1", [
                "$window", "$timeout", "$rootScope", "$q", "$ionicScrollDelegate", "template14_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "template14_5Service", function($window, $timeout, $rootScope, $q, $ionicScrollDelegate, template14_1Service, uploadImgService, maskService, promptBarService, commonNetService, template14_5Service) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-activity-template/template14_1/template.html",
                        link: function(scope, iElement, iAttr) {

                            var defaultHeadImg = window.resourceDoMain+"/app/img/header_default2.png"; //默认的用户头像
                            scope.gifts = [];//表示已有多少个礼物

                            //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                            scope.renderGrassHat = function(score) {
                                scope.grassUrl = template14_1Service.getGrassUrlByGrassCount(score);
                                scope.grassClass = template14_1Service.getGrassClasByGrassCount(score);
                            };

                            function init() {
                                //屏蔽相关菜单
                                window.wx && window.wx.hideMenuItems({
                                    menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:QZone"]
                                });

                                if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                    scope.sectionModel.templateModel = angular.copy(template14_1Service.model);
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
                                    template14_1Service.getActivityUserInfo(userId, scope.userType).success(function(result) {
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
                                            //去生成礼物
                                            scope.createGift(result.data.Score);

                                            //warning 设置userInfo 至排行榜，数据互通 
                                            template14_5Service.setUserInfo(scope.userInfo1);
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
                                uploadImgService.upLoadImg(template14_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
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

                                scope.giftObj = template14_1Service.getGrassUrl(index);
                                scope.isAddGrassing = true;

                                scope.closeGrass();
                                
                                scope.isGrow = true;
                                scope.isDance = false;
                                $timeout(function () {
                                    scope.isGrow = false;
                                }, 900);
                                
                                scope.isHideDddGrassButton = true;
                                scope.addGrass().then(function () {
                                    scope.isAddGrassing = false;
                                    scope.isDance = true;
                                    scope.userInfo1.grassCount++;
                                    //重新渲染种草记录
//                                    template14_4Service.render();
                                    //重新渲染排行榜 不重新渲染排行榜
//                                    template14_5Service.render();
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
                                    template14_1Service.updateChristmasScore(userId, scope.userType).success(function (result) {

                                        if (result.status == 1) {
                                            scope.isHaveAddGrass = true;
//                                            scope.userInfo1.grassCount = result.data;
//                                            scope.createGift(result.data);
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


                            //根据数量生成礼物                     
                            scope.createGift = function (count) {

                                for (var i = 1; i <= count; i++) {
                                    if (i > 9) {
                                        break;
                                    }
                                    var gift = {
                                        className: "",
                                        imgUrl: ""
                                    }
                                    gift.imgUrl = template14_1Service.getGrassUrlByGrassCount(i);
                                    gift.className = template14_1Service.getGrassClasByGrassCount(i);
                                    scope.gifts.push(gift);
                                }

                            }

                            //生成雪花代码段
                            scope.initSNOW = function (numberOfSnow) {
                                var container = iElement[0].getElementsByClassName('snowContainer')[0];
                                for (var i = 0; i < numberOfSnow; i++) {
                                    container.appendChild(scope.createSnow());
                                }
                            }
                            scope.randomFloat = function (low, high) {
                                return low + Math.random() * (high - low);
                            }

                            scope.createSnow = function () {
                                var snowDiv = document.createElement('div');
                                var image = document.createElement('div');

                                image.style.width = image.style.height = (10 * Math.random() + 5) + "px";
                                image.style.borderRadius = "50%";
                                image.style.backgroundColor = "#fff";
                                snowDiv.style.top = "-20px";
                                snowDiv.style.left = scope.randomFloat(0, window.innerWidth) + 'px';

                                snowDiv.style.webkitAnimationName = 'fade, drop';
                                image.style.webkitAnimationName = 'wiseSpin';

                                var fadeAndDropDuration = scope.randomFloat(5, 11) + 's';
                                var spinDuration = scope.randomFloat(4, 8) + 's';

                                snowDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
                                var snowDelay = scope.randomFloat(0, 3) + 's';
                                snowDiv.style.webkitAnimationDelay = snowDelay + ', ' + snowDelay;

                                image.style.webkitAnimationDuration = spinDuration;
                                image.style.webkitAnimationDelay = snowDelay;


                                snowDiv.appendChild(image);

                                return snowDiv;
                            }

                            //启动雪花
                            if (!scope.isEdit) {
                                scope.initSNOW(15);
                            }


                        }

                    };
                }
            ]
        );
});