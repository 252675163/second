"use strict";
/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:26
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("MicroPoster3_1Step3.directives", [])
        .directive("microposter3by1Step3", [
            "$window", "$rootScope", "$timeout", "promptBarService", "commonNetService", "microPoster3_1Service", "maskService",
            function ($window, $rootScope, $timeout, promptBarService, commonNetService, microPoster3_1Service, maskService) {
                return {
                    restrict: "EA",
                    scope: true,
                    templateUrl: "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/templates_steps/template_step3.html",
                    link: function (scope, iElement, iAttr) {

                        function init() {
                            $(".lockMask-loading2").hide();
                            scope.userinfo = {
                                name: "",
                                phone: "",
                                description: ""
                            }
                            
                            scope.indextag = microPoster3_1Service.getIndexTag();
                            if (angular.equals(scope.indextag, {})) {
                                microPoster3_1Service.setIndexTag("step1")
                            }
                            var url = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id;
                            var config = commonNetService.getShareConfig();
                            if ($rootScope.$stateParams.oldUser) {
                                url += encodeURIComponent("&oldUser=" + $rootScope.$stateParams.oldUser);
                            }

                            if (scope.indextag.tag == "step1") {//从首页step1跳转过来到step2的请客
                                url += encodeURIComponent("&step=1");
                            } else {                            //从链接 直接进step2的请客  
                                url += encodeURIComponent("&step=2");
                            }

                            var content = microPoster3_1Service.getContent()||microPoster3_1Service.getlocContent().info;
                            if(content){
                                url += encodeURIComponent("&content="+content.replace(/\n/g,'%0A'))
                            }

                            if (scope.isView && $rootScope.$stateParams.oldUser) {
                                microPoster3_1Service.GetActivityUserInfo($rootScope.$stateParams.oldUser).success(function (result) {
                                    if (result.status == 1) {
                                        $rootScope.$state.current.title = "来自【" + result.data.Name + "】的教师节祝福";
                                        if (config) {
                                            config.link = url;
                                            config.title = $rootScope.$state.current.title;
                                            config.desc = "祝亲爱的老师教师节快乐！";
                                            config.imgUrl = config.imgUrl;
                                        }
                                        commonNetService.setShareMessageReception(config);
                                    } else {
                                        promptBarService.showErrorBar(result.message, 3000);
                                    }
                                }, null);
                            } else {
                                /**
                                 *如果是view状态，机构分享出来，标题使用机构填写的内容+格式，直接分享，卡片使用机构后台的卡片内容
                                 *2016.9.6  edit by yinglechao
                                 */
                                if (scope.isView) {
                                    $rootScope.$state.current.title = "来自【" + scope.templateModel.name + "】的教师节祝福";
                                } else {
                                    $rootScope.$state.current.title = "教师节贺卡";
                                }
                              
                            }
                        }
                        init();

                        //动态调整输入框高度
                        scope.$watch('userinfo.description', function (n, o) {
                            var d = iElement.find(".poster3-contentbox")[0];
                            if (n) {
                                if(d.rows>6){
                                     d.rows = 7;
                                }else{
                                     d.rows = !n.match(/\n/g)?0:n.match(/\n/g).length + Math.ceil(n.length * 2 / d.cols);
                                }
                               
                            } else {
                                d.rows = 1;
                            }
                        })

                        //发送祝福
                        scope.isSubmit = false;
                        scope.sendpray = function () {
                            if (scope.isSubmit)
                                return;
                            if (scope.isView) {
                                var tag = microPoster3_1Service.isValid(scope.userinfo.name, scope.userinfo.phone, scope.userinfo.description);
                                if (tag) {
                                    promptBarService.showErrorBar(tag, 5000);//显示错误提示
                                    return;
                                } else {
                                    var data = {
                                        ActivityUserId: "",
                                        ActivityId: $rootScope.$stateParams.Id,
                                        Name: scope.userinfo.name,
                                        Phone: scope.userinfo.phone,
                                        Config:""
                                        // JSON.stringify({ otherInfo: scope.userinfo.description })
                                    };
                                    scope.isSubmit = true;
                                    microPoster3_1Service.saveInfo(data).then(function (result) {   //保存数据
                                        scope.isSubmit = false;
                                        if (result.data.status == 1) {
                                            maskService.showMask("", 0, true, 2);
                                            //保存成功后 更新分享链接
                                            var desc = scope.userinfo.description;
                                            var url = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data + encodeURIComponent("&step=1")
                                            +encodeURIComponent("&content="+desc.replace(/\n/g,'%0A').replace(/&nbsp;/g,"%20").replace(/=/g,"%3D"));
                                            var config = commonNetService.getShareConfig();

                                            if (config) {
                                                config.link = url;
                                                config.title = "来自【" + scope.userinfo.name + "】的教师节祝福";
                                                config.desc = "祝亲爱的老师教师节快乐！";
                                                config.imgUrl = config.imgUrl;
                                            }
                                            commonNetService.setShareMessageReception(config);
                                        } else {
                                            promptBarService.showErrorBar(result.data.message, 3000);
                                        }

                                    }, null);
                                }
                            } else {
                                promptBarService.showErrorBar("预览页面无法保存数据!", 5000);
                            }
                        }
                    }
                };
            }
        ]
        );
});