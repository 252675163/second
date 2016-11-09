"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template20_1/service"], function() {
    angular.module("Template20_1Step3.directives", ["Template20_1.Service"])
        .directive("template20by1Step3", [
                "$window", "$timeout", "$rootScope","$ionicScrollDelegate", "template20_3Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope,$ionicScrollDelegate, template20_3Service, uploadImgService, maskService, promptBarService, commonNetService) {
                    return {
                        restrict: "EA",
                        scope: true,
                        templateUrl: "components/templates/micro-activity-template/template20_1/templates_steps/template_step3.html",
                        link: function (scope, iElement, iAttr) {

                            function init() {
                                //屏蔽朋友圈菜单
                                if(!scope.isUseWeinxinShare){
                                    window.wx && window.wx.hideMenuItems({
                                        menuList: ["menuItem:share:timeline"]
                                    });
                                }
                            }
                            init();

                            scope.isShowImage = false;
                            $ionicScrollDelegate.freezeAllScrolls(true);
                            scope.contactInfo = template20_3Service.getContactInfo();
                            scope.isShowContactPhone = !!scope.contactInfo.description[1];
                            scope.isShowContactAddress = !!scope.contactInfo.description[2];
                            $timeout(function () {
                                var ele = iElement.parents(".paneabird.microactivity-voucher")[0];
                                commonNetService.screenShot(ele)
                                    .then(function (re) {
                                        var flag = true,
                                            image = new Image();
                                        image.src = scope.userInfo1.headImg;
                                        if (re.status == 1) {
                                            scope.imgUrl = re.data;
                                            scope.isShowImage = true;                                           
                                        }
                                        else {
                                            flag = false;
                                        }
                                        image.onload = showImage;
                                        image.onerror = showImage;
                                        function showImage() {
                                            $timeout(function () {
                                                $(".lockMask-loading2").hide();
                                                if (!flag) {
                                                    promptBarService.showErrorBar("生成图片失败");
                                                }
                                                else {
                                                    promptBarService.showErrorBar2("长按图片，保存您的专属代金券到手机！");
                                                }
                                            }, 1800);
                                        }
                                    });

                            }, 0);
                            //监听destroy事件，隐藏提示
                            scope.$on("$destroy", function () {
                                promptBarService.hideErrorBar2();
                            });
                        }


                    };
                }
            ]
        );
});