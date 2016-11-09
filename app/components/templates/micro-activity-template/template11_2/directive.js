"use strict";
/**
 * author :wenjun
 * time: 2015年11月23日
 * description:元旦活动模板
 */


define(["ionic", "components/templates/micro-activity-template/template11_3/service"], function () {
    angular.module("Template11_2.directives", [])
        .directive("template11by2", [
            "$window", "$timeout", "$rootScope", "template11_2Service",  "uploadImgService", "promptBarService", "maskService", "commonNetService","template11_3Service", function ($window, $timeout, $rootScope, template11_2Service, uploadImgService, promptBarService, maskService, commonNetService,template11_3Service) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template11_2/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template11_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;

                            template11_3Service.tempInfo = scope.templateModel.description;

                            //背景图片
                           iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage =   ' url'+'("'+ scope.sectionModel.backgroundImage +'")';
                           iElement[0].getElementsByClassName("bgPan")[0].style.backgroundSize="100% 100%";
                            scope.$watch('sectionModel.backgroundImage',function(newValue,oldValue, scope){
                                if(newValue!=oldValue){
                                    iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage =   'url'+'("'+ scope.sectionModel.backgroundImage +'")';
                                }
                            });


                            // old/new

                            if ($rootScope.$stateParams.oldUser) {
                                template11_2Service.GetActivityUserInfo($rootScope.$stateParams.oldUser).success(function (result) {
                                    if (result.status == 1) {
                                        //$scope.oldUserName = result.data.data;
                                        scope.templateModel.description = JSON.parse((result.data.Config)).otherInfo;
                                    } else {
                                        promptBarService.showErrorBar(result.message, 3000);
                                    }

                                }, null)
                            }

                        }
                        init();

                       
                        //图片比例
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function(url){
                            $timeout(function(){
                                scope.$apply(function(){
                                    scope.templateModel.imageUrl[scope.imgIndex] = url;
                                })
                            });
                        };
                        scope.updateImg = function(imgIndex){
                            if(!scope.isEdit){
                                return
                            }
                            scope.imgIndex = imgIndex;
                            uploadImgService.upLoadImg( template11_2Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]),1,scope.upLoadFinish);
                        };

                    }

                }
            }]
    )

});

