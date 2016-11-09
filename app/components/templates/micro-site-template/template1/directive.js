"use strict";
/**
 * author :yinglechao
 * time: 2015年9月9日 20:59:58
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("MicroTemplate1.directives", [])
        .directive("microTemplate1", [
            "$window", "$timeout", "$rootScope", "microTemplate1Service", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, microTemplate1Service, maskService, promptBarService,commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/template1/template_1.html",
                    link: function (scope, iElement, iAttr) {
                        function init() {
                            //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                            //是否是编辑状态
                            scope.isEdit = scope.status == "edit" ? true : false;
                            //表单初始化数据
                            scope.userInfo = {
                                name: "",
                                phone: "",
                                content:""
                            };
                            //初始化数据
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microTemplate1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            //渲染背景图片
                            iElement[0].getElementsByClassName("section")[0].style.backgroundImage = ' url' + '("' + scope.sectionModel.backgroundImage + '")';
                            iElement[0].getElementsByClassName("section")[0].style.backgroundSize = "100% 100%";
                            scope.$watch('sectionModel.backgroundImage', function (newValue, oldValue, scope) {
                                if (newValue != oldValue) {
                                    iElement[0].getElementsByClassName("section")[0].style.backgroundImage = 'url' + '("' + scope.sectionModel.backgroundImage + '")';
                                }
                            });
                            //if( $rootScope.$stateParams.oldUser){
                            //    scope.userType ="new"
                            //}else{
                            //    scope.userType ="old"
                            //}
                        }

                        init();

                       
                        //表单校验
                        // 姓名为空：请输入您的姓名！
                        //电话号码为空：请输入您的联系电话！
                        //姓名、电话号码均为空：请输入您的姓名和联系电话！
                        //电话号码不正确：请输入真实的手机或座机号码！
                        //意向课程最多输入50个字符！
                        function validForm(){
                            var validState = microTemplate1Service.isValid( scope.userInfo.name, scope.userInfo.phone,scope.userInfo.content);
                            if (validState == 1) {
                                promptBarService.showErrorBar( "请输入您的姓名！",3000);
                                return false;
                            }
                            else if (validState == 3) {
                                promptBarService.showErrorBar( "请输入您的联系电话！",3000);
                                return false;
                            }
                            else if (validState == 4){
                                promptBarService.showErrorBar( "请输入真实的手机或座机号码！",3000);
                                return false;
                            } else if (validState == 5) {
                                promptBarService.showErrorBar("意向课程最多输入50个字符！", 3000);
                                return false;
                            }

                            return true;
                        }

                        //提交表单
                        scope.submitInfo = function () {
                            if(scope.isEdit){
                                return;
                            }
                            //scope.isSubmit是否在提交中
                            if(scope.isSubmit === true){
                                return;
                            }
                            //表单校验
                            if(!validForm()){
                                return;
                            }
                            if (scope.status != "view") {
                                promptBarService.showErrorBar("预览页面无法保存数据！",3000);
                                return;
                            }
                            //如果已经提交过表单，判断提交信息是否有更改
                            if(scope.isHaveSubmit == true){
                                if(angular.equals(scope.oldUserInfo, scope.userInfo)){
                                    promptBarService.showErrorBar("请不要重复提交！",3000);
                                    return;
                                }
                            }
                            //请求 data
                            var data = {
                                WebsiteId: $rootScope.$stateParams.id,//机构
                                Name: scope.userInfo.name,
                                Phone: scope.userInfo.phone,
                                Content:scope.userInfo.content
                            };
                            //保存用户信息
                            scope.isSubmit=true;
                            microTemplate1Service.saveInfo(data).then(function (result) {
                                scope.isSubmit=false;
                                if(result.data.status==1){
                                    scope.isHaveSubmit = true;
                                    scope.oldUserInfo = angular.copy( scope.userInfo);
                                    maskService.showMask("报名成功!",3000);
                                }else{
                                    //错误提示
                                    promptBarService.showErrorBar( result.data.message,3000);
                                }
                            });
                        };

                        
                    }

                };
                }]
    );
});

