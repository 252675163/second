"use strict";
/**
 * author :wenjun
 * time: 2015年11月23日
 * description:元旦活动模板
 */


define(["ionic"], function () {
    angular.module("Template11_1.directives", [])
        .directive("template11by1", [
            "$window", "$timeout","$rootScope", "template11_1Service", "uploadImgService", "promptBarService", "maskService", "commonNetService", function ($window, $timeout, $rootScope,template11_1Service, uploadImgService, promptBarService, maskService,commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template11_1/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template11_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit= scope.status=="edit"?true:false;

                            //背景图片
                           iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage =   ' url'+'("'+ scope.sectionModel.backgroundImage +'")';
                           iElement[0].getElementsByClassName("bgPan")[0].style.backgroundSize="100% 100%";
                            scope.$watch('sectionModel.backgroundImage',function(newValue,oldValue, scope){
                                if(newValue!=oldValue){
                                    iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage =   'url'+'("'+ scope.sectionModel.backgroundImage +'")';
                                }
                            });

                            // old/new

                            if($rootScope.$stateParams.oldUser){
                                template11_1Service.GetActivityUserInfo($rootScope.$stateParams.oldUser).success(function (result) {
                                    if(result.status==1){
                                        //$scope.oldUserName = result.data.data;
                                        scope.templateModel.description[1]= result.data.Name;
                                    }else{
                                        promptBarService.showErrorBar(result.message,3000);
                                    }

                                },null)
                            }

                        }
                        init();



                    }

                }
            }]
    )

});

