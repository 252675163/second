"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroBargain1_2.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microBargain1by2", [
            "$window", "$timeout", "$rootScope", "microBargain1_2Service", "uploadImgService", "maskService", "promptBarService", "multiTextInputService", "textInputCallbackService","commonNetService", function ($window, $timeout, $rootScope, microBargain1_2Service, uploadImgService, maskService, promptBarService,multiTextInputService,textInputCallbackService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_2/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microBargain1_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            //正常逻辑不会进该分支
                            if (!scope.activityOtherConfig) {
                                scope.activityOtherConfig = {};
                            }
                            //价格信息使用scope.activityOtherConfig.activityExtConfig对象  ,截止日使用scope.activityOtherConfig.EndDate
                            if (angular.equals(scope.activityOtherConfig.activityExtConfig, {}) || angular.isUndefined(scope.activityOtherConfig.activityExtConfig)) {
                                scope.activityOtherConfig.activityExtConfig = angular.copy(microBargain1_2Service.activityExtConfig);
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }

                        }
                        //限制input只能输入数字,首位不输入0
                        scope.clearNoNum = function (obj, attr) {
                            obj[attr] = obj[attr].replace(/\D/g, '');
                            obj[attr] = Math.round(obj[attr]).toString();
                        }

                        scope.showPop = function () {
                            if (!scope.isActived) {
                                scope.isShowPop = true;
                                //数值输入弹出框临时数据
                                scope.tempValue = angular.copy(scope.activityOtherConfig.activityExtConfig);
                                scope.templateModel.InitialSpecialPower = (parseInt(scope.activityOtherConfig.activityExtConfig.PreferentialPricePowerCount) + parseInt(scope.activityOtherConfig.activityExtConfig.SpecialPricePowerCount)).toString();
                            }
                        };
                        scope.closePop = function () {
                            scope.isShowPop = false;
                        };
                        scope.reckon = function () {
                            scope.activityOtherConfig.activityExtConfig.InitialPrice = scope.tempValue.InitialPrice;
                            scope.activityOtherConfig.activityExtConfig.PreferentialPricePowerCount = (Math.round(parseInt(scope.templateModel.InitialSpecialPower) * 0.276)).toString();
                            scope.activityOtherConfig.activityExtConfig.PreferentialPrice = (Math.round(parseInt(scope.tempValue.InitialPrice) * 0.618 + parseInt(scope.tempValue.SpecialPrice) * 0.382)).toString();
                            if (parseInt(scope.tempValue.SpecialPriceStock) >= 200) {
                                scope.activityOtherConfig.activityExtConfig.PreferentialPriceStock = "999";
                            }
                            else {
                                scope.activityOtherConfig.activityExtConfig.PreferentialPriceStock = (parseInt(scope.tempValue.SpecialPriceStock) * 5).toString();
                            }   
                            scope.activityOtherConfig.activityExtConfig.SpecialPricePowerCount = (parseInt(scope.templateModel.InitialSpecialPower) - parseInt(scope.activityOtherConfig.activityExtConfig.PreferentialPricePowerCount)).toString();
                            scope.activityOtherConfig.activityExtConfig.SpecialPrice = scope.tempValue.SpecialPrice;
                            scope.activityOtherConfig.activityExtConfig.SpecialPriceStock = scope.tempValue.SpecialPriceStock;
                        }
                        scope.makeTatic = function () {
                            if (parseInt(scope.tempValue.InitialPrice) < 1) {
                                    promptBarService.showErrorBar("请注意，初始价≥1", 3000);
                                    return false;
                                }
                            else if (parseInt(scope.tempValue.SpecialPrice) < 1) {
                                    promptBarService.showErrorBar("请注意，特惠价≥1", 3000);
                                    return false;
                                }
                            else if (parseInt(scope.tempValue.SpecialPriceStock) < 1) {
                                    promptBarService.showErrorBar("请注意，特惠价库存≥1", 3000);
                                    return false;
                                }
                            else if (parseInt(scope.templateModel.InitialSpecialPower) <= 5) {
                                    promptBarService.showErrorBar("请注意，初始价到特惠价的助力人数>5", 3000);
                                    return false;
                                }
                            if (parseInt(scope.tempValue.InitialPrice) <= parseInt(scope.tempValue.SpecialPrice)) {
                                    promptBarService.showErrorBar("请注意，初始价>特惠价", 3000);
                                    return false;
                                }
                                else {
                                    scope.isShowPop = false;
                                    scope.reckon();
                                }
                        }
                        scope.BarginNumInput = function (type) {

                            //回调
                            //设置优惠价
                            var setBarginValue = function() {
                                var value = multiTextInputService.getCurrentValue();
                                var priceValue = Math.round((value[0].currentValue).replace(/[^\d.]/g, ''));
                                var stockValue = Math.round((value[1].currentValue).replace(/[^\d.]/g, ''));

                                if (priceValue < 1) {
                                    promptBarService.showErrorBar("请注意，" + typeName + "≥1", 3000);
                                    return false;
                                }
                                else if (stockValue < 1) {
                                    promptBarService.showErrorBar("请注意，" + typeName + "库存≥1", 3000);
                                    return false;
                                }
                                else if (type == "Preferential" && !(parseInt(scope.activityOtherConfig.activityExtConfig.SpecialPrice) < priceValue && priceValue < parseInt(scope.activityOtherConfig.activityExtConfig.InitialPrice))) {
                                    promptBarService.showErrorBar("请注意，初始价>优惠价>特惠价 ", 3000);
                                    return false;
                                }
                                else if (type == "Special" && parseInt(scope.activityOtherConfig.activityExtConfig.PreferentialPrice) <= priceValue) {
                                    promptBarService.showErrorBar("请注意，初始价>优惠价>特惠价 ", 3000);
                                    return false;
                                }
                                if (type == "Preferential") {
                                    scope.activityOtherConfig.activityExtConfig.PreferentialPrice = priceValue.toString();
                                    scope.activityOtherConfig.activityExtConfig.PreferentialPriceStock = stockValue.toString();
                                }
                                else if (type == "Special") {
                                    scope.activityOtherConfig.activityExtConfig.SpecialPrice = priceValue.toString();
                                    scope.activityOtherConfig.activityExtConfig.SpecialPriceStock = stockValue.toString();
                                }
                                return true;
                            }
                            if (!scope.isActived) {
                                if (type == "Preferential") {
                                    var charType = {
                                        isDiff: false
                                    }
                                    var typeName = "优惠价";
                                    var dataList = [{ name: "优惠价", currentValue: scope.activityOtherConfig.activityExtConfig.PreferentialPrice, maxLength: "5" }, { name: "优惠价库存", currentValue: scope.activityOtherConfig.activityExtConfig.PreferentialPriceStock, maxLength: "3" }];
                                }
                                else if (type == "Special") {
                                    var charType = {
                                        isDiff: false
                                    }
                                    var typeName = "特惠价";
                                    var dataList = [{ name: "特惠价", currentValue: scope.activityOtherConfig.activityExtConfig.SpecialPrice, maxLength: "5" }, { name: "特惠价库存", currentValue: scope.activityOtherConfig.activityExtConfig.SpecialPriceStock, maxLength: "3" }];
                                }
                                multiTextInputService.showTextInput(dataList, setBarginValue, charType);
                            }
                        };

                        //编辑砍价数值
                        scope.showTextInput = function (type) {

                            var setValue = function () {
                                //获得更改后的值
                                var value = textInputCallbackService.getCurrentValue();
                                var checkValue = Math.round(value.replace(/[^\d.]/g, ''));
                                if (type == "InitialPrice" && checkValue < 1) {
                                    promptBarService.showErrorBar("请注意，" + typeName + "≥1", 3000);
                                    return false;
                                }
                                else if (checkValue <= 1) {
                                    promptBarService.showErrorBar("请注意，" + typeName + ">1", 3000);
                                    return false;
                                }
                                else if (type == "InitialPrice" && !(parseInt(scope.activityOtherConfig.activityExtConfig.SpecialPrice) < parseInt(scope.activityOtherConfig.activityExtConfig.PreferentialPrice) && parseInt(scope.activityOtherConfig.activityExtConfig.PreferentialPrice) < checkValue)) {
                                    promptBarService.showErrorBar("请注意，初始价>优惠价>特惠价 ", 3000);
                                    return false;
                                }
                                else {
                                    var data = angular.copy(scope.activityOtherConfig.activityExtConfig);
                                    data[type] = checkValue.toString();
                                    scope.activityOtherConfig.activityExtConfig = data;
                                    return true;
                                }
                            }
                            if (!scope.isActived) {
                                if (type == "InitialPrice") {
                                    var charType = {
                                        type: "InitialPrice",
                                        maxLength: 5,
                                        isDiff: false
                                    }
                                    var typeName = "初始价";
                                }
                                else if (type == "PreferentialPricePowerCount") {
                                    var charType = {
                                        type: "PreferentialPricePowerCount",
                                        maxLength: 4,
                                        isDiff: false
                                    }
                                    var typeName = "初始价砍到优惠价的助力人数";
                                }
                                else if (type == "SpecialPricePowerCount") {
                                    var charType = {
                                        type: "SpecialPricePowerCount",
                                        maxLength: 4,
                                        isDiff: false
                                    }
                                    var typeName = "优惠价砍到特惠价的助力人数";
                                }
                                //回调函数
                                textInputCallbackService.showTextInput(scope.activityOtherConfig.activityExtConfig[type], setValue, charType);
                            }
                        }
                        init();

                    }

                }
            }]
        )

});

