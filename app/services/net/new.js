/**
 * author :小潘
 * time: 2015年11月5日 16:43:29
 * description: 校宝秀创建新场景 数据服务接口
 */
define(["ionic"], function() {
    return angular.module("services.net.new", []).
        factory("newNetService", [
            "$http", function($http) {

                function getTemplate(pageIndex, pageSize, type) {
                    return $http.post("/Home/GetTemplateDetails", { page: { pageIndex: pageIndex, pageSize: pageSize }, Filter: { Type: type } });
                }


                //获取模板列表详情，包含标签信息
                function getTemplateDetails(pageIndex, pageSize, type) {
                    return $http.post("/Home/GetTemplateDetails", { page: { pageIndex: pageIndex, pageSieze: pageSize }, Filter: { Type: type } });
                }

                
                function getTemplateDetailsByTemplateType(pageIndex, pageSize, type) {
                    return $http.post("/Home/GetTemplateDetailsByTemplateType", { Page: { PageIndex: pageIndex, PageSize: pageSize }, Filter: { TemplateType: type } });
                }

                return {
                    getTemplate: getTemplate,
                    getTemplateDetails: getTemplateDetails,
                    getTemplateDetailsByTemplateType: getTemplateDetailsByTemplateType

                };
            }
        ]);
})