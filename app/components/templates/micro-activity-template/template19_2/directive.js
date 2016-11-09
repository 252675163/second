"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic","components/templates/micro-activity-template/template19_6/service"], function() {
    angular.module("Template19_2.directives", [])
        .directive("template19by2", [
            "$window", "$timeout", "$rootScope", "template19_2Service", "uploadImgService", "template19_6Service",
            function($window, $timeout, $rootScope, template19_2Service, uploadImgService, template19_6Service) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template19_2/template.html",
                    link: function(scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template19_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;


                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }
                            scope.model6 = template19_6Service.getImgInfo();
                        }
                        init();

                    }

                }
            }
        ])

});