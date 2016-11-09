"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */


define(["ionic", "modules/micro-activity-index-app/services", "services/net/common", "services/net/grass"/*, "modules/microactivityapp/services"*/],
    function() {
        return angular.module("MicroActivityIndexApp.controllers", ["MicroActivityIndexApp.services", "services.net.common", "services.net.grass", "MicroActivityApp.services"])
            .controller("MicroActivityIndexAppController", [
                "$scope", "$rootScope", "MicroActivityIndexAppService", "$state", "commonNetService", "grassNetService", "microActivityAppService", "$timeout", "promptBarService",
                function($scope, $rootScope, microActivityIndexAppService, $state, commonNetService, grassNetService, microActivityAppService, $timeout, promptBarService) {

                    $scope.isShare = false;
                    
                    $scope.isShowShareTitlePop = false;
                    $scope.winHeight = (window.orientation == 90 || window.orientation == -90) ?
                        document.documentElement.clientWidth : document.documentElement.clientHeight;


                    $scope.formatDateByStatistics = function(data) {
                        var d = new Date(parseInt(data.substr(6, 13)));
                        var year = d.getFullYear();
                        var month = d.getMonth() + 1;
                        var date = d.getDate();

                        return year + "-" + month + "-" + date;
                    };

                    //关闭自定义分享title的标题
                    $scope.colseShareTitlePop = function() {
                        $scope.isShowShareTitlePop = false;
                    };

                    $scope.goNewActivity = function() {
                        $scope.$state.go("activity.new");

                    };

                    //预览
                    $scope.goPreview = function(activityId, templateId) {
                        //如果是种草活动跳到种草活动预览页
                        if (templateId == 2) {
                            $scope.goGrassPreview(activityId, templateId);
                            return;
                        } else {
                            //通用的活动模板
                            $rootScope.$state.go("activity.oldandnewpreview", { templateId: templateId, activityId: activityId });
                        }

                    };
                    //编辑
                    $scope.goEditView = function(activityId, templateId) {
                        if (templateId == 2) {
                            $scope.goToGrass();
                            return;
                        } else {
                            //通用的活动模板
                            $rootScope.$state.go("activity.oldandnewedit", { templateId: templateId, activityId: activityId });

                        }

                    };

                    //分享
                    $scope.shareActivity = function(activityId, templateId) {
                        if (templateId == 2) {
                            $scope.shareGrass(activityId, templateId);
                        } else {
                            $scope.shareOldAndNew(activityId,templateId);
                        }
                    };

                    //公开课分享
                    $scope.shareOldAndNew = function (activityId, templateId) {

                        $scope.countdown = 3;
                        //数据统计
                        microActivityIndexAppService.getActivityModel($rootScope.UserId, "", activityId).success(function(result) {


                            $scope.saveOldNewShareTitleAndShare = function() {
                                if (!$scope.showShareTitlePopModel.shareTitle) {
                                    promptBarService.showErrorBar("分享标题不能为空哦~！", 3000);
                                    return;
                                } else if ($scope.showShareTitlePopModel.shareTitle.length > 18) {
                                    promptBarService.showErrorBar("分享标题不能多于18个字哦~！", 3000);
                                    return;
                                }
                                var shareConfig = microActivityIndexAppService.shareConfigModel($scope.showShareTitlePopModel.shareTitle, $scope.showShareTitlePopModel.desc, "", $scope.showShareTitlePopModel.imageUrl);

                                microActivityIndexAppService.updateShareConfig(activityId, result.UserId, result.UserSign, JSON.stringify(shareConfig)).then(function(res) {
                                    if (res.data.status == 1) {
                                        $scope.isShowShareTitlePop = false;
                                        $scope.isShare = true;
                                        commonNetService.saveBackLog({
                                            OriginId: result.Id,
                                            Type: "Activity",
                                            Operation: "Share"
                                        });
                                        var myTime = setInterval(function() {
                                            $scope.countdown--;
                                            if ($scope.countdown == 0) {
                                                clearInterval(myTime);
                                                $rootScope.$state.go("activity.oldandnewview", { Id: result.Id }, {
                                                    reload: true,
                                                    inherit: false
                                                });
                                                $scope.isShare = false;
                                            }
                                        }, 1000);

                                    } else if (res.data.error == 1) {
                                        promptBarService.showErrorBar("您分享的标题中包含敏感词，请修改！", 3000);


                                    }


                                }, null);
                            };
                            $scope.isShowShareTitlePop = true;
                            var shareConfig = {};
                            if (result.ShareConfig) {
                                shareConfig = JSON.parse(result.ShareConfig);
                            } else {
                                shareConfig = microActivityIndexAppService.shareConfigModel();
                            }
                            //增加默认分享链接地址
                            var defaultShareModel = microActivityIndexAppService.getTemplateDefaultTitle(templateId);
                            $scope.showShareTitlePopModel = {
                                shareTitle: shareConfig.title ? shareConfig.title : defaultShareModel.title,
                                saveShareTitleFunction: $scope.saveOldNewShareTitleAndShare,
                                imageUrl: defaultShareModel.imgUrl,
                                desc: defaultShareModel.desc
                            };


                        });

                    };


                    //种草分享
                    $scope.shareGrass = function(activityId, templateId) {
                        $scope.isShare = true;
                        $scope.countdown = 3;
                        //数据统计
                        commonNetService.saveBackLog({ OriginId: activityId, Type: "Activity", Operation: "Share" });
                        $timeout(function() {
                            //$state.go('activity.index', { id: $scope.model.UserId });
                            $rootScope.$state.go("activity.grassindex", { activityid: activityId });
                            $scope.isShare = false;
                        }, 3000);

                    };


                    //种草编辑
                    $scope.goToGrass = function(activityId, templateId) {
                        $rootScope.$state.go("activity.grass", {
                            userId: $scope.$stateParams.id,
                            templateId: templateId,
                            activityId: activityId
                        });

                    };

                    //进入数据统计页面 
                    $scope.statistics = function(activityId, templateId) {
                        if (templateId == 2) {
                            microActivityIndexAppService.getActivityModel($rootScope.UserId, $scope.data[1].Id).success(function(data) {
                                if (data) {
                                    commonNetService.saveBackLog({ OriginId: data.Id, Type: "Activity", Operation: "Statistics" });
                                }
                            });
                            //种草统计页面
                            $rootScope.$state.go("activity.statistics", { activityId: activityId }, {
                                reload: true,
                                inherit: false
                            });
                        } else {
                            microActivityIndexAppService.getActivityModel($rootScope.UserId, "", activityId).success(function(data) {
                                if (data) {
                                    commonNetService.saveBackLog({ OriginId: data.Id, Type: "Activity", Operation: "Statistics" });
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
                        grassNetService.getDetail($rootScope.UserId, templateId, activityId).success(function(data) {
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
                                    a.musicId = "http://schoolpal.oss-cn-hangzhou.aliyuncs.com/shiningstar/Activity/20150918164321-6ad0d.mp3";
                                    data.Config = JSON.stringify(a);
                                }
                                if (data.UserId == 0 && data.TemplateId == 0) {
                                    data.TemplateId = templateId;
                                    data.UserId = $scope.$stateParams.id;
                                }
                                $scope.cacheData = data;
                            } else {
                                //获取默认数据
                                var temp = grassNetService.getActivityMockInfo($scope.$stateParams.userId, $scope.$stateParams.templateId);
                                $scope.cacheData = temp;
                            }
                            microActivityAppService.setGrassPreview($scope.cacheData);
                            $state.go("activity.grassindexb", { ispreview: true, stuid: 1 });
                        });
                    };
                    //初始化
                    $scope.init = function() {
                        delete($rootScope.siteModel);
                        $rootScope.UserId = $scope.$stateParams.id;
                        microActivityIndexAppService.getActivityList($scope.$stateParams.id).success(function(result) {
                            if (result == "<input type='hidden' id='ErrorCode' value='497' />") {
                                window.location.href = "/Common/error";
                            } else {
                                $scope.data = result;
                                //数据列表为空显示引导页面 by xp 2015年10月27日 12:13:20
                                if ($scope.data.length===0) {
                                    $(".active_add_empty").show();
                                }
                                for (var i = 0; i < $scope.data.length; i++) {
                                    if ($scope.data[i].ShareConfig) {
                                        $scope.data[i].Title = JSON.parse($scope.data[i].ShareConfig).title;
                                        $scope.data[i].configPreviewImg = JSON.parse($scope.data[i].ShareConfig).imgUrl;
                                    } else {
                                        $scope.data[i].Title = "";
                                    }
                                }
                            }
                        });
                    };
                    $scope.init();

                }
            ]);
    });