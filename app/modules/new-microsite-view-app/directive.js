"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["slip", "ionic"], function () {
    angular.module("NewMicroSiteViewApp.directives", [])
        .directive("newMicroSiteViewView", [
            "$window", "$timeout", "$compile","$q", function ($window, $timeout, $compile,$q) {

                return {
                    restrict: "E",
                    scope: {
                        siteModel: "="
                    },
                    templateUrl: "modules/new-microsite-view-app/new-micrositeview-directive.html",
                    link: function (scope, iElement, iAttr) {


                        var renderTemplate = function (moduleIndex, deferred, tempEl) {
                            var templateDirective = "<div ><" + scope.usableModules[moduleIndex].templateName + " id='" + scope.usableModules[moduleIndex].templateName + "'>" + "</" + scope.usableModules[moduleIndex].templateName + "></div>";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.usableModules[moduleIndex].templateModel;
                            newScope.sectionModel = scope.usableModules[moduleIndex];
                            newScope.notRenderEmpty = true;
                            newScope.status = "view";
                            newScope.style = scope.siteModel.style;//风格


                            $compile.loadBeforeCompile(scope.usableModules[moduleIndex].templateName, (function ($compile, templateDirective, newScope, iElement, moduleIndex, deferred, tempEl) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    tempEl[moduleIndex] = el;
                                    deferred.resolve();
                                    // iElement[moduleIndex]=el;
                                }
                            })($compile, templateDirective, newScope, iElement, moduleIndex, deferred, tempEl));


                            // var el = $compile(templateDirective)(newScope);
                            // iElement.append(el);
                        };



                        function init() {
                            scope.usableModules = scope.siteModel.modules.filter(function (data) {
                                return data.isDisabled == false;
                            });
                            //渲染模板指令
                            var promises = [], tempEl = [];
                            for (var i = 0; i < scope.usableModules.length; i++) {
                                var deferred = $q.defer();
                                renderTemplate(i, deferred, tempEl);
                                promises.push(deferred.promise);
                            }
                            $q.all(promises).then(function () {
                                tempEl.forEach(function (el) {
                                    iElement.append(el);
                                });

                            })
                        }
                        init();
                    }

                };
            }
        ]
        );
});