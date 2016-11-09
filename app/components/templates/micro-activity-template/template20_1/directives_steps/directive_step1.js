"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template20_1/service", "components/scratch_card/app"], function () {
    angular.module("Template20_1Step1.directives", ['Template20_1.Service', 'ScratchCard'])
        .directive("template20by1Step1", [
            "$window", "$q","$timeout", "$rootScope", "template20_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "comboboxService", function ($window,$q, $timeout, $rootScope, template20_1Service, uploadImgService, maskService, promptBarService, commonNetService, comboboxService) {
                return {
                    restrict: 'EA',
                    scope:false,
                    templateUrl: "components/templates/micro-activity-template/template20_1/templates_steps/template_step1.html",
                    link: function (scope, iElement, iAttr) {


                        function init() {
                            //载入加载完才出动画
                            scope.$on("hideLoading", function () {
                                scope.isAnimation = true;
                            });
                        }

                        init();

                        scope.showList = function (type){

                            //是否有人参与报名/助力
                            if (!scope.isActived) {
                                if (type == "Amount") {
                                    var dataList = [{ name: "20", value: 20 },
                                                    { name: "50", value: 50 },
                                                    { name: "100", value: 100 },
                                                    { name: "200", value: 200 },
                                                    { name: "500", value: 500 }];
                                    var info = "请确认代金券面额！分享后，如有人刮开金额或领取了代金券，您无法再次修改面额！";
                                    //初始化下拉组件
                                    comboboxService.showCombobox(dataList, scope.templateModel.couponsAmount, info, setAmountListValue);
                                }
                                else if (type == "Count") {
                                    var dataList = [{ name: "不需要助力，直接领券", value: 0 },
                                                    { name: "10", value: 10 },
                                                    { name: "20", value: 20 },
                                                    { name: "50", value: 50 },
                                                    { name: "80", value: 80 },
                                                    { name: "100", value: 100 }];                                
                                    var info = "请确认助力人数！分享后，如有人刮开金额或领取了代金券，您无法再次修改人数！";
                                    //初始化下拉组件
                                    comboboxService.showCombobox(dataList, scope.templateModel.helperCount, info, setCountListValue);
                                }
                            }
                        }

                        //设置代金券面额
                        function setAmountListValue(item) {
                            scope.templateModel.couponsAmount = item.value;
                        }

                        //设置助力人数
                        function setCountListValue(item) {
                            scope.templateModel.helperCount = item.value;
                        }

                        //刮奖页面参数
                        scope.scratchCardInfo = {
                            eleSelector: ".voucher_scrachCard",//刮奖元素选择器   .scratch||#scratch
                            callback: getHelpAmount, //刮完的回调函数
                            bgUrl: window.resourceDoMain + "/app/img/help_voucher_scratch_bg.png", //覆盖层图片
                        };

                        var isSubmit = true;

                        //刮奖完的回调函数
                        function getHelpAmount() {

                            if (scope.isView) {
                                //后端接口获得刮奖金额

                                var userId = $rootScope.$stateParams.oldUser || $rootScope.$stateParams.Id;
                                
                                if (!isSubmit) {
                                    return;
                                }
                                template20_1Service.voucherScratch(userId, scope.userType).success(function (result) {
                                    isSubmit = false;

                                    if (result.status == 1) {

                                        scope.randomView = result.data.VoucherAmount;

                                        $timeout(function () {
                                                scope.userInfo1.helperNum++;
                                                scope.percentageView = (scope.userInfo1.helperNum / scope.templateModel.helperCount) * 100;

                                                //当前用户刮完后 更新分享信息
                                                var config = scope.setConfigInfo();
                                                commonNetService.setShareMessageReception(config).then(function () {
                                                }, function () {
                                                    promptBarService.showErrorBar("分享信息设置出错", 3000);
                                                });
                                            },709);
                                        //判断是否是最后一个激活者
                                        if (scope.userInfo1.helperNum + 1 == scope.templateModel.helperCount) {
                                            scope.activated = true;
                                        }

                                        scope.userInfo2.isHaveGrow = true;
                                        //显示刮完金额页
                                        scope.case = 4;
                                        //表示是刮完状态
                                        scope.finishScratch = true;

                                    } else {
                                        promptBarService.showErrorBar(result.message);
                                        //代金券已经激活
                                        if (result.error == 1008) {
                                            //跳转回代金券激活页
                                            scope.case = 1;
                                          
                                            scope.userInfo1.helperNum++;
                                            scope.percentageView = 100;

                                            //当前用户刮完后 更新分享信息
                                            var config = scope.setConfigInfo();
                                            commonNetService.setShareMessageReception(config).then(function () {
                                            }, function () {
                                                promptBarService.showErrorBar("分享信息设置出错", 3000);
                                            });
                                        }
                                        
                                    }
                                });
                                return;
                            }
                            else {
                                //前端随机数金额
                                var Range = scope.templateModel.couponsAmount / scope.templateModel.helperCount;
                                var Rand = Math.random()+0.01;
                                scope.randomPreview = (Rand * Range * 2).toFixed(2);

                                $timeout(
                                    function () {
                                        //预览页面剩余助力人数
                                        scope.leftHelper--;
                                        scope.percentagePreview = (1 / scope.templateModel.helperCount) * 100;
                                    },
                                    709
                                );
                                //显示刮完金额页
                                scope.case = 4;
                                //表示是刮完状态
                                scope.finishScratch = true;
                            }
                          
                            if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                                scope.$apply();
                            }
                        }
                    }
                }
            }]
    )

});

