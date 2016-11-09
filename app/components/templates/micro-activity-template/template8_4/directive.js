"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("Template8_4.directives", [])
        .directive("template8by4", [
            "$window", "$timeout","template8_4Service", "uploadImgService",function ($window, $timeout,template8_4Service,uploadImgService ) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template8_4/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template8_4Service.model);
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
                        }
                        init();

                        //图片比例
                        scope.imgAspectRatio = [1.356,1.2,1.356];
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
                            uploadImgService.upLoadImg( template8_4Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]),1,scope.upLoadFinish);
                        };








                    }

                }
            }]
    )

});

