"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description: templateModel就是该模板创建的结构，自定义
 */

define(["ionic","components/templates/new-micro-site-template/template3/service"], function () {
    angular.module("MicroTemplate3.directive", ["MicroTemplate3.service"])
        .directive("microTemplate3", [
            "$window", "$timeout", "microTemplate3Service", "uploadImgService", function ($window, $timeout, microTemplate3Service, uploadImgService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/template3/template_3.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        scope.config = {
                            aspectRatio: 9 / 5,
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
                            minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                            minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300
                        };
                        scope.updateImg = function () {
                            if (!scope.isEdit) {
                                return
                            }
                            //scope.isUpdateImg = true;
                            uploadImgService.upLoadImg(scope.config, 0, scope.upLoadFinish);
                        };
                        scope.isUpdateImg = false;

                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microTemplate3Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            if (scope.status == "edit") {
                                scope.isEdit = true;
                            }
                            else {
                                scope.isEdit = false;
                            }
                            iElement.find("img")[0].src = scope.templateModel.imgUrl;
                            iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundImage = 'url' + '("' + scope.sectionModel.backgroundImage + '")';
                            //iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundSize = "cover";
                            scope.$watch('sectionModel.backgroundImage', function (newValue, oldValue, scope) {
                                if (newValue != oldValue) {
                                    iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundImage = 'url' + '("' + scope.sectionModel.backgroundImage + '")';
                                }

                            });
                        }
                        init();

                        scope.upLoadFinish = function (url) {
                            console.log("上传成功");
                            console.log(url);
                            scope.templateModel.imgUrl= url;

                        }

                    }

                }
            }]
    )

});

