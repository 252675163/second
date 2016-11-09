"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "modules/new-microsite-publish-app/services", "services/net/common"],
    function() {
        return angular.module("NewMicroSitePublishApp.controllers", ["NewMicroSitePublishApp.services", "services.net.common"])
            .controller("newMicroSitePublishAppController", [
                "$scope", "$rootScope", "newMicroSitePublishAppService", "$ionicPopup","promptBarService","maskService",
                function($scope, $rootScope,newMicroSitePublishAppService, $ionicPopup,promptBarService,maskService) {
                    $scope.step='1';//step='1','vip_1','notVip_1','notVip_2'
                    $scope.userInfo = {
                        name:"",
                        phone:""
                    };
                    $scope.appInfo  = {
                        id:"",
                        secret:""
                    };
                    $scope.goStep = function(step){
                        $scope.step = step;
                    };
                    $scope.submitAppInfo = function(id,secret){
                        //非空校验
                        if( !$scope.appInfo.id){
                            promptBarService.showErrorBar("应用Id不能为空",3000);
                            return;
                        }else if(!$scope.appInfo.secret){
                            promptBarService.showErrorBar("应用密钥不能为空",3000);
                            return;
                        }
                        $scope.step = "notVip_2";
                    };
                    $scope.submitUserInfo = function(userType){
                        //userType 'vip'or notVip
                        //信息校验手机号码
                        //scope.isSubmit是否在提交中
                        if ($scope.isSubmit == true) {
                            return;
                        }
                        //表单校验
                        if (!validForm()) {
                            return;
                        }
                        //如果已经提交过表单，判断提交信息是否有更改
                        if ($scope.isHaveSubmit == true) {
                            if (angular.equals($scope.oldUserInfo, $scope.userInfo)) {
                                promptBarService.showErrorBar("请不要重复提交", 3000);
                                return;
                            }
                        }
                        //保存数据
                        var isManual = userType=="notVip"?true:false;
                        $scope.isSubmit = true;
                        newMicroSitePublishAppService.saveAppInfoAndAppInfo($scope.$stateParams.websiteId,$scope.userInfo,isManual,$scope.appInfo).success(
                            function(result){
                                $scope.isSubmit = false;
                                if(result.status==1){
                                    //跳转到场景首页
                                    maskService.showMask(result.message,3000,false,3).then(function(){
                                        $scope.$state.go("index")
                                    });
                                }else{
                                    promptBarService.showErrorBar(result.message,3000);
                                }
                                $scope.isHaveSubmit = true;
                                $scope.oldUserInfo = angular.copy($scope.userInfo);
                            }
                        )

                    };




                    //表单校验
                    function validForm() {
                        var validState = newMicroSitePublishAppService.isValid($scope.userInfo.name, $scope.userInfo.phone);
                        if (validState == 1) {
                            promptBarService.showErrorBar("请输入姓名！", 3000);
                            return false;
                        } else if (validState == 3) {
                            promptBarService.showErrorBar("请输入手机号码！", 3000);
                            return false;
                        } else if (validState == 4) {
                            promptBarService.showErrorBar("请输入真实的手机号码！", 3000);
                            return false;
                        }
                        return true;
                    }




                    var init = function() {
                            newMicroSitePublishAppService.getUserWeixinInfo($scope.$stateParams.websiteId).success(function(result) {
                                if(result.status==1){
                                    $scope.appInfo.id = result.data.AppId;
                                    $scope.appInfo.secret = result.data.AppSecret;
                                }else{
                                    promptBarService.showErrorBar(result.message);
                                }

                            });
                       
                    };
                    init();

                    $scope.$on("$stateChangeStart", function(event, toState) {
                        //用于删除框没点击时跳转到别的页面关闭
                        if ($ionicPopup._popupStack[0] != undefined) {
                            $ionicPopup._popupStack[0].responseDeferred.promise.close();
                        }
                        if (toState.name.indexOf("newsite") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                        }

                    });
                }
            ]);
    });