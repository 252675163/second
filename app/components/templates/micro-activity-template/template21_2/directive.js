"use strict";
/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:43
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("Template21_2.directives", [])
        .directive("template21by2", [
            "$rootScope", "template21_2Service", "$filter", function ($rootScope, template21_2Service, $filter) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template21_2/template.html",
                    link: function (scope, iElement, iAttr) {


                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template21_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;
                            scope.isPreview = scope.status == "preview" ? true : false;
                            
                            if (!scope.activityOtherConfig) {
                                    scope.activityOtherConfig = {};
                            }
                            //新建活动时  初始化  截止时间 默认为七天后
                            if(!scope.activityOtherConfig.endDate){
                                scope.activityOtherConfig.endDate = $filter("formatJsonDate2")(scope.templateModel.description[2], "yyyy/MM/dd HH:mm:ss");
                            }
                            if (scope.activityOtherConfig.endDate != "/Date(253402185600000+0800)/") {
                                scope.activityOtherConfig.endDate = $filter("formatJsonDate2")(scope.activityOtherConfig.endDate, "yyyy/MM/dd HH:mm:ss");
                            }else{
                                scope.activityOtherConfig.endDate = scope.templateModel.description[2];
                            }
                            template21_2Service.setDataOfTempaletModel(scope.templateModel);


                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }

                            // 截止时间  mobiscroll 组建
                            // mobiscroll 在引入指令中时需要父级作用域的数据来双向绑定，
                            // 由于本页面为指令，直接写在指令中无法对该组建初始化，所以此处使用ng-repeat创建子级作用域 以此避免上面的问题
                            // tempnum 为只为ng-repeat 使用的一维数组
                            var now = new Date();

                            scope.tempnum = [0];
                            scope.settings = {
                                animate: 'fade',
                                theme: 'material',      // 样式
                                lang: 'zh',    // 语言
                                display: 'bottom',  // 显示位置
                                minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0), //最小值
                                maxDate: new Date(now.getFullYear(), now.getMonth() + 6, now.getDate()), //最小值
                                mode: 'scroller',//显示方式
                                timeWheels: 'HH',
                                fixedWidth: [110, 55, 55, 55],
                                onSelect: function (value) {
                                    if (scope.status != "view") {
                                        scope.activityOtherConfig.endDate = value;
                                        scope.templateModel.description[2] = value;
                                    }
                                }
                            };

                        }
                        init();

                        scope.mydatetime =  new Date(scope.templateModel.description[2]);

                        //将编辑状态下的数值传入到预览界面    
                        scope.$watch("templateModel", function (n, o) {
                            template21_2Service.setActiveName(n);
                            template21_2Service.setDataOfTempaletModel(n);
                        })

                        // 在页面切换时 销毁时间控件
                        scope.$on("$destroy", function () {
                            stateChangeStart();
                        });
                        var stateChangeStart = $rootScope.$on("$stateChangeStart", function () {
                            if(scope.demo){
                                scope.demo.destroy();
                            }
                        })

                    }

                }
            }]
        )

});

