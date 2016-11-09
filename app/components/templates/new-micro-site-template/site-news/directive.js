"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("siteNews.directives", ['mobiscroll-datetime'])
        .directive("siteNews", [
            "$window", "$timeout", "$ionicScrollDelegate", "$rootScope","siteNewsService", "WebsiteUploadImgService", "promptBarService", "showImageBigService", "maskService", "commonNetService",
            function ($window, $timeout, $ionicScrollDelegate, $rootScope,siteNewsService, WebsiteUploadImgService, promptBarService, showImageBigService, maskService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/new-micro-site-template/site-news/template.html",
                    link: function (scope, iElement, iAttr) {

                        scope.ShowInageBig = false;

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                if (scope.notRenderEmpty) {
                                }else if(scope.status=="edit"){
                                    scope.sectionModel.templateModel = angular.copy(siteNewsService.getDefaultModel());
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }else{
                                    scope.sectionModel.templateModel = angular.copy(siteNewsService.getDefaultModelByStyle(scope.style));
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }
                                if (scope.status == "showStyle") {
                                    //更改style更新数据为默认的模板数据
                                    scope.$watch('siteModel.style', function (newValue, oldValue, scope) {
                                        if (newValue != oldValue) {
                                            scope.sectionModel.templateModel = angular.copy(siteNewsService.getDefaultModelByStyle(newValue));
                                            scope.templateModel = scope.sectionModel.templateModel;
                                        }
                                    });
                                }


                            }

                            //if(scope.status=="edit") {
                            //    //如果是默认数据且没有保存，edit使用空数据
                            //    if (angular.equals(scope.templateModel, siteNewsService.getDefaultModelByStyle(scope.style))&&($rootScope.$stateParams.websiteId=="0"||!$rootScope.$stateParams.websiteId)) {
                            //        scope.sectionModel.templateModel = angular.copy(siteNewsService.getDefaultModel());
                            //        scope.templateModel = scope.sectionModel.templateModel;
                            //    }
                            //}

                            scope.isEdit = scope.status == "edit" ? true : false;
                           // scope.templateModel.date = new Date(scope.templateModel.date);

                            if (scope.templateModel.News) {
                                for (var i = 0; i < scope.templateModel.News.length; i++) {
                                    scope.templateModel.News[i].date = new Date(scope.templateModel.News[i].date);
                                }
                            }

                            scope.settings = {
                                animate:'fade',
                                theme: 'material',      // Specify theme like: theme: 'ios' or omit setting to use default
                                lang: 'zh',    // Specify language like: lang: 'pl' or omit setting to use default
                                display: 'bottom',  // Specify display mode like: display: 'bottom' or omit setting to use default
                                mode: 'scroller',
                                //todo
                                //onBeforeShow:function(){
                                //    promptBarService.showSuccessBar("更改时间将会重新排序",3000);//层级太低!!!
                                //    return true;
                                //}
                            };

                        }

                        init();

                        scope.addNewNews = function () {
                            if (scope.templateModel.News.length >= 6) {
                                promptBarService.showErrorBar("最多能添加6条机构动态", 3000);
                                return;
                            }
                            scope.templateModel.News.push({ content: "", imageUrl: [], date: new Date() });
                            $ionicScrollDelegate.scrollTop();
                        };

                        scope.addNewImage = function (data) {
                            if (data.imageUrl.length > 5) {
                                promptBarService.showErrorBar("最多能上传6张图片", 3000);
                                return;
                            }
                            scope.data = data;
                            scope.updateImg();
                        };

                        scope.deleteNews = function (data) {
                            if (scope.templateModel.News.length <= 1) {
                                promptBarService.showErrorBar("请至少保留一条机构动态", 3000);
                                return;
                            }
                            for (var i = 0; i < scope.templateModel.News.length; i++) {
                                if (data == scope.templateModel.News[i]) {
                                    var index = i;
                                }
                            }

                            scope.templateModel.News.splice(index,1);
                        };

                        scope.ShowImageBig = function (data, imageIndex) {
                            if(scope.status == "showStyle") {
                                return ;
                            }
                            //for (var i = 0; i < scope.templateModel.News.length; i++) {
                            //    if (data == scope.templateModel.News[i]) {
                            //        var newsIndex = i;
                            //    }
                            //}

                            showImageBigService.setInfo(imageIndex, true , scope.isEdit, data.imageUrl);

                            //scope.newsIndex = newsIndex;
                            //scope.imageIndex = index;
                            //scope.ShowInageBig = true;
                            //$(".cardEdit_modal").one("click", function () {
                            //    $timeout(function () {
                            //        scope.ShowInageBig = false;
                            //    }, 0);
                            //});
                            //$ionicSlideBoxDelegate.update();
                        };


                        //scope.deleteImage = function () {
                        //    scope.templateModel.News[scope.newsIndex].imageUrl.splice(scope.imageIndex, 1);
                        //    scope.ShowInageBig = false;
                        //}

                        //scope.onSlideChanged = function (index) {
                        //    scope.imageIndex = index;
                        //}
                   
                        //scope.closeImageBig = function () {
                        //    scope.ShowInageBig = false;
                        //}
                        //图片比例
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function(url){
                            $timeout(function(){
                                scope.$apply(function(){
                                    //scope.templateModel.imageUrl[scope.imgIndex] = url;
                                    //scope.templateModel.News[scope.index].imageUrl.push(url);
                                    scope.data.imageUrl.push(url);
                                })
                            });
                        };
                        scope.updateImg = function(){
                            if(!scope.isEdit){
                                return
                            }
                            WebsiteUploadImgService.upLoadImg(siteNewsService.getConfigByAspectRatio(scope.imgAspectRatio[0]), 0 , scope.upLoadFinish);
                        };


                        //onBeforeShow
                        //onBeforeShow
                    }

                }
            }]
    )

});

