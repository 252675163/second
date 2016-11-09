"use strict";
/**
 * author :yinglechao
 * time: 2015年9月9日 20:59:58
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("MicroTemplate5.directives", [])
        .directive("microTemplate5", [
            "$window", "$timeout","microTemplate5Service", function ($window, $timeout,microTemplate5Service) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/template5/template_5.html",
                    link: function (scope, iElement, iAttr) {
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microTemplate5Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                           scope.isEdit= scope.status=="edit"?true:false;


                           iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundImage = ' url' + '("' + scope.sectionModel.backgroundImage + '")';
                           // iElement[0].getElementsByClassName("temp5")[0].style.backgroundSize="100% 100%";
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

