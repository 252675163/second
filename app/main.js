/**
 * author :小潘
 * time: 2015年9月9日 16:52:26
 * description:  整站仅有一个，避免再次创建，方便发布、压缩、合并
 */
requirejs.config({
    paths: {
        "lib": "lib",
        "directiveMap": "directiveMap",
        "routeState": "routeState",
        "commonService": "commonservices",
        "commonComponets": "commoncomponents",
        'jquery': "libs/jquery/jquery-2.1.4.min",
        "ionic": "libs/ionic/js/ionic.bundle",
        'app': "modules/baseapp/app",
        'slip': "libs/slip/slip",
        'remlib': "libs/ScreenAdaptation",
        "ocLazyLoad": "libs/oclazyload/ocLazyLoad.require",
        'txtinputevent': "libs/jquery/jquery.inputevent",
        'qrCode': "libs/jquery/qrcode.min",
        'cropper': "libs/cropper/cropper.min",
        'localResizeIMG4': "libs/localResizeIMG4/lrz.all.bundle",
        'islider': "libs/islider/iSlider",
        'islider.animate': "libs/islider/iSlider.animate",
        "mobiscrolldatetime": "libs/mobiscrolldatetime/js/mobiscroll.custom-2.17.0.min",
        "es6-promise": "libs/html2canvas/es6-promise.min",
        "html2canvas": "libs/html2canvas/html2canvas.min",
        "echarts": "libs/echart/echarts.min",
        //"micro_leaflet_5": "components/templates/micro-leaflet-template/micro_leaflet_5",
        //"micro_poster": "components/templates/micro-poster-template"
    },
    shim: {
        "ionic": {
            'deps': ["jquery"]
        },
        "directiveMap": {
            'deps': ["ionic"]
        },
        "routeState": {
            'deps': ["directiveMap"]
        },
        "ocLazyLoad": {
            'deps': ["ionic"]
        },
        "modules/baseapp/templatestore": {
            'deps': ["ionic"]
        },
        "ios9patch": {
            'deps': ["ionic"]
        },
        "txtinputevent": {
            'deps': ["jquery"]
        },
        "qrCode": {
            'deps': ["jquery"]
        },
        "islider.animate": {
            'deps': ["islider"]
        },
        "mobiscrolldatetime": {
            'deps': ["ionic"]
        },
        "html2canvas": {
            'deps': ["es6-promise"]
        }
    }
});

require([
    "app", window.wxlib
], function(app, wxlib) {
    window.wx = wxlib;
    //wx config
    if (window.wx) {
        wx.config({
            debug: false,
            appId: window.appId,
            timestamp: window.timestamp,
            nonceStr: window.nonceStr,
            signature: window.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'getLocation', 'getNetworkType', 'chooseImage', 'uploadImage', 'downloadImage', 'previewImage', 'chooseWXPay']
        });
    }
    angular.element(document).ready(function() {
        document.addEventListener("DOMContentLoaded", function(event) {
            if (window.orientation == 90 || window.orientation == -90) {
                document.getElementById("csshardow").style.display = "block";
            }
        });

        window.addEventListener('orientationchange', function(event) {
            if (window.orientation == 180 || window.orientation == 0) {
                document.getElementById("csshardow").style.display = "none";
            }
            if (window.orientation == 90 || window.orientation == -90) {
                document.getElementById("csshardow").style.display = "block";
            }
        });

        //angular.bootstrap(document, ["BaseApp"]);
        changefontSize();
        //
        var permission;
        $.get("/Home/Permission", function(result) {
            permission = result.status;
            var temp = angular.module("BaseApp");
            temp.run([
                "$rootScope", "$state", "$stateParams", "permissionService",
                function($rootScope, $state, $stateParams, permissionService) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                    $rootScope.isWebchat = true;
                    //                    window.wx.checkJsApi({
                    //                        jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    //                        success: function(res) {
                    //                            // 以键值对的形式返回，可用的api值true，不可用为false
                    //                            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    //                            if (res.checkResult.onMenuShareAppMessage && res.checkResult.onMenuShareTimeline) {
                    //
                    //                                $rootScope.isWebchat = true;
                    //                            }
                    //                        }
                    //                    });
                    permissionService.setPermission(permission);
                }
            ]);
            var mobileReg = /(android|iphone|windows phone|ipad|ipod)/;
            if (window.dev || navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger" || !mobileReg.test(navigator.userAgent.toLowerCase())) {
                angular.bootstrap(document, ["BaseApp"]);
            } else {
                if (window.wx) {
                    window.wx.ready(function() {
                        angular.bootstrap(document, ["BaseApp"]);
                    });
                } else {
                    angular.bootstrap(document, ["BaseApp"]);
                }

            }
        });

    });
});