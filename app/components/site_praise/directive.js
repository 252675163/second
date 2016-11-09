"use strict";
/**
 * author :yinglechao
 * time: 2016年1月6日
 * description:
 */


define(["ionic"], function() {
    angular.module("SitePraise.directive", [])
        .directive("sitePraise", [
                "$window", "$timeout", "$rootScope", "sitePraiseService", "promptBarService", "maskService", function($window, $timeout, $rootScope, sitePraiseService, promptBarService, maskService) {
                    return {
                        restrict: "EA",
                        scope: {
                            isPraise:'=',//是否赞过
                            praiseCount:'='
                        },
                        templateUrl: "components/site_praise/template.html",
                        link: function(scope, iElement, iAttr) {
                            scope.updatePraise = function(){
                                //是否正在提交
                                if(scope.isSubmit){
                                    return
                                }
                                scope.isSubmit = true;
                                sitePraiseService.updatePraise($rootScope.$stateParams.id).then(function(result){
                                    if(result.data.status==1){
                                        scope.isPraise = !scope.isPraise;
                                        //文案todo
                                        if(scope.isPraise){
                                            //promptBarService.showSuccessBar("点赞成功",3000);
                                            scope.praiseCount++;
                                        }else{
                                            //promptBarService.showSuccessBar("取消成功",3000);
                                            scope.praiseCount--;
                                        }
                                    }else{
                                        promptBarService.showSuccessBar(result.data.message,3000);
                                    }
                                    scope.isSubmit = false;
                                },null)
                            }
                          
                        }

                    };
                }
            ]
        );
});