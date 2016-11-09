"use strict";
/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:43
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("Template21_3.directives", [])
        .directive("template21by3", [
            "$timeout", "$rootScope", "template21_3Service", "uploadImgService", "commonNetService",
            function ($timeout, $rootScope, template21_3Service, uploadImgService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template21_3/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template21_3Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;
                            scope.isPreview = scope.status == "preview" ? true : false;

                            //拿到该页面的数据
                            template21_3Service.setDataOfTempaletModel(scope.templateModel);

                            //默认二维码头像

                            //scope.qrcodeImg = scope.templateModel.description[2];
                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }
                            scope.uiConfig = template21_3Service.getUiConfig();

                        }
                        init();
                        scope.placeholderheadimg = window.resourceDoMain + "/app/img/vote_qrcode_default.png";
                        scope.updateHeadImg = function () {

                            uploadImgService.upLoadImg(template21_3Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish, '', { serviceType: "headerImg" });

                        };
                        scope.upLoadHeadImgFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.templateModel.description[3] = url;
                                });
                            });
                        };

                        //将编辑状态下的数值传入到预览界面    
                        scope.$watch("templateModel", function (n, o) {
                            template21_3Service.setActiveName(n);
                            template21_3Service.setDataOfTempaletModel(n);
                        })

                    }

                }
            }]
        )

});

