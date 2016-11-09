"use strict";

define([
    "ionic",
    "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_2/directive",
    "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_2/service",
], function () {

    return angular.module("MicroLeaflet3_2", [
        "ionic",
        "MicroLeaflet3_2.directives",
        "MicroLeaflet3_2.Service",
        //"UploadImg"
    ]);
});
