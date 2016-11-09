"use strict";



define(["ionic","qrCode"], function () {
    angular.module("MicroLeaflet3_1.directives", [])
        .directive("microLeaflet3by1", [
            "$window", "$timeout", "$rootScope", "microLeaflet3_1Service", "uploadImgService", "promptBarService", "maskService", "commonNetService", function ($window, $timeout, $rootScope, microLeaflet3_1Service, uploadImgService, promptBarService, maskService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_1/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microLeaflet3_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            //如果是预览，给下载功能添加打印该页的任务
                            if( scope.status=="preview"){
                                microLeaflet3_1Service.setDownloadConfig(angular.copy(scope.templateModel));
                            }
                            if (scope.status == "view") {
                                //todo
                                scope.isHaveQrCode = true;
                                var link = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview"  ;
                                var pararm = "?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.data || '') + "&defaultCurrentIndex=2";
                                link =link+encodeURIComponent(pararm);
                                console.log(link);

                                var qrcode = new QRCode($(iElement).find(".qrcode")[0], {
                                    text: link,
                                    width: 210,
                                    height: 210,
                                    colorDark: "#000000",
                                    colorLight: "#ffffff",
                                    correctLevel: QRCode.CorrectLevel.H
                                });
                            }
                            scope.isEdit= scope.status=="edit"?true:false;

                            //背景图片
                            var docEl = document.documentElement;
                            iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + docEl.clientHeight + "px";

                            // old/new
                            // 默认的二维码
                            scope.defaultQrcodeImg = "http://cdn.schoolpal.cn/shiningstar/Activity/20160525170751-edb00.png";
                            //todo
                            scope.defaultLogo = window.resourceDoMain + "/app/img/leaflet2_defaultlogo1.png";
                            scope.defaultLogo2 = window.resourceDoMain + "/app/img/leaflet2_logo_alternater.png";
                           

                        }
                        init();



                        //图片比例
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function (url) {
                            console.log(url);
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.templateModel.imageUrl[scope.imgIndex] = url;
                                })
                            });
                        };
                        scope.updateImg = function (imgIndex) {
                            if (!scope.isEdit) {
                                return
                            }
                            scope.imgIndex = imgIndex;
                            uploadImgService.upLoadImg(microLeaflet3_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                        };
                      



                    }

                }
            }]
    )

});

