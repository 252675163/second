"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic","components/site_form/service"], function () {
    angular.module("SiteCourseInfo.directives", ["SiteForm.directive"])
        .directive("siteCourseInfo", [
            "$window", "$timeout","$ionicScrollDelegate","$rootScope","siteCourseInfoService", "uploadImgService","siteFormService","promptBarService",function ($window, $timeout,$ionicScrollDelegate,$rootScope,siteCourseInfoService,uploadImgService,siteFormService,promptBarService ) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/site-course-info/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）

                       
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                if (scope.notRenderEmpty) {
                                }else if(scope.status=="edit"){
                                    scope.sectionModel.templateModel = angular.copy(siteCourseInfoService.getDefaultModel());
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }else {
                                    scope.sectionModel.templateModel = angular.copy(siteCourseInfoService.getDefaultModelByStyle(scope.style));
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }
                            }

                            //if(scope.status=="edit") {
                            //    //如果是默认数据且没有保存，edit使用空数据
                            //    if (angular.equals(scope.templateModel, siteCourseInfoService.getDefaultModelByStyle(scope.style))&&($rootScope.$stateParams.websiteId=="0"||!$rootScope.$stateParams.websiteId)) {
                            //        scope.sectionModel.templateModel = angular.copy(siteCourseInfoService.getDefaultModel());
                            //        scope.templateModel = scope.sectionModel.templateModel;
                            //    }
                            //}
                            if(scope.status == "showStyle") {
                                //更改style更新数据为默认的模板数据
                                scope.$watch('siteModel.style', function (newValue, oldValue, scope) {
                                    if (newValue != oldValue) {
                                        scope.sectionModel.templateModel = angular.copy(siteCourseInfoService.getDefaultModelByStyle(newValue));
                                        scope.templateModel = scope.sectionModel.templateModel;
                                    }
                                });
                            }


                            if(scope.status=="view"||"preview"){
                                siteFormService.setCourseModel(scope.templateModel);//不使用angular.copy
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isShowCourseList =[];
                        }
                        init();

                        scope.addCourse = function(courseType){
                            if(courseType.list.length>=10){
                                promptBarService.showErrorBar("最多能添加10个课程类别，每个类别下最多能添加10个具体课程",3000);
                                return ;
                            }
                            courseType.list.push(angular.copy(siteCourseInfoService.courseModel));
                        };
                        scope.removeCourse = function(courseType,index){
                            if(courseType.list.length<=1){
                                promptBarService.showErrorBar("请至少保留一个课程类别", 3000);
                                return ;
                            }
                            courseType.list.splice(index,1);
                        };
                        scope.addCourseType = function(index){
                            if( scope.templateModel.list.length>=10){
                                promptBarService.showErrorBar("最多能添加10个课程类别，每个类别下最多能添加10个具体课程", 3000);
                                return ;
                            }
                            scope.templateModel.list.push(siteCourseInfoService.getDefaultCourseTypeModel());
                            $ionicScrollDelegate.scrollBottom();
                        };
                        scope.removeCourseType = function(index){
                            if(scope.templateModel.list.length<=1){
                                promptBarService.showErrorBar("请至少保留一个具体课程", 3000);
                                return ;
                            }
                            scope.templateModel.list.splice(index,1);
                            scope.isShowCourseList.splice(index,1);

                        };


                        scope.goConsult = function(courseType,course){
                            if(scope.status == "showStyle") {
                                return ;
                            }
                            //siteFormService.showSiteForm = function (type,info) {
                            //    //type:1 从精品课程模块进入报名，type：2从校区信息进入报名
                            //    //info{campusName:"",current:{courseType:{},course:{}}}
                            siteFormService.showSiteForm(1,{current:{courseType:courseType,course:course}},scope.status);

                        }

                    }

                }
            }]
    )

});

