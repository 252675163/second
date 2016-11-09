"use strict";
/**
 * author :yinglechao
 * time: 2016年5月23日 15:03:48
 * description: 微传单下载service
 */

define(["ionic","services/net/activity-preview"], function() {
    return angular.module("LeafletDownload.services", ["services.net.activityPreview", "services.net.templatesModel"])
        .service("leafletDownloadService", [
            "$rootScope", "$q", "activityPreviewNetService",
            function($rootScope,$q,activityPreviewNetService) {
                var service = {};
                //需要打印的传单dom（element）数组
                service.leafletModelList = [];
                //上次一生成传单的数据和生成的结果
                service.createLeafletCache = {
                    leafletModelList: {},
                    result: {}
                };

                service.leafletModel = {
                    key:"",
                    leafletDom:""
                };
                //添加需要打印的传单信息
                service.addLeafletByKey = function(key,leafletDOM){
                    var leafletModelListByKey = service.leafletModelList.filter(function(leafletModel) {
                        //老数据处理
                        return leafletModel.key == key;
                    });
                    if(leafletModelListByKey.length){
                        leafletModelListByKey[0].leafletDom = leafletDOM;
                    }else{
                        var leafletModel = angular.copy(service.leafletModel);
                        leafletModel.key = key;
                        leafletModel.leafletDom =leafletDOM;
                        service.leafletModelList.push(leafletModel);
                    }
                };
                service.getLeafletImgUrlListByActivityId = function(activityId){
                    var leafletDomList = [];
                    for(var i=0;i<service.leafletModelList.length;i++){
                        leafletDomList.push(service.leafletModelList[i].leafletDom);
                    }
                    if (angular.equals(service.createLeafletCache.leafletModelList, service.leafletModelList)) {
                        //如果请求的数据相同，则使用缓存数据
                        var d = $q.defer();
                        d.resolve(service.createLeafletCache.result);
                        return d.promise;
                    }
                    else {
                         return activityPreviewNetService.getLeafletImgUrlList(leafletDomList, activityId).then(
                            function (result) {
                                if (result.data.status==1) {
                                    //缓存数据
                                    service.createLeafletCache = {
                                        leafletModelList: service.leafletModelList,
                                        result: result
                                    };
                                }
                                var d = $q.defer();
                                d.resolve(result);
                                return d.promise;
                            }
                        );
                    }
                    //return activityPreviewNetService.getLeafletImgUrlList(leafletDomList, activityId);


                };
                service.resetLeafletModelList = function(){
                    service.leafletModelList = [];
                };

                return service;
            }
        ]);
});