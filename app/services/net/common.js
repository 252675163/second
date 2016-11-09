/**
 * author :小潘
 * time: 2015年9月9日 17:35:08
 * description: 网络服务基础模块
 */
define(["html2canvas", "ionic"], function (html2canvas) {
    return angular.module("services.net.common", []).
        factory("commonNetService", [
            "$http", "$rootScope", "$q", "$timeout", function ($http, $rootScope, $q, $timeout) {


                var shareConfig = null;
                //usage:0微官网，1微活动，2用户上传的图片
                function upLoadImg(fileName, content, usage) {
                    // public JsonResult UploadImage(string fileName, string content, FileUsage usage)

                    var date = {
                        fileName: fileName ? fileName : "",
                        content: content,
                        usage: !angular.isUndefined(usage) ? usage : "1"
                    };
                    return $http.post("/Common/UploadImage", date);
                }

                //口碑图片上传接口
                function upLoadKoubeiImg(fileName, content, usage) {
                    var date = {
                        fileName: fileName ? fileName : "",
                        content: content,
                        usage: !angular.isUndefined(usage) ? usage : "1"
                    };
                    return $http.post("/Koubei/UploadImg", date);
                }

                //新增上传头像接口，分辨率压缩成300*300  by xp 2015年12月9日 21:05:39
                function uploadHeadImg(fileName, content, usage) {
                    var date = {
                        fileName: fileName ? fileName : "",
                        content: content,
                        usage: !angular.isUndefined(usage) ? usage : "1"
                    };
                    return $http.post("/Common/UploadHeadImage", date);
                }

                function uploadImageDs(fileName, content, usage) {
                    // public JsonResult UploadImage(string fileName, string content, FileUsage usage)

                    var date = {
                        fileName: fileName ? fileName : "",
                        content: content,
                        usage: !angular.isUndefined(usage) ? usage : "0"
                    };
                    return $http.post("/Common/UploadImageDS", date);
                }
                //上传营业执照图片，上传文件对象,以formdata形式上传
                function uploadLicenseImage(fileName, file, usage) {
                    var data = {
                        fileName: fileName ? fileName : "",
                        file: file,
                        usage: !angular.isUndefined(usage) ? usage : "0"
                    };
                    return $http({
                        method: 'POST',
                        url: '/Common/UploadLicenseImage',
                        data: data,
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: function(data) {
                            var formData = new FormData();
                            formData.append('fileName', data.fileName);
                            formData.append('file', data.file);
                            formData.append('usage', data.usage);
                            return formData;
                        }
                    });
                }


                //保存后台记录
                function saveBackLog(logObj) {
                    return $http.post("/Common/BackgroundLog", { log: logObj });
                }

                //保存前台记录
                function saveForeLog(logObj) {
                    return $http.post("/Common/ForegroundLog", { log: logObj });
                }
                //日活统计的后台记录
                function addBackgroundOperationLog(logObj) {
                    return $http.post("/Common/NewBackgroundLog", { operationType: logObj });
                }

                function getFgStatistics(originId, type) {
                    return $http.post("/Common/GetFgStatistics", { originId: originId, type: type });
                }


                function showOptionMenu() {
                    window.wx && window.wx.showMenuItems({
                        menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:favorite"]
                    });
                }

                //建议  建议详情 手机号 截图 
                //{ Details: detail, Screenshot: screenShot, Mobile: mobilenum }
                function addSuggest(data) {
                    return $http.post("/Activity/Suggest", data);
                }
                //申诉 模板ID  模板类型  申诉理由 手机号 
                //{ OriginId: originid, TemplateType: templatetype, Details: details, Mobile: mobilenum }
                function addAppeal(data) {
                    return $http.post("/Feedback/Appeal", data);
                }
                //获取申诉理由 模板ID 模板类型
                function getFreezeCause(originid, templatetype) {
                    return $http.get("/Feedback/FreezeCause", { params: { OriginId: originid, TemplateType: templatetype } });
                    //return $http.get("/Feedback/FreezeCause?OriginId="+originid+"&TemplateType="+templatetype);
                }
                //获取申诉理由 冻结表ID
                function FreezeCauseOfscenefreezeId(scenefreezeId) {
                    return $http.get("/Feedback/FreezeCauseOfscenefreezeId", { params: { scenefreezeId: scenefreezeId } });
                    //return $http.get("/Feedback/FreezeCause?OriginId="+originid+"&TemplateType="+templatetype);
                }
                //获取未通过理由Appele ID
                function getAppeleCause(appealId) {
                    return $http.get("/Feedback/AppealFailCause", { params: { AppealId: appealId } });
                    //return $http.get("/Feedback/FreezeCause?OriginId="+originid+"&TemplateType="+templatetype);
                }
                //举报 模板ID 模板类型 举报类型 上传图片s 举报理由 手机号 
                //{ OriginId: originid, TemplateType: templatetype,ReportType:reporttype,Screenshot:screenshot, Details: details, Mobile: mobilenum }
                function addReportforFeedback(data) {
                    return $http.post("/Feedback/Report", data);
                }

                //隐藏菜单
                function hideOptionMenu() {

                    window.wx && window.wx.hideOptionMenu();
                    //                    window.wx.hideMenuItems({
                    //                        menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email"] 
                    //                    });
                }

                //微信分享地址
                function setShareMessage(config) {
                    shareConfig = config;
                    var d = $q.defer();
                    if (shareConfig && !angular.isUndefined($rootScope.isWebchat)) {
                        showOptionMenu();
                        window.wx && window.wx.onMenuShareAppMessage({
                            title: shareConfig.title || "", // 分享标题
                            desc: shareConfig.desc || "", // 分享描述
                            link: shareConfig.link || "", // 分享链接
                            imgUrl: shareConfig.imgUrl || "", // 分享图标
                            type: shareConfig.type || "", // 分享类型,music、video或link，不填默认为link
                            dataUrl: shareConfig.dataUrl || "", // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                d.resolve();
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                d.resolve();
                                // 用户取消分享后执行的回调函数
                            },
                            complete: function () {
                                hideOptionMenu();
                                d.resolve();
                            }
                        });
                        window.wx && window.wx.onMenuShareTimeline({
                            title: shareConfig.title || "", // 分享标题
                            link: shareConfig.link || "", // 分享链接
                            imgUrl: shareConfig.imgUrl || "", // 分享图标
                            success: function () {
                                d.resolve();
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                d.resolve();
                                // 用户取消分享后执行的回调函数
                            },
                            complete: function () {
                                hideOptionMenu();
                                d.resolve();
                            }
                        });

                        window.wx && window.wx.error(function (res) {
                            d.resolve();
                        });

                    } else {
                        $timeout(function () {
                            d.resolve();
                        });

                    }
                    return d.promise;
                }


                //获得shareConfig结构
                function getShareConfig() {
                    return shareConfig;
                }


                //微信分享地址
                function setShareMessageReception(config) {
                    shareConfig = config;
                    var d = $q.defer();
                    if (shareConfig && !angular.isUndefined($rootScope.isWebchat)) {
                        window.wx && window.wx.onMenuShareAppMessage({
                            title: shareConfig.title || "", // 分享标题
                            desc: shareConfig.desc || "", // 分享描述
                            link: shareConfig.link || "", // 分享链接
                            imgUrl: shareConfig.imgUrl || "", // 分享图标
                            type: shareConfig.type || "", // 分享类型,music、video或link，不填默认为link
                            dataUrl: shareConfig.dataUrl || "", // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                d.resolve();
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                d.resolve();
                                // 用户取消分享后执行的回调函数
                            },
                            complete: function () {
                                d.resolve();
                            }
                        });
                        window.wx && window.wx.onMenuShareTimeline({
                            title: shareConfig.title || "", // 分享标题
                            link: shareConfig.link || "", // 分享链接
                            imgUrl: shareConfig.imgUrl || "", // 分享图标
                            success: function () {
                                d.resolve();
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                d.resolve();
                                // 用户取消分享后执行的回调函数
                            },
                            complete: function () {
                                d.resolve();
                            }
                        });

                        window.wx && window.wx.error(function (res) {
                            d.resolve();
                        });

                    } else {
                        $timeout(function () {
                            d.resolve();
                        });

                    }
                    return d.promise;
                }

                //微信分享地址----分享给朋友 2016.5.5 yinglechao
                function setShareAppMessageReception(config) {
                    shareConfig = config;
                    var d = $q.defer();
                    if (shareConfig && !angular.isUndefined($rootScope.isWebchat)) {
                        window.wx && window.wx.onMenuShareAppMessage({
                            title: shareConfig.title || "", // 分享标题
                            desc: shareConfig.desc || "", // 分享描述
                            link: shareConfig.link || "", // 分享链接
                            imgUrl: shareConfig.imgUrl || "", // 分享图标
                            type: shareConfig.type || "", // 分享类型,music、video或link，不填默认为link
                            dataUrl: shareConfig.dataUrl || "", // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                d.resolve();
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                d.resolve();
                                // 用户取消分享后执行的回调函数
                            },
                            complete: function () {
                                d.resolve();
                            }
                        });

                        window.wx && window.wx.error(function (res) {
                            d.resolve();
                        });

                    } else {
                        $timeout(function () {
                            d.resolve();
                        });

                    }
                    return d.promise;
                }
                //重新设置分享链接
                function setShareMessageLink(link) {
                    if (shareConfig) {
                        shareConfig.link = link;
                        return setShareMessageReception(shareConfig);
                    } else {
                        return setShareMessageReception();
                    }

                }
                //页面截图功能     zoom:截图区域
                function screenShot(zoom, userId) {
                    var d = $q.defer();
                    html2canvas(zoom, {
                        onrendered: function (canvas) {
                            var imgBase = canvas.toDataURL("image/jpeg"),
                                data = {
                                    imgBase: imgBase.split(",")[1]
                                },
                                result = { status: 0, data: null, message: "" };
                            $http.post("/activity/GeneratedVoucherResultTempUrl", data).success(function (re) {
                                if (re.status == 1) {
                                    result.status = 1;
                                    result.data = window.location.origin + "/Activity/GetVoucherResultImg?imgKey=" + re.data.imgKey;
                                }
                                else if (re.status == 0 && re.error == 1001) {
                                    re.status = 0;
                                    re.message = re.message;
                                }
                                d.resolve(result);
                            }).error(function () {
                                d.reject(result);
                            })
                        },
                        useCORS: true
                    });
                    return d.promise;
                }

                //获取公告栏是否要显示
                function getUserConfig(configKey) {
                    return $http.post("/Home/GetUserConfig", { configKey: configKey });
                }

                //关闭公告栏后更新状态
                function updateUserConfig(configKey, configValue) {
                    return $http.post("/Home/UpdateUserConfig", { configKey: configKey, configValue: configValue });
                }
                //根据经纬度获取地址信息 location为包含经纬度的对象lat，lon
                //key 为 百度地图API的访问应用 key 值  
                function getGeoToAddress(location) {
                    var d = $q.defer();
                    var url = "//api.map.baidu.com/geocoder/v2/?ak=";
                    var key = window.baiduGetUserLocationApiKey;

                    $http.jsonp(url + key + "&s=1&callback=JSON_CALLBACK&location=" + location.lat + "," + location.lon + "&output=json&pois=1").success(function (res) {
                        if (res.status == 0) {
                            var addressinfo = res.result.addressComponent;
                            var address = { cityName: addressinfo.city, Id: 100 * Math.floor(addressinfo.adcode / 100) };
                            if (address.Id == 0) {
                                address = { cityName: "获取不到位置信息", Id: "0" };
                            }
                            d.resolve(address);
                        } else {
                            d.reject(res)
                        }
                    }).error(function (err) {
                        d.reject(err);
                    });
                    return d.promise;
                }

                function getWxLocation() {
                    var d = $q.defer();
                    wx.ready(function () {
                        wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                                d.resolve(res);
                            },
                            fail: function (err) {
                                d.reject(err);
                            }
                        })
                    })
                    return d.promise;
                }
                //WX 选择图片
                function getWxChooseImg() {
                    var d = $q.defer();
                    wx.ready(function () {
                        wx.chooseImage({
                            // count: 1, // 默认9
                            // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                            // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                            success: function (res) {
                                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                d.resolve(localIds);
                            }
                        });
                    })
                    return d.promise;
                }

                //获取所有城市列表
                function getAllCityDistricts() {
                    return $http.post("/Common/GetAllCityDistricts");
                }

                //获取用户地理位置信息
                function getDistrictByUserId() {
                    return $http.post("/User/GetDistrictByUserId");
                }
                //更新用户地理位置信息
                function updateDistrictByUserId(cityid) {
                    return $http.post("/User/UpdateUserDistrictId", { districtId: cityid });
                }


                //将微信传回的经纬度 转换为百度地图对应的经纬度
                //frommap 转换之前的坐标 地图
                //tomap 转换之后的坐标地图  
                //1：GPS设备获取的角度坐标，wgs84坐标;
                // 2：GPS获取的米制坐标、sogou地图所用坐标;
                // 3：google地图、soso地图、aliyun地图、mapabc地图和amap地图所用坐标，国测局坐标;
                // 4：3中列表地图坐标对应的米制坐标;
                // 5：百度地图采用的经纬度坐标;
                // 6：百度地图采用的米制坐标;
                // 7：mapbar地图坐标;
                // 8：51地图坐标
                //百度API参考文档：http://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition
                //获取实际位置对应经纬度： http://www.gpsspg.com/maps.htm
                //微信SDK开发文档地址：  http://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html#.E8.8E.B7.E5.8F.96.E5.9C.B0.E7.90.86.E4.BD.8D.E7.BD.AE.E6.8E.A5.E5.8F.A3
                //不同地图的经纬度差异参考： http://www.thinksaas.cn/topics/0/335/335401.html
                function transWxtoBaidu(location) {
                    var url = "//api.map.baidu.com/geoconv/v1/?coords=";
                    var key = window.baiduGetUserLocationApiKey;
                    var frommap = 1;
                    var tomap = 5;
                    var d = $q.defer();

                    $http.jsonp(url + location.longitude + "," + location.latitude +
                        "&from=" + frommap +
                        "&to=" + tomap +
                        "&ak=" + key + "&callback=JSON_CALLBACK").success(function (res) {
                            if (res.status == 0) {
                                d.resolve({ lat: res.result[0].y, lon: res.result[0].x });
                            } else {
                                d.reject(res);
                            }
                        }).error(function (err) {
                            d.reject(err);
                        });
                    return d.promise;
                }

                //调用微信JS api 支付
                function jsApiCall(payParameters, callback) {
                    WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    payParameters,//json串
                     function (res) {
                         callback(res);
                     }
                     );
                }

                function callWxPay(payParameters, callback) {
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                        }
                        else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                        }
                        return false;
                    }
                    else {
                        jsApiCall(payParameters, callback);
                        return true;
                    }
                };

                function getMicroShopRouter() {
                    var url = "microshopmanagement/index/product";
                    return window.server + "/MicroShop/IndexRoute?p=" + url;
                }


                //显示菜单
                return {
                    upLoadImg: upLoadImg,
                    uploadHeadImg: uploadHeadImg,
                    saveBackLog: saveBackLog,
                    saveForeLog: saveForeLog,
                    GetFgStatistics: getFgStatistics,
                    addBackgroundOperationLog: addBackgroundOperationLog,
                    setShareMessage: setShareMessage,
                    setShareMessageReception: setShareMessageReception,
                    setShareMessageLink: setShareMessageLink,
                    hideOptionMenu: hideOptionMenu,
                    showOptionMenu: showOptionMenu,
                    getShareConfig: getShareConfig,
                    UploadImageDS: uploadImageDs,
                    addSuggest: addSuggest,
                    addReportforFeedback: addReportforFeedback,
                    addAppeal: addAppeal,
                    getFreezeCause: getFreezeCause,
                    getAppeleCause: getAppeleCause,
                    FreezeCauseOfscenefreezeId: FreezeCauseOfscenefreezeId,
                    getWxChooseImg: getWxChooseImg,
                    screenShot: screenShot,
                    getUserConfig: getUserConfig,
                    updateUserConfig: updateUserConfig,
                    getWxLocation: getWxLocation,
                    getGeoToAddress: getGeoToAddress,
                    getAllCityDistricts: getAllCityDistricts,
                    getDistrictByUserId: getDistrictByUserId,
                    transWxtoBaidu: transWxtoBaidu,
                    updateDistrictByUserId: updateDistrictByUserId,
                    setShareAppMessageReception: setShareAppMessageReception,
                    callWxPay: callWxPay,
                    getMicroShopRouter: getMicroShopRouter,
                    upLoadKoubeiImg: upLoadKoubeiImg,
                    uploadLicenseImage: uploadLicenseImage
                };
            }
        ]);
});