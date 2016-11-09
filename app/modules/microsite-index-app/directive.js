"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic"],function () {
    angular.module("MicroSiteIndexApp.directives", [])
        .directive("microSiteIndexView", [
            "$window", "$timeout", "$compile","$q", function ($window, $timeout, $compile,$q) {
                return {
                    restrict: 'EA',
                    scope: {
                        siteModel: "="
                    },
                    template: "<div></div>",
                    link: function (scope, iElement, iAttr) {
                        var renderTemplate = function (pageIndex, sectionIndex) {
                            var templateDirective = "<" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                            newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                            newScope.status = "preview";
                             $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName, (function ($compile, templateDirective, newScope, iElement) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    iElement.append(el);
                                }
                            })($compile, templateDirective, newScope, iElement));

                            // var el = $compile(templateDirective)(newScope);
                            // iElement.append(el);
                        };
                        //渲染模板指令
                        renderTemplate(0, 0);

                    }

                }
            }]
    )

});

