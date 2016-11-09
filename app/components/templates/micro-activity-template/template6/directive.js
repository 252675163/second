"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:templateModel就是该模板创建的结构，自定义
 */

define(["ionic", "components/templates/micro-activity-template/template6/service"], function () {
    angular.module("microOldNewTemplate6.directives", ["microOldNewTemplate6.service"])
        .directive("microOldNewTemplate6", [
            "$window", "$timeout", "microOldNewTemplate6Service", "$rootScope", "promptBarService", function ($window, $timeout, microOldNewTemplate6Service, $rootScope, promptBarService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template6/template_6.html",
                    link: function (scope, iElement, iAttr) {

                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microOldNewTemplate6Service.model);
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

