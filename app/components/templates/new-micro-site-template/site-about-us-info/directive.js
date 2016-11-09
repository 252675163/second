"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("SiteAboutUsInfo.directives", [])
        .directive("siteAboutUsInfo", [
            "$window", "$timeout", "$ionicScrollDelegate", "$rootScope", "siteAboutUsInfoService", "siteFormService", "promptBarService",
            function ($window, $timeout, $ionicScrollDelegate, $rootScope, siteAboutUsInfoService, siteFormService, promptBarService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/site-about-us-info/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        scope.defaultHeadImg = "";
                        function init() {
                            //当前模块没有初始化数据


                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                if (scope.notRenderEmpty) {
                                } else if (scope.status == "edit") {
                                    scope.sectionModel.templateModel = angular.copy(siteAboutUsInfoService.getDefaultModel());
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }else {
                                    scope.sectionModel.templateModel = angular.copy(siteAboutUsInfoService.getDefaultModelByStyle(scope.style));
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }
                            }

                            //if(scope.status=="edit") {
                            //    //如果是默认数据且没有保存，edit使用空数据
                            //    if (angular.equals(scope.templateModel, siteAboutUsInfoService.getDefaultModelByStyle(scope.style))&&($rootScope.$stateParams.websiteId=="0"||!$rootScope.$stateParams.websiteId)) {
                            //        scope.sectionModel.templateModel = angular.copy(siteAboutUsInfoService.getDefaultModel());
                            //        scope.templateModel = scope.sectionModel.templateModel;
                            //    }
                            //}


                            //更改style更新数据为默认的模板数据
                            if(scope.status == "showStyle"){
                                scope.$watch('siteModel.style', function (newValue, oldValue, scope) {
                                    if (newValue != oldValue) {
                                        scope.sectionModel.templateModel = angular.copy(siteAboutUsInfoService.getDefaultModelByStyle(newValue));
                                        scope.templateModel = scope.sectionModel.templateModel;
                                    }
                                });
                            }
                            if(scope.status=="view"||"preview"){
                                siteFormService.setCampusModel(scope.templateModel);//不使用angular.copy
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;


                        }



                        init();


                        scope.addCampusInfo = function () {
                            if (scope.templateModel.aboutUsInfoList.length >= 20) {
                                promptBarService.showErrorBar("最多能添加20条联系方式 ", 3000);
                                return;
                            }
                            scope.templateModel.aboutUsInfoList.push(angular.copy(siteAboutUsInfoService.campusInfoModel));
                            $ionicScrollDelegate.scrollBottom();
                        };
                        scope.removeCampusInfo = function (index) {
                            if (scope.templateModel.aboutUsInfoList.length <= 1) {
                                promptBarService.showErrorBar("请至少保留一条联系方式 ", 3000);
                                return;
                            }

                            scope.templateModel.aboutUsInfoList.splice(index, 1);
                        };
                        scope.goConsult = function (campusInfoModel,index) {
                            if(scope.status == "showStyle"){
                                return;
                            }
                            //siteFormService.showSiteForm = function (type,info) {
                            //    //type:1 从精品课程模块进入报名，type：2从校区信息进入报名
                            //    //info{campusName:"",current:{courseType:{},course:{},currentIndex:''}}
                            siteFormService.showSiteForm(2, {currentIndex:index}, scope.status);

                        }


                    }

                }
            }]
    )

});

