"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroPoster3_2.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microposter3by2", ["microPoster3_2Service", "promptBarService", 
            function (microPoster3_2Service, promptBarService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_2/template.html",
                    link: function (scope, iElement, iAttr) {

                        function init() {

                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microPoster3_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }

                            scope.isEdit = scope.status == "edit" ? true : false;
                            var docEl = document.documentElement;
                            iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + (docEl.clientHeight +1) + "px";

                            microPoster3_2Service.setDescription(scope.templateModel.description);
                        }

                        init();

                        scope.inputconfig = [
                            {
                                width: 500,
                                height: 475,
                                fontSize: 28
                            }
                        ]

                    }

                }
            }]
        )

});

