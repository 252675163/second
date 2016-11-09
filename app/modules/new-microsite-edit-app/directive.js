"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic"], function () {
    angular.module("NewMicroSiteEditApp.directives", [])
        .directive("microSiteEditView", [
                "$window", "$timeout", "$compile","$q", function ($window, $timeout, $compile,$q) {

                    return {
                        restrict: "E",
                        scope: {
                            siteModel: "="
                        },
                        templateUrl: "modules/new-microsite-edit-app/micrositeeditview-directive.html",
                        link: function (scope, iElement, iAttr) {
                            //hack 安卓上键盘缩起后，界面卡住问题
//                            (function () {
//
//                                var initHeight = window.innerHeight;
//                                var initWidth = window.innerWidth;
//
//                                $(window).off("resize").on("resize", function () {
//                                    setTimeout(function () {
//                                        if ((window.orientation == 180 || window.orientation == 0) && initWidth === window.innerWidth) {
//                                            if (initHeight > window.innerHeight) {
//                                                //                                            alert(2);
//
//                                            } else {
//                                                ionic.keyboard.hide();
//                                            }
//                                        }
//                                    }, 100);
//                                });
//                            }());

                            var renderTemplate = function (currentModuleIndex) {
                                var templateDirective = "<" + scope.usableModules[currentModuleIndex].templateName + ">" + "</" + scope.usableModules[currentModuleIndex].templateName+ ">";
                                var newScope = scope.$new();
                                newScope.templateModel =scope.usableModules[currentModuleIndex].templateModel;
                                newScope.sectionModel = scope.usableModules[currentModuleIndex];
                                newScope.status = "edit";
                                newScope.siteModel = scope.siteModel;
                                newScope.style =  scope.siteModel.style;
                                 $compile.loadBeforeCompile(scope.usableModules[currentModuleIndex].templateName, (function ($compile, templateDirective, newScope, iElement) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    iElement.append(el);
                                }
                            })($compile, templateDirective, newScope, iElement));

                                // var el = $compile(templateDirective)(newScope);
                                // iElement.append(el);
                            };
                            function init() {
                                scope.usableModules = scope.siteModel.modules.filter(function (data) {
                                    return (data.isDisabled == false) && (data.isHideInEdit == false);
                                });
                                //渲染模板指令
                                renderTemplate(scope.siteModel.currentModuleIndex);
                            }
                            init();


                            scope.$watchGroup(['siteModel.currentModuleIndex', 'siteModel.templateRender'], function (nv, ov) {
                                if (nv === ov) {
                                    return;
                                }
                                iElement.empty();
                                if (!angular.isUndefined(scope.usableModules[nv[0]])) {
                                    renderTemplate(nv[0]);
                                }

                            }, true);

                        }

                    };
                }
        ]
        );
});