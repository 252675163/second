"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */


define(["ionic"], function () {
    angular.module("MicroSpellgroup1_5.directives", [])
        .directive("microSpellgroup1by5", [
                "$window", "$timeout", "$rootScope", "microSpellgroup1_5Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, microSpellgroup1_5Service, uploadImgService, maskService, promptBarService, commonNetService) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_5/template.html",
                        link: function (scope, iElement, iAttr) {

                            //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                            function init() {        
                                scope.isEdit = scope.status == "edit" ? true : false;
                                scope.isView = scope.status == "view" ? true : false;
                                //userType old/new
                                if ($rootScope.$stateParams.oldUser) {
                                    scope.userType = "new";
                                } else {
                                    scope.userType = "old";
                                }

                                if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                    scope.sectionModel.templateModel = angular.copy(microSpellgroup1_5Service.model);
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }
                                microSpellgroup1_5Service.setModel(scope.templateModel);
                               
                            }
                            
                            init();
                        }

                    };
                }
        ]
        );
});