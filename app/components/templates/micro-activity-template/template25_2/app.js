"use strict";

define([
    "ionic",
    "components/templates/micro-activity-template/template25_2/directive",
    "components/templates/micro-activity-template/template25_2/service",
], function () {

    return angular.module("Template25_2", [
        "ionic",
        "Template25_2.directives",
        "Template25_2.Service",
        //"UploadImg"
    ]);
});
