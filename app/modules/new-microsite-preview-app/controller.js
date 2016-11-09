"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:18:48
 * description: 新微官网预览模块
 */

define(["ionic", "modules/new-microsite-preview-app/services", "services/net/common"],
    function () {
        return angular.module("NewMicroSitePreviewApp.controllers", ["NewMicroSitePreviewApp.services", "services.net.common", "MyFooter.Service","NewSiteNav.Service"])
            .controller("NewMicroSitePreviewAppController", [
                "$scope", "$window", "$rootScope", "newMicroSitePreviewAppService", "$ionicPopup", "$sce", "webSite", "commonNetService", "promptBarService", "uploadImgService", "permissionService", "myFooterService","maskService","newSiteNavService","singleThreadedNetService",
                function ($scope, $window, $rootScope, newMicroSitePreviewAppService, $ionicPopup, $sce, webSite, commonNetService, promptBarService, uploadImgService, permissionService, myFooterService,maskService,newSiteNavService,singleThreadedNetService) {


                    $scope.isOpen = true;
                    $scope.templateId = $scope.$state.params.templateId;
                    $scope.calMessage = "";



                    //根据首页的数据得到ShareConfig
                    function getShareConfigByCoverModel(){
                       var coverModel = $scope.siteModel.modules.filter(function(data){
                           return data.templateName=="site-cover"
                       });
                        var shareConfig = {};
                        if(coverModel[0]) {
                            shareConfig = {
                                imgUrl: coverModel[0].templateModel.imageUrl[0],
                                title: coverModel[0].templateModel.description[0],
                                desc: coverModel[0].templateModel.description[2]
                            }
                        }
                        return shareConfig;
                    }
                    //返回编辑页面
                    $scope.goToEdit = function () {

                        $rootScope.$state.go("newsite.edit", {
                            templateId: $scope.$stateParams.templateId,
                            websiteId: $scope.$stateParams.websiteId,
                            isNew: $scope.$stateParams.websiteId == "0" ? $scope.$stateParams.isNew : false
                        });

                    };
                    $scope.getTemplateClassByStyleId = function(styleId){
                        return "newSite_tem"+styleId;//每套风格需要统一的命名规则
                    };

                    //隐藏导航栏
                    $scope.hideNav = function(){
                        newSiteNavService.hideNav();
                    };


                    $scope.goShare = function(){
                        if(!newMicroSitePreviewAppService.vierifyNewsiteModulesFunction($scope.usableModules)){
                            $scope.siteModel.isEditDone = false;
                            var confirmPopup = $ionicPopup.confirm({
                                template: "您尚未完成编辑，是否继续分享?",
                                cancelText: "返回",
                                okText: "继续分享"
                            });
                            confirmPopup.then(function(res) {
                                if (res) {
                                    $scope.changeShareTitle();
                                }else{
                                    return ;
                                }
                            });
                        }else{
                            $scope.siteModel.isEditDone = true;
                            $scope.changeShareTitle();
                        }
                    };

                    //自定义分享title  点击分享按钮
                    $scope.changeShareTitle = function () {

                        $scope.isShowShareTitlePop = true;
                        //分享弹窗的配置项
                        $scope.showShareTitlePopConfig = {
                            isShowButton: [true, true, false],
                            isShowGuideText: true
                        };
                        //2016.1.19修改分享逻辑 ，title如果用户未填写，则置空   摘要：默认读取用户编辑时填写的机构标语，如果用户未填写，则置空  小图：默认读取用户编辑时上传的logo，如果用户未上传，则显示校宝秀默认logo
                        var defaultShareModel = newMicroSitePreviewAppService.getDefaultShareModel($scope.$stateParams.templateId, $scope.siteModel.style);
                        var shareConfigByCover = getShareConfigByCoverModel();
                        $scope.shareConfig = {};
                        $scope.showShareTitlePopModel = {
                            shareTitle: shareConfigByCover.title,
                            saveShareTitleFunction: $scope.saveShareTitleFunction,
                            imageUrl: shareConfigByCover.imgUrl || defaultShareModel.imgUrl,
                            desc: shareConfigByCover.desc
                        };
                        //if ($scope.shareConfigCache) {
                        //    $scope.shareConfig = JSON.parse($scope.shareConfigCache);
                        //} else {
                        //   // $scope.shareConfig = newMicroSitePreviewAppService.getDefaultShareModel($scope.$stateParams.templateId,$scope.siteModel.style);
                        //    $scope.shareConfig = {};
                        //}
                        ////增加默认分享链接地址
                        //var defaultShareModel = newMicroSitePreviewAppService.getDefaultShareModel($scope.$stateParams.templateId,$scope.siteModel.style);
                        //var shareConfigByCover = getShareConfigByCoverModel();
                        //$scope.showShareTitlePopModel = {
                        //    shareTitle: $scope.shareConfig.title || shareConfigByCover.title||defaultShareModel.title,
                        //    saveShareTitleFunction: $scope.saveShareTitleFunction,
                        //    imageUrl: $scope.shareConfig.imgUrl ||shareConfigByCover.imgUrl|| defaultShareModel.imgUrl,
                        //    desc: $scope.shareConfig.desc || shareConfigByCover.desc||defaultShareModel.desc
                        //};

                    };

                    $scope.saveShareTitleFunction = function (type) {
                        //type："goIndex" 、 "goShare","goPublish"
                        if (!$scope.showShareTitlePopModel.shareTitle) {
                            promptBarService.showErrorBar("分享标题不能为空哦~！", 3000);

                            return false;
                        } else if ($scope.showShareTitlePopModel.shareTitle.length > 40) {
                            promptBarService.showErrorBar("分享标题不能多于40个字哦~！", 3000);
                            return false;
                        }

                        $scope.shareConfig.title = $scope.showShareTitlePopModel.shareTitle;
                        $scope.shareConfig.desc = $scope.showShareTitlePopModel.desc;
                        $scope.shareConfig.imgUrl = $scope.showShareTitlePopModel.imageUrl;
                        $scope.finish(type);

                    };
                    //关闭自定义分享title的标题
                    $scope.colseShareTitlePop = function () {
                        $scope.isShowShareTitlePop = false;
                    };


                    $scope.updateShareConfig = function (id, shareConfig, type) {
                        //更新自定义分享标题
                        newMicroSitePreviewAppService.updateShareConfig(id, angular.toJson(shareConfig)).then(function (res) {
                            if (res.data.status == 1) {
                                $scope.isShowShareTitlePop = false;
                                var myTime;
                                //将当前页面的title改成自定义之后的title
                                $scope.$state.current.title = shareConfig.title;

                                if (type == "goIndex") {
                                    //  到首页
                                    //2015.11.16 成功弹窗修改 by yinglechao
                                    maskService.showMask(["保存成功！", "正在为您跳转到我的场景"], 3000, false, 5).then(function () {
                                        $rootScope.$state.go("index", {}, { inherit: false});
                                    });

                                } else if (type == "goShare") {
                                    commonNetService.saveBackLog({
                                        OriginId: $scope.$stateParams.websiteId,
                                        Type: "webSite",
                                        Operation: "Share"
                                    });
                                    maskService.showMask("",0,false,4);
                                    //微信自定义分享
                                    commonNetService.setShareMessage(shareConfig).then(function () {
                                        $scope.shareConfigCache = angular.toJson(shareConfig);
                                        maskService.hideMask();
                                    });
                                }else if(type == "goPublish"){
                                    //跳转到同步页面
                                    //maskService.showMask(["保存成功！", "正在为您跳转到同步页面"], 3000, false, 5).then(function () {
                                        $rootScope.$state.go("newsite.publish", {
                                            templateId: $scope.$stateParams.templateId,
                                            userId: $scope.userId,
                                            websiteId: $scope.$stateParams.websiteId
                                        }, {inherit: false});
                                    //});
                                }
                            } else {
                                if (res.data.error == 1) {
                                    promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);
                                }
                            }
                        }, null);
                    };

                    //完成流程，检验敏感词
                    $scope.finish = singleThreadedNetService(function (type) {
                        //type："goIndex" 、 "goShare","goPublish"
                        //微官网数据非空校验

                        $scope.countdown = 3;
                        $scope.siteModel.currentSectionIndex = 0;
                        //preview新建数据
                        var data = newMicroSitePreviewAppService.uiModelToBizModel($scope.siteModel, $scope.$stateParams.templateId, $scope.$stateParams.websiteId, $scope.userId, $scope.schoolPalOrgUserId);
                        if (!$scope.$stateParams.websiteId) {

                            return newMicroSitePreviewAppService.Save(data).success(function (result) {
                                if (result.status == 1) {
                                    //正常保存
                                    $scope.$stateParams.websiteId = result.data.Id;
                                    $scope.userId = result.data.UserId;
                                    $scope.schoolPalOrgUserId = result.data.SchoolPalOrgUserId;

                                    //此处为新微官网的shareConfig.link
                                    $scope.shareConfig.link = window.shareServer + "/Home/ShareRoute?p=newsite/view?id=" + $scope.$stateParams.websiteId;
                                    $scope.updateShareConfig(result.data.Id, $scope.shareConfig, type);

                                } else {
                                    $scope.isShowShareTitlePop = false;
                                    if (result.error == 1) {
                                        promptBarService.showErrorBar("存在敏感词！请重新编辑", 3000);

                                    } else {
                                        $scope.isPublish = true;
                                        $scope.isPublishFail = true;
                                        $scope.calMessage = result.message;
                                        var myTime = setInterval(function () {
                                            $scope.countdown--;
                                            if ($scope.countdown == 0) {
                                                clearInterval(myTime);
                                                $rootScope.$state.go("newsite.edit", {
                                                    templateId: $scope.$stateParams.templateId,
                                                    websiteId: $scope.$stateParams.websiteId,
                                                }, {
                                                    reload: true,
                                                    inherit: false
                                                });
                                            }
                                        }, 1000);
                                    }
                                }
                            })
                                .then(function () {
                                    commonNetService.saveBackLog({
                                        OriginId: $scope.$stateParams.websiteId,
                                        Type: "webSite",
                                        Operation: "Save"
                                    });
                                });
                        } else {
                            return newMicroSitePreviewAppService.Save(data).success(function (result) {
                                if (result == "<input type='hidden' id='ErrorCode' value='497' />") {
                                    window.location.href = "/Common/error?mark=NewMicroSitePreviewAppController_finish_Save_result_Equal_497";
                                    return;
                                }
                                if (result.status == 1) {
                                    //正常保存
                                    $scope.$stateParams.websiteId = result.data.Id;
                                    $scope.userId = result.data.UserId;
                                    //此处为新微官网的shareConfig.link
                                    $scope.shareConfig.link = window.shareServer + "/Home/ShareRoute?p=newsite/view?id=" + $scope.$stateParams.websiteId;
                                    $scope.updateShareConfig(result.data.Id, $scope.shareConfig, type);

                                } else {
                                    $scope.isShowShareTitlePop = false;
                                    if (result.error == 1) {
                                        promptBarService.showErrorBar("存在敏感词！请重新编辑", 3000);

                                    } else {
                                        $scope.isPublish = true;
                                        $scope.isPublishFail = true;
                                        $scope.calMessage = result.message;
                                        var myTime = setInterval(function () {
                                            $scope.countdown--;
                                            if ($scope.countdown == 0) {
                                                clearInterval(myTime);
                                                $rootScope.$state.go("newsite.edit", {
                                                    templateId: $scope.$stateParams.templateId,
                                                    websiteId: $scope.$stateParams.websiteId
                                                }, {
                                                    reload: true,
                                                    inherit: false
                                                });
                                            }
                                        }, 1000);
                                    }
                                }
                            })
                                .then(function () {
                                    commonNetService.saveBackLog({
                                        OriginId: $scope.$stateParams.websiteId,
                                        Type: "webSite",
                                        Operation: "Save"
                                    });
                                });
                        }


                    });


                    var init = function () {


                        if (angular.isUndefined($scope.siteModel)) {
                            if (webSite == "") {
                                // 报错页面，非法进入页面
                                window.location.href = "/Common/error?mark=NewMicroSitePreviewAppController_init_webSite_IsNullOrEmpay";
                            } else {
                                if (webSite.Config == "" || webSite.Config == null) {
                                    $scope.siteModel = newMicroSitePreviewAppService.makeNewModel(1);
                                } else {
                                    $scope.siteModel = JSON.parse(webSite.Config);
                                }
                            }
                        }
                        $scope.footer = webSite.Footer && webSite.Footer.replace(/href\s*?=\s*?[\"'](.*?)[\"']/g, "href='javascript:void(0);'");
                        myFooterService.setFooter($scope.footer);
                        //userId
                        $scope.userId = webSite.UserId || 0;
                        $scope.schoolPalOrgUserId = webSite.SchoolPalOrgUserId || 0;

                        $scope.shareConfigCache = webSite.ShareConfig;
                        $scope.lastModifiedDate = webSite.CreatedAt == "/Date(-62135596800000)/" ? (new Date()).toJSON() : webSite.CreatedAt;

                        //页面title可自定义
                        if ($scope.shareConfigCache) {
                            $scope.$state.current.title = angular.fromJson($scope.shareConfigCache).title||newMicroSitePreviewAppService.getDefaultShareModel($scope.$state.params.templateId,$scope.siteModel.style).title;
                        }else{
                            $scope.$state.current.title = newMicroSitePreviewAppService.getDefaultShareModel($scope.$state.params.templateId,$scope.siteModel.style).title;
                        }

                        //从编辑 浏览器的返回需要清数据
                        if($scope.$stateParams.isNew=="true"){
                            $scope.notRenderEmpty = false;//渲染出默认数据
                            $scope.siteModel.modules.forEach(function(data){
                                data.templateModel ={};
                            });
                            //$scope.$stateParams.isNew = false;
                        }else{
                            $scope.notRenderEmpty = true;//渲染出默认数据
                        }

                        //编辑可用的模块
                        $scope.usableModules = $scope.siteModel.modules.filter(function (data) {
                            return (data.isDisabled == false) && (data.isHideInEdit == false);
                        });
                        $scope.templateStyleClass = $scope.getTemplateClassByStyleId($scope.siteModel.style);


                        //hack安卓手机不隐藏菜单栏问题，再次隐藏微信菜单栏 by xp
                        if (ionic.Platform.isAndroid()) {
                            window.wx && window.wx.hideOptionMenu();
                        }
                    };

                    init();


                    $scope.$on("$stateChangeStart", function (event, toState) {
                        //离开当前页面的时候隐藏遮罩 by xp 2016年1月4日 17:14:05
                        maskService.hideMask();
                        if (toState.name.indexOf("newsite") !== -1) {
                            //是新建的并且没有保存过
                            //event.targetScope.isNew = $scope.isNew&&($scope.$stateParams.websiteId=="0"||!$scope.$stateParams.websiteId)?true:false;
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                        }
                    });


                    //更改share image
                    $scope.config = {
                        aspectRatio: 1 / 1,
                        autoCropArea: 0.7,
                        strict: true,
                        guides: false,
                        center: true,
                        highlight: false,
                        dragCrop: false,
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        zoom: -0.2,
                        checkImageOrigin: true,
                        background: false,
                        //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                        minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                        minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300
                    };
                    $scope.changeShareImage = function (imgIndex) {
                        $scope.imgIndex = imgIndex;
                        uploadImgService.upLoadImg($scope.config, 1, $scope.upLoadFinish);
                    };
                    $scope.upLoadFinish = function (url) {
                        $scope.showShareTitlePopModel.imageUrl = url;
                        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                            $scope.$apply();
                        }
                    }
                }
            ]);
    });