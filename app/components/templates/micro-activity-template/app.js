"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template2/app",
    "components/templates/micro-activity-template/template3/app",
    "components/templates/micro-activity-template/template4/app",
    "components/templates/micro-activity-template/template5/app",
    "components/templates/micro-activity-template/template6/app",
    "components/templates/micro-activity-template/template7/app",

    "components/templates/micro-activity-template/template3_1/app",
    "components/templates/micro-activity-template/template3_2/app",
    "components/templates/micro-activity-template/template3_3/app",
    "components/templates/micro-activity-template/template3_4/app",
    "components/templates/micro-activity-template/template3_5/app",
    "components/templates/micro-activity-template/template3_6/app",
    "components/templates/micro-activity-template/template3_7/app",
    "components/templates/micro-activity-template/template3_8/app",
    "components/templates/micro-activity-template/template5_1/app",
    "components/templates/micro-activity-template/template5_2/app",
    "components/templates/micro-activity-template/template5_3/app",
    "components/templates/micro-activity-template/template5_4/app",
    "components/templates/micro-activity-template/template5_5/app",
    "components/templates/micro-activity-template/template5_6/app",
    "components/templates/micro-activity-template/template6_1/app",
    "components/templates/micro-activity-template/template6_2/app",
    "components/templates/micro-activity-template/template6_3/app",
    "components/templates/micro-activity-template/template6_4/app",
    "components/templates/micro-activity-template/template6_5/app",
    "components/templates/micro-activity-template/template6_6/app",
    "components/templates/micro-activity-template/template6_7/app",
    "components/templates/micro-activity-template/template2_2_1/app",
    "components/templates/micro-activity-template/template2_2_2/app",
    "components/templates/micro-activity-template/template2_2_3/app",
    "components/templates/micro-activity-template/template2_2_4/app",
    "components/templates/micro-activity-template/template2_2_5/app",
    "components/templates/micro-activity-template/template2_2_6/app",
    "components/templates/micro-activity-template/template2_2_7/app",
    "components/templates/micro-activity-template/template7_1/app",
    "components/templates/micro-activity-template/template7_2/app",
    "components/templates/micro-activity-template/template7_3/app",
    "components/templates/micro-activity-template/template7_4/app",
    "components/templates/micro-activity-template/template7_5/app",
    "components/templates/micro-activity-template/template7_6/app",
    "components/templates/micro-activity-template/template7_7/app",
    "components/templates/micro-activity-template/template8_1/app",
    "components/templates/micro-activity-template/template8_2/app",
    "components/templates/micro-activity-template/template8_3/app",
    "components/templates/micro-activity-template/template8_4/app",
    "components/templates/micro-activity-template/template8_5/app",
    "components/templates/micro-activity-template/template8_6/app",

    "components/templates/micro-activity-template/template9_1/app",
    "components/templates/micro-activity-template/template9_2/app",
    "components/templates/micro-activity-template/template9_3/app",
    "components/templates/micro-activity-template/template9_4/app",
    "components/templates/micro-activity-template/template9_5/app",
    "components/templates/micro-activity-template/template9_6/app",
    "components/templates/micro-activity-template/template9_7/app",
    "components/templates/micro-activity-template/template9_8/app",
    "components/templates/micro-activity-template/template9_9/app",

    "components/templates/micro-activity-template/template10_1/app",
    "components/templates/micro-activity-template/template10_2/app",
    "components/templates/micro-activity-template/template10_3/app",
    "components/templates/micro-activity-template/template10_4/app",
    "components/templates/micro-activity-template/template10_5/app",
    "components/templates/micro-activity-template/template10_6/app",

    "components/templates/micro-activity-template/template11_1/app",
    "components/templates/micro-activity-template/template11_2/app",
    "components/templates/micro-activity-template/template11_3/app",
    "components/templates/micro-activity-template/template12_1/app",
    "components/templates/micro-activity-template/template12_2/app",
    "components/templates/micro-activity-template/template12_3/app",
    "components/templates/micro-activity-template/template12_4/app",
    "components/templates/micro-activity-template/template12_5/app",
    "components/templates/micro-activity-template/template12_6/app",
    "components/templates/micro-activity-template/template12_7/app",
    "components/templates/micro-activity-template/template12_8/app",
    "components/templates/micro-activity-template/template12_9/app",

    //新种草
    "components/templates/micro-activity-template/template13_1/app",
    "components/templates/micro-activity-template/template13_2/app",
    "components/templates/micro-activity-template/template13_3/app",
    "components/templates/micro-activity-template/template13_4/app",
    "components/templates/micro-activity-template/template13_5/app",

    //圣诞活动 by xp 2015年12月10日 20:44:09
    "components/templates/micro-activity-template/template14_1/app",
    "components/templates/micro-activity-template/template14_2/app",
    "components/templates/micro-activity-template/template14_3/app",
    "components/templates/micro-activity-template/template14_4/app",
    "components/templates/micro-activity-template/template14_5/app",

    //招生简章
    "components/templates/micro-activity-template/template15_1/app",
    "components/templates/micro-activity-template/template15_2/app",
    "components/templates/micro-activity-template/template15_3/app",
    //快速报名
    "components/templates/micro-activity-template/template16_1/app",

    //体验课
    "components/templates/micro-activity-template/template17_1/app",
    "components/templates/micro-activity-template/template17_2/app",

    //春节活动
    "components/templates/micro-activity-template/template18_1/app",

    //种菜
    "components/templates/micro-activity-template/template19_1/app",
    "components/templates/micro-activity-template/template19_2/app",
    "components/templates/micro-activity-template/template19_3/app",
    "components/templates/micro-activity-template/template19_4/app",
    "components/templates/micro-activity-template/template19_5/app",
    "components/templates/micro-activity-template/template19_6/app",

    //代金券模板
    "components/templates/micro-activity-template/template20_1/app",
    "components/templates/micro-activity-template/template20_2/app",
    "components/templates/micro-activity-template/template20_3/app",
    "components/templates/micro-activity-template/template20_4/app",
    //投票
    "components/templates/micro-activity-template/template21_1/app",
    "components/templates/micro-activity-template/template21_2/app",
    "components/templates/micro-activity-template/template21_3/app",

    //微传单
    "components/templates/micro-activity-template/template22_1/app",
    "components/templates/micro-activity-template/template22_2/app",
    "components/templates/micro-activity-template/template22_3/app",

     //水族馆模板
    "components/templates/micro-activity-template/template23_1/app",
    "components/templates/micro-activity-template/template23_2/app",
    "components/templates/micro-activity-template/template23_3/app",
    "components/templates/micro-activity-template/template23_4/app",
    "components/templates/micro-activity-template/template23_5/app",

    // 微助力模板
    "components/templates/micro-activity-template/template24_1/app",
    "components/templates/micro-activity-template/template24_2/app",
    "components/templates/micro-activity-template/template24_3/app",
    "components/templates/micro-activity-template/template24_4/app",
    "components/templates/micro-activity-template/template24_5/app",
    "components/templates/micro-activity-template/template24_6/app",
    
    //微传单2
    "components/templates/micro-activity-template/template25_1/app",
    "components/templates/micro-activity-template/template25_2/app",
    "components/templates/micro-activity-template/template25_3/app",
    
    //微砍价 todo
    //"components/templates/micro-power-template/micro_bargain_1/micro_bargain1_1/app",
   // "micro_bargain_1/micro_bargain_1_1/app"
    //"components/templates/micro-activity-template/micro_bargain1_2/app",
    //"components/templates/micro-activity-template/micro_bargain1_3/app",
    //"components/templates/micro-activity-template/micro_bargain1_4/app",
    //"components/templates/micro-activity-template/micro_bargain1_5/app",
    //"components/templates/micro-activity-template/micro_bargain1_6/app",

], function () {

    return angular.module("MicroActiveOldAndNewTemplate", [
        "ionic",
        "microOldNewTemplate2",
        "microOldNewTemplate3",
        "MicroOldNewTemplate4",
        "MicroOldNewTemplate5",
        "microOldNewTemplate6",
        "Template7",
        //final
        "Template3_1",
        "Template3_2",
        "Template3_3",
        "Template3_4",
        "Template3_5",
        "Template3_6",
        "Template3_7",
        "Template3_8",
        //学习日记
        "Template5_1",
        "Template5_2",
        "Template5_3",
        "Template5_4",
        "Template5_5",
        "Template5_6",
        //感恩节
        "Template6_1",
        "Template6_2",
        "Template6_3",
        "Template6_4",
        "Template6_5",
        "Template6_6",
        "Template6_7",
        //快乐寒假
        "microOldNewTemplate221",
        "microOldNewTemplate222",
        "microOldNewTemplate223",
        "microOldNewTemplate224",
        "microOldNewTemplate225",
        "microOldNewTemplate226",
        "microOldNewTemplate227",
        //父母微课堂
        "microOldNewTemplate7_1",
        "microOldNewTemplate7_2",
        "microOldNewTemplate7_3",
        "microOldNewTemplate7_4",
        "microOldNewTemplate7_5",
        "microOldNewTemplate7_6",
        "microOldNewTemplate7_7",
        //圣诞
        "Template8_1",
        "Template8_2",
        "Template8_3",
        "Template8_4",
        "Template8_5",
        "Template8_6",
        //备考小贴士
        "Template9_1",
        "Template9_2",
        "Template9_3",
        "Template9_4",
        "Template9_5",
        "Template9_6",
        "Template9_7",
        "Template9_8",
        "Template9_9",
        //家长开放日
        "Template10_1",
        "Template10_2",
        "Template10_3",
        "Template10_4",
        "Template10_5",
        "Template10_6",
        //元旦
        "Template11_1",
        "Template11_2",
        "Template11_3",
        //关荣榜
        "Template12_1",
        "Template12_2",
        "Template12_3",
        "Template12_4",
        "Template12_5",
        "Template12_6",
        "Template12_7",
        "Template12_8",
        "Template12_9",
        //新种草
        "Template13_1",
        "Template13_2",
        "Template13_3",
        "Template13_4",
        "Template13_5",

        //圣诞活动
        "Template14_1",
        "Template14_2",
        "Template14_3",
        "Template14_4",
        "Template14_5",
        //招生简章
        "Template15_1",
        "Template15_2",
        "Template15_3",
        //快速报名
        "Template16_1",
        //体验课
        "Template17_1",
        "Template17_2",
        //春节活动
        "Template18_1",
        //种菜
        "Template19_1",
        "Template19_2",
        "Template19_3",
        "Template19_4",
        "Template19_5",
        "Template19_6",
        //代金券
        "Template20_1",
        "Template20_2",
        "Template20_3",
        "Template20_4",
        //投票
        "Template21_1",
        "Template21_2",
        "Template21_3",
        //微传单
        "Template22_1",
        "Template22_2",
        "Template22_3",


  //水族馆模板
        "Template23_1",
        "Template23_2",
        "Template23_3",
        "Template23_4",
        "Template23_5",

        //微助力模板
        "Template24_1",
        "Template24_2",
        "Template24_3",
        "Template24_4",
        "Template24_5",
        "Template24_6",

        //微传单2
        "Template25_1",
        "Template25_2",
        "Template25_3",

        //微砍价
        //"MicroBargain1_1",
        //"MicroBargain1_2",
        //"MicroBargain1_3",
        //"MicroBargain1_4",
        //"MicroBargain1_5",
        //"MicroBargain1_6",


    ]);
});