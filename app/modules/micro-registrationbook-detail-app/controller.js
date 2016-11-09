"use strict";
/**
 * author :lv li、xu jie、jiawen xu、zhoudewei
 * update time: 2016/10/8
 * description:咨询本详情页
 */

define(["ionic", "modules/micro-registrationbook-detail-app/services", "components/textinput_callback/app"],
    function() {
        return angular.module("MicroRegistrationbookDetailApp.controllers", ["MicroRegistrationBookDetailApp.services", "TextInputCallback"])
            .controller("microRegistrationbookDetailAppController", [
                "$scope", "$filter", "$q", "$rootScope", "promptBarService", "commonNetService", "microRegistrationbookDetailAppService", "$ionicPopup", "$timeout", "maskService", "$ionicScrollDelegate", "singleThreadedNetService", "textInputCallbackService", "comboboxService", "permissionService", "$stateParams",
                function($scope, $filter, $q, $rootScope, promptBarService, commonNetService, microRegistrationbookDetailAppService, $ionicPopup, $timeout, maskService, $ionicScrollDelegate, singleThreadedNetService, textInputCallbackService, comboboxService, permissionService, $stateParams) {
                    // $scope.userInfo = $scope.singleStdentMsg;
                    $scope.userInfo = {
                        "LatestInteractiveRecord": null,
                        "CommuContent": null,
                        "CommuResult": null,
                        "CommuTime": "",
                        "EditDate": "",
                        "Id": 0,
                        "UserId": 0,
                        "DistrictId": 0,
                        "Phone": "",
                        "Name": "",
                        "WeChatNumber": null,
                        "HeadImgUrl": "",
                        "CreatedAt": "",
                        "IsActive": false,
                        "IsTop": false,
                        "RecentInteractiveAt": "",
                        "FollowUpStatus": null,
                        "RecentVisitAt": "",
                        "RecentContactAt": "",
                        "Content": null,
                        "Interest": 0,
                        "Sex": 0,
                        "LessonClassName": null,
                        "SecondLessonClassName": null,
                        "ThirdLessonClassName": null,
                        "Enrolled": false,
                        "LessonClassId": 0,
                        "SecondLessonClassId": 0,
                        "ThirdLessonClassId": 0,
                        "SalesMan": null
                    };
                    var pageSize = 10;
                    //分别是咨询跟进和沟通记录索引
                    var pageIndex = 1;
                    var pageIndex2 = 1;
                    $scope.regbookUserRecord = [];
                    $scope.commuPage = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };
                    $scope.page = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };
                    var userId = $rootScope.$stateParams.id;
                    //是否加载完信息显示本地标签
                    $scope.isTagMsgShow = false;
                    var headBgcolor = ["#6090cd", "#90d355", "#fec42c", "#e3547f", "#ff7f5d", "#49c5d8"];
                    $scope.getHeadImageBg = function(name) {
                            if (name.length > 0) {
                                return headBgcolor[name[0].charCodeAt() % 6];
                            }
                        }
                        //学生信息是否加载完成
                    $scope.hasMsgDone = false;
                    //沟通跟进是否加载完成
                    $scope.hasCommuLoad = false;
                    //显示基本信息
                    $scope.showPage = $stateParams.showPage || 0;
                    //显示意向选择列表
                    $scope.isIntentionListShow = false;
                    //显示销售员
                    $scope.isSalesmanShow = false;
                    //沟通跟进列表
                    $scope.commuList = [
                        //{
                        // time: "/Date(1471596511000+0800)/",
                        // data: [{
                        //     "Id": 2618854,
                        //     "CreatedTime": "/Date(1468832514000+0800)/",
                        //     "IsRemind": false,
                        //     "RemindDate": "/Date(1468893600000+0800)/",
                        //     "IsDone": false,
                        //     "Content": "这是一个<a href='http://www.baidu.com'>百度</a>啊",
                        //     "DataType": 1
                        // }]
                        //}
                    ];
                    //课程列表显示
                    $scope.isCourseShow = false;
                    $scope.courseListData = []; //后端调取课程列表
                    $scope.repeatCourse = []; //重复的课程
                    $scope.courseListDataAfterFilter = []; //去重后的课程
                    $scope.courseIndex = 0; //选择课程的index
                    $scope.selectCourseData = ["", "游泳", ""]
                    $scope.selectCourseNow = { index: 0, course: "" };
                    //传入id数组，返回$scope.courseListData数组的index
                    var retrunRepeatIndexArray = function(mArr) {
                        if (mArr.length == 0) { return } else {
                            var indexArr = [];
                            mArr.forEach(function(val) {
                                if (val == 0) { return } else {
                                    for (var i = 0; i < $scope.courseListData.length; i++) {
                                        if ($scope.courseListData[i].Id == val) {
                                            indexArr.push(i);
                                            break;
                                        } else {
                                            continue;
                                        }
                                    }
                                }
                            });
                            return indexArr
                        }
                    }
                    var courseFilter = function(errorCourseId1, errorCourseId2) {
                            var indexArray = retrunRepeatIndexArray([errorCourseId1, errorCourseId2]);
                            if (indexArray && indexArray.length > 0) {
                                var reverseArray = indexArray.sort().reverse();
                                // $scope.courseListDataAfterFilter = $scope.courseListData;
                                var arrS = angular.copy($scope.courseListData);
                                reverseArray.forEach(function(value) {
                                    arrS.splice(value, 1)
                                })
                                return arrS
                            } else if (
                                indexArray && indexArray.length == 0
                            ) { return $scope.courseListData };
                        }
                        //选择课程
                    $scope.selectCourseShow = singleThreadedNetService(function(index, errorCourseId1, errorCourseId2) {
                        if (errorCourseId1) {
                            $scope.repeatCourse.push(errorCourseId1);
                        }
                        if (errorCourseId2) {
                            $scope.repeatCourse.push(errorCourseId2);
                        }
                        $scope.courseIndex = index;
                        if ($scope.courseListData.length == 0) {
                            return microRegistrationbookDetailAppService.getLesson().then(function(result) {
                                if (result.data.status == 1) {
                                    if (result.data.data) {
                                        $scope.courseListData = result.data.data;
                                        $scope.courseListDataAfterFilter = courseFilter(errorCourseId1, errorCourseId2);
                                        // $scope.courseListDataAfterFilter = courseFilter(index, $scope.courseListData);
                                        $scope.isCourseShow = true;
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            })
                        } else {
                            $scope.courseListDataAfterFilter = courseFilter(errorCourseId1, errorCourseId2);
                            $scope.isCourseShow = true;
                        }

                    });

                    $scope.chooseCourse = singleThreadedNetService(
                        function(item) {
                            var data = angular.copy($scope.userInfo);
                            var index = $scope.courseIndex;
                            if (index == 1) {
                                //意向课程1埋点
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', "/clientdetail/commuinfo/interestcourse1"]);
                                }
                                data.LessonClassName = item.LessonClassName;
                                data.LessonClassId = item.Id;
                                if (item.Id == $scope.userInfo.LessonClassId) { $scope.isCourseShow = false; return }
                            } else if (index == 2) {
                                //意向课程2埋点
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', "/clientdetail/commuinfo/interestcourse2"]);
                                }
                                data.SecondLessonClassName = item.LessonClassName;
                                data.SecondLessonClassId = item.Id;
                                if (item.Id == $scope.userInfo.SecondLessonClassId) { $scope.isCourseShow = false; return }
                            } else if (index == 3) {
                                //意向课程3埋点
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', "/clientdetail/commuinfo/interestcourse3"]);
                                }
                                data.ThirdLessonClassName = item.LessonClassName;
                                data.ThirdLessonClassId = item.Id;
                                if (item.Id == $scope.userInfo.SecondLessonClassId) { $scope.isCourseShow = false; return }
                            }
                            return microRegistrationbookDetailAppService.updateRegBookUser(data).then(function(result) {
                                $scope.isCourseShow = false;
                                if (result.data.status == 1) {
                                    $scope.userInfo = data;
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }
                    )



                    //销售员列表
                    $scope.salesmanListData = [];
                    //显示销售员列表
                    $scope.showSalesman = singleThreadedNetService(function() {
                        var level = $scope.erpUserInfo.Level;
                        if ($scope.erpUserInfo.UserId != 0 && level != 0 && level != 1 && level != 4 && level != 6) {
                            return
                        }
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/clientdetail/commuinfo/salesman"]);
                        }
                        if ($scope.salesmanListData.length == 0) {
                            return microRegistrationbookDetailAppService.getSaleManList().then(function(result) {
                                if (result.data.status == 1) {
                                    if (result.data.data) {
                                        $scope.salesmanListData = result.data.data
                                        $scope.isSalesmanShow = true;
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            })
                        } else {
                            $scope.isSalesmanShow = true;
                        }

                    });

                    //关闭销售员或者课程列表
                    $scope.closeSalesman = function() {
                        $scope.isSalesmanShow = false;
                        $scope.isCourseShow = false;
                    }

                    //选择销售员列表
                    $scope.chooseSalesman = function(item) {
                        $scope.isSalesmanShow = false;
                        var confirmPopup = $ionicPopup.confirm({
                            template: "确认设置" + item + "为该线索的销售员吗？",
                            cancelText: "取消",
                            cancelType: 'btn-blue-clear',
                            okText: "确认",
                            okType: 'btn-blue-clear'
                        });
                        // 选择销售员回调
                        confirmPopup.then(function(res) {
                            if (res) {
                                if (item == $scope.userInfo.SalesMan) {
                                    $scope.isSalesmanShow = false;
                                    return
                                } else {
                                    var data = angular.copy($scope.userInfo);
                                    data.SalesMan = item;
                                    microRegistrationbookDetailAppService.updateRegBookUser(data).then(function(result) {
                                        if (result.data.status == 1) {
                                            $scope.userInfo = result.data.data;
                                            $scope.isSalesmanShow = false;
                                        } else {
                                            promptBarService.showErrorBar(result.data.message, 3000);
                                        }
                                    });

                                }
                            } else {
                                return;
                            }
                        });
                    }

                    //背景颜色数组
                    var colorArr = new Array("6090cd", "90d355", "fec42c", "e3547f", "ff7f5d", "49c5d8");
                    //勾选回访提醒
                    $scope.toggleCheck = singleThreadedNetService(function(node) {

                        // 完成接口
                        var commuId = node.sItem.Id;
                        var isDone = !node.sItem.IsDone;
                        return microRegistrationbookDetailAppService.scheduleDone(commuId, isDone).then(function(result) {
                            if (result.data.status == 1) {
                                //咨询提醒勾选完成埋点
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', "/clientdetail/commuinfo/finished"]);
                                }
                                node.sItem.IsDone = isDone;
                                if (isDone) {
                                    //弹窗埋点
                                    if (window._hmt) {
                                        window._hmt.push(['_trackPageview', "/clientdetail/commuinfo/finished/addcommu"]);
                                    }
                                    var confirmPopup = $ionicPopup.confirm({
                                        template: "是否对该咨询添加沟通记录？",
                                        cancelText: "取消",
                                        cancelType: 'btn-blue-clear',
                                        okText: "确认",
                                        okType: 'btn-blue-clear'
                                    });
                                    confirmPopup.then(function(res) {
                                        if (res) {
                                            $scope.isRecordShow = true;
                                            //弹窗确认埋点
                                            if (window._hmt) {
                                                window._hmt.push(['_trackPageview', "/clientdetail/commuinfo/finished/do"]);
                                            }
                                        } else {
                                            //弹窗取消埋点
                                            if (window._hmt) {
                                                window._hmt.push(['_trackPageview', "/clientdetail/commuinfo/finished/undo"]);
                                            }
                                            return;
                                        }
                                    });
                                } else {
                                    return
                                }

                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                        // console.log(node.sItem.IsDone)

                    })

                    //显示关闭意向选择列表
                    $scope.toggleIntentionList = function() {
                        $scope.isIntentionListShow = !$scope.isIntentionListShow
                    }

                    $scope.selectIntentionList = singleThreadedNetService(
                        function(interest) {
                            if (interest == $scope.userInfo.Interest) {
                                $scope.isIntentionListShow = false;
                                return
                            } else {
                                var data = angular.copy($scope.userInfo);
                                data.Interest = interest;
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', "/clientdetail/intention"]);
                                }
                                return microRegistrationbookDetailAppService.updateRegBookUser(data).then(function(result) {
                                    $scope.isIntentionListShow = false;
                                    if (result.data.status == 1) {
                                        $scope.userInfo = result.data.data;
                                        resetCommuList();
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                            }

                        }
                    );

                    //编辑个人信息
                    $scope.showText = function(type) {

                        if (type == "Name") {
                            var charType = {
                                type: "Name",
                                maxLength: 15,
                                isDiff: false
                            };
                            if (window._hmt) {
                                //修改姓名埋点
                                window._hmt.push(['_trackPageview', "/clientdetail/name"]);
                            }
                        } else if (type == "Phone") {
                            var charType = {
                                    type: "Phone",
                                    maxLength: 15,
                                    isDiff: false
                                }
                                //电话号埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/clientdetail/phonenumber"]);
                            }
                        } else if (type == "WeChatNumber") {
                            var charType = {
                                type: "WeChatNumber",
                                maxLength: 30,
                                isDiff: false
                            }
                            if (window._hmt) {
                                //微信号埋点
                                window._hmt.push(['_trackPageview', "/clientdetail/wechatID"]);
                            }
                        } else if (type == "Content") {
                            var charType = {
                                    type: "Content",
                                    maxLength: 100,
                                    isDiff: false
                                }
                                //其他信息埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/clientdetail/otherinfo"]);
                            }
                        }


                        var setValue = function() {
                                //获得更改后的值
                                var value = textInputCallbackService.getCurrentValue();

                                var data = angular.copy($scope.userInfo);
                                data[type] = value;

                                if (type == "Phone") {
                                    var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                                    //      console.log(phoneRegexp.test(phone));
                                    if (!phoneRegexp.test(value)) {
                                        promptBarService.showErrorBar("请输入真实的手机号码！", 3000); //号码不正确
                                        return;
                                    }
                                }

                                microRegistrationbookDetailAppService.updateRegBookUser(data).then(function(result) {
                                    if (result.data.status == 1) {
                                        $scope.userInfo = result.data.data;
                                        // var visitDateTime = $filter('formatJsonDate')(result.data.data.RecentVisitAt, "yyyy/MM/dd HH:mm");
                                        // $scope.userInfo.RecentVisitAt = parseInt(visitDateTime.substr(0, 4)) < 2000 ? null : visitDateTime; //判断返回的日期
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                            }
                            //更改的字段，回调函数，输入限制
                        textInputCallbackService.showTextInput($scope.userInfo[type], setValue, charType);
                    }

                    //拨打电话百度统计U
                    $scope.callPhone = function() {
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/clientdetail/call"]);
                        }
                    }

                    //更改跟进状态 客户状态 性别 
                    $scope.showList = function(type) {
                        var info = "";
                        switch (type) {
                            case 0:
                                //跟进状态
                                var dataList = [{ name: "待跟进", value: 1 },
                                    { name: "跟进中", value: 2 },
                                    { name: "已到访", value: 5 },
                                    { name: "已失效", value: 4 },
                                    { name: "取消", value: 6 }
                                ];
                                var setFollowUpStatus = function(item) {
                                    if (item.name == "取消") {
                                        return
                                    } else {
                                        //修改跟进状态埋点
                                        if (window._hmt) {
                                            window._hmt.push(['_trackPageview', "/clientdetail/status"]);
                                        }
                                        var data = angular.copy($scope.userInfo);
                                        data.FollowUpStatus = item.value;
                                        microRegistrationbookDetailAppService.updateRegBookUser(data).then(function(result) {
                                            if (result.data.status == 1) {
                                                $scope.userInfo = result.data.data;
                                                resetCommuList();
                                            } else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            }
                                        });
                                    }
                                }
                                comboboxService.showCombobox(dataList, $scope.userInfo.FollowUpStatus, info, setFollowUpStatus);
                                break;
                            case 1:
                                //性别
                                var sexList = [{ name: "男", value: 1 },
                                    { name: "女", value: 2 },
                                    { name: "取消", value: 3 }
                                ];
                                var setSex = function(item) {
                                    if (item.name == "取消") {
                                        return
                                    } else {
                                        //性别修改埋点
                                        if (window._hmt) {
                                            window._hmt.push(['_trackPageview', "/clientdetail/status"]);
                                        }
                                        var data = angular.copy($scope.userInfo);
                                        data.Sex = item.value;
                                        microRegistrationbookDetailAppService.updateRegBookUser(data).then(function(result) {
                                            if (result.data.status == 1) {
                                                $scope.userInfo = result.data.data;
                                            } else {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            }
                                        });
                                    }
                                }

                                comboboxService.showCombobox(sexList, $scope.userInfo.sex, info, setSex);
                                break;
                            default:
                                break;
                        }

                    }


                    //置顶操作U
                    $scope.toggleStar = singleThreadedNetService(function() {
                        var userId = $scope.userInfo.Id;
                        var isLight = !$scope.userInfo.IsTop;
                        //学员标星埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/clientdetail/star"]);
                        }

                        return microRegistrationbookDetailAppService.updateRegBookUserTopStatus(userId, isLight).then(function(result) {
                            if (result.data.status == 1) {
                                $scope.userInfo.IsTop = isLight;
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        });
                    });

                    //更改列表页
                    $scope.showTabPage = function(a) {
                        $scope.showPage = a;
                        $ionicScrollDelegate.scrollTop();
                        //基本信息、互动记录、沟通记录百度统计埋点
                        if (a == 1) {
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/clientdetail/basicinfo"]);
                            }
                        } else if (a == 0) {
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/clientdetail/commuinfo"]);
                            }
                            resetCommuList();
                        } else {
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/clientdetail/interact"]);
                            }
                        }
                    }

                    //数据渲染
                    $scope.renderDataList = function(list, renderType) {
                        //renderType:"reset"/"add"
                        //renderType默认为“reset”
                        for (var i = 0; i < list.length; i++) {
                            list[i].uiModel = {
                                activityTitle: list[i].ConsultData.SceneTitle, //场景名称
                                content: list[i].ConsultData.Content, //JSONOrString 备注字段
                                introducerName: list[i].ConsultData.IntroducerName, //介绍人姓名
                                introducerPhone: list[i].ConsultData.IntroducerPhone, //介绍人电话
                                amount: list[i].ConsultData.Amount, //助力行模板得到的助力数
                                otherInfo: list[i].ConsultData.OtherInfo
                            };
                        }
                        if (!renderType) {
                            renderType = "reset";
                        }

                        if (renderType == "add") {
                            $scope.list = $scope.list.concat(list);
                        } else {
                            $scope.list = list;
                        }
                    };
                    //重置跟进信息
                    var resetCommuList = function() {
                            pageIndex = 1;
                            return microRegistrationbookDetailAppService.getConsultFollowingUp(pageIndex, pageSize, userId).then(function(result) {
                                if (result.data.status == 1) {
                                    if (result.data.data.list) {
                                        $scope.commuList = [];
                                        $scope.commuList = appendData($scope.commuList, result.data.data.list, true);
                                        $scope.commuPage = result.data.data.page;
                                    }
                                    $scope.hasCommuLoad = true;
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            })
                        }
                        //重置互动记录
                    var resetRegbookUserRecord = function() {
                            pageIndex2 = 1;
                            microRegistrationbookDetailAppService.getRegbookUserRecordByRegBookUserId(userId, pageIndex2, pageSize).then(function(result) {
                                if (result.data.status == 1) {
                                    if (result.data.data) {
                                        $scope.regbookUserRecord = [];
                                        $scope.regbookUserRecord = appendData($scope.regbookUserRecord, result.data.data.list, false);
                                        $scope.page = result.data.data.page;
                                    }
                                } else {
                                    promptBarService.showErrorBar(result.data.message, 3000);
                                }
                            });
                        }
                        //去除字符串两边空格
                    $scope.stringTrim = function(string) {
                        if (string) {
                            return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        } else {
                            return string;
                        }
                    }

                    //添加沟通记录
                    $scope.isRecordShow = false;
                    $scope.marketTime = null;
                    $scope.communication = { textNum: 0, text: "" };
                    $scope.showCommunication = function() {
                        //添加沟通记录埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/clientdetail/commuinfo/addcommu"]);
                        }
                        $scope.communication.text = "";
                        $scope.marketTime = null;
                        $scope.isRecordShow = true;
                    }
                    var timeInstance = null;
                    var timeInstance2 = null;
                    var now = new Date();
                    $scope.settings = {
                        animate: 'fade',
                        theme: 'material', // 样式
                        lang: 'zh', // 语言
                        mode: 'mixed',
                        defaultValue: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10),
                        display: 'bottom', // 显示位置
                        buttons: [
                            'clear',
                            'set',
                            'cancel'
                        ],
                        clearText: '删除回访提醒',
                        minWidth: 50, //只有年月日时 可以设70
                        context: '.datetime-select'
                    };
                    $scope.settings2 = {
                        animate: 'fade',
                        theme: 'material', // 样式
                        lang: 'zh', // 语言
                        mode: 'mixed',
                        defaultValue: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10),
                        display: 'bottom', // 显示位置
                        buttons: [
                            'set',
                            'cancel'
                        ],
                        minWidth: 50, //只有年月日时 可以设70
                        context: '.datetime-select'
                    };
                    $scope.showDateTime = function() {
                        if ($scope.marketTime == null) {
                            timeInstance2 = this.myInstance2;
                            timeInstance2.show();
                        } else {
                            timeInstance = this.myInstance;
                            timeInstance.show();
                        }

                    }
                    $scope.communicationRecordConfirm = singleThreadedNetService(function() {
                        var content = $scope.stringTrim($scope.communication.text.trim());
                        var remindDate = $scope.marketTime;
                        var isRemind = true;
                        if (remindDate === null) {
                            isRemind = false
                        }
                        if (!remindDate && !content) {
                            promptBarService.showErrorBar("请填写沟通内容或选择提醒时间", 3000);
                        } else {
                            return microRegistrationbookDetailAppService.createCommu(userId, content, remindDate, isRemind).success(
                                function(result) {
                                    if (result.status == 1) {
                                        $scope.isRecordShow = false;
                                        $scope.userInfo.FollowUpStatus = 2;
                                        resetCommuList();
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                    $scope.marketTime = null;
                                    $scope.communication = { textNum: 0, text: "" };
                                }
                            )
                        }
                    })

                    //添加回访提醒取消
                    $scope.communicationRecordCencel = function() {
                        $scope.isRecordShow = false;
                        $scope.marketTime = null;
                        $scope.communication = { textNum: 0, text: "" };
                    }

                    //添加回访提醒确认
                    $scope.addCommunication = function() {
                        $scope.isRecordShow = true
                    }

                    //输入沟通记录字数
                    $scope.$watch("communication.text", function(newVal, oldVal) {
                        if (newVal.length > 100) { $scope.communication.text = newVal.substr(0, 100) }
                        if (newVal !== oldVal) {
                            $scope.communication.textNum = newVal.length;

                        }
                    });

                    //咨询跟进列表UiModel
                    //isCommu判断是否为咨询跟进
                    var appendData = function(oldObj, myarr, isCommu) {
                        var timeEq = function(pr, ne) {
                            var prev = $filter("formatJsonDate")(pr, "yyyy-MM-dd");
                            var next = $filter("formatJsonDate")(ne, "yyyy-MM-dd");
                            if (prev == next) { return true } else { return false }
                        }
                        var len;
                        for (var i = 0; i < myarr.length; i++) {
                            len = oldObj.length;
                            if (len == 0 && !(oldObj[0])) {
                                oldObj = [{}];
                                len = oldObj.length
                            }
                            if (isCommu) {
                                if (timeEq(oldObj[len - 1].time, myarr[i].CreatedTime)) {
                                    oldObj[len - 1].data.push(myarr[i])
                                } else {
                                    oldObj.push({
                                        time: myarr[i].CreatedTime,
                                        data: [myarr[i]]
                                    })
                                }
                            } else {
                                myarr[i].uiModel = {
                                    activityTitle: myarr[i].ConsultData.SceneTitle, //场景名称
                                    content: myarr[i].ConsultData.Content, //JSONOrString 备注字段
                                    introducerName: myarr[i].ConsultData.IntroducerName, //介绍人姓名
                                    introducerPhone: myarr[i].ConsultData.IntroducerPhone, //介绍人电话
                                    amount: myarr[i].ConsultData.Amount, //助力行模板得到的助力数
                                    otherInfo: myarr[i].ConsultData.OtherInfo
                                };
                                if (timeEq(oldObj[len - 1].time, myarr[i].CreatedAt)) {
                                    oldObj[len - 1].data.push(myarr[i])
                                } else {

                                    oldObj.push({
                                        time: myarr[i].CreatedAt,
                                        data: [myarr[i]]
                                    });
                                }
                            }
                        }
                        if ($.isEmptyObject(oldObj[0])) {
                            oldObj.splice(0, 1)
                        }
                        return oldObj
                    }

                    //咨询跟进滚动加载
                    $scope.loadCommuList = function() {
                        microRegistrationbookDetailAppService.getConsultFollowingUp($scope.commuPage.currentIndex + 1, pageSize, userId).then(function(result) {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                            if (result.data.status == 1) {
                                if (result.data.data.list) {
                                    $scope.commuList = appendData($scope.commuList, result.data.data.list, true);
                                    $scope.commuPage = result.data.data.page;
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        })
                    };
                    //滚动加载互动记录
                    $scope.loadRegbookUserRecord = function() {
                        microRegistrationbookDetailAppService.getRegbookUserRecordByRegBookUserId(userId, $scope.page.currentIndex + 1, pageSize).then(function(result) {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                            if (result.data.status == 1) {
                                if (result.data.data.list) {
                                    $scope.regbookUserRecord = appendData($scope.regbookUserRecord, result.data.data.list, false);
                                    $scope.page = result.data.data.page;
                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        })
                    }

                    function init() {
                        //统一增加后台页面的Loading效果 
                        if (!$rootScope.isFirstLoad) {
                            $timeout(function() {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1833);
                        } else {
                            $timeout(function() {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1000);
                        }
                        resetRegbookUserRecord();
                        //学员信息
                        var getStudMsg = function() {
                                return microRegistrationbookDetailAppService.getRegBookUserById(userId).then(function(result) {
                                    if (result.data.status == 1) {
                                        if (!result.data.data.HeadImgUrl) {
                                            //没有默认头像
                                            var colorNumber = result.data.data.Name[0].charCodeAt(0) % 6;
                                            $scope.color = colorArr[colorNumber];
                                        }
                                        $scope.userInfo = result.data.data;
                                        if ($scope.userInfo.Phone) {
                                            var splitArr = $scope.userInfo.Phone.split(","),
                                                tel;
                                            splitArr.forEach(function(v) {
                                                tel = tel || v
                                            })
                                            $scope.userInfo.Phone = tel;
                                        }
                                        $scope.isTagMsgShow = true;
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                });
                            }
                            //判断父层中学生信息是否存在
                            // if ($scope.userInfo.Id && $scope.userInfo.Id > 0) {
                            //     $q.all([resetCommuList()]).then(function() {
                            //         $scope.hasMsgDone = true;
                            //     })
                            // } else {
                            //     $q.all([resetCommuList(), getStudMsg()]).then(function() {
                            //         $scope.hasMsgDone = true;
                            //     })
                            // }
                        $q.all([resetCommuList(), getStudMsg()]).then(function() {
                            $scope.hasMsgDone = true;
                        })
                    }

                    init();

                    //退出时，输入框隐藏,时间选择销毁
                    var stateChangeStart = $rootScope.$on("$stateChangeStart",
                        function(event, toState, toParams, fromState, fromParams) {
                            textInputCallbackService.hideTextInput();
                            if ($scope.myInstance) {
                                $scope.myInstance.destroy();
                            }
                            if ($scope.myInstance2) {
                                $scope.myInstance2.destroy();
                            }
                        });

                    $scope.$on("$destroy", function() {
                        stateChangeStart();
                    });

                }
            ]);
    });