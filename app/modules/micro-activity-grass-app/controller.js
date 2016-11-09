"use strict";
/**
 * author :小宝
 * time: 2015年9月11日
 * description: 种草活动
 */


define(["ionic", "modules/micro-activity-grass-app/services", /*"modules/microactivityapp/services",*/ "services/net/grass", "services/net/common", "components/common/directive"],
    function() {
        return angular.module("MicroActivityGrassApp.controllers", ["MicroActivityGrassApp.services", "MicroActivityApp.services", "services.net.grass", "services.net.common", "Common.directive"])
            .controller("MicroActivityGrassAppController", [
                "$scope", "$rootScope","$timeout", "MicroActivityGrassAppService", "$state", "$sce", "microActivityAppService", "grassNetService", "commonNetService",
                function($scope, $rootScope, $timeout, MicroActivityGrassAppService, $state, $sce, microActivityAppService, grassNetService, commonNetService) {

                    $scope.cacheData;
                    $scope.atid = -1;
                    $scope.isCheck = "none";
                    $scope.isEdit = "block";
                    $scope.isShowEdit = false;
                    $scope.model = {};

                    $scope.showEdit = function(event){
                        event.stopPropagation();
                        if(!$scope.isShowEdit){
                            $("body").one("click",function(){
                                $timeout(function(){
                                    $scope.isShowEdit = false;
                                },0);

                            });
                            $scope.isShowEdit = true;
                        }else{
                            $scope.isShowEdit = false;
                        }
                    };

                    //$scope.goCheck = function() {
                    //    $scope.isCheck = "block";
                    //    $scope.isEdit = "none";
                    //    //$scope.model.title=$scope.model.title.replace(/\n/g, '<br/>');
                    //    //$scope.model.title = $scope.model.title.replace(/ /g, '&nbsp;');
                    //};
                    //$scope.goEditTitle = function() {
                    //    $scope.isCheck = "none";
                    //    $scope.isEdit = "block";
                    //    //$scope.model.title = $scope.model.title.replace(/<br\s*\/?\s*>/ig, '\n');
                    //    //$scope.model.title = $scope.model.title.replace(/&nbsp;/g, ' ');
                    //};
                    //$scope.model.titleHtml = function() {
                    //    if ($scope.model.title)
                    //        return $scope.model.title.replace(/\n/g, "<br/>").replace(/ /g, "&nbsp;");
                    //    else
                    //        return "";
                    //};

                    var defaultMsg = "一棵草 = 1张学费抵扣券\n种草享优惠，还不赶紧试试";
                    var preFix = "";


                    //其他页面跳转过来的
                    if ($scope.isChange) {
                        $scope.musicId = JSON.parse(microActivityAppService.getGrassPreview().Config).musicId; //获取音频地址
                        $scope.model.title = JSON.parse(microActivityAppService.getGrassPreview().Config).title.replace(/<br\s*\/?\s*>/ig, "\n");
                        $scope.cacheData = microActivityAppService.getGrassPreview(); //更换下音频
                        $scope.atid = microActivityAppService.getGrassPreview().Id;
                        //pv数据统计
                        commonNetService.saveBackLog({
                            OriginId: microActivityAppService.getGrassPreview().Id,
                            Type: "Activity",
                            Operation: "Edit"
                        }).success(function(result) {
                            //console.log("保存成功")
                        });
                    } else {
                        //向后端请求
                        grassNetService.getDetail($scope.$stateParams.activityId).success(function (data) {
                            if (data == "<input type='hidden' id='ErrorCode' value='497' />") {
                                window.location.href = "/Common/error?mark=MicroActivityGrassAppController_getDetail_result_Equal_497";
                                return;
                            } else if (data) {
                                //pv数据统计
                                commonNetService.saveBackLog({
                                    OriginId: data.Id,
                                    Type: "Activity",
                                    Operation: "Edit"
                                }).success(function(result) {
                                    //console.log("保存成功")
                                });
                                $scope.atid = data.Id;
                                if (data.UserId == 0 && data.TemplateId == 0) {
                                    data.TemplateId = $scope.$stateParams.templateId;
                                    data.UserId = $scope.$stateParams.userId;
                                }
                                $scope.cacheData = data;
                                if (data.Config) {
                                    $scope.musicId = JSON.parse(data.Config).musicId; //获取音频地址
                                    if (JSON.parse(data.Config).title && JSON.parse(data.Config).title != "") {
                                        $scope.model.title = JSON.parse(data.Config).title.replace(/<br\s*\/?\s*>/ig, "\n"); //获取
                                    } else {
                                        $scope.model.title = preFix + data.OrgName + defaultMsg; //获取

                                    }
                                } else {
                                    $scope.musicId ="http://cdn.schoolpal.cn/shiningstar"+"/Activity/20150918164321-6ad0d.mp3";
                                    $scope.model.title = preFix + data.OrgName + defaultMsg; //获取
                                }


                                //if(JSON.parse(data.Config).title&&JSON.parse(data.Config).title!="")
                                //{
                                //    $scope.model.title = JSON.parse(data.Config).title;//获取
                                //}
                                //else
                                //{
                                //    $scope.model.title = data.OrgName;//获取
                                //}
                            } else {
                                //获取默认数据\
                                //todo $scope.$stateParams.userId,？？
                                var temp = grassNetService.getActivityMockInfo($scope.$stateParams.userId, $scope.$stateParams.templateId);
                                $scope.cacheData = temp;
                                $scope.musicId = JSON.parse(temp.Config).musicId; //获取音频地址
                                $scope.model.title = JSON.parse(temp.Config).title;
                            }
                        }); //$scope.musicId = grassNetService.getActivityInfo($scope.$stateParams.activityid).musicId;//获取音频地址
                        //$scope.model.title = grassNetService.getActivityInfo($scope.$stateParams.activityid).title;//获取音频地址
                    }

                    $scope.goChoseMusic = function() {

                        var temp = JSON.parse($scope.cacheData.Config);
                        if (!temp) {
                            temp = {};
                        }
                        temp.title = $scope.model.title;
                        temp.musicId = $scope.musicId;
                        $scope.cacheData.Config = JSON.stringify(temp);

                        microActivityAppService.setGrassPreview($scope.cacheData);
                        $state.go("activity.music");
                    };
                    //跳转至预览
                    $scope.goPreview = function() {
                        //pv数据统计
                        commonNetService.saveBackLog({
                            OriginId: $scope.atid,
                            Type: "Activity",
                            Operation: "Preview"
                        }).success(function(result) {
                            //console.log("保存成功")
                        }); //向service写入预览模型
                        var temp = JSON.parse($scope.cacheData.Config);
                        if (!temp) {
                            temp = {};
                        }
                        temp.title = $scope.model.title.replace(/\n/g, "<br/>");

                        $scope.cacheData.Config = JSON.stringify(temp);

                        microActivityAppService.setGrassPreview($scope.cacheData);
                        $state.go("activity.grassindexb", { ispreview: true, stuid: 1 });
                    };
                }
            ]);
    });