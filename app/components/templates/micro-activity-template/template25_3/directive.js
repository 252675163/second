"use strict";
/**
 * author :huijuan
 * time: 2516年1月12日
 * description:招生简章模板
 */


define(["ionic"], function () {
    angular.module("Template25_3.directives", [])
        .directive("template25by3", [
            "$window", "$timeout","$rootScope", "template25_3Service", "uploadImgService", "promptBarService", "maskService", "commonNetService", function ($window, $timeout, $rootScope,template25_3Service, uploadImgService, promptBarService, maskService,commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-activity-template/template25_3/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template25_3Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit= scope.status=="edit"?true:false;

                            var docEl = document.documentElement;
                            iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + docEl.clientHeight + "px";

                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }
                            scope.defaultLogo = window.resourceDoMain +"/app/img/leaflet2_logo_alternater2.png"


                        }
                        init();
                        scope.userInfo = {
                            name: "",
                            phone: "",
                            content: ""
                        };
                        scope.submitInfo = function () {
                            if (scope.isEdit) {
                                return;
                            }
                            //scope.isSubmit是否在提交中
                            if (scope.isSubmit == true) {
                                return;
                            }
                            //表单校验
                            if (!validForm()) {
                                return;
                            }
                            if (scope.status != "view") {
                                promptBarService.showErrorBar("预览页面无法保存数据", 3000);
                                return;
                            }
                            //如果已经提交过表单，判断提交信息是否有更改
                            if (scope.isHaveSubmit == true) {
                                if (angular.equals(scope.oldUserInfo, scope.userInfo)) {
                                    promptBarService.showErrorBar("请不要重复提交", 3000);
                                    return;
                                }
                            }

                            //保存数据

                            var date = {
                                ActivityUserId: scope.userType == "new" ? $rootScope.$stateParams.oldUser : "",
                                ActivityId: $rootScope.$stateParams.Id,
                                Name: scope.userInfo.name,
                                Phone: scope.userInfo.phone,
                                Content: ""
                            };

                            scope.isSubmit = true;
                            template25_3Service.saveInfo(date, scope.userType).then(function (result) {
                                scope.isSubmit = false;
                                if (result.data.status == 1) {

                                    maskService.showMask("", 0, true, 2).then(function () {
                                        //$rootScope.$state.go("activity.oldandnewview", { oldUser: result.data.data }, { reload: true });
                                        var link = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                        commonNetService.setShareMessageLink(link).then(function () {
                                            //用户分享或取消分享
                                            maskService.hideMask();
                                        }, function () {
                                            //set微信的link出错
                                            maskService.hideMask();
                                            promptBarService.showErrorBar("分享出错", 3000)
                                        });
                                    });
                                    scope.isHaveSubmit = true;
                                    scope.oldUserInfo = angular.copy(scope.userInfo);
                                } else {
                                    //错误提示
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }

                            }, null);
                        };

                        //表单校验
                        function validForm() {
                            var validState = template25_3Service.isValid(scope.userInfo.name, scope.userInfo.phone);
                            if (validState == 1) {
                                promptBarService.showErrorBar("请输入姓名！", 3000);
                                return false;
                            } else if (validState == 3) {
                                promptBarService.showErrorBar("请输入手机号码！", 3000);
                                return false;
                            } else if (validState == 4) {
                                promptBarService.showErrorBar("请输入真实的手机号码！", 3000);
                                return false;
                            }
                            return true;
                        }

                        //图片比例
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.templateModel.imageUrl[scope.imgIndex] = url;
                                })
                            });
                        };
                        scope.updateImg = function (imgIndex) {
                            if (!scope.isEdit) {
                                return
                            }
                            scope.imgIndex = imgIndex;
                            uploadImgService.upLoadImg(template25_3Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                        };



                    }

                }
            }]
    )

});

