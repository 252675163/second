"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:templateModel就是该模板创建的结构，自定义
 */

define(["ionic", "components/templates/micro-activity-template/template2_2_1/service"], function () {
    angular.module("microOldNewTemplate2_2_1.directives", ["microOldNewTemplate2_2_1.service"])
        .directive("microOldNewTemplate221", [
            "$window", "$timeout", "microOldNewTemplate2_2_1Service", function ($window, $timeout, microOldNewTemplate2_2_1Service) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template2_2_1/template2_2_1.html",
                    link: function (scope, iElement, iAttr) {

                        //固定写法
                        //判断Model是否为空，如果为空，生成自定义结构
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microOldNewTemplate2_2_1Service.model);
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
                        scope.inputconfig = [
                            {
                                width: 241,
                                height: 38,
                                fontSize: 25
                            },
                            {
                                width: 192,
                                height: 76,
                                fontSize: 62
                            },
                            {
                                width: 200,
                                height: 35,
                                fontSize: 28
                            },
                            {
                                width: 200,
                                height: 29,
                                fontSize: 19
                            }
                        ];

                    }

                }
            }]
    );

});

