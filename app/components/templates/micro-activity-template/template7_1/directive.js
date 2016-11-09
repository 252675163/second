"use strict";


define(["ionic"], function () {
    angular.module("microOldNewTemplate7_1.directives", [])
        .directive("microOldNewTemplate71", [
            "$window", "$timeout", "microOldNewTemplate7_1Service", "uploadImgService", function ($window, $timeout, microOldNewTemplate7_1Service, uploadImgService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template7_1/template7_1.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）

                        scope.config = {
                            aspectRatio: 2.525,
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
                        scope.updateImg = function (imgIndex) {
                            if (!scope.isEdit) {
                                return
                            }
                            scope.imgIndex = imgIndex;
                            uploadImgService.upLoadImg(scope.config, 1, scope.upLoadFinish);
                        };

                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microOldNewTemplate7_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;

                            //背景图片
                            iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundImage = ' url' + '("' + scope.sectionModel.backgroundImage + '")';
                            iElement[0].getElementsByClassName("paneabird1")[0].style.backgroundSize = "100% 100%";
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
                            console.log(scope.imgIndex);
                            scope.templateModel.imageUrl[scope.imgIndex] = url;
                            if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                                scope.$apply();
                            }

                        }






                    }

                }
            }]
    )

});

