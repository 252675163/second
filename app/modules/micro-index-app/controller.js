"use strict";
/**
 * author :小潘
 * time: 2015年11月5日 16:43:50
 * description:校宝秀首页
 */


define(["ionic", "modules/micro-index-app/services", "services/net/common", "services/net/grass", /*"modules/microactivityapp/services",*/ "services/common-service"],
    function() {
        return angular.module("MicroIndexApp.controllers", ["MicroIndexApp.services", "services.net.common", "services.net.grass", "MicroActivityApp.services", "Services.common"])
            .controller("MicroIndexAppController", [
                "$scope", "$rootScope", "$filter", "MicroIndexAppService", "$state", "commonNetService", "$timeout", "promptBarService", "uploadImgService", "grassNetService", "microActivityAppService", "userInfoModel", "$ionicScrollDelegate", "$ionicPopup","singleThreadedNetService","activityBusinessService",
        function($scope, $rootScope,$filter, microIndexAppService, $state, commonNetService, $timeout, promptBarService, uploadImgService, grassNetService, microActivityAppService, userInfoModel, $ionicScrollDelegate, $ionicPopup,singleThreadedNetService,activityBusinessService) {

                    var pageSize = 10;
                    $scope.page = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };
                    //$scope.type = 0; //type 用来区分微官网和非微官网 0 微官网 1 微活动
                    $scope.templateType = 0;//templateType 区分列表状态 0 全部 1 微官网 2 微活动 3 微助力 4 微投票 5 微传单

                    //计算页面高度
                    $scope.winHeight = (window.orientation == 90 || window.orientation == -90) ?
                        document.documentElement.clientWidth : document.documentElement.clientHeight;


                    //创建新场景 （包含微官网）
                    $scope.goNew = function() {
                        $scope.isShowNew = true;
                    };

                    $scope.closeNew = function () {
                        $scope.isShowNew = false;
                    };
                    
                    //跳转到我的场景
                    $scope.goMyScenes = function () {
                        $scope.$state.go("index", {});
                    }
                    //跳转微店
                    $scope.goMicroShop = function () {
                        window.location.href = commonNetService.getMicroShopRouter();
                        //$scope.$state.go("microshopmanagement.index.product", {});
                    }
                    
                    //跳转到报名本
                    $scope.goRegistrationBook = function () {
                        //咨询跟进
                        //$scope.$state.go("registrationbook.registrationbookongoing", { trace: "traceByAppIndex" });
                        //全部咨询
                        //if($scope.isSchoolpalUser){
                           // window.location.href = "/OAuth/SchoolPalRoute?redirectUrl="+encodeURIComponent(window.schoolPalAuthenticationServer + "/Consult/ConsultList");
                    //}
                      //  else {
                            $scope.$state.go("registrationbook.registrationbookall", { trace: "traceByAppIndex" });
                       // }
                    }
                     
                    //新建微官网
                    $scope.goWebsiteNew = function () {
                        $scope.$state.go("newsite.chooseMode", {websiteId:0,templateId:10,go:"preview"});
                    };
                    
                    //新建微活动
                    $scope.goActivityNew = function (templateType) {
                        $scope.$state.go("new", { templateType: templateType });
                    };

                    //跳转到个人中心
                    $scope.goUserCenter = function(phone) {
                            $scope.$state.go("userCenter", {});
                        //校宝工作台百度统计
                        if ($scope.isSchoolpalUser) {
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/ERPworkshop/usercenter"]);
                        }
                        }
                    };


                    //冻结场景 申诉 
                    $scope.refreze = function(id,type){
                        var  tmpobj = {
                            templateType:type, //代表微官网
                            originId:id,       //活动ID
                            formType:'refreze'
                        }
                        //建议数据绑定
                        $scope.feedbackData = tmpobj;
                        ionic.EventController.trigger("showFeedbackForm");
                    }

                    ionic.EventController.on("showFeedbackForm", function(evt) {
                        $scope.ifShowFeedback = !$scope.ifShowFeedback;
                    });

                    //微活动预览已经没问题
                    $scope.goPreview = function(id, templateId, type) {
                        if (type == 1) {
                            //如果是种草活动跳到种草活动预览页
                            if (templateId == 2) {
                                $scope.goGrassPreview(id, templateId);
                                return;
                            } else {
                                //通用的活动模板
                                $scope.$state.go("activity.oldandnewpreview", {
                                    templateId: templateId,
                                    activityId: id
                                });
                            }

                        } else {
                            //2015.12.10 by yinglechao 增加新
                            if(templateId==10){
                                $scope.$state.go("newsite.preview", { templateId: templateId, websiteId: id });
                            }else{
                                $scope.$state.go("site.preview", { templateId: templateId, websiteId: id });
                            }


                        }

                    };

                    //编辑页面
                    $scope.goEditView = function(activityId, templateId, type) {
                        if (type == 1) {
                            if (templateId == 2) {
                                $scope.goToGrass();
                                return;
                            } else {
                                //通用的活动模板
                                $rootScope.$state.go("activity.oldandnewedit", {
                                    templateId: templateId,
                                    activityId: activityId
                                });
                            }
                        } else {
                            //2015.12.10 by yinglechao 增加新官网分支
                            if(templateId==10){
                                //新官网
                                $rootScope.$state.go("newsite.edit", {
                                    templateId: templateId,
                                    websiteId: activityId
                                });

                            }else{
                                //老官网
                                $rootScope.$state.go("site.edit", {
                                    templateId: templateId,
                                    websiteId: activityId
                                });

                            }

                        }
                    };

                    //官网的分享
                    $scope.share = function(id, templateId, type, shareConfig, createdAt,style,activityType,templateCode) {
                        //type:活动or官网 1：活动，2：官网
                        if (type == 1) {
                            $scope.shareActivity(id, shareConfig, templateId, createdAt, activityType, templateCode);
                        } else {
                            $scope.shareWebSite(id, shareConfig, templateId, createdAt,style);
                        }
                    };


                    //微官网弹出分享遮罩
                    $scope.saveWebSiteShareTitleAndShare = function() {
                        if (!$scope.showShareTitlePopModel.shareTitle) {
                            promptBarService.showErrorBar("分享标题不能为空哦~！", 3000);
                            return;
                        } else if ($scope.showShareTitlePopModel.shareTitle.length > 40) {
                            promptBarService.showErrorBar("分享标题不能多于40个字哦~！", 3000);
                            return;
                        }

                        var shareConfig = microIndexAppService.shareConfigModel($scope.showShareTitlePopModel.shareTitle, $scope.showShareTitlePopModel.desc, $scope.showShareTitlePopModel.link, $scope.showShareTitlePopModel.imageUrl);


                        microIndexAppService.updateShareConfigForWebSite($scope.showShareTitlePopModel.id, JSON.stringify(shareConfig)).then(function(res) {

                            if (res.data.status == 1) {
                                $scope.isShowShareTitlePop = false;
                                $scope.isShare = true;
                                commonNetService.saveBackLog({
                                    OriginId: $scope.showShareTitlePopModel.id,
                                    Type: "WebSite",
                                    Operation: "Share"
                                });

                                //微信自定义分享
                                commonNetService.setShareMessage(shareConfig).then(function() {
                                    $scope.renderList().then(function() {
                                        $scope.isShare = false;
                                    });

                                });
                            } else if (res.data.error == 1) {
                                promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);
                            }
                        }, null);
                    };

                    //官网分享
                    $scope.shareWebSite = function (webSiteId, shareConfig, templateId, createdAt,style) {
                        var baseUrl = "";
                        if(templateId==10){
                            baseUrl = window.shareServer + "/Home/ShareRoute?p=newsite/view?id=" + webSiteId;
                        }else{
                            baseUrl = window.activityServer + "/Home/ShareRoute?p=site/view?id=" + webSiteId;
                        }
                        //数据统计
                        $scope.isShowShareTitlePop = true;
                        if (shareConfig) {
                            shareConfig = JSON.parse(shareConfig);
                        } else {
                            shareConfig = microIndexAppService.shareConfigModel();
                        }
                        //增加默认分享链接地址
                        //2016.1.19 新官网分享规则更新 不使用默认title和desc
                        var defaultShareModel = microIndexAppService.getTemplateDefaultTitleForWebSite(templateId,style);
                        $scope.showShareTitlePopModel = {
                            shareTitle: shareConfig.title,
                            saveShareTitleFunction: $scope.saveWebSiteShareTitleAndShare,
                            imageUrl: shareConfig.imgUrl ? shareConfig.imgUrl : defaultShareModel.imgUrl,
                            desc: shareConfig.desc ,
                            date: createdAt,
                            link: baseUrl,
                            id: webSiteId
                        };
                    };


                    //TODO  新微官网同步功能  2015-12-22 17:25:27
                    //注意  只适用于新微官网
                    //步骤：１判断　是否为新微官网
                    //2 调用 同步接口  
                    $scope.goPublish = function () {
                        $rootScope.$state.go("newsite.publish", {
                            templateId: $scope.currentModel.TemplateId,
                            websiteId: $scope.currentModel.Id
                        }, { reload: true, inherit: false });
                    };

                    //微活动分享遮罩
                    $scope.saveOldNewShareTitleAndShare = function() {
                        if (!$scope.showShareTitlePopModel.shareTitle) {
                            promptBarService.showErrorBar("分享标题不能为空哦~！", 3000);
                            return;
                        } else if ($scope.showShareTitlePopModel.shareTitle.length > 40) {
                            promptBarService.showErrorBar("分享标题不能多于40个字哦~！", 3000);
                            return;
                        }
                        var shareConfig = microIndexAppService.shareConfigModel($scope.showShareTitlePopModel.shareTitle, $scope.showShareTitlePopModel.desc, $scope.showShareTitlePopModel.link, $scope.showShareTitlePopModel.imageUrl);

                        microIndexAppService.updateShareConfig($scope.showShareTitlePopModel.id, JSON.stringify(shareConfig)).then(function(res) {
                            if (res.data.status == 1) {
                                $scope.isShowShareTitlePop = false;
                                $scope.isShare = true;
                                commonNetService.saveBackLog({
                                    OriginId: $scope.showShareTitlePopModel.id,
                                    Type: "Activity",
                                    Operation: "Share"
                                });
                                //微信自定义分享
                                commonNetService.setShareMessage(shareConfig).then(function() {
                                    $scope.renderList().then(function() {
                                        $scope.isShare = false;
                                    });
                                });
                                //

                            } else if (res.data.error == 1) {
                                promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);
                            }

                        }, null);
                    };


                    //分享 --活动
                    $scope.shareActivity = function (activityId, shareConfig, templateId, createdAt, activity, templateCode) {

                        //数据统计
                        var baseUrl=activityBusinessService.getActivityShareLink(templateId,activityId,activity,true,templateCode);

                        $scope.isShowShareTitlePop = true;
                        if (shareConfig) {
                            shareConfig = JSON.parse(shareConfig);
                        } else {
                            shareConfig = microIndexAppService.shareConfigModel();
                        }

                        //增加默认分享链接地址
                        var defaultShareModel = microIndexAppService.getTemplateDefaultTitle(templateId, 1);
                        $scope.showShareTitlePopModel = {
                            shareTitle: shareConfig.title ? shareConfig.title : defaultShareModel.title,
                            saveShareTitleFunction: $scope.saveOldNewShareTitleAndShare,
                            imageUrl: shareConfig.imgUrl ? shareConfig.imgUrl : defaultShareModel.imgUrl,
                            desc: shareConfig.desc ? shareConfig.desc : defaultShareModel.desc,
                            date: createdAt,
                            link: baseUrl,
                            id: activityId
                        };
                    };


                    //种草编辑
                    $scope.goToGrass = function(activityId, templateId) {
                        $rootScope.$state.go("activity.grass", {
                            userId: $scope.$stateParams.userId,
                            templateId: templateId,
                            activityId: activityId
                        });
                    };

                    //进入数据统计页面 
                    $scope.statistics = function(activityId, templateId) {
                        if (templateId == 2) {
                            microIndexAppService.getActivityModel($rootScope.UserId, $scope.data[1].Id).success(function(data) {
                                if (data) {
                                    commonNetService.saveBackLog({
                                        OriginId: data.Id,
                                        Type: "Activity",
                                        Operation: "Statistics"
                                    });
                                }
                            });
                            //种草统计页面
                            $rootScope.$state.go("activity.statistics", { activityId: activityId }, {
                                reload: true,
                                inherit: false
                            });
                        } else {
                            microIndexAppService.getActivityModel($rootScope.UserId, "", activityId).success(function(data) {
                                if (data) {
                                    commonNetService.saveBackLog({
                                        OriginId: data.Id,
                                        Type: "Activity",
                                        Operation: "Statistics"
                                    });
                                }
                            });
                            //公开课统计页面
                            $rootScope.$state.go("activity.statistics", { activityId: activityId }, {
                                reload: true,
                                inherit: false
                            });

                        }
                    };

                    var defaultMsg = "\n     一棵草 = 1张学费抵扣券\n   种草享优惠，还不赶紧试试";
                    var preFix = "              ";

                    //种草预览
                    $scope.goGrassPreview = function(activityId, templateId) {
                        grassNetService.getDetail(activityId).success(function(data) {
                            if (data) {
                                commonNetService.saveBackLog({
                                    OriginId: data.Id,
                                    Type: "Activity",
                                    Operation: "Preview"
                                }).success(function(result) {
                                    //console.log("点击图片预览统计成功")
                                });
                                if (!data.Config) {
                                    var a = {};
                                    a.title = preFix + data.OrgName + defaultMsg;
                                    a.musicId ="http://cdn.schoolpal.cn/shiningstar"+"/Activity/20150918164321-6ad0d.mp3";
                                    data.Config = JSON.stringify(a);
                                }

                            }
                            microActivityAppService.setGrassPreview(data);
                            $state.go("activity.grassindexb", { ispreview: true, stuid: 1 });
                        });
                    };


                    //切换列表数据 （增加Loading效果） 
                    $scope.switchType = function (templateType) {
                        $scope.templateType = templateType;
                        microIndexAppService.getUserScenes(1, pageSize, $scope.templateType).success(function (result) {

                            if (result.status == 1) {
                                $scope.renderDataList(result.data.list, "reset");
                                $ionicScrollDelegate.scrollTop();
                                $scope.page = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
                    };

                    // 删除结构
                    //1、直接调用后端的接口
                    //2、处理返回值
                    $scope.goDel = function() {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "删除后，您之前分享的该场景将无法被他人访问，确认删除？",
                            cancelText: "取消",
                            okText: "确认"
                        });
                        confirmPopup.then(function(res) {
                            if (res) {
                                microIndexAppService.delModel($scope.currentModel.Id, $scope.currentModel.Type).success(function(result) {
                                    if (result == "") {
                                        //window.location.href = "/Common/error";
                                    } else {
                                        for (var i = 0; i < $scope.data.length; i++) {
                                            if ($scope.currentModel.Id == $scope.data[i].Id && $scope.currentModel.Type == $scope.data[i].Type) {
                                                $scope.data.splice(i, 1);
                                                $scope.renderDataList($scope.data);
                                                $scope.isShowMoreButton = false;
                                                break;
                                            }
                                        }
                                    }
                                });
                            }
                        });

                    };
                    // 二维码弹窗
                    //1、直接调用后端的二维码接口
                    //2、接到二维码图片地址后，进行scope作用域上的变量值绑定 ：$scope.qrCodeImg=XXXX
                    var qrCode;
                    $scope.qrCodeImageUrl= "";
                    $scope.goQrCode = function() {
                        $scope.isQrCode = true;
                        $scope.isShowMoreButton = false;
                        // 2016.1.1 解决android上二维码不能长按保存的情况 将cdn上的路径替换成oss 临时方案
                        if(ionic.Platform.isIOS()){
                            $scope.qrCodeImageUrl = $scope.currentModel.QrCode;
                        }else{
                            $scope.qrCodeImageUrl = getOssUrlByCdn($scope.currentModel.QrCode);
                        }

                    };
                    $scope.closeQrCode = function() {
                        $scope.qrCodeImageUrl = "";
                        $scope.isQrCode = false;
                    };
                    //将cdn上的路径替换成oss
                    function getOssUrlByCdn(cdnUrl){
                        var ossUrl = "";
                        //http://oss.aliyuncs.com/schoolpal/shiningstar/Website/20150916144607-03d34.jpg
                        //    http://cdn.schoolpal.cn/shiningstar/Website/20150916144024-ce78f.jpg
                        ossUrl = cdnUrl.replace('http://cdn.schoolpal.cn','http://oss.aliyuncs.com/schoolpal');
                        return ossUrl;
                    }



                    //1、需要显示复制的弹窗，见设计稿
                    //2、再 触发另一个真正的复制函数，
                    //3、传递复制接口所需的参数
                    //4、处理接口的返回信息，展现给用户  JSON.parse($scope.data[i].ShareConfig).title;
                    $scope.isCopySuccess = false;

                    $scope.goCopy = function() {
                        $scope.isShowMoreButton = false;
                        $scope.isCopy = true;
                        var defaultShareModel = microIndexAppService.getTemplateDefaultTitle($scope.currentModel.TemplateId, $scope.currentModel.Type,$scope.currentModel.Style);
                        if ($scope.currentModel.ShareConfig) {
                            $scope.copyModelShareConfig = JSON.parse($scope.currentModel.ShareConfig);
                        } else {
                            $scope.copyModelShareConfig = defaultShareModel;
                        }
                        $scope.copyModelDate = $scope.currentModel.CreatedAt;
                        //microIndexAppService.getModel($rootScope.UserId, $scope.currentModel.TemplateId, $scope.currentModel.Id).then(function (result) {
                        //    $scope.copyData = microIndexAppService.uiModelToBizModel(result.data.Config, $rootScope.UserId, $scope.currentModel.TemplateId);
                        //    if (result.data.ShareConfig){
                        //        $scope.copyModelShareConfig = JSON.parse(result.data.ShareConfig);
                        //    }
                        //    else {
                        //        $scope.copyModelShareConfig = defaultShareModel;
                        //    }

                        //});
                    };
                    //2016.2.18 复制添加重复提交限制
                    $scope.goSaveCopy = singleThreadedNetService(function() {
                        if (!$scope.copyModelShareConfig.title) {
                            promptBarService.showErrorBar("分享标题不能为空哦~！", 3000);
                            return false;
                        } else if ($scope.copyModelShareConfig.title.length > 40) {
                            promptBarService.showErrorBar("分享标题不能多于40个字哦~！", 3000);
                            return false;
                        }

                        //判断当前是否是新种草活动，如果是则采用新接口 by xp 2015年12月10日 00:07:27
                        if ($scope.currentModel.TemplateId==13 || $scope.currentModel.TemplateId == 14|| $scope.currentModel.TemplateId == 19||$scope.currentModel.ActivityType==3) {
                            return microIndexAppService.copyNewGrass($scope.currentModel.Id, JSON.stringify($scope.copyModelShareConfig)).then(function (result) {
                                //$scope.copyResult = result;
                                if (result.data.status == 1) {
                                    $scope.isCopy = false;

                                    $scope.isCopySuccess = true;
                                    microIndexAppService.getUserScenes(1, pageSize, $scope.templateType).success(function (result) {
                                        if (result == "<input type='hidden' id='ErrorCode' value='497' />") {
                                            window.location.href = "/Common/error?mark=MicroIndexAppController_copyNewGrass_getUserScenes_result_Equal_497";
                                        } else {
                                            $timeout(function () {
                                                $scope.isCopySuccess = false;
                                                $scope.renderDataList(result.data.list);
                                                $scope.page = result.data.page;
                                                $ionicScrollDelegate.scrollTop();
                                            }, 3000);
                                        }
                                    });


                                } else {
                                    if (result.data.error == 1) {
                                        promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);
                                    }
                                }
                            });
                        } else {
                            return microIndexAppService.copy($scope.currentModel.Id, JSON.stringify($scope.copyModelShareConfig), $scope.currentModel.Type).then(function (result) {
                                //$scope.copyResult = result;
                                if (result.data.status == 1) {
                                    $scope.isCopy = false;

                                    $scope.isCopySuccess = true;
                                    microIndexAppService.getUserScenes(1, pageSize, $scope.templateType).success(function (result) {
                                        if (result == "<input type='hidden' id='ErrorCode' value='497' />") {
                                            window.location.href = "/Common/error?mark=MicroIndexAppController_copy_getUserScenes_result_Equal_497";
                                        } else {
                                            $timeout(function () {
                                                $scope.isCopySuccess = false;
                                                $scope.renderDataList(result.data.list);
                                                $scope.page = result.data.page;
                                                $ionicScrollDelegate.scrollTop();
                                            }, 3000);
                                        }
                                    });


                                } else {
                                    if (result.data.error == 1) {
                                        promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);
                                    }
                                }
                            });
                        }
                        

                    });

                    //关闭copy title的标题
                    $scope.colseCopyPop = function() {
                        $scope.isCopy = false;
                    };


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
                    $scope.changeShareImage = function(imgIndex) {
                        $scope.imgIndex = imgIndex;
                        uploadImgService.upLoadImg($scope.config, 1, $scope.upLoadFinish);
                    };
                    $scope.upLoadFinish = function(url) {
                        console.log(url);
                        if ($scope.imgIndex == 0) {
                            $timeout(function() {
                                $scope.$apply(function() {
                                    $scope.showShareTitlePopModel.imageUrl = url;
                                });
                            });
                        } else {
                            $timeout(function() {
                                $scope.$apply(function() {
                                    $scope.copyModelShareConfig.imgUrl = url;
                                });
                            });
                        }
                    };

                    // 编辑
                    $scope.goEdit = function() {
                        //活动
                        if ($scope.currentModel.Type == 1) {
                            if ($scope.currentModel.TemplateId == 2) {
                                $scope.goToGrass($scope.currentModel.Id, $scope.currentModel.TemplateId);
                                return;
                            } else {
                                //通用的活动模板
                                $scope.$state.go("activity.oldandnewedit", {
                                    templateId: $scope.currentModel.TemplateId,
                                    activityId: $scope.currentModel.Id
                                });

                            }
                        } else {
                            //2015.12.10 yinglechao 增加新微官网分支
                            if($scope.currentModel.TemplateId==10){
                                $scope.$state.go("newsite.edit", {
                                    templateId: $scope.currentModel.TemplateId,
                                    websiteId: $scope.currentModel.Id
                                });
                            }else{
                                $scope.$state.go("site.edit", {
                                    templateId: $scope.currentModel.TemplateId,
                                    websiteId: $scope.currentModel.Id
                                });
                            }

                        }

                    };

                    // 跳转到咨询本
                    $scope.goConsult = function (id, type, templateCode, templateType) {
                        //如果是有排行榜的活动，则跳转到老的报名本 2016.5.12 by yinglechao
                        if (templateCode == "Grass1" || templateCode == "Grass2" || templateCode == "Christmas" || templateCode == "GrowVegettables" || templateCode == "Vote" || templateCode == "Aquarium" || templateCode == "Assistant") {
       
                            $scope.$state.go("consultbook", { id: id, type: type, trace: "traceByAppIndex" });
                        }else{
                            //if ($scope.isSchoolpalUser) {
                                //window.location.href = "/OAuth/SchoolPalRoute?redirectUrl=" + encodeURIComponent(window.schoolPalAuthenticationServer + "/Consult/ConsultList?sceneId=" + id + "&sceneType=" + templateType);
                       // }
                           // else {
                                $scope.$state.go("registrationbook.registrationbookall", { id: id, type: templateType, trace: "traceByAppIndex" });
                           // }
                        }
                       
                       
                    };

                    // 跳转到数据统计
                    $scope.goStatistic = function(id, type, templateType) {
                        if (type == 0) {
                            $rootScope.$state.go("newsite.statistics", { websiteId: id, templateType: templateType });
                        } else if (type == 1) {
                            $scope.$state.go("activity.statistics", { activityId: id });
                        }
                    };

                    //显示更多
                    $scope.showMore = function(model) {
                        $scope.isShowMoreButton = true;
                        $scope.currentModel = model;
                    };

                    //滚动加载
                    $scope.loadMore = function() {
                        microIndexAppService.getUserScenes($scope.page.currentIndex + 1, pageSize, $scope.templateType).success(function (result) {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                            if (result.status == 1) {
                                $scope.renderDataList(result.data.list, "add");
                                $scope.page = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }

                        });
                    };

                    //刷新列表
                    $scope.renderList = function() {
                        return microIndexAppService.getUserScenes(1, pageSize, $scope.templateType).success(function (result) {

                            if (result.status == 1) {
                                $scope.renderDataList(result.data.list, "reset");
                                $ionicScrollDelegate.scrollTop();
                                $scope.page = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }

                        });
                    };

                    //数据渲染
                    $scope.renderDataList = function(list, renderType) {
                        //renderType:"reset"/"add"
                        //renderType默认为“reset”
                        if (!renderType) {
                            renderType = "reset";
                        }
                        //设置title
                        for (var i = 0; i < list.length; i++) {
                            //2016.4.22 解析模板宽展配置
                            list[i].templateExtConfig = activityBusinessService.parseJsonToObjForTemplateExtConfig(list[i].UiConfig);
                            if (list[i].ShareConfig) {
                                list[i].Title = JSON.parse(list[i].ShareConfig).title;
                                list[i].config = angular.fromJson(list[i].shareConfig);
                                list[i].configPreviewImg = JSON.parse(list[i].ShareConfig).imgUrl;
                                list[i].desc = JSON.parse(list[i].ShareConfig).desc;
                            } else {
                                //2015.11.11 by yinglechao,如果没有ShareConfig将取默认的ShareConfig
                                //list[i].Title = "";
                                //list[i].config = "";
                                //list[i].configPreviewImg = "";
                                //list[i].desc = "";
                                // {\"title\":\"这是我用校宝秀做的第一个场景\",\"desc\":\"请在此输入场景简介，这里一共可以输入140个字\",\"link\":\"\",\"imgUrl\":\"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp3_share_img.jpg\",\"type\":\"\",\"dataUrl\":\"\"}
                                //2016.1.19 tetle和desc不使用默认文案
                                var type = list[i].Type==1?"activity":"webSite";
                                if(type=="activity"){
                                    var shareConfig = microIndexAppService.getTemplateDefaultTitle(list[i].TemplateId, list[i].Type, list[i].Style);
                                    list[i].Title = shareConfig.title;
                                    list[i].config = shareConfig;
                                    list[i].configPreviewImg = shareConfig.imgUrl;
                                    list[i].desc = shareConfig.desc;
                                }else{
                                    var shareConfig = microIndexAppService.getTemplateDefaultTitle(list[i].TemplateId, list[i].Type, list[i].Style);
                                    var emptyShareConfig = angular.copy(microIndexAppService.shareConfigModel);
                                    list[i].Title = emptyShareConfig.title;
                                    list[i].config = emptyShareConfig;
                                    list[i].configPreviewImg = shareConfig.imgUrl;
                                    list[i].desc = emptyShareConfig.desc;
                                }



                            }
                        }
                        if (renderType == "add") {
                            $scope.data = $scope.data.concat(list);
                        } else {
                            $scope.data = list;
                        }
                        //数据列表为空显示引导页面 by xp 2015年10月27日 12:13:20
                        if ($scope.data.length === 0) {
                            $(".active_add_empty").show();
                        } else {
                            $(".active_add_empty").hide();
                        }
                    };


                    //关闭自定义分享title的标题
                    $scope.colseShareTitlePop = function() {
                        $scope.isShowShareTitlePop = false;
                    };


                    //设置活动截止日期
                    var now = new Date();


                    $scope.dateSetting = {
                        theme: "material", // Specify theme like: theme: 'ios' or omit setting to use default
                        lang: "zh", // Specify language like: lang: 'pl' or omit setting to use default
                        display: "bottom", // Specify display mode like: display: 'bottom' or omit setting to use default
                        mode: "scroller", // More info about mode: http://docs.mobiscroll.com/angular/2-17-0/datetime#!opt-mode
                        minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()), // More info about minDate: http://docs.mobiscroll.com/angular/2-17-0/datetime#!opt-minDate
//                        maxDate: new Date(now.getFullYear()+1, now.getMonth(), now.getDate()-1), // More info about minDate: http://docs.mobiscroll.com/angular/2-17-0/datetime#!opt-minDate
                        maxDate: new Date(2016, 0, 31), // More info about minDate: http://docs.mobiscroll.com/angular/2-17-0/datetime#!opt-minDate
                        dateWheels: 'yymmdd',
                        timeWheels: 'HH',
                        showLabel: true, dayText: '日', monthText: '月', yearText: '年', hourText: '时', minuteText: '分',//面板中年月日文字
                        minWidth: 70,
                        onHide: function () {
                            $scope.$apply(function () {
                                $scope.isDeadLine = false;
                                $scope.isShowMoreButton = false;
                            });
                        },
                        onClose: function () {
                            // 更新截止日期 如果失败
                            if (arguments[1] == "set") {
                                microIndexAppService.updateEndDate($scope.currentModel.Id, arguments[0]).success(function(result) {
                                    if (result.status) {
                                        return true;
                                    }
                                    return false;
                                });
                            }
                        }
                    };
                    $scope.dateSetting2 = angular.copy($scope.dateSetting);
                    $scope.dateSetting2.maxDate  =  new Date(now.getFullYear()+1, now.getMonth(), now.getDate()-1);

                    //弹出截止日期控件
                    $scope.setDeadLine = function() {

                        $scope.isDeadLine = true;

                        //校验是否最大值 并且是否是JsonDate格式 
                        if ($scope.currentModel.EndDate != "/Date(253402185600000+0800)/") {
                            $scope.currentModel.EndDate = $filter("formatJsonDate2")($scope.currentModel.EndDate, "yyyy-MM-dd HH:mm:ss");
                        }
                        if($scope.currentModel.TemplateId==18||$scope.currentModel.TemplateId==19||$scope.currentModel.templateExtConfig.isOpenDeadingFunction){
                            $scope.dateTimeObj2.show();
                        }else{
                            $scope.dateTimeObj.show();
                        }

                    };


                    //格式化输出时间
                    $scope.formatDateByStatistics = function(data) {
                        return data && new Date(parseInt(data.substr(6, 13)));
                    };


                    //显示链接
                    //todo

                    $scope.goCopyLink = function () {
                        $scope.isCopyLink = true;
                        $scope.isShowMoreButton = false;
                        if ($scope.currentModel.Type == 1) {
                            $scope.copyLink = activityBusinessService.getActivityShareLink($scope.currentModel.TemplateId, $scope.currentModel.Id, $scope.currentModel.ActivityType, false, $scope.currentModel.TemplateCode);

                        } else {
                            //增加新微官网分支 by yinglechao 2015.12.10
                            if ($scope.currentModel.TemplateId == 10) {
                                $scope.copyLink = window.shareServer + "/Home/ShareRoute?p=newsite/view?id=" + $scope.currentModel.Id;
                            } else {
                                $scope.copyLink = window.activityServer + "/Home/ShareRoute?p=site/view?id=" + $scope.currentModel.Id;
                            }
                        }
                    };
                    
                    //关闭复制链接窗口
                    $scope.closeCopy = function () {
                        $scope.isCopyLink = false;
                        //$('#copyBox').html($scope.copyLink);
                    }


                    //初始化
                    $scope.init = function () {
                        commonNetService.addBackgroundOperationLog("ActList");

                        $scope.defaultPhotoUrl = window.resourceDoMain+"/app/img/user_center_default_photo.png";
                        $scope.baseImgUrl = window.resourceDoMain + "/app/img/";
                        //是否从校宝工作台进来
                        $scope.isSchoolpalUser = (window.isSchoolpalUser == "true") ? true : false;
                        //是否显示分享提示遮罩
                        $scope.isShare = false;

                        //是否显示分享弹窗
                        $scope.isShowShareTitlePop = false;

                        $rootScope.siteModel && delete ($rootScope.siteModel);

                        if (userInfoModel) {
                            $scope.UserInfo = userInfoModel;
                            //$scope.UserInfo.isVip = !($scope.UserInfo.VipDueDate == "/Date(-62135596800000)/");
                        }


                        var mySwiper = new ionic.views.Swiper('#homecontainer', {
                            //横向还是纵向
                            direction: 'horizontal',
                            //滑块是否循环
                            loop: false,
                            //最多能显示几个滑块
                            slidesPerView: 4.5,
                            //第一和最后是否能滑到最中间
                            centeredSlides: true,
                            //每个块之间间隙  单位px
                            spaceBetween: parseFloat(document.documentElement.style.fontSize) * 1.5,
                            //点击显示选中滑块
                            slideToClickedSlide: true,
                            freeMode: false,
                            //抵抗反弹
                            resistance: true,
                            //默认选中中间
                            initialSlide: 2,
                            runCallbacksOnInit: false,
                            onSlideChangeEnd: function (swiper) {
                                switch (swiper.activeIndex){ 
                                    case 0 : $scope.templateType=1 
                                        break; 
                                    case 1 : $scope.templateType=2 
                                        break; 
                                    case 2 : $scope.templateType=0 
                                        break; 
                                    case 3 : $scope.templateType=3
                                        break; 
                                    case 4 : $scope.templateType=4 
                                        break; 
                                    case 5 : $scope.templateType=5 
                                        break; 
                                    default: $scope.templateType = 0
                                        break;
                                }
                                $scope.switchType($scope.templateType);
                            }

                        },$scope);

                        //获取全部摘要  
                        microIndexAppService.getUserScenes(1, pageSize, $scope.templateType).success(function (result) {

                            if (result.status == 1) {
                                $scope.renderDataList(result.data.list, "reset");
                                $scope.page = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }

                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            if (!$rootScope.isFirstLoad) {
                                $timeout(function() {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                    //commonNetService.saveBackLog({
                                    //    OriginId: 0,
                                    //    Type: "All",
                                    //    Operation: "Visit"
                                    //});
                                }, 1833);
                            } else {
                                $timeout(function () {
                                    $(".lockMask-loading2").hide();
                                },1000);
                            }


                        });
                    };
                    $scope.init();


                }
            ]);
    });