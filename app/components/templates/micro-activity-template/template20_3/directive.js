"use strict";
/**
 * author :
 * time: 
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("Template20_3.directives", [])
        .directive("template20by3", [
            "$window", "$timeout", "$rootScope", "template20_3Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, template20_3Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template20_3/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template20_3Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit= scope.status=="edit"?true:false;
                            scope.isView = scope.status == "view" ? true : false;

                            template20_3Service.setContactInfo(scope.templateModel);
                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }
                            scope.uiConfig = template20_3Service.getUiConfig();


                            scope.isShowDescription = scope.isEdit || !!scope.templateModel.title[0] || !!scope.templateModel.description[0];
                            scope.isShowContact = !scope.isEdit && !!scope.templateModel.description[1] || !!scope.templateModel.description[2];
                            scope.isShowPhone = !scope.isEdit && !scope.templateModel.description[1];
                            scope.isShowAddress = !scope.isEdit && !scope.templateModel.description[2];
                            scope.isShowPage = scope.isShowDescription || scope.isShowContact;
                            scope.isShowContactBg = scope.isEdit||!!scope.templateModel.description[1] || !!scope.templateModel.description[2];

                        }
                        init();

                    }

                }
            }]
    )

});

