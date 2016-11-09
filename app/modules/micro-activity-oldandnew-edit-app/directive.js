"use strict";
/**
 * author :小潘
 * time: 2015年9月14日 14:52:15
 * description:
 */


define(["ionic"], function () {
    angular.module("MicroActivityOldAndNewEditApp.directives", [])
        .directive("oldAndNewEditView", [
                "$window", "$timeout", "$compile", function ($window, $timeout, $compile) {

                    return {
                        restrict: "E",
                        scope: {
                            siteModel: "=",
                            isActived: "=",
                            templateExtConfig: "=",
                            activityOtherConfig:"="
                        },
                        templateUrl: "modules/micro-activity-oldandnew-edit-app/micro-activity-oldandnew-edit-app-directive.html",
                        link: function (scope, iElement, iAttr) {

                            //hack 安卓上键盘缩起后，界面卡住问题
//                            (function () {
//
//                                var initHeight = window.innerHeight;
//                                var initWidth = window.innerWidth;
//
//                                $(window).off("resize").on("resize", function () {
//                                    setTimeout(function () {
//
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

                            var renderTemplate = function (pageIndex, sectionIndex) {
                                var templateDirective = "<" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">";
                                var newScope = scope.$new();
                                newScope.templateModel =scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                                newScope.pageIndex = pageIndex;
                                newScope.sectionIndex = sectionIndex;
                                newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                                newScope.status = "edit";
                                newScope.isActived = scope.isActived;
                                newScope.templatExtConfig = angular.copy(scope.templateExtConfig);
                                newScope.activityOtherConfig = scope.activityOtherConfig;


                                 $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName,(function( $compile,templateDirective,newScope,iElement){
                                  return function(){
                                    var el = $compile(templateDirective)(newScope);
                                    iElement.append(el);
                                  }                                  
                             })($compile,templateDirective,newScope,iElement));

                                // var el = $compile(templateDirective)(newScope);
                                // iElement.append(el);
                            };
                            scope.$watchGroup(['siteModel.currentPageIndex', 'siteModel.currentSectionIndex', 'siteModel.templateRender'], function (nv, ov) {
                                if (nv === ov) {
                                    return;
                                }
                                iElement.empty();
                                
                                if (scope.siteModel&&!angular.isUndefined(scope.siteModel.pages[nv[0]])) {
                                    if (!angular.isUndefined(scope.siteModel.pages[nv[0]].sections[nv[1]])) {
                                        renderTemplate(nv[0], nv[1]);
                                    }
                                }

                            }, true);

                            //渲染模板指令
                            renderTemplate(scope.siteModel.currentPageIndex, scope.siteModel.currentSectionIndex);

                        }

                    };
                }
        ]
        );
});