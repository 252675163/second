"use strict";
/**
 * author : 陈天宇
 * time: 2016年10月18日19:45:19
 * description: 依赖于template_img_show的service，取出其中存储的图片
 */


define(["ionic"], function () {
    angular.module("TemplateTextShow.directives", [])
        .directive("templateTextShow", ["$timeout", "$rootScope","templateImgShowService", "templateTextShowService",
             function ($timeout, $rootScope,templateImgShowService, templateTextShowService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template_text_show/template.html",
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
                           scope.TempImgLists = templateImgShowService.getImgInfo() || [];
                        }
                        init();
                          scope.getImageDoMain = function (url) {
                            return window.cdnDoMain + scope.templateExtConfig.imageFolderName + url;
                        };

                      
                    }

                };
            }]
    );

});
