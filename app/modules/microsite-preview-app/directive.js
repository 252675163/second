"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["slip", "ionic"], function () {
    angular.module("MicroSitePreviewApp.directives", [])
        .directive("microSitePreviewView", [
            "$window", "$timeout", "$compile", "$q",function ($window, $timeout, $compile,$q) {

                return {
                    restrict: "E",
                    scope: {
                        siteModel: "="
                    },
                    templateUrl: "modules/microsite-preview-app/micrositepreviewview-directive.html",
                    link: function (scope, iElement, iAttr) {

                        window.slipInstance = null;
                        var renderTemplate = function (pageIndex, sectionIndex, deferred, tempEl) {
                            var templateDirective = "<div class='page'><" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + "></div>";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                            newScope.pageIndex = pageIndex;
                            newScope.sectionIndex = sectionIndex;
                            newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                            newScope.status = "preview";

                            $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName, (function ($compile, templateDirective, newScope, iElement, sectionIndex, deferred, tempEl) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    tempEl[sectionIndex] = el;
                                    deferred.resolve();
                                }
                            })($compile, templateDirective, newScope, iElement, sectionIndex, deferred, tempEl));

                            // var el = $compile(templateDirective)(newScope);
                            // iElement.append(el);
                        };
                        scope.$watchGroup(["siteModel.currentPageIndex"], function (nv, ov) {
                            if (nv === ov) {
                                return;
                            }
                            if (window.slipInstance) {
                                window.slipInstance.destroy();
                            }
                            iElement.empty();
                            if (!angular.isUndefined(scope.siteModel.pages[nv[0]])) {
                                var promises = [], tempEl = [];
                                angular.forEach(scope.siteModel.pages[nv[0]].sections, function (page, sectionIndex) {
                                    var deferred = $q.defer();
                                    renderTemplate(nv[0], sectionIndex, deferred, tempEl);
                                    promises.push(deferred.promise);

                                });
                                $q.all(promises).then(function () {
                                    tempEl.forEach(function (el) {
                                        iElement.append(el);
                                    });
                                })
                            }

                            window.slipInstance = Slip(iElement.parent()[0], "y").webapp(document.querySelectorAll('.page')).end(function () {
                                var page = this.page;
                                var lastTouch = this.lastTouch;
                                var firstTouch = this.firstTouch;
                                $timeout(function () {
                                    scope.$apply(function () {
                                        scope.siteModel.currentSectionIndex = page;
                                        //功能更新：滑到最后一屏，在向下滑屏时，自动切换至下一页 by xp 2015年10月28日 15:43:20
                                        if ((lastTouch)) {
                                            if ((!angular.isUndefined(scope.siteModel.pages[parseInt(scope.siteModel.currentPageIndex) + 1]))) {
                                                scope.siteModel.currentPageIndex++;
                                                scope.siteModel.currentSectionIndex = 0;
                                            } else {
                                                scope.siteModel.currentPageIndex = 0;
                                                scope.siteModel.currentSectionIndex = 0;
                                            }

                                        }
                                        if ((firstTouch)) {
                                            if ((!angular.isUndefined(scope.siteModel.pages[parseInt(scope.siteModel.currentPageIndex) - 1]))) {
                                                scope.siteModel.currentPageIndex--;
                                                scope.siteModel.currentSectionIndex = scope.siteModel.pages[scope.siteModel.currentPageIndex].sections.length - 1;
                                            } else {
                                                scope.siteModel.currentPageIndex = 2;
                                                scope.siteModel.currentSectionIndex = scope.siteModel.pages[scope.siteModel.currentPageIndex].sections.length - 1;
                                            }

                                        }
                                        scope.siteModel.isShowFooter = scope.siteModel.currentSectionIndex == scope.siteModel.pages[scope.siteModel.currentPageIndex].sections.length - 1;


                                    });
                                });
                            });

                        }, true);

                        //渲染模板指令
                        var promises2 = [], tempEl2 = [];
                        angular.forEach(scope.siteModel.pages[scope.siteModel.currentPageIndex].sections, function (section, sectionIndex) {
                            var deferred = $q.defer();
                            renderTemplate(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred, tempEl2);
                            promises2.push(deferred.promise);
                        });
                        $q.all(promises2).then(function () {
                            tempEl2.forEach(function (el) {
                                iElement.append(el);
                            });
                            window.slipInstance = Slip(iElement.parent()[0], "y").webapp(document.querySelectorAll('.page')).end(function () {
                                var page = this.page;
                                var lastTouch = this.lastTouch;
                                var firstTouch = this.firstTouch;
                                $timeout(function () {
                                    scope.$apply(function () {

                                        scope.siteModel.currentSectionIndex = page;
                                        //功能更新：滑到最后一屏，在向下滑屏时，自动切换至下一页 by xp 2015年10月28日 15:43:20
                                        if ((lastTouch)) {
                                            if ((!angular.isUndefined(scope.siteModel.pages[parseInt(scope.siteModel.currentPageIndex) + 1]))) {
                                                scope.siteModel.currentPageIndex++;
                                                scope.siteModel.currentSectionIndex = 0;
                                            } else {
                                                scope.siteModel.currentPageIndex = 0;
                                                scope.siteModel.currentSectionIndex = 0;
                                            }

                                        }
                                        if ((firstTouch)) {
                                            if ((!angular.isUndefined(scope.siteModel.pages[parseInt(scope.siteModel.currentPageIndex) - 1]))) {
                                                scope.siteModel.currentPageIndex--;
                                                scope.siteModel.currentSectionIndex = scope.siteModel.pages[scope.siteModel.currentPageIndex].sections.length - 1;
                                            } else {
                                                scope.siteModel.currentPageIndex = 2;
                                                scope.siteModel.currentSectionIndex = scope.siteModel.pages[scope.siteModel.currentPageIndex].sections.length - 1;
                                            }

                                        }
                                        scope.siteModel.isShowFooter = scope.siteModel.currentSectionIndex == scope.siteModel.pages[scope.siteModel.currentPageIndex].sections.length - 1;


                                    });
                                });
                            });



                        });

                    }
                };
            }
        ]);
});