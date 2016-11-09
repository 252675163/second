"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("Template23_2.directives", [])
        .directive("template23by2", [
            "$window", "$timeout", "$rootScope", "template23_2Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, template23_2Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template23_2/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template23_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;


                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }

                        }
                        init();
                        scope.getImageDoMain = function (url) {
                            return window.resourceDoMain + scope.templateExtConfig.imageFolderName + url;
                        }
                    }

                }
            }]
    )

});

