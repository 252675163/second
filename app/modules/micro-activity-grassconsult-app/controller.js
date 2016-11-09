"use strict";
/**
 * author :小宝
 * time: 2015年9月11日
 * description: 种草活动
 */



define(["ionic", "modules/micro-activity-grassconsult-app/services", "services/net/grass", /*"modules/micro-activity-grass-app/directive", "modules/microactivityapp/services",*/ "components/error_remind/directive", "services/net/common", "components/common/directive"
 ],
   function () {
       return angular.module("MicroActivityGrassConsultApp.controllers", ["MicroActivityGrassConsultApp.services", "services.net.grass", "MicroActivityGrassApp.directives", "MicroActivityApp.services", "ErrorRemind.directive", "services.net.common", "Common.directive"])
           .controller("MicroActivityGrassConsultAppController", [
               "$scope", "$rootScope", "MicroActivityGrassConsultAppService", "$state", "$sce","grassNetService","microActivityAppService","$timeout","commonNetService","maskService",
               function ($scope, $rootScope, MicroActivityGrassConsultAppService, $state, $sce, grassNetService, microActivityAppService, $timeout,commonNetService,maskService) {
                   //pv数据统计

                   //增加重复提交标识
                   $scope.isRepetCommit = false;
                   //$scope.musicId = $scope.$stateParams.musicId;
                   $scope.ispreview = $scope.$stateParams.ispreview;//是否是预览
                   if ($scope.ispreview == "true") {
                       if(!microActivityAppService.getGrassTempUser()) {
                           window.location.href = "/Common/error?mark=MicroActivityGrassIndexBAppController_getGrassTempUser()_isFalse";
                           return;
                       }

                       commonNetService.saveForeLog({ OriginId: microActivityAppService.getGrassTempUser().ActivityId, Type: 'Activity', Operation: 'Visit' }).success(function (result) {
                           //console.log("保存成功")
                       });
                   }
                   $scope.stuid = $scope.$stateParams.stuid;//分享者id
                   $scope.people = microActivityAppService.getGrassTempUser();
                   $scope.user = microActivityAppService.getGrassUser();
                   $scope.remind = "";
                   $scope.show = false;
                   $scope.isShowShare = "none";

                   // 新需求 该页面被分享出去之后强制跳转回流程首页 2015年10月20日 17:27:41 by xp
                   if (!$scope.people) {
                       //                       window.location.href = "/Common/error";
                       if ($scope.$stateParams.isFromA) {
                           //跳回A流程的首页
                           $state.go("activity.grassindex", { ispreview: $scope.ispreview, activityid: $scope.$stateParams.activityid });
                       } else {
                           //跳回B流程的首页
                           $state.go("activity.grassindexb", { ispreview: $scope.ispreview, stuid: $scope.stuid });
                       }
                   }

//                   if ($scope.user.ShareConfig) {
//                       var config = angular.fromJson($scope.user.ShareConfig);
//                       config.link = window.shareServer + "/Home/GrassShareRoute?p=" + location.hash.slice(2);
//                       //将当前页面的title改成自定义之后的title
//                       $scope.$state.current.title = config.title;
//                       commonNetService.setShareMessageReception(config);
//                   }

                   $scope.callSomeone = function () {
                       if ($scope.isRepetCommit == true)
                       {
                           return false;
                       }
                       var validState;
                       $scope.isShow = true;
                       $scope.autoCloseRemind();
                       validState = MicroActivityGrassConsultAppService.isValid($scope.people.Name, $scope.people.Phone);
                       // console.log(validState);
                       if (validState == 1)

                           $scope.remind = "请输入您的姓名！";

                       //else if (validState == 2)
                       //    $scope.remind = "名字太长啦，亲！";
                       else if (validState == 3)
                           $scope.remind = "请输入您的联系电话！";
                       else if (validState == 4)
                           $scope.remind = "请输入真实的手机或座机号码！";
                       else if (validState == 0) {
                           $scope.remind = "";
                           if ($scope.ispreview == "true") {
                               $scope.remind = "预览页面无法保存数据！";
                               return false;
                           }
                           $scope.isShow = false;
                           //往数据库写数据
                           $scope.isRepetCommit = true;

                           grassNetService.addUser($scope.people, !$scope.isFromA).success(function (data) {
                               if (data.status == 1) {
                                   maskService.showMask("",0,false,6).then(function(){
                                       //更新微信的分享链接
                                      var link =  window.shareServer + "/Home/GrassShareRoute?p=activity/grassindexb/false"+"?stuid="+data.data;
                                      commonNetService.setShareMessageLink(link).then(function () {
                                          //用户分享或取消分享
                                          maskService.hideMask();
                                      }, function () {
                                          //set微信的link出错
                                          maskService.hideMask();
                                      });
                                   });
                                   //todo
                                   //$scope.isRepetCommit = false;
                                   //$scope.isShowShare = "block";
                                   //setTimeout(function () {
                                   //    $state.go("activity.grassindexb", { ispreview: false, stuid: data.data });
                                   //},3000);


                               }
                               else {
                                   //alert(data.message);
                                   $scope.isRepetCommit = false;
                                   $scope.remind = data.message;
                                   $scope.isShow = true;
                                   $scope.autoCloseRemind();
                               }

                           });


                       }
                   };
                   $scope.closeRemind = function () {
                       $scope.remind = "";
                       $scope.isShow = false;
                   };
                   $scope.autoCloseRemind = function() {
                       $timeout(function(){$scope.closeRemind()},3000);
                   };

               }
           ]);
   });
