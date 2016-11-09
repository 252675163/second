/**
 * author :
 * time: 
 * description:
 */
define(["ionic"], function() {
    return angular.module("CommonFilter", [])
        .filter("parseJsonDate", function() {
            //解析服务端返回的json格式的日期到date类型的对象
            return function(dateStr) {
                var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
                var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
                var date;
                if (typeof dateStr === "string") {
                    var a = reISO.exec(dateStr);
                    if (a)
                        date = new Date(dateStr);
                    a = reMsAjax.exec(dateStr);
                    if (a) {
                        var b = a[1].split(/[-+,.]/);
                        date = new Date(b[0] ? +b[0] : 0 - +b[1]);
                    }
                }
                return date;
            };
        })
        .filter("formatJsonDate", [
            "$filter", function($filter) {
                // 将服务端返回的json格式的日期格式化成日期字符串
                // formatStr使用ng的格式化字符串标准
                return function(dateStr, formatStr) {
                    var date = $filter("parseJsonDate")(dateStr);
                    return $filter("date")(date, formatStr);
                };
            }
        ])
        //小潘专用  2015年12月7日 21:48:57
        .filter("formatJsonDate2", [
            "$filter", function($filter) {
                return function(dateStr, formatStr) {
                    var date;
                    if (typeof dateStr === "string" && dateStr.indexOf("Date") != -1) {
                        date = $filter("parseJsonDate")(dateStr);
                    } else {
                        date = dateStr;
                    }

                    return $filter("date")(date, formatStr);
                };
            }
        ])
        //传入时间，与当前时间差几天。返回值int 输入参数:jsonDate
        .filter("diffDate", [
            "$filter", function($filter) {
                var magicNumber = (1000 * 60 * 60 * 24);

                return function(dateStr) {
                    var date = $filter("date")($filter("formatJsonDate2")(dateStr), "yyyy-MM-dd");
                    var now = $filter("date")(new Date(), "yyyy-MM-dd");
                    var oDate = new Date(date);
                    var nDate = new Date(now);

                    var dayDiff = Math.floor((oDate - nDate) / magicNumber);
                    if (angular.isNumber(dayDiff)) {
                        return dayDiff + 1;
                    }
                };
            }
        ])
        //传入时间与当前时间差几天或几小时 返回值 几天/几小时/end
        .filter("diffTime", [
            "$filter", function ($filter) {
                var magicNumber = (1000 * 60 * 60 * 24);

                return function (dateStr) {

                    if (angular.isString(dateStr) && dateStr.indexOf("-") != -1 && dateStr.indexOf("Date") == -1) {
                        dateStr = dateStr.replace(/-/g, "/");
                    }
                    var date = $filter("formatJsonDate2")(dateStr, "yyyy/MM/dd HH:mm:ss");
                    
                    var oDate = new Date(date);
                    var nDate = new Date();

                    var dayDiff = (oDate - nDate) / magicNumber;
                    if (angular.isNumber(dayDiff)) {
                        if (dayDiff > 0 && dayDiff < 1) {
                            return Math.ceil(((oDate - nDate) / magicNumber) * 24) + " 小时";
                        }
                        else if (dayDiff <= 0) {
                            return "end";
                        }
                        else {
                            return Math.ceil(dayDiff) + " 天";
                        }
                    }
                };
            }
        ])
        //转换\n 为<br/> 
        .filter("newlines", function() {
            return function(text) {
                text = text || "";
                return text.replace(/\n/g, "<br/>").replace(/ /g, "&nbsp;");
            };
        })
    //微信头像格式转化   
        .filter("transformWeixinHeadImg", [
            "$filter", function ($filter) {
                return function (imgUrl, size) {
                    if (imgUrl&&imgUrl.search(/wx.qlogo.cn/) >= 0) {
                        imgUrl = imgUrl.slice(0, imgUrl.lastIndexOf("/") + 1) + size;
                    }
                    return imgUrl;
                };
            }
        ])
        //网址识别
        .filter("recogUrl", function () {
            return function (temp, isUseHref) {
                //isDisabledHref 链接是否可用，默认可用
                isUseHref = isUseHref === false ? false : true;
                temp =  temp.replace(/&nbsp;/g, " ");
                var urlreg = /([Hh][Tt]{2}[Pp]:\/\/|[Hh][Tt]{2}[Pp][Ss]:\/\/)?([0-9a-zA-Z\-\~\/\.])*([0-9a-zA-Z\-\~\/\?])\.([0-9a-zA-Z\-\~\/\?\&\=])+/g;
                var httpreg = /([Hh][Tt]{2}[Pp]:\/\/|[Hh][Tt]{2}[Pp][Ss]:\/\/)/;

                if (temp.match(urlreg)) {
                    var urls = temp.match(urlreg);
                    var str = "";
                    for (var i = 0; i < urls.length; i++) {
                        if (isUseHref) {
                            str += temp.substring(0, temp.indexOf(urls[i])) + "<a class=\"recogurl\" href=\"http://" + temp.match(urlreg)[0].replace(httpreg, "") + "\">" + temp.match(urlreg)[0] + "</a>";
                        } else {
                            str += temp.substring(0, temp.indexOf(urls[i])) + "<a class=\"recogurl\" href=\"javascript:void(0);\">" + temp.match(urlreg)[0] + "</a>";
                        }
                        temp = temp.substring(temp.indexOf(urls[i]) + urls[i].length,temp.length);
                    }
                    return str+temp;
                } else {
                    return temp;
                }
            };
        })
//手机号码识别
        .filter("recogTel", function () {
            return function (temp, onlyPhone) {
                //onlyphone默认true，只识别手机号码
                var onlyPhone = onlyPhone === false ? false : true;
                var phones = "", str = "";
                           
                if (onlyPhone) {
                    //只识别手机
                    phones = temp.match(/1[3|4|5|7|8]\d{9}/g);
                } else {
                    //识别手机、座机、400
                    phones = temp.match(/((1[3|5|8|4|7])\d{9})|(400\-?\d{3}\-?\d{3,4})|(0\d{2,3}\-?)?(\d{7,8})/g);
                }

                if (phones && phones.length>0) {
                     for (var i = 0; i < phones.length; i++) {
                         str += temp.substring(0, temp.indexOf(phones[i])) + "<a class=\"recogtel\" href=\"tel:" + phones[i] + "\">" + phones[i] + "</a>"
                        temp = temp.substring(temp.indexOf(phones[i]) + phones[i].length,temp.length);
                    }                  
                    return str+temp;
                } else {
                    return temp;
                }

            };
        })        //传入相差时间时间戳，返回倒计时 x天x小时x分钟x秒
        .filter('DateCount', [function (time) {
            return function (time) {
                var time = Math.round(time / 1000);
                var day = Math.floor(time / 86400);
                var hour = Math.floor((time - day * 86400) / 3600);
                var min = Math.floor((time - day * 86400 - hour * 3600) / 60);
                var sec = time - day * 86400 - hour * 3600 - min * 60;

                if (time <= 0) {
                    return "0天0小时0分钟0秒";
                }
                else {
                    return day + "天" + hour + "小时" + min + "分钟" + sec + "秒";
                }
            };
        }])
        //保留两位小数
        .filter('twoDecimal', [function (number) {

            return function (number) {
                if (number >= 0 && !isNaN(parseFloat(number))) {
                    return parseFloat(number).toFixed(2);
                }
                else {
                    return "";
                }
            };
        }])
        //传入两个时间戳时间戳，返回倒计时 x天x小时x分钟x秒
        .filter('diffSeconds', ["$filter", function ($filter) {
            return function (start, end) {
                var startDate = new Date($filter("formatJsonDate2")(start, "yyyy/MM/dd HH:mm:ss")),
                    endDate = new Date($filter("formatJsonDate2")(end, "yyyy/MM/dd HH:mm:ss")),
                    diffSeconds = (endDate - startDate) / 1000;
                return diffSeconds;
            };
        }])
    //传入两个时间戳时间戳，返回倒计时 x天x小时x分钟x秒
        .filter('leftTimeStr', ["$filter", function ($filter) {
            return function (seconds) {
                var timeStr;
                if (seconds <= 0) {
                    timeStr = "0天0小时0分钟0秒";
                }
                else {
                    var day = Math.floor(seconds / 86400);
                    var hour = Math.floor((seconds - day * 86400) / 3600);
                    var min = Math.floor((seconds - day * 86400 - hour * 3600) / 60);
                    var sec = seconds - day * 86400 - hour * 3600 - min * 60;
                    timeStr = day + "天" + hour + "小时" + min + "分钟" + sec + "秒";
                }
                return timeStr;
            };
        }])
      .filter('parseHeaderImgByConfig', [function (configJSON) {

          return function (configJSON) {
              var headImg = "";
              try {
                  var config = JSON.parse(configJSON);
                  headImg = config.headImg;
              } catch (e) {

              }
              return headImg;
          };
      }])


});
