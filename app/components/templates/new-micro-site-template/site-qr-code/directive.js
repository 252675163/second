"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("siteQrCode.directives", [])
        .directive("siteQrCode", [
            "$window", "$timeout", "$rootScope", "siteQrCodeService", "WebsiteUploadImgService", "promptBarService", "maskService", "commonNetService", "newSiteNavService",
            function ($window, $timeout, $rootScope, siteQrCodeService, WebsiteUploadImgService, promptBarService, maskService, commonNetService, newSiteNavService) {
                return {
                    restrict: 'EA',
                    // templateUrl: "components/templates/new-micro-site-template/site-qr-code/template.html",
                    template: '<div ng-show="!isEdit" class=""><div class="newSite_qrCode_Outer"><div class="newSite_qrCode"><div class="newSite_Org_name">{{templateModel.description[0]}}</div><div class="newSite_Org_tel"><i class="icon_phone"></i><a ng-href="{{status==\'view\'?\'tel:\'+templateModel.description[1]:\'javascript:void(0)\'}}">{{templateModel.description[1]}}</a></div><div class="newSite_qrCode_box"><div class="qrcode" on-hold="hideNav()" data-tap-disabled="{{isWebChatQrcode}}"><div class="qrcode_logo"><img ng-src="{{templateModel.imageUrl[0]}}"></div><div id="qrCodeBox" class="qrcode"></div><img ng-src="{{qrcodeImageUrl}}" style="height:100%;width:100%;  position: absolute;  left: 0;  top: 0"></div></div><div class="newSite_qrCode_text">长按识别/手机扫描二维码，查看专属微官网</div></div></div></div>',
                    link: function (scope, iElement, iAttr) {
                        //var qrcode = "";
                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        scope.qrcodeImageUrl = "";
                        //将cdn上的路径替换成oss
                        function getOssUrlByCdn(cdnUrl){
                            var ossUrl = "";
                            //http://oss.aliyuncs.com/schoolpal/shiningstar/Website/20150916144607-03d34.jpg
                            //    http://cdn.schoolpal.cn/shiningstar/Website/20150916144024-ce78f.jpg
                            ossUrl = cdnUrl.replace('http://cdn.schoolpal.cn','http://oss.aliyuncs.com/schoolpal');
                            return ossUrl;
                        }
                        scope.renderQrCode = function () {
                            if (scope.status == "view") {
                                return function(){  siteQrCodeService.getQrCodeImgUrlByWebsiteId($rootScope.$stateParams.id).then(function(result){

                                    if(result.data.status==1){
                                        //todo 2016.1.1 解决android上二维码不能长按保存的情况 将cdn上的路径替换成oss 临时方案
                                        if(ionic.Platform.isIOS()){
                                            scope.qrcodeImageUrl = result.data.data;
                                        }else{
                                            scope.qrcodeImageUrl = getOssUrlByCdn( result.data.data);
                                        }
                                    }else{
                                        promptBarService.showErrorBar(result.data.message,3000)
                                    }
                                },null);}

                            } else if (scope.status == "preview" || scope.status =="showStyle") {
                                return function(){
                                    var link = "";
                                    var logo =scope.templateModel.imageUrl[0];
                                    var style = scope.style;
                                    if($rootScope.$stateParams.websiteId && $rootScope.$stateParams.websiteId != "0"){
                                        //已保存
                                        link = window.shareServer + "/Home/ShareRoute?p=newsite/view?id=" + $rootScope.$stateParams.websiteId;
                                    }else {
                                        //未保存显示官网首页的地址二维码
                                        link = location.origin;
                                    }
                                    siteQrCodeService.getQrCodeImgUrlByConfig(link,logo,style).then(function(result){
                                        //scope.qrcodeImageUrl = result.data;
                                        if(result.data.status==1){
                                                //todo 2016.1.1 解决android上二维码不能长按保存的情况 将cdn上的路径替换成oss 临时方案
                                                if(ionic.Platform.isIOS()){
                                                    scope.qrcodeImageUrl = result.data.data;
                                                }else{
                                                    scope.qrcodeImageUrl = getOssUrlByCdn( result.data.data);
                                                }
                                        }else{
                                            promptBarService.showErrorBar(result.data.message,3000);
                                        }
                                    },null);
                                }
                            }else {
                                return function(){}
                            }
                        }();


                        function init() {
                            scope.templateModel = angular.copy(siteQrCodeService.model);
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.renderQrCode();


                            if (scope.status == "showStyle") {
                                scope.$watch('siteModel.style', function (newValue, oldValue, scope) {
                                    if (newValue != oldValue) {
                                        scope.style = newValue;
                                        scope.templateModel = angular.copy(siteQrCodeService.model);
                                        scope.renderQrCode();

                                    }
                                });
                            }



                            //TODO 安卓手机可识别二维码，但拖动有问题，暂时先这样 by xp 2015年12月21日 19:21:42
                            if (ionic.Platform.isAndroid()) {
                                scope.isWebChatQrcode = true;
                            }

                        }

                        init();
                        scope.hideNav = function () {
                            newSiteNavService.hideNav();
                        };


                    }

                }
            }]
    )

});

