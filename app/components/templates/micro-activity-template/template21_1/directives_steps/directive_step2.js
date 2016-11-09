"use strict";
/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:37
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template21_1/service", "components/templates/micro-activity-template/template21_2/service", "components/templates/micro-activity-template/template21_3/service"], function () {
    angular.module("Template21_1Step2.directives", ["Template21_1.Service"])
        .directive("template21by1Step2", [
            "$window", "$timeout", "$rootScope", "promptBarService", "template21_2Service", "template21_3Service",
            function ($window, $timeout, $rootScope, promptBarService, template21_2Service, template21_3Service) {
                return {
                    restrict: "EA",
                    scope: false,
                    templateUrl: "components/templates/micro-activity-template/template21_1/templates_steps/template_step2.html",
                    link: function (scope, iElement, iAttr) {
                        var defaultHeadImgUrl = window.resourceDoMain + "/app/img/grow_vegetables_1_photo.png";
                        //表单页用到的数据

                        scope.userInfo = {
                            name: "",
                            phone: "",
                            headImg: ""
                        };

                        function init() {
                            $timeout(function () {
                                    $(".lockMask-loading2").hide();
                            }, 800);

                           

                            //如果是edit 或 preview 状态下 从编辑界面2 3获取数据
                            //编辑预览状态下
                            scope.info = template21_2Service.getTemplateModel().templateModel;//拿到活动信息
                            scope.info1 = template21_3Service.getTemplateModel().templateModel;//拿到机构信息
                            // console.log(scope.info);
                            // console.log(scope.info1);
                            //二维码识别
                            if (ionic.Platform.isAndroid()) {
                                scope.isWebChatQrcode = true;
                            }
                        }

                        init();

                        scope.close = function () {
                            
                            scope.ifshowInfo = false;
                        }

                    }

                };
            }
        ]
        );
});