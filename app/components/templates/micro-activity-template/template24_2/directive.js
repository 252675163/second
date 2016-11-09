"use strict";
/**
 * author :
 * time: 
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("Template24_2.directives", [])
        .directive("template24by2", [
            "$window", "$timeout", "$rootScope", "template24_2Service", "uploadImgService", "maskService", "promptBarService", "commonNetService","template19_6Service",
             function ($window, $timeout, $rootScope, template24_2Service, uploadImgService, maskService, promptBarService, commonNetService,template19_6Service) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template24_2/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template24_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;


                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }
                            scope.model6 = template19_6Service.getImgInfo();
                        }
                        init();
                        scope.getImageDoMain = function (url) {
                            return window.cdnDoMain + scope.templateExtConfig.imageFolderName + url;
                        }
                    }

                }
            }]
    )

});

