"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["slip", "ionic", "islider.animate"], function () {
    angular.module("MicroActivityOldAndNewViewApp.directives", [])
        .directive("microActivityOldAndNewViewView", [
            "$window", "$timeout", "$compile", "$q", function ($window, $timeout, $compile, $q) {

                return {
                    restrict: "E",
                    scope: {
                        siteModel: "=",
                        activityTemplateId: "=",
                        templateExtConfig: "=",
                        templateCode: "=",
                        //新增活动是否已截止 传递至template层    2015年12月8日 15:19:10 xp
                        isEnd: "=",
                        //是否使用微信的分享
                        isUseWeinxinShare: "=",
                        defaultCurrentIndex: "=",
                        activityOtherConfig: "="
                    },
                    templateUrl: "modules/micro-activity-oldandnew-view-app/microactivityoldandnewviewview-directive.html",
                    link: function (scope, iElement, iAttr) {

                        $window.slipInstance && $window.slipInstance.destroy();
                        var list = [], tempEl = [], forceInsertEl = [];

                        //2016.4.22 是否滑屏，滑屏方向更据配置设置
                        scope.isHaveSlide = scope.templateExtConfig.isUsePagePlug;
                        if (scope.activityTemplateId == 5) {
                            scope.isVertical = false;
                        } else {
                            scope.isVertical = scope.templateExtConfig.pageDirectionIsVertical;
                        }

                        var renderTemplate = function (pageIndex, sectionIndex, deferred) {
                            var templateDirective = "<div class='page' style='width:" + $window["innerWidth"] + "px;height:100%'><" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + "></div>";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                            newScope.pageIndex = pageIndex;
                            newScope.sectionIndex = sectionIndex;
                            newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                            newScope.status = "view";
                            newScope.isEnd = scope.isEnd || false;
                            newScope.isUseWeinxinShare = scope.isUseWeinxinShare;
                            newScope.templatExtConfig = angular.copy(scope.templateExtConfig);
                            newScope.activityOtherConfig = scope.activityOtherConfig;

                            $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName, (function ($compile, templateDirective, newScope, iElement, scope, list, sectionIndex, deferred) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    if (scope.siteModel.pages[pageIndex].sections[sectionIndex].isHideInView !== true) {
                                        list[sectionIndex] = {
                                            content: el[0]
                                        };
                                        // deferred.resolve();
                                    };
                                    deferred.resolve();
                                }
                            })($compile, templateDirective, newScope, iElement, scope, list, sectionIndex, deferred));


                            // var el = $compile(templateDirective)(newScope);
                            // if ( scope.siteModel.pages[pageIndex].sections[sectionIndex].isHideInView!==true) {
                            //     list.push({
                            //         content: el[0]
                            //     });
                            // };

                            //                                iElement.append(el);
                        };
                        //无滑动组件的dom
                        var renderTemplateByNoSlide = function (pageIndex, sectionIndex, deferred, tempEl) {

                            var templateDirective = "<div class='page' style='width:" + $window["innerWidth"] + "px;height:100%'><" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + ">" + "</" + scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName + "></div>";
                            var newScope = scope.$new();
                            newScope.templateModel = scope.siteModel.pages[pageIndex].sections[sectionIndex].templateModel;
                            newScope.pageIndex = pageIndex;
                            newScope.sectionIndex = sectionIndex;
                            newScope.sectionModel = scope.siteModel.pages[pageIndex].sections[sectionIndex];
                            newScope.status = "view";
                            newScope.isEnd = scope.isEnd || false;
                            newScope.isUseWeinxinShare = scope.isUseWeinxinShare;
                            newScope.activityOtherConfig = scope.activityOtherConfig;

                            $compile.loadBeforeCompile(scope.siteModel.pages[pageIndex].sections[sectionIndex].templateName, (function ($compile, templateDirective, newScope, iElement, sectionIndex, tempEl, deferred) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    tempEl[sectionIndex] = el;
                                    deferred.resolve();
                                    // iElement.append(el);
                                }
                            })($compile, templateDirective, newScope, iElement, sectionIndex, tempEl, deferred));

                            // var el = $compile(templateDirective)(newScope);

                            // iElement.append(el);
                        };

                        //warning 强制插入新种草排行榜数据结构 by xp 2015年12月5日 17:04:17
                        var addNewGrassRankTemplate = function (sectionIndex, deferred, forceInsertEl) {
                            var templateDirective = "<div class='page' style='width:" + $window["innerWidth"] + "px;height:100%'><template13by5 >" + "</ template13by5 ></div>";
                            var newScope = scope.$new();
                            newScope.status = "view";

                            $compile.loadBeforeCompile("template13by5", (function ($compile, templateDirective, newScope, iElement, sectionIndex, deferred, forceInsertEl) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    forceInsertEl[sectionIndex] = el;
                                    deferred.resolve();
                                }
                            })($compile, templateDirective, newScope, iElement, sectionIndex, deferred, forceInsertEl));

                            // var el = $compile(templateDirective)(newScope);

                            // iElement.append(el);
                        };

                        //warning 强制插入圣诞种树排行榜数据结构 by xp 2015年12月10日 22:08:30
                        var addNewGrassRankTemplate2 = function (sectionIndex, deferred, forceInsertEl) {

                            var templateDirective = "<div class='page' style='width:" + $window["innerWidth"] + "px;height:100%'><template14by5 >" + "</ template14by5 ></div>";
                            var newScope = scope.$new();
                            newScope.status = "view";
                            $compile.loadBeforeCompile("template14by5", (function ($compile, templateDirective, newScope, iElement, sectionIndex, deferred, forceInsertEl) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    forceInsertEl[sectionIndex] = el;
                                    deferred.resolve();
                                }
                            })($compile, templateDirective, newScope, iElement, sectionIndex, deferred, forceInsertEl));
                            // var el = $compile(templateDirective)(newScope);

                            // iElement.append(el);
                        };
                        //warning 强制插入圣诞种树排行榜数据结构 by yinglechao 2016年2月29日  todo 优化
                        var addNewGrassRankTemplate3 = function (sectionIndex, deferred, forceInsertEl) {

                            var templateDirective = "<div class='page' style='width:" + $window["innerWidth"] + "px;height:100%'><template19by5 >" + "</ template19by5 ></div>";
                            var newScope = scope.$new();
                            newScope.status = "view";

                            $compile.loadBeforeCompile("template19by5", (function ($compile, templateDirective, newScope, iElement, sectionIndex, deferred, forceInsertEl) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    forceInsertEl[sectionIndex] = el;
                                    deferred.resolve();
                                }
                            })($compile, templateDirective, newScope, iElement, sectionIndex, deferred, forceInsertEl));
                            // var el = $compile(templateDirective)(newScope);

                            // iElement.append(el);
                        };
                        //warning 强制插入水族馆排行榜数据结构 by yinglechao 2016年5月21日  todo 优化
                        var addNewGrassRankTemplate4 = function (sectionIndex, deferred, forceInsertEl) {

                            var templateDirective = "<div class='page' style='width:" + $window["innerWidth"] + "px;height:100%'><template23by5 >" + "</ template23by5 ></div>";
                            var newScope = scope.$new();
                            newScope.status = "view";
                            $compile.loadBeforeCompile("template23by5", (function ($compile, templateDirective, newScope, iElement, sectionIndex, deferred, forceInsertEl) {
                                return function () {
                                    var el = $compile(templateDirective)(newScope);
                                    forceInsertEl[sectionIndex] = el;
                                    deferred.resolve();
                                }
                            })($compile, templateDirective, newScope, iElement, sectionIndex, deferred, forceInsertEl));
                            // var el = $compile(templateDirective)(newScope);

                            // iElement.append(el);
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
                            //显示的section索引值列表 todo 2016.5.24 
                            scope.sectionIndexListForShow = [];
                            //渲染模板指令
                            angular.forEach(scope.siteModel.pages[scope.siteModel.currentPageIndex].sections, function (section, sectionIndex) {
                                //todo 
                                var deferred = $q.defer();
                                if (section.isHideInView !== true) {
                                    scope.sectionIndexListForShow.push(sectionIndex);
                                };
                                if (scope.activityTemplateId == 13) {
                                    renderTemplateByNoSlide(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred, tempEl);
                                    //warning 增加排行榜数据结构，强制插入在template1或者2之后
                                    //当前索引值为0，,并且第二模板名称不为template13by2 则插入
                                    if (!sectionIndex && scope.siteModel.pages[scope.siteModel.currentPageIndex].sections[sectionIndex + 1].templateName != "template13by2") {
                                        addNewGrassRankTemplate(sectionIndex + 1, deferred, forceInsertEl);
                                    }
                                    //当前索引值为1，,并且当前模板名称为template13by2 则插入
                                    if (sectionIndex == 1 && scope.siteModel.pages[scope.siteModel.currentPageIndex].sections[sectionIndex].templateName == "template13by2") {
                                        addNewGrassRankTemplate(sectionIndex + 1, deferred, forceInsertEl);
                                    }
                                } else if (scope.activityTemplateId == 14) {
                                    renderTemplateByNoSlide(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred, tempEl);
                                    //warning 增加排行榜数据结构，强制插入在template1或者2之后
                                    //当前索引值为0，,并且第二模板名称不为template14by2 则插入
                                    if (!sectionIndex && scope.siteModel.pages[scope.siteModel.currentPageIndex].sections[sectionIndex + 1].templateName != "template14by2") {
                                        addNewGrassRankTemplate2(sectionIndex + 1, deferred, forceInsertEl);
                                    }
                                    //当前索引值为1，,并且当前模板名称为template14by2 则插入
                                    if (sectionIndex == 1 && scope.siteModel.pages[scope.siteModel.currentPageIndex].sections[sectionIndex].templateName == "template14by2") {
                                        addNewGrassRankTemplate2(sectionIndex + 1, deferred, forceInsertEl);
                                    }
                                } else if (scope.activityTemplateId == 19) {
                                    renderTemplateByNoSlide(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred, tempEl);
                                    //warning 增加排行榜数据结构，强制插入在template1或者2之后
                                    //当前索引值为0，,并且第二模板名称不为template14by2 则插入
                                    if (!sectionIndex && scope.siteModel.pages[scope.siteModel.currentPageIndex].sections[sectionIndex + 1].templateName != "template19by2") {
                                        addNewGrassRankTemplate3(sectionIndex + 1, deferred, temforceInsertElpEl);
                                    }
                                    //当前索引值为1，,并且当前模板名称为template14by2 则插入
                                    if (sectionIndex == 1 && scope.siteModel.pages[scope.siteModel.currentPageIndex].sections[sectionIndex].templateName == "template19by2") {
                                        addNewGrassRankTemplate3(sectionIndex + 1, deferred, forceInsertEl);
                                    }
                                } else if (scope.templateCode == "Aquarium") {
                                    renderTemplateByNoSlide(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred, tempEl);
                                    //warning 增加排行榜数据结构，强制插入在template1或者2之后
                                    //当前索引值为0，,并且第二模板名称不为template14by2 则插入
                                    if (!sectionIndex && scope.siteModel.pages[scope.siteModel.currentPageIndex].sections[sectionIndex + 1].templateName != "template23by2") {
                                        addNewGrassRankTemplate4(sectionIndex + 1, deferred, forceInsertEl);
                                    }
                                    //当前索引值为1，,并且当前模板名称为template14by2 则插入
                                    if (sectionIndex == 1 && scope.siteModel.pages[scope.siteModel.currentPageIndex].sections[sectionIndex].templateName == "template23by2") {
                                        addNewGrassRankTemplate4(sectionIndex + 1, deferred, forceInsertEl);
                                    }
                                } else if (scope.activityTemplateId == 18 || scope.isHaveSlide == false) {
                                    renderTemplateByNoSlide(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred, tempEl);
                                } else {
                                    iElement.parent().parent().css("z-index", "-1");
                                    renderTemplate(scope.siteModel.currentPageIndex, angular.copy(sectionIndex), deferred);
                                }
                                // $timeout(function () {
                                //     if (sectionIndex === scope.siteModel.pages[scope.siteModel.currentPageIndex].sections.length - 1) {
                                //         deferred.resolve();
                                //     }
                                // });
                                promises.push(deferred.promise);
                            });
                            return promises;
                        };
                        var concatTempAndForceEl = function () {
                            var index = -2, el, tmpEl_head=[], tmpEl_end=[];
                            if (forceInsertEl && forceInsertEl.length > 0) {
                                forceInsertEl.forEach(function (element, position) {
                                    if (element) {
                                        el = element;
                                        index = position;
                                    }
                                });
                                if (index > 0) {
                                    tmpEl_head = tempEl.slice(0, index);
                                    tmpEl_end = tempEl.slice(index);
                                    tmpEl_head.push(el);
                                    tempEl=tmpEl_head.concat(tmpEl_end);
                                }                           

                            }
                            return tempEl;
                        };

                        $q.all(scope.init()).then(function () {
                            tempEl = concatTempAndForceEl();
                            if (tempEl && tempEl.length > 0) {
                                tempEl.forEach(function (el) {
                                    iElement.append(el);
                                });
                            }

                            //种草和圣诞活动不使用翻页组件 
                            if (scope.activityTemplateId == 13 || scope.activityTemplateId == 14 || scope.activityTemplateId == 18 || scope.activityTemplateId == 19 || scope.isHaveSlide == false) {
                                return;
                            }
                            // 判断defaultCurrentIndex是否超出最大值
                            if (0 < scope.defaultCurrentIndex && scope.defaultCurrentIndex <= scope.sectionIndexListForShow.length) {
                                scope.siteModel.currentSectionIndex = scope.sectionIndexListForShow[scope.defaultCurrentIndex];
                            } else {
                                scope.defaultCurrentIndex = 0;
                                scope.siteModel.currentSectionIndex = scope.sectionIndexListForShow[scope.defaultCurrentIndex];
                            }
                            //var isVertical = !(scope.activityTemplateId == 5);
                            $window.slipInstance = new $window["iSlider"]($("#iSlider-wrapper")[0], list, {
                                //循环滚动  当屏数大于2屏时，开启循环滚动
                                isLooping: list.length > 2,
                                animateTime: 800,
                                animateType: ionic.Platform.isIOS() && scope.defaultCurrentIndex == 0 ? "rotate" : "",
                                //是否垂直翻页
                                isVertical: scope.isVertical,
                                //initIndex: scope.defaultCurrentIndex,
                                onslidechanged: function (currentSection) {
                                    scope.$evalAsync(function () {
                                        scope.siteModel.currentSectionIndex = scope.sectionIndexListForShow[currentSection];
                                    });

                                  

                                }
                            });
                            if (scope.defaultCurrentIndex) {
                                $window.slipInstance.slideTo(scope.defaultCurrentIndex);


                            }
                            keyBoardFix();


                  

                        });
                        //                            $window.slipInstance = Slip(iElement.parent()[0], "x").webapp(iElement.children()).end(function () {
                        //                                scope.siteModel.currentSectionIndex = this.page;
                        //                                scope.siteModel.isShowFooter = scope.siteModel.currentSectionIndex == scope.siteModel.pages[scope.siteModel.currentPageIndex].sections.length - 1;
                        //                                scope.$apply();
                        //                            });


                    }

                };
            }
        ]
        );
});