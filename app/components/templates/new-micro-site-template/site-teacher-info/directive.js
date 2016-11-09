"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("SiteTeacherInfo.directives", [])
        .directive("siteTeacherInfo", [
            "$window", "$timeout","$ionicScrollDelegate","$rootScope","siteTeacherInfoService", "uploadImgService","promptBarService",
            function ($window, $timeout,$ionicScrollDelegate,$rootScope,siteTeacherInfoService,uploadImgService,promptBarService ) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/site-teacher-info/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        scope.defaultHeadImg = "";
                        //item是否隐藏 / 是否使用不默认的样式
                        scope.isUseNotDefaultClass = [];
                        scope.currentIndex = -1;//当前选中的教师索引，-1为未选中状态
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                if (scope.notRenderEmpty) {
                                }else if(scope.status=="edit"){
                                    scope.sectionModel.templateModel = angular.copy(siteTeacherInfoService.getDefaultModel());
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }else{
                                    scope.sectionModel.templateModel = angular.copy(siteTeacherInfoService.getDefaultModelByStyle(scope.style));
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }

                            }

                            //if(scope.status=="edit") {
                            //    //如果是默认数据且没有保存，edit使用空数据
                            //    if (angular.equals(scope.templateModel, siteTeacherInfoService.getDefaultModelByStyle(scope.style))&&($rootScope.$stateParams.websiteId=="0"||!$rootScope.$stateParams.websiteId)) {
                            //        scope.sectionModel.templateModel = angular.copy(siteTeacherInfoService.getDefaultModel());
                            //        scope.templateModel = scope.sectionModel.templateModel;
                            //    }
                            //}

                            scope.isEdit = scope.status == "edit" ? true : false;
                            if (scope.status == "showStyle") {
                                //更改style更新数据为默认的模板数据
                                scope.$watch('siteModel.style', function (newValue, oldValue, scope) {
                                    if (newValue != oldValue) {
                                        scope.sectionModel.templateModel = angular.copy(siteTeacherInfoService.getDefaultModelByStyle(newValue));
                                        scope.templateModel = scope.sectionModel.templateModel;
                                    }
                                });
                            }
                        }

                        init();

                        scope.resetCurrentTeacherInfo = function(index){
                            if(scope.currentIndex==-1){
                                scope.currentIndex = index;
                                scope.isUseNotDefaultClass[scope.currentIndex] = true;
                            }else if(scope.currentIndex===index){
                                scope.currentIndex=-1;
                                scope.isUseNotDefaultClass[index] = false;
                            }else {
                                scope.isUseNotDefaultClass[scope.currentIndex] = false;
                                scope.currentIndex = index;
                                scope.isUseNotDefaultClass[scope.currentIndex] = true;
                            }

                        };

                        scope.addTeacherInfo = function(){
                            if(  scope.templateModel.teacherInfoList.length>=20){
                                promptBarService.showErrorBar("最多能添加20条教师信息",3000);
                                return ;
                            }
                            scope.templateModel.teacherInfoList.push(angular.copy(siteTeacherInfoService.teacherInfoModel));
                            $ionicScrollDelegate.scrollBottom();
                        };
                        scope.removeTeacherInfo = function(index){
                            if(  scope.templateModel.teacherInfoList.length<=1){
                                promptBarService.showErrorBar("请至少保留一条教师信息", 3000);
                                return ;
                            }
                            scope.templateModel.teacherInfoList.splice(index,1);
                        };


                    }

                }
            }]
    )

});

