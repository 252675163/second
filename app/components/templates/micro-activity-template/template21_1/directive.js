"use strict";
/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:43
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("Template21_1.directives", [])
        .directive("template21by1", [
            "$window", "$rootScope", "template21_1Service", "commonNetService","$filter","promptBarService",
            function ($window, $rootScope, template21_1Service, commonNetService,$filter,promptBarService) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-activity-template/template21_1/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）

                        function init() {
                            //屏蔽相关菜单
                            promptBarService.hideErrorBar2();
                            window.wx && window.wx.hideMenuItems({
                                menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email","menuItem:share:QZone"]
                            });

                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template21_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            // template21_1Service.getWeixinUserInfo();
                            // PC 官网进入情况下  初始化activityOtherConfig
                             if (!scope.activityOtherConfig) {
                                    scope.activityOtherConfig = {};
                                }
                             //新建活动时  初始化  截止时间 默认为七天后
                            if(!scope.activityOtherConfig.endDate){
                                var d= new Date();
                                scope.activityOtherConfig.endDate = $filter("formatJsonDate2")(new Date(d.getFullYear(),d.getMonth(),d.getDate()+7,0,0,0), "yyyy/MM/dd HH:mm:ss");
                            }

                            //console.log(scope.templateModel);

                            template21_1Service.setDataOfTempaletModel(scope.templateModel);
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
                            scope.step = $rootScope.$stateParams.step || 1;

                            scope.ifshowInfo = false;

                            if (scope.status == "view") {
                                commonNetService.showOptionMenu();
                            }
                        }
                        init();

                    }
                };
            }
        ]
        ).filter("parsetostring", function () {
            return function (str) {
                if (str) {
                    var s = JSON.parse(str);
                    return s.headImg;
                } else {
                    return str;
                }

            }
        }).filter("cutname", function () {
            return function (str) {
                if (str.length>3) {
                    var s = str.substring(0,3);
                    return s+"...";
                } else {
                    return str;
                }

            }
        });
});