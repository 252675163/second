/**
 * author :小潘
 * time: 2015年10月27日 17:05:02
 * description: 微活动模板默认值
 */
define(["ionic"], function() {
    return angular.module("services.net.templatesModel", []).
        factory("templatesModelService", function () {
            var baseImgUrl = window.resourceDoMain;


            //warning hardcode
            function makeNewModel(orgName, templateId) {
                //公开课
                var defaultModel = {};
                if (templateId == 1) {
                    return defaultModel = {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151022180314-b1edc.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template2",
                                        "type": 1,
                                        "templateModel": {
                                            // title1: orgName

                                        },
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Website/20150916144024-ce78f.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "type": 2,
                                        "templateName": "micro-old-new-template5",
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Website/20150916144607-03d34.jpg"
                                    },

                                    {
                                        "sectionName": "",
                                        "type": 2,
                                        "templateName": "micro-old-new-template3",
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Website/20150916144717-3ab4f.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "type": 2,
                                        "templateName": "template7",
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/acty_temp7_bg_1.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "type": 3,
                                        "templateName": "micro-old-new-template4",
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Website/20150916145254-df03a.jpg"
                                    }
                                ]
                            }
                        ],
                        //默认title 只读 preview页面使用
                        "title": "满天星教育春季免费公开课",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }
                //final
                if (templateId == 3) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151030141056-0d25a.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template3by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_09_1_2.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template3by8",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp3_bg_2_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template3by2",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_09_2_2.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template3by3",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_09_3_2.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template3by4",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp3_bg_2_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template3by5",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp3_bg_2_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template3by6",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp3_bg_1_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template3by7",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp3_bg_2_big.jpg"
                                    }
                                ]
                            }
                        ],
                        title: "优贝教育新春特惠活动",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }
                //快乐寒假
                if (templateId == 4) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151030141203-10c58.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template221",
                                        "type": 1,
                                        "templateModel": {
                                            // title1: orgName

                                        },
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151102113913-29aff.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template222",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151102113930-c64e4.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template223",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151102113941-3113e.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template224",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151102113952-04ebe.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template225",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151102114002-07e19.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template226",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151102113913-29aff.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template227",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151102113913-29aff.jpg"
                                    },
                                ]
                            }
                        ],
                        title: "快乐寒假，Happy冬令营",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }
                //学习日记
                if (templateId == 5) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151030141146-8464e.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template5by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp5_bg_1_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template5by2",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp5_bg_1_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template5by3",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp5_bg_1_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template5by4",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp5_bg_1_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template5by5",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp5_bg_1_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template5by6",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp5_bg_1_big.jpg"
                                    }
                                ]
                            }
                        ],
                        title: "学习日记",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }
                //感恩节
                if (templateId == 6) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151030141132-803d4.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template6by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_10_1.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template6by2",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_10_2.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template6by3",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": ""
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template6by4",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_10_3.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template6by5",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": ""
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template6by6",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_10_4.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template6by7",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_10_5.jpg"
                                    }
                                ]
                            }
                        ],
                        //默认title 只读 preview页面使用
                        "title": "[有人@你]今年的感恩节有点不一样",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }
                //父母微课堂
                if (templateId == 7) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                //梦幻仙境
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151022180137-36fb9.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template71",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp7_bg_1_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template72",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp7_bg_2_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template73",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp7_bg_3_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template74",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp7_bg_4_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template75",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp7_bg_5_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template76",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp7_bg_6_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "micro-old-new-template77",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp7_bg_7_big.jpg"
                                    },
                                ]
                            }
                        ],
                        title: "父母微课堂",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }
                //圣诞舞会
                if (templateId == 8) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                //圣诞轻音乐
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151116152552-8ba1e.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template8by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_12_1.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template8by2",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_12_2.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template8by3",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_12_3.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template8by4",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_12_4.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template8by5",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_12_2.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template8by6",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_12_2.jpg"
                                    }
                                ]
                            }
                        ],
                        //默认title 只读 preview页面使用
                        "title": "共享圣诞舞会",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }
                //备考小贴士
                if (templateId == 9) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151114210914-fe31c.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template9by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/body_bg_16_1.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template9by2",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/body_bg_16_2.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template9by3",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/body_bg_16_3.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template9by4",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/body_bg_16_4.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template9by5",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/body_bg_16_5.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template9by6",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/body_bg_16_5.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template9by7",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/body_bg_16_7.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template9by8",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/body_bg_16_8.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template9by9",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/body_bg_16_1.jpg"
                                    }
                                ]
                            }
                        ],
                        //默认title 只读 preview页面使用
                        "title": "您是靠谱的考生家长吗？",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }
                //家长开放日
                if (templateId == 10) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151116152844-e515c.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template10by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_18_1.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template10by2",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_18_2.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template10by3",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_18_3.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template10by4",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_18_3.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template10by5",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_18_3.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template10by6",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_18_6.jpg"
                                    }
                                ]
                            }
                        ],
                        //默认title 只读 preview页面使用
                        title: "孩子爸妈，这里有一份邀请函",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }

                //元旦
                if (templateId == 11) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                //至爱吾爱
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151114211241-855df.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template11by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_20_1.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template11by2",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_20_1.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template11by3",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage": window.resourceDoMain+"/app/img/body_bg_20_1.jpg"
                                    }
                                ]
                            }
                        ],
                        //默认title 只读 preview页面使用
                        "title": "悄悄告诉你哦",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }

                //光荣榜
                if (templateId == 12) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151114211257-a10bf.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template12by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_1_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template12by2",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_2_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template12by3",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_3_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template12by4",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_4_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template12by5",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_5_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template12by6",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_6_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template12by7",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_7_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template12by8",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_8_big.jpg"
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template12by9",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_8_big.jpg"
                                    }
                                ]
                            }
                        ],
                        title: "光荣榜",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }

                //新种草
                if (templateId == 13) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151022174013-e09af.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template13by1",
                                        "type": 0, //不需要做表单唯一性校验
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_1_big.jpg",
                                        "editPermissions": {
                                            deletePage: false,
                                            replaceBackground: false
                                        }
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template13by2",
                                        "type": 0,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_2_big.jpg",
                                        //2015.11.24 新增字段，种草特殊，不允许增加页面，可以删除 添加页面editPermissions数据库中没有存储该字段，故次page不允许添加
                                        "editPermissions": {
                                            deletePage: true,
                                            replaceBackground: false
                                        }
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template13by3",
                                        "type": 0,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_2_big.jpg",
                                        //2015.11.24 新增字段，种草特殊，不允许增加页面，可以删除 添加页面editPermissions数据库中没有存储该字段，故次page不允许添加
                                        "editPermissions": {
                                            deletePage: true,
                                            replaceBackground: false
                                        }

                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template13by4",
                                        "type": 0,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_2_big.jpg",
                                        //2015.11.24 新增字段，种草特殊，不允许增加页面，可以删除 添加页面editPermissions数据库中没有存储该字段，故次page不允许添加
                                        "editPermissions": {
                                            deletePage: true,
                                            replaceBackground: false
                                        },
                                        isHideInEdit: true
                                    }
                                ]
                            }
                        ],
                        title: "种草减学费",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0,
                        //20105.11.24 添加新的字段 编辑的权限，不允许换背景，不允许加也和删页
                        "editPermissions": 1
                    };
                }

                //圣诞活动
                if (templateId == 14) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151211155203-35023.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template14by1",
                                        "type": 0, //不需要做表单唯一性校验
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_1_big.jpg",
                                        "editPermissions": {
                                            deletePage: false,
                                            replaceBackground: false
                                        }
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template14by2",
                                        "type": 0,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_2_big.jpg",
                                        //2015.11.24 新增字段，种草特殊，不允许增加页面，可以删除 添加页面editPermissions数据库中没有存储该字段，故次page不允许添加
                                        "editPermissions": {
                                            deletePage: true,
                                            replaceBackground: false
                                        }
                                    },

                                    {
                                        "sectionName": "",
                                        "templateName": "template14by3",
                                        "type": 0,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_2_big.jpg",
                                        //2015.11.24 新增字段，种草特殊，不允许增加页面，可以删除 添加页面editPermissions数据库中没有存储该字段，故次page不允许添加
                                        "editPermissions": {
                                            deletePage: true,
                                            replaceBackground: false
                                        }

                                    },

                                    {
                                        "sectionName": "",
                                        "templateName": "template14by4",
                                        "type": 0,
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_2_big.jpg",
                                        //2015.11.24 新增字段，种草特殊，不允许增加页面，可以删除 添加页面editPermissions数据库中没有存储该字段，故次page不允许添加
                                        "editPermissions": {
                                            deletePage: true,
                                            replaceBackground: false
                                        },
                                        isHideInEdit: true
                                    }
                                ]
                            }
                        ],
                        title: "集圣诞礼物 享学费折扣",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0,
                        //20105.11.24 添加新的字段 编辑的权限，不允许换背景，不允许加也和删页
                        "editPermissions": 1
                    };
                }

                //招生简章
                if (templateId == 15) {
                    var imgBaseUrl = ""
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                //音乐todo
                                "backgroundAudio": "http://cdn.schoolpal.cn/shiningstar" + "/Activity/20151216223616-125fb.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template15by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage": baseImgUrl + "/app/img/body_bg_23_1_2.jpg",

                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template15by2",
                                        "type": 2,
                                        "templateModel": {},
                                        "backgroundImage": baseImgUrl + "/app/img/body_bg_23_2_2.jpg"
                                    },

                                    {
                                        "sectionName": "",
                                        "templateName": "template15by3",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage": baseImgUrl + "/app/img/body_bg_23_2_2.jpg"
                                    }
                                ]
                            }
                        ],
                        title: "火炬少儿英语春季招生简章",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }

                //线下报名
                if (templateId == 16) {
                    var imgBaseUrl = ""
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                //音乐todo
                                "backgroundAudio": "http://cdn.schoolpal.cn/shiningstar" + "/Activity/20151022180221-8708c.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template16by1",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage": baseImgUrl + "/app/img/body_bg_23_6.jpg"

                                    }
                                ]
                            }
                        ],
                        title: "阅读班报名，读趣乐教育 ",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }

                //活动海报/通用模板
                if (templateId == 17) {
                    var imgBaseUrl = ""
                    return {
                        "pages": [
                            {
                                "pageName": "", 
                                //音乐todo
                                "backgroundAudio": "http://cdn.schoolpal.cn/shiningstar" + "/Activity/20151216224608-0a3c9.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template17by1",
                                        "type": 1,
                                        "templateModel": {},
                                        "backgroundImage": baseImgUrl + "/app/img/body_bg_23_4_2.jpg",

                                    },
                                    //体验课海报加了一页，模板同第一页，显示文案
                                    {
                                        "sectionName": "",
                                        "templateName": "template17by1",
                                        "type": 1,
                                        "templateModel": {
                                            title: "如何参与",
                                            description: "【体验课时间】3月12日（周六） 上午9:00-11:00\n【体验课地点】西湖区文三路478号墨香国画1楼体验厅\n【学校微信号】moxiangshuyuan\n【咨询电话】4000051221\n【咨询老师】罗老师、李老师",
                                            imageUrl: [baseImgUrl + '/app/img/acty23_logo_1.jpg']
                                        },
                                        "backgroundImage": baseImgUrl + "/app/img/body_bg_23_4_2.jpg",
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template17by2",
                                        "type": 3,
                                        "templateModel": {},
                                        "backgroundImage": baseImgUrl + "/app/img/body_bg_23_5_2.jpg",
                                    }
                                ]
                            }
                        ],
                        title: "墨香·童真丨趣味国画体验课",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0
                    };
                }

                //春节活动
                if (templateId == 18) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                //金蛇狂舞
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar/Activity/20160121141842-848a0.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template18by1",
                                        "type": 0, //不需要做表单唯一性校验
                                        "templateModel": {},
                                        "backgroundImage":"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp12_bg_1_big.jpg",
                                        "editPermissions": {
                                            deletePage: false,
                                            replaceBackground: false
                                        }
                                    }
                                ]
                            }
                        ],
                        title: "",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0,
                        //20105.11.24 添加新的字段 编辑的权限，不允许换背景，不允许加也和删页
                        "editPermissions": 1
                    };
                }

                //种菜
                if (templateId == 19) {
                    return {
                        "pages": [
                            {
                                "pageName": "",
                                "backgroundAudio":"http://cdn.schoolpal.cn/shiningstar/Activity/20160309140309-67b24.mp3",
                                "sections": [
                                    {
                                        "sectionName": "",
                                        "templateName": "template19by1",
                                        "type": 0, //不需要做表单唯一性校验
                                        "templateModel": {},
                                        "backgroundImage":"",
                                        "editPermissions": {
                                            deletePage: false,
                                            replaceBackground: false
                                        }
                                    },
                                    {
                                        "sectionName": "",
                                        "templateName": "template19by2",
                                        "type": 0,
                                        "templateModel": {},
                                        "backgroundImage":"",
                                        //2015.11.24 新增字段，种草特殊，不允许增加页面，可以删除 添加页面editPermissions数据库中没有存储该字段，故次page不允许添加
                                        "editPermissions": {
                                            deletePage: true,
                                            replaceBackground: false
                                        }
                                    },

                                    {
                                        "sectionName": "",
                                        "templateName": "template19by3",
                                        "type": 0,
                                        "templateModel": {},
                                        "backgroundImage":"",
                                        //2015.11.24 新增字段，种草特殊，不允许增加页面，可以删除 添加页面editPermissions数据库中没有存储该字段，故次page不允许添加
                                        "editPermissions": {
                                            deletePage: true,
                                            replaceBackground: false
                                        }

                                    },

                                    {
                                        "sectionName": "",
                                        "templateName": "template19by4",
                                        "type": 0,
                                        "templateModel": {},
                                        "backgroundImage":"",
                                        //2015.11.24 新增字段，种草特殊，不允许增加页面，可以删除 添加页面editPermissions数据库中没有存储该字段，故次page不允许添加
                                        "editPermissions": {
                                            deletePage: true,
                                            replaceBackground: false
                                        },
                                        isHideInEdit: true
                                    }
                                ]
                            }
                        ],
                        title: "种菜",
                        "isPublish": false,
                        "status": "preview",
                        "currentPageIndex": 0,
                        "currentSectionIndex": 0,
                        //20105.11.24 添加新的字段 编辑的权限，不允许换背景，不允许加也和删页
                        "editPermissions": 1
                    };
                }




                return defaultModel;
            }
            //老官网
            function makeWebsiteNewModel(OrgName, templateId) {
                //OrgName废弃
                //模板扩展 todo
                return {
                    "pages": [
                        {
                            "pageName": "关于我们",
                            "backgroundAudio": "",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template4",
                                    "templateModel": {
                                        // title: OrgName

                                    },
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template3",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                }
                            ]
                        },
                        {
                            "pageName": "新鲜活动",
                            "backgroundAudio": "",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template6",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template5",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                }
                            ]
                        },
                        {
                            "pageName": "精品课程",
                            "backgroundImage": "",
                            "sections": [
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template2",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                },
                                {
                                    "sectionName": "",
                                    "templateName": "micro-template1",
                                    "templateModel": {},
                                    "backgroundImage": "/app/img/temp3_bg.png"
                                }
                            ]
                        }
                    ],
                    "title": "标题文案Todo",
                    "isPublish": false,
                    "status": "preview",
                    "currentPageIndex": 0,
                    "currentSectionIndex": 0
                };
            }



            //微官网模式
            var siteMode = {
                //todo 数组or对象？？？
                "1": {
                    "site-cover": true,//true为启用，false为禁用
                    "site-news": false,
                    "site-org-info": true,
                    "site-course-info": false,
                    "site-teacher-info": false,
                    "site-about-us-Info": false,
                    "site-qr-code": true
                },
                "2": {
                    "site-cover": true,
                    "site-news": false,
                    "site-org-info": true,
                    "site-course-info": true,
                    "site-teacher-info": false,
                    "site-about-us-Info": true,
                    "site-qr-code": true
                },
                "3": {
                    "site-cover": true,
                    "site-news": true,
                    "site-org-info": true,
                    "site-course-info": true,
                    "site-teacher-info": true,
                    "site-about-us-Info": true,
                    "site-qr-code": true
                }
            };
            var modulesDataStructure = {
                'site-cover': {
                    title: "首页 ",
                    templateName: "site-cover",
                    templateModel: {},
                    isDisabled: true,//是否禁用
                    isHideInEdit: false
                },
                "site-org-info": {
                    title: "机构介绍 ",
                    templateName: "site-org-info",
                    templateModel: {},
                    isDisabled: true,//是否禁用
                    isHideInEdit: false
                },
                "site-news": {
                    title: "最新动态 ",
                    templateName: "site-news",
                    templateModel: {},
                    isDisabled: true,//是否禁用
                    isHideInEdit: false
                },
                "site-course-info": {
                    title: "精品课程 ",
                    templateName: "site-course-info",
                    templateModel: {},
                    isDisabled: true,//是否禁用
                    isHideInEdit: false
                },
                "site-teacher-info": {
                    title: "名师风采 ",
                    templateName: "site-teacher-info",
                    templateModel: {},
                    isDisabled: true,//是否禁用
                    isHideInEdit: false
                },
                "site-about-us-Info": {
                    title: "联系我们 ",
                    templateName: "site-about-us-Info",
                    templateModel: {},
                    isDisabled: true,//是否禁用
                    isHideInEdit: false
                },
                "site-qr-code": {
                    title: "二维码名片",
                    templateName: "site-qr-code",
                    templateModel: {},
                    isDisabled: true,//是否禁用
                    isHideInEdit: true
                }

            };
            //***更据老的modules和模式Id，组装出新的module数据
            function updateWebsiteModulesByMode(modeId, modules) {
                var newModules = [];
                if(!modules){
                    modules = [];

                }
                //modules 为数组
                for (moduleName in  siteMode[modeId]) {
                    var moduleData = modules.filter(function (data) {
                        return data.templateName == moduleName;
                    });
                    if (moduleData.length) {
                        moduleData[0].isDisabled = !siteMode[modeId][moduleName];
                        newModules.push(angular.copy(moduleData[0]));
                    } else {
                        modulesDataStructure[moduleName].isDisabled = !siteMode[modeId][moduleName];
                        newModules.push(angular.copy(modulesDataStructure[moduleName]));
                    }
                }
                return newModules
            }

            //根据modeId（模式Id）获得默认的新官网数据
            function makeNewWebsiteNewModel(modeId) {
                if(!modeId){
                    modeId = 1;
                }
                return {
                    modules:updateWebsiteModulesByMode(modeId,[]),
                    currentModuleIndex:0,
                    style: 1,//1/2/3……
                    plan: modeId//模式
                };
            }
            function getIsUseableModulesByModeId(modeId) {
                return siteMode[modeId];
            }

            function getTemplateDefaultTitleForActivity(templateId) {
                //公开课
                if (templateId == 1) {
                    return {
                        //标题
                        title: "满天星教育春季免费公开课",
                        //小标题
                        desc: "学习正当时，课前先体验~限时报名，快来参加吧~",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl: baseImgUrl + "/app/img/temp2_share_img.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }

                //种草
                if (templateId == 2) {
                    return {
                        //标题
                        title: "种草减学费",
                        //小标题
                        desc: " 种草享优惠，全球你最萌。",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151023133040-e1cad.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //final 新手指引
                if (templateId == 3) {
                    return {
                        //标题
                        title: "优贝教育新春特惠活动",
                        //小标题
                        desc: "优贝教育又出新活动啦~参与有惊喜噢~",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl: baseImgUrl + "/app/img/temp3_1_share_img.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //快乐寒假
                if (templateId == 4) {
                    return {
                        //标题
                        title: "快乐寒假，Happy冬令营",
                        //小标题
                        desc: "精品冬令营，拥抱不一样的寒假体验！",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp4_share_img.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //学习日记
                if (templateId == 5) {
                    return {
                        //标题
                        title: "学习日记",
                        //小标题
                        desc: "学习日记，进步有你！",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp5_share_img.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //感恩节
                if (templateId == 6) {
                    return {
                        //标题
                        title: "[有人@你]今年的感恩节有点不一样",
                        //小标题
                        desc: "只因有您，感恩节无限精彩，纵享欢乐！",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/temp6_share_img.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //父母微课堂
                if (templateId == 7) {
                    return {
                        //标题
                        title: "父母微课堂",
                        //小标题
                        desc: "让孩子过一个充实、快乐的人生。",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151113162837-d6800.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //圣诞舞会
                if (templateId == 8) {
                    return {
                        //标题
                        title: "共享圣诞舞会",
                        //小标题
                        desc: "欢庆圣诞，翩翩起舞~",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151113135156-27607.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //备考小贴士
                if (templateId == 9) {
                    return {
                        //标题
                        title: "您是靠谱的考生家长吗？",
                        //小标题
                        desc: "让孩子告别“下落特烦恼”，帮您成为靠谱的考生家长。",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151113135219-d76f2.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //家长开放日
                if (templateId == 10) {
                    return {
                        //标题
                        title: "孩子爸妈，这里有一份邀请函",
                        //小标题
                        desc: "周末去哪儿？我们想请你们一起来编织成长的摇篮。",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151113190957-25390.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //元旦贺卡
                if (templateId == 11) {
                    return {
                        //标题
                        title: "悄悄告诉你哦",
                        //小标题
                        desc: "元旦快乐！Happy New Year！",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151123135249-db82b.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }

                if (templateId == 12) {
                    return {
                        //标题
                        title: "荣耀的时刻",
                        //小标题
                        desc: "优秀总比别人付出了更多的努力！",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151123135738-5fde2.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //种草
                if (templateId == 13) {
                    return {
                        //标题
                        title: "种草减学费~",
                        //小标题
                        desc: " 种草享优惠，全球你最萌。",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151023133040-e1cad.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }

                //圣诞活动
                if (templateId == 14) {
                    return {
                        //标题
                        title: "欠我的圣诞礼物呢？",
                        //小标题
                        desc: " 这个圣诞，用礼物温暖TA吧~",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Activity/20151210223553-7ab84.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //招生简章
                if (templateId == 15) {
                    return {
                        //标题
                        title: "火炬少儿英语春季招生简章",
                        //小标题
                        desc: "专注少儿英语培训10年，您放心的选择！",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl: baseImgUrl + "/app/img/temp15_1_share_img.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //线下报名
                if (templateId == 16) {
                    return {
                        //标题
                        title: "现场快速报名",
                        //小标题
                        desc: "报名阅读班，享学费8.8折~",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl: "http://cdn.schoolpal.cn/shiningstar" + "/Activity/20160113202416-2d557.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //体验课海报
                if (templateId == 17) {
                    return {
                        //标题
                        title: "墨香·童真丨趣味国画体验课",
                        //小标题
                        desc: "免费试听体验，限时开抢，快来报名吧~",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl: baseImgUrl + "/app/img/temp17_1_share_img.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //春节活动
                if (templateId == 18) {
                    return {
                        //标题
                        title: "金猴贺新春，给您拜年啦~",
                        //小标题
                        desc: "大王派我送祝福\n给个红包混脸熟",
                        link: "",
                        //缩略图地址，全路径
                        imgUrl: "http://cdn.schoolpal.cn/shiningstar/Activity/20160120183247-9babc.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                //种菜
                if (templateId == 19) {
                    return {
                        //标题
                        title: "快来农场帮我种菜，收成就靠你了",
                        //小标题
                        desc: "我刚当上了农场主，快来帮我种上你喜欢的菜啊！",
                        link: "",
                        //缩略图地址，全路径 todo
                        imgUrl: "http://cdn.schoolpal.cn/shiningstar/Activity/20160309122655-c4960.jpg",
                        type: "",
                        dataUrl: ""
                    };
                }
                return "请输入自定义标题";
            }

            //微官网的默认shareConfig信息
            function getTemplateDefaultTitleForWebSite(templateId,style) {
                if(templateId==10){
                    //首页的shareConfig会进入这个分支
                    return getTemplateDefaultTitleForNewWebSite(10,style);
                }
                //todo 官网模板扩展
                return {
                    //标题
                    title: "校宝秀，秀出精彩官网~",
                    //小标题
                    desc: "副标题文案todo",
                    link: "",
                    //缩略图地址，全路径
                    imgUrl:"http://cdn.schoolpal.cn/shiningstar"+"/Website/20151110190006-9f1cc.jpg",
                    type: "",
                    dataUrl: ""
                };
            }
            //新微官网的默认shareConfig信息
            var getNewWebsiteDefaultImageUrlByStyle = function(style){
                var baseUrl =window.resourceDoMain+'/app/img/';
                //var baseUrl ='../app/img/';
                //命名规则  newsite-index-sl-style-1.jpg
                var imageName = 'newsite-index-sl-style-'+style+'.jpg';
                return baseUrl+imageName;
            };
            function getTemplateDefaultTitleForNewWebSite(templateId,style) {
                //todo 官网模板扩展
                return {
                    //标题
                    title: "校宝秀，轻松定制专属微官网",
                    //小标题
                    desc: "快看看我用校宝秀做的微官网，轻松秀出学校风采，移动推广变得如此简单！",
                    link: "",
                    //缩略图地址，全路径
                    imgUrl: getNewWebsiteDefaultImageUrlByStyle(style),
                    type: "",
                    dataUrl: ""
                }
            }
            //新官网非空校验
            //vierifyNewsiteModulesFunctionObj = {'site-cover':function(){}}  指令名加校验函数，从每个指令的service写入
            var vierifyNewsiteModulesFunctionObj = {};
            function  vierifyNewsiteModulesFunction (modules,isShowErrorMessage){
                isShowErrorMessage = isShowErrorMessage||false;
                for(var i = 0;i<modules.length;i++){
                    var templateName  = modules[i].templateName;
                    //如果该指令有校验函数
                    if(vierifyNewsiteModulesFunctionObj[templateName]){
                        var isVierify =vierifyNewsiteModulesFunctionObj[templateName]( modules[i].templateModel,isShowErrorMessage);
                        if(!isVierify){
                            return false;
                        }
                    }else{
                        continue;
                    }
                }
                return true;
            }

            return {
                makeNewModel: makeNewModel,
                getTemplateDefaultTitle: getTemplateDefaultTitleForActivity,
                makeWebsiteNewModel: makeWebsiteNewModel,//老官网默认的model
                makeNewWebsiteNewModel:makeNewWebsiteNewModel,//新官网默认的model
                getTemplateDefaultTitleForWebSite: getTemplateDefaultTitleForWebSite,
                getTemplateDefaultTitleForNewWebSite:getTemplateDefaultTitleForNewWebSite,//新微官网默认的shareConfig
                updateWebsiteModulesByMode: updateWebsiteModulesByMode,
                getIsUseableModulesByModeId:getIsUseableModulesByModeId,
                vierifyNewsiteModulesFunctionObj:vierifyNewsiteModulesFunctionObj,
                vierifyNewsiteModulesFunction:vierifyNewsiteModulesFunction
            }
        });
});