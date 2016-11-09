"use strict";
/**
 * author :陈雪冬
 * modified：陈天宇
 * time: 2016年7月26日16:14:48
 * update: 2016年10月14日16:25:53
 * description:图片上传功能
 */

/*global define*/
/*global angular */
define(["ionic"], function () {
    angular.module("TemplateImgShow.directives", [])
        .directive("templateImgShow", [
            "$window", "$timeout", "$rootScope", "templateImgShowService", "maskService", "promptBarService", "uploadImgService", "commonNetService", "$ionicScrollDelegate",
            function ($window, $timeout, $rootScope, templateImgShowService, maskService, promptBarService, uploadImgService, commonNetService, $ionicScrollDelegate) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-activity-template/template_img_show/template.html",
                    link: function (scope, iElement, iAttr) {
                        scope.defaultHeadImg = window.resourceDoMain + "/app/img/acty10_pic2.jpg";
                        scope.isEdit = scope.status == "edit" ? true : false;
                        scope.isView = scope.status == "view" ? true : false;

                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(templateImgShowService.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            //快速创建模板增加默认图片
                            if (scope.templateExtConfig.imageFolderName) {
                                var defaultImg = scope.getImageDoMain("/img_show_1.png");
                                scope.templateModel.imgs = scope.templateModel.imgs || [defaultImg];
                            } else {
                                scope.templateModel.imgs = scope.templateModel.imgs || [];
                            }

                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }

                            templateImgShowService.setImgName(scope.templateModel.imgs);


                            var startX, startY;
                            var direction = "";
                            $(iElement).find(".scroll_js").on('touchstart', function (e) {
                                startX = e.originalEvent.changedTouches[0].pageX,
                                startY = e.originalEvent.changedTouches[0].pageY;
                            });
                            $(iElement).find(".scroll_js").on("touchmove", function (e) {
                                //获取滑动屏幕时的X,Y
                                var endX = e.originalEvent.changedTouches[0].pageX,
                                 endY = e.originalEvent.changedTouches[0].pageY;
                                //获取滑动距离
                                var distanceX = endX - startX;
                                var distanceY = endY - startY;
                                //判断滑动方向
                                if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
                                    direction = "right";
                                } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
                                    direction = "left";
                                } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY < 0) {
                                    direction = "top";
                                } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 0) {
                                    direction = "bottom";
                                } else {
                                    direction = "";
                                }

                            });
                            $(iElement).find(".scroll_js").on("touchend", function (e) {
                                //如果滚动条不是滑到顶部或滑到底部，阻止冒泡
                                var scrollContents = $ionicScrollDelegate.$getByHandle('scrollBottom')['_instances'];
                                var thisScrollContent = scrollContents[scrollContents.length - 1];
                                var isTop = thisScrollContent.getScrollPosition().top <= 0;
                                var maxTop = thisScrollContent.getScrollView().getScrollMax().top;
                                var isBottom = thisScrollContent.getScrollPosition().top >= maxTop;

                                if (!(isTop && direction == "bottom" || isBottom && direction == "top" || direction == "")) {
                                    e.stopPropagation();

                                }

                            });

                        }
                        //设置图片信息  提供给其他页显示
                        templateImgShowService.setRenderCallback(init);


                        scope.index = 0;
                        scope.isDoAlternate_img = false;
                        //添加图片
                        scope.addimg = function () {
                            // 限制上传大于10张
                            if (scope.templateModel.imgs.length >= 10) {
                                promptBarService.showErrorBar("最多只能上传10张图片！", 3000);
                                return false;
                            }
                            scope.index = scope.templateModel.imgs.length;
                            scope.isDoAlternate_img = false;
                            scope.updateHeadImg();
                        };

                        //删除图片
                        scope.delete_img = function (index) {
                            scope.templateModel.imgs.splice(index, 1);
                        };

                        //替换图片
                        scope.alternate_img = function (index) {
                            //当前操作图片的index
                            scope.isDoAlternate_img = true;
                            scope.index = index;
                            scope.updateHeadImg();
                        };

                        //更新图片
                        scope.updateHeadImg = function () {
                            uploadImgService.upLoadImg(templateImgShowService.getConfigByAspectRatio(9 / 5), 1, scope.saveImg, '', { isHaveCutImg: false });
                        };

                        //保存图片
                        scope.saveImg = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.templateModel.imgs[scope.index] = url;
                                });
                            });
                            if (!scope.isDoAlternate_img) {
                                $timeout(function () {
                                    $ionicScrollDelegate.$getByHandle('scrollBottom').scrollBottom();
                                }, 1000);
                            }


                        };

                        scope.getImageDoMain = function (url) {
                            if (scope.templateExtConfig.imageFolderName) { //快速生成
                                return window.cdnDoMain + scope.templateExtConfig.imageFolderName + url;
                            } else { //非快速生成，默认种菜
                                if (scope.templateModel.isHaveBgImg === false) {
                                    return "";
                                } else {
                                    return window.resourceDoMain + "/app/img/grow_vegetable_2_bg3.jpg";

                                }
                            }
                        };
                        init();

                    }

                };
            }
        ]);
});