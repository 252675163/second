"use strict";
/**
 * author :小潘
 * time: 2016年3月21日 20:25:30
 * description: 微活动前台预览（无鉴权）
 */


define(["slip", "ionic", "islider.animate"], function () {
    angular.module("MicroPreviewApp.directives", [])
        .directive("microPreview", [
            "$window", "$timeout", "$compile", "$q", "$rootScope", function ($window, $timeout, $compile, $q, $rootScope) {

                return {
                    restrict: "E",
                    scope: {
                        siteModel: "=",
                        templateExtConfig: "="
                    },
                    templateUrl: "modules/micro-preview-app/micro-preview-directive-app.html",
                    link: function (scope, iElement, iAttr) {
                        var list = [], tempEl = [];

                        //2016.4.22 是否滑屏，滑屏方向更据配置设置
                        scope.isHaveSlide = scope.templateExtConfig.isUsePagePlug;
                        if ($rootScope.$state.params.templateId == 5) {
                            scope.isVertical = false;
                        } else {
                            scope.isVertical = scope.templateExtConfig.pageDirectionIsVertical;
                        }

                        $window.slipInstance && $window.slipInstance.destroy();
                        var renderTemplate = function (pageIndex, sectionIndex, deferred, tempEl) {
                            var templateDirective = "<div class='page' style='width:" + $window["innerWidth"] + "px;height:100%'><" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + "></div>";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                            newScope.pageIndex = pageIndex;
                            newScope.sectionIndex = sectionIndex;
                            newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                            newScope.status = "preview";
                            //有无鉴权
                            newScope.isAuth = true;

                            $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName, (function ($compile, templateDirective, newScope, iElement, list, sectionIndex) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    list[sectionIndex] = {
                                        content: el[0]
                                    };
                                    deferred.resolve();
                                }
                            })($compile, templateDirective, newScope, iElement, list, sectionIndex));


                        };
                        //无滑动组件的dom
                        var renderTemplateByNoSlide = function (pageIndex, sectionIndex, deferred, tempEl) {
                            var templateDirective = "<div><" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + "></div>";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                            newScope.pageIndex = pageIndex;
                            newScope.sectionIndex = sectionIndex;
                            newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                            newScope.status = "preview";
                            newScope.templatExtConfig = angular.copy(scope.templateExtConfig);
                            newScope.activityOtherConfig = scope.activityOtherConfig;
                            newScope.isAuth = true;
                            $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName, (function ($compile, templateDirective, newScope, iElement, sectionIndex, deferred, tempEl) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    // iElement.append(el);
                                    tempEl[sectionIndex] = el;
                                    deferred.resolve();
                                }
                            })($compile, templateDirective, newScope, iElement, sectionIndex, deferred, tempEl));
                        };

                        //安卓输入框遮挡修复，兼容ios和android 2016年10月25日16:49:54  by 陈天宇
                        var keyBoardFix = function(){

                           var 
                               winH = $(window).height(),
                               $html = $("html"),
                               $body = $("body"),
                               $wrapDiv = $('.pane'),//最外层内容容器
                               $isliderWrap = $("#iSlider-wrapper"),//渲染模板容器

                               inputsOnFocus = function(){
                                    $html.css("height","100%");
                                    $body.css({"overflow":"visible","height":"100%"});
                                    $wrapDiv.height(winH);
                                },

                               inputsOnBlur = function(){
                                    $html.css("height","");
                                    $body.css({"overflow":"","height":""});
                                    $wrapDiv.css("height", "");
                                };

                           //事件代理，绑定后处理事件
                           $isliderWrap
                             .on("focus", "input[placeholder], textarea", inputsOnFocus)
                             .on("blur", "input[placeholder], textarea", inputsOnBlur);  
                        };

                        scope.init = function () {
                            var promises = [];
                            //渲染模板指令
                            angular.forEach(scope.siteModel.pages[scope.siteModel.currentPageIndex].sections, function (section, sectionIndex) {
                                //
                                var deferred = $q.defer();
                                if ($rootScope.$state.params.templateId == 13 || $rootScope.$state.params.templateId == 14 || $rootScope.$state.params.templateId == 18 || $rootScope.$state.params.templateId == 19 || scope.isHaveSlide == false) {
                                    scope.isHaveSlide = false;
                                    renderTemplateByNoSlide(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred, tempEl);
                                } else {
                                    iElement.parent().parent().css("z-index", "-1");
                                    renderTemplate(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred, tempEl);
                                }
                                promises.push(deferred.promise);
                                // $timeout(function () {
                                //     if (sectionIndex === scope.siteModel.pages[scope.siteModel.currentPageIndex].sections.length - 1) {
                                //         deferred.resolve();
                                //     }
                                // });
                            });
                            return promises;
                        };
                        
                        $q.all(scope.init()).then(function () {
                            if (tempEl && tempEl.length > 0) {
                                tempEl.forEach(function (el) {
                                    iElement.append(el);
                                });
                            }

                            //种草不使用翻页组件
                            if ($rootScope.$state.params.templateId == 13 || $rootScope.$state.params.templateId == 14 || $rootScope.$state.params.templateId == 18 || $rootScope.$state.params.templateId == 19 || scope.isHaveSlide == false) {
                                return;
                            }
                            //var isVertical = !($rootScope.$state.params.templateId == 5);
                            $window.slipInstance = new $window["iSlider"]($("#iSlider-wrapper")[0], list, {
                                //循环滚动  当屏数大于2屏时，开启循环滚动
                                isLooping: list.length > 2,
                                animateTime: 800,
                                animateType: ionic.Platform.isIOS() ? "rotate" : "",
                                //是否垂直翻页 判断templateid
                                isVertical: scope.isVertical,
                                onslidechanged: function (currentSection) {
                                    scope.$evalAsync(function () {
                                        scope.siteModel.currentSectionIndex = currentSection;
                                    });
                           
                                }
                            });
                            keyBoardFix();
                          

                        });

                    }

                };
            }
        ]
        );
});