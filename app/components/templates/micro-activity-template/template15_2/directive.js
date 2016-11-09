"use strict";
/**
 * author :huijuan
 * time: 2016年1月12日
 * description:招生简章模板
 */


define(["ionic"], function () {
    angular.module("Template15_2.directives", [])
        .directive("template15by2", [
            "$window", "$timeout","$rootScope", "template15_2Service", "uploadImgService", "promptBarService", "maskService", "commonNetService", function ($window, $timeout, $rootScope,template15_2Service, uploadImgService, promptBarService, maskService,commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template15_2/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template15_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit= scope.status=="edit"?true:false;

                            //背景图片
                           iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage =   ' url'+'("'+ scope.sectionModel.backgroundImage +'")';
                           iElement[0].getElementsByClassName("bgPan")[0].style.backgroundSize="100% 100%";
                            scope.$watch('sectionModel.backgroundImage',function(newValue,oldValue, scope){
                                if(newValue!=oldValue){
                                    iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage =   'url'+'("'+ scope.sectionModel.backgroundImage +'")';
                                }
                            });


                        }
                        init();



                    }

                }
            }]
    )

});

