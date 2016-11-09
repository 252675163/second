"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/new-micro-site-template/site-qr-code/service"], function () {
    angular.module("siteCover.directives", ['siteQrCode.Service'])
        .directive("siteCover", [
            "$window", "$timeout", "$rootScope", "siteCoverService", "uploadImgService", "promptBarService", "maskService", "commonNetService", "siteQrCodeService", function ($window, $timeout, $rootScope, siteCoverService, uploadImgService, promptBarService, maskService, commonNetService, siteQrCodeService) {
                return {
                    restrict: 'EA',
                    // templateUrl: "components/templates/new-micro-site-template/site-cover/template.html",
                     template: '<div ng-if="isEdit"><div class="card siteEdit_card_box siteEdit_card_style" ng-click="updateImg(0)"><div class="card_inner_text" ng-hide="templateModel.imageUrl[0]"><span class="card_icon">+</span><p class="card_logo">请上传LOGO</p></div><div class="card_inner_text card_inner_text_dis" ng-show="templateModel.imageUrl[0]"><img ng-src="{{templateModel.imageUrl[0]}}" class="canEdit" style="width:100%;height:100%"></div></div><div class="card siteEdit_card_style siteEdit_card_input_box"><div class="card_input_border_box"><input maxlength="15" my-max-length class="card_input_style canShow" type="text" ng-model="templateModel.description[0]" ng-trim="false" placeholder="请输入机构名" change-placeholder-by-focus></div><div class="card_input_border_box"><input maxlength="15" my-max-length class="card_input_style canShow" type="text" ng-model="templateModel.description[1]" ng-trim="false" placeholder="请输入机构联系电话" change-placeholder-by-focus></div><div class="card_input_border_box"><input maxlength="20" my-max-length class="card_input_style canShow" type="text" ng-model="templateModel.description[2]" ng-trim="false" placeholder="请输入机构品牌标语" change-placeholder-by-focus></div></div><div class="card siteEdit_card_box2 siteEdit_card_style" ng-click="updateImg(1)"><div class="card_inner_text" ng-hide="templateModel.imageUrl[1]"><span class="card_icon">+</span><p class="card_logo">请上传封面背景图（可选）</p></div><div class="card_inner_text card_inner_text_dis" ng-show="templateModel.imageUrl[1]"><img ng-src="{{templateModel.imageUrl[1]}}" class="canEdit" style="width:100%;height:100%"></div></div></div><div ng-show="!isEdit" class=""><div class="newSite_cover_Outer" style="background-size: cover; background-repeat: no-repeat"><div class="newSite_Org_logo"><img ng-src="{{templateModel.imageUrl[0]}}"></div><div class="newSite_Org_name"><span ng-bind-html="templateModel.description[0]|newlines"></span></div><div class="newSite_Org_slogan" ng-bind-html="templateModel.description[2]|newlines"></div></div></div>',
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                if (scope.notRenderEmpty) {
                                } else if (scope.status == "edit") {
                                    scope.sectionModel.templateModel = angular.copy(siteCoverService.getDefaultModel());
                                    scope.templateModel = scope.sectionModel.templateModel;
                                } else {
                                    scope.sectionModel.templateModel = angular.copy(siteCoverService.getDefaultModelByStyle(scope.style));
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }
                            }
                            //if(scope.status=="edit") {
                            //    //如果是默认数据且没有保存，edit使用空数据
                            //    if (angular.equals(scope.templateModel, siteCoverService.getDefaultModelByStyle(scope.style))&&($rootScope.$stateParams.websiteId=="0"||!$rootScope.$stateParams.websiteId)) {
                            //        scope.sectionModel.templateModel = angular.copy(siteCoverService.getDefaultModel());
                            //        scope.templateModel = scope.sectionModel.templateModel;
                            //    }
                            //}
                            //默认数据 包括预览背景图
                            scope.defaultModel = angular.copy(siteCoverService.getDefaultModelByStyle(scope.style));

                            scope.isEdit = scope.status == "edit" ? true : false;
                            siteQrCodeService.model = scope.templateModel;
                            //siteQrCodeService.defaultModel =  scope.defaultModel;
                            iElement[0].getElementsByClassName("newSite_cover_Outer")[0].style.backgroundImage = 'url' + '("' + (scope.templateModel.imageUrl[1] || scope.defaultModel.imageUrl[1]) + '") ';

                            if (scope.status == "showStyle") {
                                //更改style更新数据为默认的模板数据
                                scope.$watch('siteModel.style', function (newValue, oldValue, scope) {
                                    if (newValue != oldValue) {
                                        scope.style = newValue;
                                        scope.defaultModel = angular.copy(siteCoverService.getDefaultModelByStyle(scope.style));
                                        scope.sectionModel.templateModel = angular.copy(siteCoverService.getDefaultModelByStyle(scope.style));
                                        scope.templateModel = scope.sectionModel.templateModel;
                                        siteQrCodeService.model = scope.templateModel;
                                        // siteQrCodeService.defaultModel =  scope.defaultModel;
                                        // scope.backgroundStyle = "{'background': 'url('"+(scope.templateModel.imageUrl[1]||scope.defaultModel.imageUrl[1])+"') 50% 50% / 100% 100% no-repeat;'}";
                                        iElement[0].getElementsByClassName("newSite_cover_Outer")[0].style.backgroundImage = 'url' + '("' + (scope.templateModel.imageUrl[1] || scope.defaultModel.imageUrl[1]) + '") ';

                                    }
                                });
                            }
                        }

                        init();


                        //图片比例
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.templateModel.imageUrl[scope.imgIndex] = url;
                                })
                            });
                        };
                        scope.updateImg = function (imgIndex) {
                            if (!scope.isEdit) {
                                return
                            }
                            scope.imgIndex = imgIndex;
                            uploadImgService.upLoadImg(siteCoverService.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 0, scope.upLoadFinish);
                        };

                    }

                }
            }]
    )

});

