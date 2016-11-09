 "use strict";



define(["ionic"], function() {
    angular.module("ConsultContent.directive", [])
        .directive("consultContent", [
            "$window","$compile", "$timeout", "$ionicScrollDelegate","$location"
            ,function($window,$compile, $timeout,$ionicScrollDelegate,$location) {
                return {
                    restrict: "E",
                    templateUrl: "components/consult_item/consult_content/template.html",
                    link: function(scope, iElement, iAttr) {
                       // scope.contentList = [{name:"wohai",value:"我是备注"},{name:"年龄",value:"我是备注1"}];

                    }
                };
            }
        ]
    );
});