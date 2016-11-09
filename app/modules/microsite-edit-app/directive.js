"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic"], function () {
    angular.module("MicroSiteEditApp.directives", [])
        .directive("microSiteEditView", [
            "$window", "$timeout", "$compile", "$q",function ($window, $timeout, $compile,$q) {

                return {
                    restrict: "E",
                    scope: {
                        siteModel: "="
                    },
                    templateUrl: "modules/microsite-edit-app/micrositeeditview-directive.html",
                    link: function (scope, iElement, iAttr) {
                        //hack 安卓上键盘缩起后，界面卡住问题
                        (function () {

                            var initHeight = window.innerHeight;
                            var initWidth = window.innerWidth;

                            $(window).off("resize").on("resize", function () {
                                setTimeout(function () {
                                    if ((window.orientation == 180 || window.orientation == 0) && initWidth === window.innerWidth) {
                                        if (initHeight > window.innerHeight) {
                                            //                                            alert(2);

                                        } else {
                                            ionic.keyboard.hide();
                                        }
                                    }
                                }, 100);
                            });
                        } ());

                        var renderTemplate = function (pageIndex, sectionIndex) {
                            var templateDirective = "<" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                            newScope.pageIndex = pageIndex;
                            newScope.sectionIndex = sectionIndex;
                            newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                            newScope.status = "edit";
                            $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName, (function ($compile, templateDirective, newScope, iElement) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    iElement.append(el);
                                }
                            })($compile, templateDirective, newScope, iElement));

                            // var el = $compile(templateDirective)(newScope);
                            // iElement.append(el);
                        }


                        scope.$watchGroup(['siteModel.currentPageIndex', 'siteModel.currentSectionIndex', 'siteModel.templateRender'], function (nv, ov) {
                            if (nv === ov) {
                                return;
                            }
                            iElement.empty();
                            if (!angular.isUndefined(scope.siteModel.pages[nv[0]])) {
                                if (!angular.isUndefined(scope.siteModel.pages[nv[0]].sections[nv[1]])) {
                                    renderTemplate(nv[0], nv[1]);
                                }
                            }

                        }, true);

                        //渲染模板指令
                        renderTemplate(scope.siteModel.currentPageIndex, scope.siteModel.currentSectionIndex);

                        //                            angular.forEach(scope.siteModel.pages, function(page, pageIndex) {
                        //                                angular.forEach(page.sections, function(section, sectionIndex) {
                        //
                        //                                    var templateDirective = "<" + section.templateName + ">" + "</" + section.templateName + ">";
                        //                                    var newScope = scope.$new();
                        //                                    newScope.templateModel = angular.copy(section.templateModel);
                        //                                    newScope.pageIndex = pageIndex;
                        //                                    newScope.sectionIndex = sectionIndex;
                        //
                        //                                    var el = $compile(templateDirective)(newScope);
                        //                                    iElement.append(el);
                        //                                });
                        //                            });
                    }

                };
            }
        ]
        );
});