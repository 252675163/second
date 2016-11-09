"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("SiteCourseInfoEdit.directives", [])
        .directive("siteCourseInfoEdit", [
            "$window", "$timeout","siteCourseInfoService", "uploadImgService",function ($window, $timeout,siteCourseInfoService,uploadImgService ) {
                return {
                    restrict: 'EA',
                    scope:{
                        courseModel:"=",
                        courseType:"=",
                        removeCourse:"&"
                    },
                    templateUrl: "components/templates/new-micro-site-template/site-course-info/site-course-info-edit/template.html",
                    link: function (scope, iElement, iAttr) {



                    }

                }
            }]
    )

});

