"use strict";
/**
 * author :yinglechao
 * time: 2015年9月9日 20:59:58
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("MicroTemplate6.directives", [])
        .directive("microTemplate6", [
            "$window", "$timeout","microTemplate6Service","uploadImgService", function ($window, $timeout,microTemplate6Service,uploadImgService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/template6/template_6.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        scope.config = {
                            aspectRatio: 48 /31 ,
                            autoCropArea: 0.7,
                            strict: true,
                            guides: false,
                            center: true,
                            highlight: false,
                            dragCrop: false,
                            cropBoxMovable: false,
                            cropBoxResizable: false,
                            zoom: -0.2,
                            checkImageOrigin: true,
                            background: false,
                            //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                            minContainerHeight:  document.documentElement?document.documentElement.clientHeight?document.documentElement.clientHeight:400:400,
                            minContainerWidth: document.documentElement?document.documentElement.clientWidth?document.documentElement.clientWidth:300:300
                        };


                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microTemplate6Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                           scope.isEdit= scope.status=="edit"?true:false;
                           iElement[0].getElementsByClassName("section6")[0].style.backgroundImage =   ' url'+'("'+ scope.sectionModel.backgroundImage +'")';
                            iElement[0].getElementsByClassName("section6")[0].style.backgroundSize="100% 100%";
                            scope.$watch('sectionModel.backgroundImage',function(newValue,oldValue, scope){
                                if(newValue!=oldValue){
                                    iElement[0].getElementsByClassName("section6")[0].style.backgroundImage =   'url'+'("'+ scope.sectionModel.backgroundImage +'")';
                                }
                            });
                        }
                        init();
                        scope.updateImg = function(imgIndex){
                            if(!scope.isEdit){
                                return
                            }
                            scope.imgIndex = imgIndex;
                            //scope.isUpdateImg = true;
                            uploadImgService.upLoadImg( scope.config,0,scope.upLoadFinish);
                        };
                        scope.upLoadFinish = function(url){
                            console.log("上传成功");
                            console.log(url);
                            console.log(scope.imgIndex);
                            scope.templateModel.imageUrl[scope.imgIndex] = url;

                        }
                    }

                }
            }]
    )

});

