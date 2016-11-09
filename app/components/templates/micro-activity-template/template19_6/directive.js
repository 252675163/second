"use strict";
/**
 * author :陈雪冬
 * time: 2016年7月26日16:14:48
 * update: 2016年7月26日16:14:48
 * description:新增图片页
 */


define(["ionic"], function () {
    angular.module("Template19_6.directives", [])
        .directive("template19by6", [
            "$window", "$timeout", "$rootScope", "template19_6Service", "maskService", "promptBarService", "uploadImgService", "commonNetService",function ($window, $timeout, $rootScope, template19_6Service, maskService, promptBarService, uploadImgService,commonNetService) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-activity-template/template19_6/template.html",
                    link: function (scope, iElement, iAttr) {
                        scope.defaultHeadImg = window.resourceDoMain + "/app/img/acty10_pic2.jpg";
                        var imgindex = 0;
                        scope.isEdit = scope.status == "edit" ? true : false;
                        scope.isView = scope.status == "view" ? true : false;

                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template24_3Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }

                            template19_6Service.setImgName(scope.templateModel.imgs);
                        }
                        //设置图片信息  提供给其他页显示
                        template19_6Service.setRenderCallback(init);
                        
                        init();
                        //删除图片  将某一张替换为空（0）
                        scope.delimg = function (index) {
                            scope.templateModel.imgs[index] = 0;
                        }
                        //添加图片  上传完成后 将某一种中的0 替换为上传完成的 url
                        scope.addimg = function (index) {
                            imgindex = index;
                            scope.updateHeadImg();
                        }

                        scope.updateHeadImg = function () {
                            uploadImgService.upLoadImg(template19_6Service.getConfigByAspectRatio(9 / 5), 1, scope.upLoadHeadImgFinish);
                           
                        };
                        scope.upLoadHeadImgFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.templateModel.imgs[imgindex] = url;
                                   // scope.placeimgs.shift();
                                });
                            });
                        };

                        scope.getImageDoMain = function (url) {
                            if(scope.templateExtConfig.imageFolderName){    //快速生成
                                return window.cdnDoMain + scope.templateExtConfig.imageFolderName + url;
                            } else {  //非快速生成，默认种菜
                                if (scope.templateModel.isHaveBgImg===false) {
                                    return "";
                                } else {
                                    return window.resourceDoMain + "/app/img/grow_vegetable_2_bg3.jpg";

                                }
                            }
                            
                            
                        }

                        //2016.10.24 修复template19_6Service上的数据共享bug
                        //监听destroy事件，清空template19_6Service上的图片
                        scope.$on("$destroy", function () {
                            template19_6Service.cleanDate();
                        });

                    }
                };
            }
        ]
        );
});