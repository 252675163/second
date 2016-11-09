"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("SiteTeacherInfoEdit.directives", [])
        .directive("siteTeacherInfoEdit", [
            "$window", "$timeout","siteTeacherInfoService", "uploadImgService",function ($window, $timeout,siteTeacherInfoService,uploadImgService ) {
                return {
                    restrict: 'EA',
                    scope:{
                        teacherInfoModel:"=",
                        addTeacherInfo:"=",
                        removeTeacherInfo:"&"
                    },
                    templateUrl: "components/templates/new-micro-site-template/site-teacher-info/site-teacher-info-edit/template.html",
                    link: function (scope, iElement, iAttr) {

                        scope.upLoadFinish = function(url){
                            $timeout(function(){
                                scope.$apply(function(){
                                    scope.teacherInfoModel.imageUrl = url;
                                })
                            });
                        };
                        scope.updateImg = function(){
                            uploadImgService.upLoadImg(siteTeacherInfoService.getConfigByAspectRatio(1), 0, scope.upLoadFinish);
                        };



                    }

                }
            }]
    )

});

