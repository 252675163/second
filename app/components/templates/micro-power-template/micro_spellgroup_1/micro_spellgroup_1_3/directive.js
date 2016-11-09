"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价活动介绍
 */


define(["ionic", "components/templates/micro-activity-template/template19_6/app"], function () {
    angular.module("MicroSpellgroup1_3.directives", [])
        .directive("microSpellgroup1by3", [
           "$window", "$timeout", "$rootScope", "microSpellgroup1_3Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "template19_6Service", function ($window, $timeout, $rootScope, microSpellgroup1_3Service, uploadImgService, maskService, promptBarService, commonNetService, template19_6Service) {
               return {
                   restrict: 'EA',
                   templateUrl: "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_3/template.html",
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
                               scope.sectionModel.templateModel = angular.copy(microSpellgroup1_3Service.model);
                               scope.templateModel = scope.sectionModel.templateModel;
                           }

                           //userType old/new
                           if ($rootScope.$stateParams.oldUser) {
                               scope.userType = "new";
                           } else {
                               scope.userType = "old";
                           }

                           scope.model6 = template19_6Service.getImgInfo();
                           console.log(scope.model6);

                       }

                       init();

                   }

               }
           }]
    )

});