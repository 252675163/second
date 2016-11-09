/**
 * author :小潘
 * time: 2015年9月9日 16:52:26
 * description: 顶层模块，所有模块继承该模块，在此创建公用变量，注册公用方法, 挂载子模块
 */


define([
    "ionic",
    "txtinputevent",
    "qrCode",
    "remlib",
    "mobiscrolldatetime",
    // "modules/baseapp/templatestore",
    "modules/baseapp/controller",
    "ocLazyLoad",
    "routeState",
    "islider",
    "islider.animate",
    "es6-promise",
    "html2canvas",
    "slip",
    "cropper",
    "localResizeIMG4",
    //===========公共組件===================
    "components/audio/app",
    "components/combobox/app",
    "components/common/directive",
    "components/consult_item/app",
    "components/error_remind/app",
    "components/feedbackform/app",
    "components/footer/app",
    "components/is_shaked/app",
    "components/mask/app",
    "components/multi_textinput/app",
    "components/new_site_nav/app",
    "components/next_button/app",
    "components/prompt_bar/app",
    "components/scratch_card/app",
    "components/show_image_big/app",
    "components/site_form/app",
    "components/site_praise/app",
    "components/textinput/app",
    "components/textinput_callback/app",
    //新编辑框
    "components/textinput_new/app",
    "components/upload_img/app",
    "components/user_terms/app",
    "components/WebsiteUpload_img/app",
    "components/templates/new-micro-site-template/site-qr-cover/app",
    //微店图片上传组件
    "components/multi_image_upload/app",
    //微店分享组件
    "components/share_popup/app",
    //======公共service================
    "services/common-filter",
    "services/common-service",
    "services/permission",
    "services/verify-service",
    "services/net/active-form",
    "services/net/activity-add",
    "services/net/activity-audio",
    "services/net/activity-back",
    "services/net/activity-edit",
    "services/net/activity-index",
    "services/net/activity-new-activity",
    "services/net/activity-preview",
    "services/net/activity-statistics",
    "services/net/activity-template",
    "services/net/activity-view",
    "services/net/common",
    "services/net/consult",
    "services/net/consult-weekly-reports",
    "services/net/grass",
    "services/net/index",
    "services/net/new",
    "services/net/new-site-edit",
    "services/net/new-site-preview",
    "services/net/new-site-publish",
    "services/net/new-site-rank",
    "services/net/new-site-view",
    "services/net/registration-book",
    "services/net/site-add",
    "services/net/site-back",
    "services/net/site-index",
    "services/net/site-preview",
    "services/net/site-publish",
    "services/net/site-statistics",
    "services/net/site-template",
    "services/net/site-view",
    "services/net/templatesmodel",
    "services/net/user-center",
    "services/net/user-orderlist",
    "services/net/user-redeemcode-exchange",
    "services/net/user-signupremind",
    "services/net/vip-club",
    //微店、校宝钱包service
    "services/net/micro-shop-index",
    "services/net/micro-shop-management",
    "services/net/schoolpal-wallet",
    "services/net/micro-shop-koubei"
],
    function () {
        return angular.module("BaseApp", [
            "ionic",
            // "templateStore",
            "mobiscroll-datetime",
            "BaseApp.controllers",
            //懒加载组件
            "oc.lazyLoad",
            //公用通用指令
            "MyAudio",
            "Combobox",
            "Common.directive",
            "ConsultItem",
            "ErrorRemind",
            "FeedbackForm",
            "MyFooter",
            "IsShaked",
            "Mask",
            "MultiTextInput",
            "NewSiteNav",
            "NextButton",
            "PromptBar",
            "ScratchCard",
            "showImageBig",
            "SiteForm",
            "SitePraise",
            "TextInput",
            "TextInputCallback",
            "NewTextInput",
            "UploadImg",
            "UserTerms",
            "WebsiteUploadImg",
            "siteQrCove",
            "MultiImageUpload",
            "SharePopup",
            // 公共service
            "CommonFilter",
            "Services.common",
            "services.permission",
            "Services.formVerify",
            "services.net.activityForm",
            "services.net.activityAdd",
            "services.net.activityAudio",
            "services.net.activityBack",
            "services.net.activityEdit",
            "services.net.activityIndex",
            "services.net.activityNew",
            "services.net.activityPreview",
            "services.net.activityStatistics",
            "services.net.activityTemplate",
            "services.net.activityView",
            "services.net.common",
            "services.net.consult",
            "services.net.consultWeeklyReports",
            "services.net.grass",
            "services.net.index",
            "services.net.new",
            "services.net.newSiteEdit",
            "services.net.newSitePreview",
            "services.net.newSitePublish",
            "services.net.newSiteRank",
            "services.net.newSiteView",
            "services.net.registrationBook",
            "services.net.siteAdd", ,
            "services.net.siteBack",
            "services.net.siteIndex",
            "services.net.sitePreview",
            "services.net.sitePublish",
            "services.net.siteStatistics",
            "services.net.siteTemplate",
            "services.net.siteView",
            "services.net.templatesModel",
            "Services.net.userCenter",
            "services.net.userOrderList",
            "services.net.userRedeemCodeExchange",
            "Services.net.userSignupremind",
            "services.net.VIPclub",
            //微店、校宝钱包service
            "services.net.microShopIndex",
            "services.net.microShopManagement",
            "services.net.schoolpalWallet",
            "services.net.microShopKoubei"
        ])
            .config([
                "$urlRouterProvider", "$ionicConfigProvider", "$locationProvider", '$ocLazyLoadProvider',
                function ($urlRouterProvider, $ionicConfigProvider, $locationProvider, $ocLazyLoadProvider) {
                    // $urlRouterProvider.otherwise("/index");
                    $ionicConfigProvider.platform.android.tabs.style("bottom");
                    $ionicConfigProvider.platform.android.tabs.position("bottom");
                    ionic.Platform.isFullScreen = true;
                    $ionicConfigProvider.scrolling.jsScrolling(true);
                    //关闭ionic页面切换动画
                    $ionicConfigProvider.views.transition("none");
                    //是否可直接分享，直接分享
                    if (window.isAllowDirectShare) {
                        $locationProvider.html5Mode(true);
                    }
                    $ocLazyLoadProvider.config({
                        jsLoader: requirejs,
                        debug: window.dev
                    });
                }
            ])
            .run([
                "$rootScope", "$state", "$stateParams", "$ionicPlatform", '$ocLazyLoad', "$compile", "$browser",
                function ($rootScope, $state, $stateParams, $ionicPlatform, $ocLazyLoad, $compile, $browser) {
                    $rootScope.$state = $state;
                    //------------开始插入懒加载相关代码 -----------
                    //缓存angular的 $state.go方法
                    var func_go = $state.go;
                    /**
                     * 解析URL路径,判断是否有锚点,以便直接定位到某个页面
                     * TODO 是否有权限问题
                     */
                    var getUrlAnchor = function () {
                        var url = window.location.href,
                            state = "", prefixLength = 2;
                        var splitPosition = url.indexOf("#");
                        if (splitPosition < 0 && window.isAllowDirectShare && window.defaultBaseHref) {
                            splitPosition = url.indexOf(window.defaultBaseHref);
                            prefixLength = window.defaultBaseHref.length;
                        }
                        url = url.substring(splitPosition);
                        var paramPositon = url.indexOf("?");
                        if (splitPosition > 0) {
                            if (paramPositon > prefixLength) {
                                state = url.substring(prefixLength, paramPositon);
                            } else {
                                state = url.substring(prefixLength);
                            }
                        }
                        return state.replace(/\//g, ".");
                    };

                    //获取并返回url中的参数对象
                    var getUrlParams = function () {
                        var url = window.location.href;
                        var temp = url.split("#");
                        if (temp.length == 1) {
                            url = temp[0];
                        } else if (temp.length > 1) {
                            url = temp[1];
                        }
                        var i = url.indexOf("?");
                        if (i < 1) {
                            return {}
                        } else {
                            var param = url.substring(i + 1);
                            var paramArray = param.split("&");
                            var urlObject = {}
                            for (var i = 0; i < paramArray.length; i++) {
                                var urlItem = paramArray[i];
                                var item = urlItem.split("=");
                                urlObject[item[0]] = item[1];
                            }
                            return urlObject
                        }
                    };
                    /**
                     * 解析路由,如果有父路由,则将其父路由也解析出来,返回一个包含当前state所有父级state的数组
                     * 因为可能会出现形如A.B.C这样的state,子路由可能会强依赖父路由,因此需要同时把父路由加载
                     */
                    var getStatesByPath = function (state) {
                        var pointPosition = 0,
                            states = [];
                        do {
                            pointPosition = state.indexOf('.', pointPosition + 1);
                            if (pointPosition > -1) {
                                states.push(state.substring(0, pointPosition));
                            }
                        } while (state.indexOf('.', pointPosition + 1) > 0);
                        //记得把当前的state加进去
                        states.push(state);
                        return states;
                    };

                    /**
                     * 根据state和module,加载模块并跳转
                     */
                    var doLazyLoadAndGO = function (state, module, params, option) {
                        //解析路由
                        var states = getStatesByPath(state);
                        //TODO 模块的先后加载是否有问题还需要测试,经测试 没有问题
                        //根据state,去获取state对应的所有模块
                        var modules = $rootScope.routeState.getModuleByStates(states);
                        //根据模块,获取所有的依赖模块
                        var relyModules = $rootScope.routeState.getRelyModuleByModules(modules);

                        //加载所有模块,完成后执行跳转
                        //优先加载依赖模块
                        $ocLazyLoad.load(relyModules).then(function () {
                            //依赖模块加载完成后,加载当前模块
                            $ocLazyLoad.load(modules).then(function () {
                                func_go(state, params, option);
                            }, function (e) {
                                console.log(e);
                            });

                        }, function (e) {
                            console.log(e);
                        });
                    };

                    var preStateGo = function () {
                        var indexModule = "indexapp",
                            indexState = "/index",
                            routeState = $rootScope.routeState,
                            configIndexObj = routeState.indexModule,
                            anchorState = getUrlAnchor(),
                            params = getUrlParams();

                        //如果地址栏中有锚点,说明是直接跳转到某个页面,修改indexState变量
                        if (anchorState) {
                            indexState = anchorState;
                            indexModule = routeState.getModuleByState(indexState);
                        } else if (configIndexObj) {
                            indexModule = configIndexObj.moduleName ? configIndexObj.moduleName : indexModule;
                            indexState = configIndexObj.state ? configIndexObj.state : indexState;
                        }
                        //用oclazyload加载模块并跳转到state
                        doLazyLoadAndGO(indexState, indexModule, params);
                    }
                    //加載route-moduley映射
                    requirejs(['routeState'], function (routeState) {
                        $rootScope.routeState = routeState;
                        preStateGo(routeState);
                    });


                    //重写go方法
                    $state.go = function (state, params, option) {
                        var module = $rootScope.routeState.getModuleByState(state);
                        if (!module) {
                            console.log("模块跳转出错,出错的路由为" + state);
                            return;
                        }
                        doLazyLoadAndGO(state, module, params, option);
                        return;
                    }

                    $compile.loadBeforeCompile = function (directiveName, fun) {
                        var module = $rootScope.routeState.getDirectiveModuleByName(directiveName);
                        if (!module) {
                            fun();
                        } else {
                            $ocLazyLoad.load(module).then(function () {
                                fun();
                            }, function (e) {
                                console.log(e);
                            });
                        }
                    };
                    //------------懒加载相关代码 插入完成-----------

                    $rootScope.$stateParams = $stateParams;
                    $rootScope.$watch("$state.current.title", function () {
                        if (ionic.Platform.isIOS()) {
                            var $body = $("body");
                            // hack在微信等webview中无法修改document.title的情况
                            var $iframe = $("<iframe src=\"/favicon.ico\"></iframe>").on("load", function () {
                                setTimeout(function () {
                                    $iframe.off("load").remove();
                                }, 0);
                            }).appendTo($body);
                        }
                    });
                    $rootScope.$watch("$state.current.shareImage", function (newvalue, oldvalue) {
                        console.log(newvalue);
                        $("#wxShareImage").attr("src", newvalue);
                    });

                    //warning 由于新rem规则适配需要，暂时只开放给新微官网使用
                    $rootScope.$on("$stateChangeSuccess", function (event, toState) {
                        if (toState.name.indexOf("newsite") !== -1 || toState.name.indexOf("activity") !== -1) {
                            window.changeFontSizeNewMicoSite();
                        } else {
                            window.changefontSize();
                        }
                    });
                    //当通过浏览器回退/前进按钮跳转state时,重新加载页面,如果用系统state,则不会进入此方法
                    $browser.onUrlChange(function (url) {                       
                        preStateGo();
                    });
                    
                    $ionicPlatform.ready(function () {
                        //                        ionic.Platform.isFullScreen = true;
                        ionic.keyboard.disable();
                        //                        ionic.keyboard.isInitialized = true;
                    });
                }
            ])
            // 对请求中html文件 做非缓存处理
            // 全局HTTP处理
            .config([
                "$httpProvider",
                function ($httpProvider) {
                    $httpProvider.interceptors.push([
                        "$q", "$rootScope",
                        function ($q, $rootScope) {
                            return {
                                request: function (config) {
                                    //监控Angularjs get请求 如果请求地址含有html文件，则给其加版本戳，已防止缓存
                                    var urlArgs = "version=" + (new Date()).getTime();
                                    var baseUrl = "";
                                    if (typeof (requirejs) != "undefined") {
                                        urlArgs = requirejs.s.contexts._.config.urlArgs;
                                        baseUrl = requirejs.s.contexts._.config.baseUrl;

                                    }
                                    if (config.method == "GET") {
                                        if (config.url.indexOf(".html") !== -1 || config.url.indexOf(".htm") !== -1) {
                                            var separator = config.url.indexOf("?") === -1 ? "?" : "&";
                                            config.url = baseUrl + config.url + separator + urlArgs;
                                        }
                                    }
                                    return config;
                                },
                                responseError: function (response) {
                                    switch (response.status) {
                                        case 492:
                                            //提交数据发现机构异常先显示弹框再跳转 页面跳转则直接跳转
                                            if ($(".lockMask-loading2")[0].style.display == "none") {
                                                $("#csshardow2").show();
                                            } else {
                                                location.href = "/Home/ErpOrgUserStateRoute?p=userAccount?type=1";
                                            }
                                            break;
                                        case 493:
                                            //新用户注册 密码登录
                                            location.href = "/Home/LoginRoute?p=userLogin?userType=1";
                                            break;
                                        case 494:
                                            //老用户补密码
                                            location.href = "/Home/LoginRoute?p=userLogin?userType=0";
                                            break;
                                        case 495:
                                            //场景冻结
                                            location.href = "/common/TemplateFreeze";
                                            break;
                                        case 496:
                                            //场景删除
                                            location.href = "/common/TemplateError";
                                            break;
                                        case 497:
                                            //位置错误
                                            location.href = "/Common/Error?mark=base_app_497";
                                            break;
                                        case 498:
                                            //alert("会话超时，请重新登录");
                                            location.href = "/Common/Error?mark=base_app_498";
                                            break;
                                        case 499:
                                        case 500:
                                            location.href = "/Common/Error?mark=base_app_499Or500";
                                            break;
                                    }
                                    return $q.reject(response);
                                }
                            };
                        }
                    ]);
                }
            ]);
    }
);