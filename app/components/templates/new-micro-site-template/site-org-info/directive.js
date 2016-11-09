"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("siteOrgInfo.directives", [])
        .directive("siteOrgInfo", [
            "$window", "$timeout","$rootScope", "siteOrgInfoService","showImageBigService","promptBarService", "WebsiteUploadImgService", "maskService", "commonNetService",
            function ($window, $timeout,$rootScope, siteOrgInfoService,showImageBigService,promptBarService, WebsiteUploadImgService,  maskService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/site-org-info/template.html",
                    link: function (scope, iElement, iAttr) {

                        scope.ShowInageBig = false;

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                if (scope.notRenderEmpty) {
                                }else if(scope.status=="edit"){
                                    scope.sectionModel.templateModel = angular.copy(siteOrgInfoService.getDefaultModel());
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }else{
                                    scope.sectionModel.templateModel = angular.copy(siteOrgInfoService.getDefaultModelByStyle(scope.style));
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }

                            }

                            //
                            //if(scope.status=="edit") {
                            //    //如果是默认数据且没有保存，edit使用空数据
                            //    if (angular.equals(scope.templateModel, siteOrgInfoService.getDefaultModelByStyle(scope.style))&&($rootScope.$stateParams.websiteId=="0"||!$rootScope.$stateParams.websiteId)) {
                            //        scope.sectionModel.templateModel = angular.copy(siteOrgInfoService.getDefaultModel());
                            //        scope.templateModel = scope.sectionModel.templateModel;
                            //    }
                            //}
                            scope.isEdit= scope.status=="edit"?true:false;
                            if (scope.status == "showStyle") {
                                //更改style更新数据为默认的模板数据
                                scope.$watch('siteModel.style', function (newValue, oldValue, scope) {
                                    if (newValue != oldValue) {
                                        scope.sectionModel.templateModel = angular.copy(siteOrgInfoService.getDefaultModelByStyle(newValue));
                                        scope.templateModel = scope.sectionModel.templateModel;
                                    }
                                });
                            }
                        }

                        init();

                        scope.addNewImage = function (index) {
                            if (scope.templateModel.imageUrl.length > 5) {
                                promptBarService.showErrorBar("最多能上传6张图片",3000);
                                return;
                            }
                            scope.index = index;
                            scope.updateImg();
                        };

                        scope.ShowImageBig = function (imageIndex) {
                            //scope.imageIndex = index;
                            //scope.ShowInageBig = true;
                            if(scope.status == "showStyle") {
                                return ;
                            }
                            showImageBigService.setInfo(imageIndex, true, scope.isEdit, scope.templateModel.imageUrl);
                        };


                        //scope.deleteImage = function () {
                        //    scope.templateModel.imageUrl.splice(scope.imageIndex, 1);
                        //    scope.ShowInageBig = false;
                        //}

                        //scope.closeImageBig = function () {
                        //    scope.ShowInageBig = false;
                        //}


                        //图片比例
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    //scope.templateModel.imageUrl[scope.imgIndex] = url;
                                    scope.templateModel.imageUrl.push(url);
                                })
                            });
                        };
                        scope.updateImg = function () {
                            if (!scope.isEdit) {
                                return
                            }
                            WebsiteUploadImgService.upLoadImg(siteOrgInfoService.getConfigByAspectRatio(scope.imgAspectRatio[0]), 0, scope.upLoadFinish);
                        };

                    }

                }
            }]
    )

});

