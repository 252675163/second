"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:templateModel就是该模板创建的结构，自定义
 */

define(["ionic","components/templates/new-micro-site-template/template2/service"], function () {
    angular.module("microTemplate2.directives", ["MicroTemplate2.service"])
        .directive("microTemplate2", [
            "$window", "$timeout","microTemplate2Service", function ($window, $timeout,microTemplate2Service) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/template2/template_2.html",
                    link: function (scope, iElement, iAttr) {

                        //固定写法
                        //判断Model是否为空，如果为空，生成自定义结构
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microTemplate2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            if (scope.status == "edit") {
                                scope.isEdit = true;
                            }
                            else {
                                scope.isEdit = false;
                            }
                            iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundImage = 'url' + '("' + scope.sectionModel.backgroundImage + '")';
                            //iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundSize = "cover";
                            scope.$watch('sectionModel.backgroundImage', function (newValue, oldValue, scope) {
                                if (newValue != oldValue) {
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

