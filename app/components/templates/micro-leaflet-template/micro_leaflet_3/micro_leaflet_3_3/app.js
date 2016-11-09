"use strict";


define([
    "ionic",
    "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_3/directive",
    "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_3/service",
], function () {

    return angular.module("MicroLeaflet3_3", [
        "ionic",
        "MicroLeaflet3_3.directives",
        "MicroLeaflet3_3.Service",
        //"UploadImg"
    ]);
});
