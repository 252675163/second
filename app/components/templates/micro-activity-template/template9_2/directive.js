"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("Template9_2.directives", [])
        .directive("template9by2", [
            "$window", "$timeout","template9_2Service", "uploadImgService",function ($window, $timeout,template9_2Service,uploadImgService ) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template9_2/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template9_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit= scope.status=="edit"?true:false;

                            //背景图片
                            iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundImage = ' url' + '("' + scope.sectionModel.backgroundImage + '")';
                            iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundSize = "100% 100%";
                            scope.$watch('sectionModel.backgroundImage',function(newValue,oldValue, scope){
                                if(newValue!=oldValue){
                                    iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundImage = 'url' + '("' + scope.sectionModel.backgroundImage + '")';
                                }
                            });
                        }
                        init();



                    }

                }
            }]
    )

});

