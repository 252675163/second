"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 * 
 * 修改时间：2016年6月17日18:29:28    添加举报入口 及举报表单 By 陈雪冬
 */


define(["ionic", "components/feedbackform/service"], function () {
    angular.module("FeedbackForm.directive", ['FeedbackForm.Service'])
        .directive('feedbackForm', ['feedbackFormService', 'uploadImgService', 'commonNetService', '$timeout', 'promptBarService',
            function (feedbackFormService, uploadImgService, commonNetService, $timeout, promptBarService) {
                return {
                    restrict: "E",
                    scope: {
                        tmpobj: "="
                    },
                    templateUrl: "components/feedbackform/template.html",
                    link: function (scope, iElement, iAttr) {
                        console.log(scope);
                        function init() {
                            console.log(scope.tmpobj);

                            scope.data = scope.tmpobj;
                            scope.ifShow = scope.tmpobj.formType;

                            //举报原因
                            scope.feedbackreason = "";
                            scope.selectreason = "";

                            //scope.ifShow = "refreze";
                            //scope.ifShow = "advice";

                            scope.reportList = feedbackFormService.getReportList();

                            if (scope.ifShow == "refreze") {
                                commonNetService.getFreezeCause(scope.data.originId, scope.data.templateType).then(function (res) {
                                    scope.frezeinfo = res.data.data;
                                    scope.frezetime = scope.frezeinfo.FreezeTime;
                                    scope.step = scope.frezeinfo.Details ? 1 : 3;

                                    //console.log(res);
                                })
                            } else {
                                scope.step = 1;
                            }
                            scope.placeimg = window.resourceDoMain + "/app/img/feedbackform-addimg.png";
                        }
                        init();
                        //下一步按钮 校验是否选择 
                        scope.gostep2 = function () {
                            if (scope.selectreason) {
                                scope.step = 2;
                            } else {
                                promptBarService.showErrorBar("请选择一个举报理由", 3000);
                            }
                        }

                        scope.ifsubmit = false;  
                        //提交 按钮 通用  type 弹窗类型 1 举报   2 解冻申诉 3.反馈建议
                        scope.confirm = function (type) {
                            if(scope.ifsubmit)
                                return;
                            scope.ifsubmit = true;

                            if (scope.feedbackreason) {
                                if (feedbackFormService.checkMobilenum(scope.feedbackphone)) {
                                    var data = {
                                        OriginId: scope.data.originId,
                                        TemplateType: scope.data.templateType,
                                        Details: scope.feedbackreason,
                                        Mobile: scope.feedbackphone
                                    }
                                    if (type == 1) {
                                        data.Screenshots = scope.reportImgs.length == 0 ? "" : JSON.stringify(scope.reportImgs);
                                        data.ReportType = scope.selectreason;
                                        commonNetService.addReportforFeedback(data).then(function (res) {
                                            scope.ifsubmit = false;
                                            if (res.status == 401) {
                                                promptBarService.showErrorBar("请不要连续多次举报", 3000);
                                                return;
                                            }
                                            if (res.data.status == 1) {
                                                console.log(res);
                                                scope.step = 3;
                                                // 获取二维码
                                                var logourl = res.data.data.ConcernQRCodeURL;
                                                //解决 安卓机型 二维码不能被识别
                                                if (ionic.Platform.isIOS()) {
                                                    scope.logourl = logourl;
                                                } else {
                                                    scope.logourl = getOssUrlByCdn(logourl);
                                                }

                                            } else {
                                                promptBarService.showErrorBar("请不要连续多次举报", 3000);
                                            }
                                        })
                                    } else if (type == 2) {
                                        commonNetService.addAppeal(data).then(function (res) {
                                            scope.ifsubmit = false;
                                            if (res.data.status == 1) {
                                                //提交解封信息
                                                scope.step = 2;
                                                $timeout(function () {
                                                    //关闭
                                                    ionic.EventController.trigger("showFeedbackForm");
                                                }, 3000)
                                            } else {
                                                promptBarService.showErrorBar(res.data.message, 3000);
                                            }
                                        })
                                    } else {
                                        //Screenshot 
                                        var params = {
                                            Details: scope.feedbackreason,
                                            Mobile: scope.feedbackphone,
                                            Screenshots: scope.reportImgs.length == 0 ? "" : JSON.stringify(scope.reportImgs)
                                        }
                                        commonNetService.addSuggest(params).then(function (res) {
                                            scope.ifsubmit = false;
                                            if (res.status == 401) {
                                                promptBarService.showErrorBar("别点太快啦~", 3000);
                                                return;
                                            }
                                            if (res.data.status == 1) {
                                                scope.step = 2;
                                                $timeout(function () {
                                                    //关闭
                                                    ionic.EventController.trigger("showFeedbackForm");
                                                }, 3000)
                                            } else {
                                                promptBarService.showErrorBar("提交失败", 3000);
                                            }
                                        })
                                    }

                                } else {
                                    scope.ifsubmit = false;
                                    promptBarService.showErrorBar("手机格式不正确", 3000);
                                }
                            } else {
                                scope.ifsubmit = false;
                                var typeText = (type == 1) ? "举报原因" : (type == 2 ? "申诉理由" : "反馈建议");
                                promptBarService.showErrorBar("请输入您的" + typeText, 3000);
                            }
                        }

                        //上一步按钮 与产品确认是否清空第二步已填写信息
                        scope.gostep1 = function () {
                            scope.feedbackreason = "";
                            scope.feedbackphone = "";
                            scope.reportImgs = [];
                            scope.step = 1;
                        };
                        //关闭按钮
                        scope.closeReport = function () {
                            //初始化所有已选项和已填项
                            ionic.EventController.trigger("showFeedbackForm");
                            scope.selectreason = {};
                        }

                        scope.selectReason = function (v) {
                            var old = scope.selectreason || 0;
                            if (old != v.Id) {
                                iElement.find("input[value='" + v.Id + "']+span")[0].classList.add("report-select-text");
                                if (old) {
                                    iElement.find("input[value='" + old + "']+span")[0].classList.remove("report-select-text");
                                }
                                scope.selectreason = v.Id;
                                console.log(v);
                            }
                        }


                        //将cdn上的路径替换成oss
                        function getOssUrlByCdn(cdnUrl) {
                            var ossUrl = "";
                            ossUrl = cdnUrl.replace('http://cdn.schoolpal.cn', 'http://oss.aliyuncs.com/schoolpal');
                            return ossUrl;
                        }

                        //获取屏幕宽高
                        var screenHeight = document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                            screenWidth = document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300;

                        scope.config = {
                            aspectRatio: screenWidth / screenHeight,
                            autoCropArea: 1,
                            strict: true,
                            guides: false,
                            center: true,
                            highlight: false,
                            dragCrop: false,
                            cropBoxMovable: false,
                            cropBoxResizable: false,
                            zoom: 0,
                            checkImageOrigin: true,
                            background: false,
                            //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                            minContainerHeight: screenHeight,
                            minContainerWidth: screenWidth
                        };
                        scope.reportImgs = [];
                        scope.uploadImg = function () {
                            uploadImgService.upLoadImg(scope.config, 1, scope.upLoadFinish);
                        };
                        scope.upLoadFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.reportImgs.push(url);
                                });
                            }, 0);
                        };

                        scope.delteImg = function (img) {
                            scope.reportImgs.pop(img);
                        }

                    }
                }
            }]);
});