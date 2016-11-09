"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["slip", "ionic", "islider.animate"], function () {
    angular.module("MicroActivityOldAndNewPreviewApp.directives", [])
        .directive("microActivityOldAndNewPreviewView", [
            "$window", "$timeout", "$compile", "$q", "$rootScope", function ($window, $timeout, $compile, $q, $rootScope) {

                return {
                    restrict: "E",
                    scope: {
                        siteModel: "=",
                        templateExtConfig: "=",
                        activityOtherConfig: "="

                    },
                    templateUrl: "modules/micro-activity-oldandnew-preview-app/microactivityoldandmewpreviewview-directive.html",
                    link: function (scope, iElement, iAttr) {
                        var list = [],tempEl=[];
                        //2016.4.22 是否滑屏，滑屏方向更据配置设置
                        scope.isHaveSlide = scope.templateExtConfig.isUsePagePlug;
                        if ($rootScope.$state.params.templateId == 5) {
                            scope.isVertical = false;
                        } else {
                            scope.isVertical = scope.templateExtConfig.pageDirectionIsVertical;
                        }

                        $window.slipInstance && $window.slipInstance.destroy();
                         var renderTemplate = function (pageIndex, sectionIndex, deferred,tempEl) {
                            var templateDirective = "<div class='page' style='width:" + $window["innerWidth"] + "px;height:100%'><" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + "></div>";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                            newScope.pageIndex = pageIndex;
                            newScope.sectionIndex = sectionIndex;
                            newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                            newScope.status = "preview";
                            newScope.activityOtherConfig = scope.activityOtherConfig;

                            $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName, (function ($compile, templateDirective, newScope, iElement, tempEl, deferred,sectionIndex) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    list[sectionIndex]={
                                        content: el[0]
                                    };                                   
                                    deferred.resolve();
                                }
                            })($compile, templateDirective, newScope, iElement, tempEl, deferred,sectionIndex));
                        };
                        //无滑动组件的dom
                        var renderTemplateByNoSlide = function (pageIndex, sectionIndex, deferred,tempEl) {
                            var templateDirective = "<div><" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + "></div>";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                            newScope.pageIndex = pageIndex;
                            newScope.sectionIndex = sectionIndex;
                            newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                            newScope.status = "preview";
                            newScope.templatExtConfig = angular.copy(scope.templateExtConfig);
                            newScope.activityOtherConfig = scope.activityOtherConfig;

                            $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName, (function ($compile, templateDirective, newScope, iElement, sectionIndex, deferred, tempEl) {
                                    return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    // iElement.append(el);
                                    tempEl[sectionIndex]=el;
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
                                    // scope.isHaveSlide = false;
                                    renderTemplateByNoSlide(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred,tempEl );
                                } else {
                                    iElement.parent().parent().css("z-index", "-1");
                                    renderTemplate(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred ,tempEl);
                                }
                                promises.push(deferred.promise);
                            });
                            return promises;
                        };

                        $q.all(scope.init()) .then(function () {
                            if(tempEl.length>0){
                                tempEl.forEach(function (el) {
                                    iElement.append(el);
                                });
                            }
                            //种草不使用翻页组件
                            if ($rootScope.$state.params.templateId == 13 || $rootScope.$state.params.templateId == 14 || $rootScope.$state.params.templateId == 18 || $rootScope.$state.params.templateId == 19 || scope.isHaveSlide == false) {
                                return;
                            }
                            //var isVertical = !($rootScope.$state.params.templateId == 5);
                            var sliderDom = '<div  id="iSlider-wrapper"></div>';
                            iElement.parent().parent().parent().prepend(sliderDom);
                            $window.slipInstance = new $window["iSlider"](iElement.parent().parent().parent().find("#iSlider-wrapper")[0], list, {
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
                            //修复键盘弹起遮挡输入框bug by 陈天宇 2016.10.27
                            keyBoardFix();
                                                    
                        });
      

                    }

                };
            }
        ]
        );
});