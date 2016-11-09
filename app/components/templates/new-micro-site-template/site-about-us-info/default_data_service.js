/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('DefaultData.SiteAboutUsInfo.Service', []).
        factory('defaultDataForSiteAboutUsInfoService', ['$http', function ($http) {

            var service = {};
            service.defaultModelByStyle = {
                //1为styleId
                "1":{
                    aboutUsInfoList:[
                        {
                        campusName:"总校区",
                        address:"北京市海淀区中关村南大街17号韦伯时代中心",
                        tel:"010-66666666"//校区联系电话
                        },
                        {
                            campusName:"朝阳校区",
                            address:"北京市朝阳区朝阳公园19号佳隆国际大厦",
                            tel:"010-66666666"//校区联系电话
                        },
                        {
                            campusName:"上海校区",
                            address:"上海徐汇区长乐路新旺大厦",
                            tel:"021-66666666"//校区联系电话
                        },
                        {
                            campusName:"广州校区",
                            address:"广州越秀越秀区人民中路408号大晟华厦",
                            tel:"020-66666666"//校区联系电话
                        }
                    ]
                },
                "2":{
                    aboutUsInfoList:[
                        {
                            campusName: "总校区",
                            address: "广州市越秀区二沙岛烟雨路38号",
                            tel: "020-66666666"//校区联系电话
                        },
                        {
                            campusName: "天河校区",
                            address: "广州市天河区中山大道东176号",
                            tel: "020-66666666"//校区联系电话
                        },
                        {
                            campusName: "海珠校区",
                            address: "广州市海珠区广州大道南1028",
                            tel: "020-66666666"//校区联系电话
                        },
                        {
                            campusName: "白云校区",
                            address: "广州市白云区政通路25号",
                            tel: "020-66666666"//校区联系电话
                        }
                    ]
                },
                "3": {
                    aboutUsInfoList: [
                        {
                            campusName: "总校区（朝阳校区）",
                            address: "北京市朝阳区朝阳北路103号金泰国益大厦1118室",
                            tel: "010-66666666"//校区联系电话
                        },
                        {
                            campusName: "东城区校区",
                            address: "北京市丰台区水衙沟路光大华孚写字楼",
                            tel: "010-66666666"//校区联系电话
                        },
                        {
                            campusName: "西城区校区",
                            address: "北京市西城区右安门内大街79号",
                            tel: "010-66666666"//校区联系电话
                        },
                        {
                            campusName: "海淀区校区",
                            address: "北京市新街口外大街19号",
                            tel: "010-66666666"//校区联系电话
                        },
                        {
                            campusName: "怀柔区校区",
                            address: "北京市怀柔区迎宾北路13号",
                            tel: "010-66666666"//校区联系电话
                        },
                        {
                            campusName: "宣武区校区",
                            address: "北京市后孙公园胡同37号",
                            tel: "010-66666666"//校区联系电话
                        }
                    ]
                },
                "4": {
                    aboutUsInfoList: [
                        {
                            campusName: "总校区",
                            address: "上海普陀区曹杨路450号绿地和创大厦",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "虹口校区",
                            address: "上海虹口区场中路263号上海银泰大厦",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "徐汇校区",
                            address: "上海徐汇区长乐路新旺大厦",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "浦东校区",
                            address: "上海浦东新区龙阳路2277号永达国际大厦",
                            tel: "021-66666666"//校区联系电话
                        }
                    ]
                },
                "5": {
                    aboutUsInfoList: [
                        {
                            campusName: "总校区",
                            address: "上海普陀区曹杨路450号绿地和创大厦",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "虹口校区",
                            address: "上海虹口区场中路263号上海银泰大厦",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "徐汇校区",
                            address: "上海徐汇区长乐路新旺大厦",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "浦东校区",
                            address: "上海浦东新区龙阳路2277号永达国际大厦",
                            tel: "021-66666666"//校区联系电话
                        }
                    ]
                },
                "6": {
                    aboutUsInfoList: [
                        {
                            campusName: "总校区（北京校区）",
                            address: "北京市西直门北大街32号枫蓝国际B座",
                            tel: "010-66666666"//校区联系电话
                        },
                        {
                            campusName: "大连校区",
                            address: "辽宁省大连市西岗区东北路161号艺术大厦",
                            tel: "0411-66666666"//校区联系电话
                        },
                        {
                            campusName: "上海校区",
                            address: "黄浦区花园港路200号(近苗江路)",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "广州校区",
                            address: "海珠区洪德路53号1楼(木偶剧院旁)",
                            tel: "020-66666666"//校区联系电话
                        }
                    ]
                },
                "7": {
                    aboutUsInfoList: [
                        {
                            campusName: "总校区（朝阳校区）",
                            address: "北京市朝阳区北三环安贞桥东胜古家园3号楼D座1101室",
                            tel: "010-66666666"//校区联系电话
                        },
                        {
                            campusName: "东城区校区",
                            address: "北京东城区广渠门内大街新景家园16号楼底商05号",
                            tel: "010-66666666"//校区联系电话
                        },
                        {
                            campusName: "宣武区校区",
                            address: "西城区西单商场北门东槐里1号院",
                            tel: "010-66666666"//校区联系电话
                        }
                    ]
                },
                "8": {
                    aboutUsInfoList: [
                        {
                            campusName: "总校区（五角场校区）",
                            address: "杨浦区国定东路233号绿地能源大厦705室",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "虹口区校区",
                            address: "上海市虹口区逸仙路388号上海勘测设计研究院",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "静安区校区",
                            address: "上海市静安区静安区石门二路268",
                            tel: "021-66666666"//校区联系电话
                        },
                        {
                            campusName: "浦东新区校区",
                            address: "浦东新区峨山路111号华晔创意园A座4楼(近东方路)",
                            tel: "021-66666666"//校区联系电话
                        }
                    ]
                }
            };


            return service

        }]);
});


