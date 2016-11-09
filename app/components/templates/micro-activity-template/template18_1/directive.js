"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("Template18_1.directives", [])
        .directive("template18by1", [
            "$window", "$timeout", "$rootScope", "$q", "$ionicScrollDelegate", "template18_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, $q, $ionicScrollDelegate, template18_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-activity-template/template18_1/template.html",
                    link: {
                        pre: function preLink(scope, iElement, iAttr) {
                            var defaultHeadImg = "";
                            scope.goToNextStep = function () {
                                scope.step = '2';
                            };
                            function init() {
                                window.wx && window.wx.hideMenuItems({
                                    menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:QZone"]
                                });
                                if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                    scope.sectionModel.templateModel = angular.copy(template18_1Service.model);
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }
                                scope.isEdit = scope.status == "edit" ? true : false;
                                scope.isView = scope.status == "view" ? true : false;
                                //背景图片
                                var docEl = document.documentElement;
                                iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + docEl.clientHeight + "px";

                                if ($rootScope.$stateParams.oldUser) {
                                    scope.userType = "new";
                                } else {
                                    scope.userType = "old";
                                }
                                scope.step = $rootScope.$stateParams.step || '1';

                                //如果是查看页面,只有在view页面会有推荐人（将页面分享出来的人）概念
                                if (scope.status == "view") {
                                    //请求
                                    if (scope.userType == "new") {
                                        var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;
                                        template18_1Service.getActivityUserInfo(userId, scope.userType).success(function (result) {
                                            if (result.status == 1) {
                                                scope.userInfoOfReference = {
                                                    name: result.data.Name || "",
                                                    otherInfo:result.data.Config ? JSON.parse(result.data.Config).otherInfo : "",
                                                    headImg: result.data.Config ? JSON.parse(result.data.Config).headImg : defaultHeadImg,
                                                    couplet: result.data.Config ? JSON.parse(result.data.Config).couplet : ['', '']
                                                };
                                            }
                                        });
                                    } else {
                                        scope.userInfoOfReference = {
                                            name: scope.templateModel.name,
                                            otherInfo: scope.templateModel.otherInfo,
                                            headImg: scope.templateModel.imageUrl[0] || defaultHeadImg,
                                            couplet: scope.templateModel.couplet
                                        };
                                    }
                                } else {
                                    scope.userInfoOfReference = {
                                        name: "",
                                        otherInfo: "",
                                        headImg: "",
                                        couplet: scope.templateModel.couplet
                                    };
                                }

                            }

                            init();


                        }
                    }
                };
            }
        ]
    );
});