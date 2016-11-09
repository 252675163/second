"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价活动介绍
 */


define(["ionic"], function () {
    angular.module("MicroBargain1_3.directives", [])
        .directive("microBargain1by3", [
           "$window", "$timeout", "$rootScope", "microBargain1_3Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, microBargain1_3Service, uploadImgService, maskService, promptBarService, commonNetService) {
               return {
                   restrict: 'EA',
                   templateUrl: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_3/template.html",
                   link: function (scope, iElement, iAttr) {

                       //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                       function init() {
                           var timeInstance = null;
                           scope.isEdit = scope.status == "edit" ? true : false;
                           scope.isView = scope.status == "view" ? true : false;

                           
                           if (!scope.activityOtherConfig) {
                               scope.activityOtherConfig = {};
                           }

                           if (!scope.activityOtherConfig.endDate) {
                               //默认时间为当前时间加7天                              
                               scope.activityOtherConfig.endDate = new Date();
                               scope.activityOtherConfig.endDate.setDate(scope.activityOtherConfig.endDate.getDate() + 7);
                           }

                           var now = new Date();
                           scope.mydatetime = new Date(scope.activityOtherConfig.endDate);
                           scope.settings = {
                               animate: 'fade',
                               theme: 'material',      // 样式
                               lang: 'zh',    // 语言
                               display: 'bottom',  // 显示位置    
                               mode: 'scroller',//显示方式
                               minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1), //最小值
                               showLabel: true, dayText: '日', monthText: '月', yearText: '年', hourText: '时', //面板中年月日文字
                               dateWheels: "yymmdd",
                               timeWheels: 'HH',
                               minWidth: 70,
                               onSelect: function (valueText) {
                                   scope.activityOtherConfig.endDate = valueText;
                               }//保存日期
                           };


                           scope.showDateTime = function () {
                               timeInstance = this.myInstance;
                               timeInstance.show();
                           }
                           if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                               scope.sectionModel.templateModel = angular.copy(microBargain1_3Service.model);
                               scope.templateModel = scope.sectionModel.templateModel;
                           }

                           //userType old/new
                           if ($rootScope.$stateParams.oldUser) {
                               scope.userType = "new";
                           } else {
                               scope.userType = "old";
                           }

                           //退出时，时间面板消失
                           var stateChangeStart = $rootScope.$on("$stateChangeStart",
                               function (event, toState, toParams, fromState, fromParams) {
                                   if (timeInstance != null) {
                                       timeInstance.destroy();
                                   }
                               });
                           scope.$on("$destroy", function () {
                               //destroy the ui.router [stateChageStart] event
                               stateChangeStart();
                           });

                       }

                       init();

                   }

               }
           }]
    )

});