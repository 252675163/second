define([

], function(require, factory) {

    return {
        /**
         * 路由和模块的映射关系,即state和module的映射
         */
        config: {
            "myAudio": "components/audio/app",
            "combobox": "components/combobox/app",
            "changePlaceholderByFocus": "components/common/directive", //common_1
            "myMaxLength": "components/common/directive",
            "myKeyboard": "components/common/directive",
            "scrollTopByBlur": "components/common/directive",
            "touchTopRender": "components/common/directive",
            "customInput": "components/common/directive",
            "newCustomInput": "components/common/directive",
            "myPlaceHold": "components/common/directive",
            "stopMove": "components/common/directive",
            "bindHtml": "components/common/directive",
            "modeSlide": "components/common/directive",
            "returnElementHeightByStyle": "components/common/directive",
            "chineseWordCount": "components/common/directive",
            "errSrc": "components/common/directive", //common_14
            "consultItem": "components/consult_item/app",
            "consultContent": "components/consult_item/consult_content/app",
            "errorRemind": "components/error_remind/app",
            "feedbackForm": "components/feedbackform/app",
            "myFooter": "components/footer/app",
            "isShaked": "components/is_shaked/app",
            "customMask": "components/mask/app",
            "multiTextInput": "components/multi_textinput/app",
            "newSiteNav": "components/new_site_nav/app",
            "nextButton": "components/next_button/app",
            "promptBar": "components/prompt_bar/app",
            "scratchCard": "components/scratch_card/app",
            "showImageBig": "components/show_image_big/app",
            "siteForm": "components/site_form/app",
            "sitePraise": "components/site_praise/app",
            "template10by1": "components/templates/micro-activity-template/template10_1/app", //tp_mat_t10_1
            "template10by2": "components/templates/micro-activity-template/template10_2/app",
            "template10by3": "components/templates/micro-activity-template/template10_3/app",
            "template10by4": "components/templates/micro-activity-template/template10_4/app",
            "template10by5": "components/templates/micro-activity-template/template10_5/app",
            "template10by6": "components/templates/micro-activity-template/template10_6/app", //tp_mat_t10_6
            "template11by1": "components/templates/micro-activity-template/template11/app", //tp_mat_t11_1
            "template11by2":  "components/templates/micro-activity-template/template11/app",
            "template11by3":  "components/templates/micro-activity-template/template11/app",
            "template12by1": "components/templates/micro-activity-template/template12_1/app", //tp_mat_t12_1
            "template12by2": "components/templates/micro-activity-template/template12_2/app",
            "template12by3": "components/templates/micro-activity-template/template12_3/app",
            "template12by4": "components/templates/micro-activity-template/template12_4/app",
            "template12by5": "components/templates/micro-activity-template/template12_5/app",
            "template12by6": "components/templates/micro-activity-template/template12_6/app",
            "template12by7": "components/templates/micro-activity-template/template12_7/app",
            "template12by8": "components/templates/micro-activity-template/template12_8/app",
            "template12by9": "components/templates/micro-activity-template/template12_9/app", //tp_mat_t12_9
            "template13by1": "components/templates/micro-activity-template/template13/app",//tp_mat_t13_1
            "template13by1Step1": "components/templates/micro-activity-template/template13/app",
            "template13by1Step2": "components/templates/micro-activity-template/template13/app",
            "template13by2": "components/templates/micro-activity-template/template13/app",
            "template13by3": "components/templates/micro-activity-template/template13/app",
            "template13by4": "components/templates/micro-activity-template/template13/app",
            "template13by5": "components/templates/micro-activity-template/template13/app",//tp_mat_t13_5
            "template14by1": "components/templates/micro-activity-template/template14/app", //tp_mat_t14_1
            "template14by1Step1": "components/templates/micro-activity-template/template14/app", //tp_mat_t14_1_1
            "template14by1Step2": "components/templates/micro-activity-template/template14/app", //tp_mat_t14_1_2
            "template14by2": "components/templates/micro-activity-template/template14/app",
            "template14by3": "components/templates/micro-activity-template/template14/app",
            "template14by4": "components/templates/micro-activity-template/template14/app",
            "template14by5": "components/templates/micro-activity-template/template14/app",
            "template15by1": "components/templates/micro-activity-template/template15_1/app", //tp_mat_t15_1
            "template15by2": "components/templates/micro-activity-template/template15_2/app",
            "template15by3": "components/templates/micro-activity-template/template15_3/app", //tp_mat_t15_3
            "template16by1": "components/templates/micro-activity-template/template16_1/app", //tp_mat_t16
            "template17by1": "components/templates/micro-activity-template/template17_1/app", //tp_mat_t17_1
            "template17by2": "components/templates/micro-activity-template/template17_2/app", //tp_mat_t17_2
            "template18by1": "components/templates/micro-activity-template/template18_1/app", //tp_mat_t18_1
            "template18by1Step1": "components/templates/micro-activity-template/template18_1/app", //tp_mat_t18_1_1
            "template18by1Step2": "components/templates/micro-activity-template/template18_1/app", //tp_mat_t18_2_2
            "template19by1": "components/templates/micro-activity-template/template19/app", //tp_mat_t19_1
            "template19by1Step1": "components/templates/micro-activity-template/template19/app",
            "template19by1Step2": "components/templates/micro-activity-template/template19/app",
            "template19by2": "components/templates/micro-activity-template/template19/app",
            "template19by3": "components/templates/micro-activity-template/template19/app",
            "template19by4": "components/templates/micro-activity-template/template19/app",
            "template19by5": "components/templates/micro-activity-template/template19/app",
            "template19by6": "components/templates/micro-activity-template/template19_6/app",
            "templateImgShow": "components/templates/micro-activity-template/template_img_show/app",//多图上传
            "templateTextShow": "components/templates/micro-activity-template/template_text_show/app",//多图+文字
            "microOldNewTemplate2": "components/templates/micro-activity-template/template2/app", //tp_mat_t2
            "microOldNewTemplate221": "components/templates/micro-activity-template/template2_2_1/app", //tp_mat_t2_2_1
            "microOldNewTemplate222": "components/templates/micro-activity-template/template2_2_2/app",
            "microOldNewTemplate223": "components/templates/micro-activity-template/template2_2_3/app",
            "microOldNewTemplate224": "components/templates/micro-activity-template/template2_2_4/app",
            "microOldNewTemplate225": "components/templates/micro-activity-template/template2_2_5/app",
            "microOldNewTemplate226": "components/templates/micro-activity-template/template2_2_6/app",
            "microOldNewTemplate227": "components/templates/micro-activity-template/template2_2_7/app", //tp_mat_t2_2_7           
            "template20by1Step1": "components/templates/micro-activity-template/template20/app",
            "template20by1Step2": "components/templates/micro-activity-template/template20/app",
            "template20by1Step3": "components/templates/micro-activity-template/template20/app",
            "template20by1": "components/templates/micro-activity-template/template20/app", //tp_mat_t20_1
            "template20by2": "components/templates/micro-activity-template/template20/app",
            "template20by3": "components/templates/micro-activity-template/template20/app",
            "template20by4": "components/templates/micro-activity-template/template20/app",
            "template21by1": "components/templates/micro-activity-template/template21/app", //tp_mat_t21_1
            "template21by1Step1": "components/templates/micro-activity-template/template21/app", //tp_mat_t21_1_1
            "template21by1Step2": "components/templates/micro-activity-template/template21/app",
            "template21by1Step3": "components/templates/micro-activity-template/template21/app",
            "template21by1Step4": "components/templates/micro-activity-template/template21/app", //tp_mat_t21_1_4
            "template21by2": "components/templates/micro-activity-template/template21/app",
            "template21by3": "components/templates/micro-activity-template/template21/app", //tp_mat_t21_3
            "template22by1": "components/templates/micro-activity-template/template22_1/app", //tp_mat_t22_1
            "template22by2": "components/templates/micro-activity-template/template22_2/app",
            "template22by3": "components/templates/micro-activity-template/template22_3/app", //tp_mat_t22_3
            "template23by1": "components/templates/micro-activity-template/template23/app", //tp_mat_t23_1
            "template23by1Step1": "components/templates/micro-activity-template/template23/app", //tp_mat_t23_1_1
            "template23by1Step2": "components/templates/micro-activity-template/template23/app", //tp_mat_t23_1_2
            "template23by2": "components/templates/micro-activity-template/template23/app",
            "template23by3": "components/templates/micro-activity-template/template23/app",
            "template23by4": "components/templates/micro-activity-template/template23/app",
            "template23by5": "components/templates/micro-activity-template/template23/app", //tp_mat_t23_5
            "template24by1": "components/templates/micro-activity-template/template24/app", //tp_mat_t24_1
            "template24by1Step1": "components/templates/micro-activity-template/template24/app",
            "template24by1Step2": "components/templates/micro-activity-template/template24/app",
            "template24by2": "components/templates/micro-activity-template/template24/app",
            "template24by3": "components/templates/micro-activity-template/template24/app",
            "template24by4": "components/templates/micro-activity-template/template24/app",
            "template24by5": "components/templates/micro-activity-template/template24/app",
            "template24by6": "components/templates/micro-activity-template/template24/app", //tp_mat_t24_6
            "template25by1": "components/templates/micro-activity-template/template25_1/app", //tp_mat_t25_1
            "template25by2": "components/templates/micro-activity-template/template25_2/app",
            "template25by3": "components/templates/micro-activity-template/template25_3/app", //tp_mat_t25_3
            "microOldNewTemplate3": "components/templates/micro-activity-template/template3/app", //tp_mat_t3
            "template3by1": "components/templates/micro-activity-template/template3_1/app", //tp_mat_t3_1
            "template3by2": "components/templates/micro-activity-template/template3_2/app",
            "template3by3": "components/templates/micro-activity-template/template3_3/app",
            "template3by4": "components/templates/micro-activity-template/template3_4/app",
            "template3by5": "components/templates/micro-activity-template/template3_5/app",
            "template3by6": "components/templates/micro-activity-template/template3_6/app",
            "template3by7": "components/templates/micro-activity-template/template3_7/app",
            "template3by8": "components/templates/micro-activity-template/template3_8/app", //tp_mat_t3_8
            "microOldNewTemplate4": "components/templates/micro-activity-template/template4/app", //tp_mat_t4
            "microOldNewTemplate5": "components/templates/micro-activity-template/template5/app", //tp_mat_t5
            "template5by1": "components/templates/micro-activity-template/template5_1/app", //tp_mat_t5_1
            "template5by2": "components/templates/micro-activity-template/template5_2/app",
            "template5by3": "components/templates/micro-activity-template/template5_3/app",
            "template5by4": "components/templates/micro-activity-template/template5_4/app",
            "template5by5": "components/templates/micro-activity-template/template5_5/app",
            "template5by6": "components/templates/micro-activity-template/template5_6/app", //tp_mat_t5_6
            "microOldNewTemplate6": "components/templates/micro-activity-template/template6/app", //tp_mat_t6
            "template6by1": "components/templates/micro-activity-template/template6_1/app", //tp_mat_t6_1
            "template6by2": "components/templates/micro-activity-template/template6_2/app",
            "template6by3": "components/templates/micro-activity-template/template6_3/app",
            "template6by4": "components/templates/micro-activity-template/template6_4/app",
            "template6by5": "components/templates/micro-activity-template/template6_5/app",
            "template6by6": "components/templates/micro-activity-template/template6_6/app",
            "template6by7": "components/templates/micro-activity-template/template6_7/app", //tp_mat_t6_7
            "template7": "components/templates/micro-activity-template/template7/app", //tp_mat_t7
            "microOldNewTemplate71": "components/templates/micro-activity-template/template7_1/app", //tp_mat_t7_1
            "microOldNewTemplate72": "components/templates/micro-activity-template/template7_2/app",
            "microOldNewTemplate73": "components/templates/micro-activity-template/template7_3/app",
            "microOldNewTemplate74": "components/templates/micro-activity-template/template7_4/app",
            "microOldNewTemplate75": "components/templates/micro-activity-template/template7_5/app",
            "microOldNewTemplate76": "components/templates/micro-activity-template/template7_6/app",
            "microOldNewTemplate77": "components/templates/micro-activity-template/template7_7/app", //tp_mat_t7_7
            "template8by1": "components/templates/micro-activity-template/template8_1/app", //tp_mat_t8_1
            "template8by2": "components/templates/micro-activity-template/template8_2/app",
            "template8by3": "components/templates/micro-activity-template/template8_3/app",
            "template8by4": "components/templates/micro-activity-template/template8_4/app",
            "template8by5": "components/templates/micro-activity-template/template8_5/app",
            "template8by6": "components/templates/micro-activity-template/template8_6/app", //tp_mat_t8_6
            "template9by1": "components/templates/micro-activity-template/template9_1/app", //tp_mat_t9_1
            "template9by2": "components/templates/micro-activity-template/template9_2/app",
            "template9by3": "components/templates/micro-activity-template/template9_3/app",
            "template9by4": "components/templates/micro-activity-template/template9_4/app",
            "template9by5": "components/templates/micro-activity-template/template9_5/app",
            "template9by6": "components/templates/micro-activity-template/template9_6/app",
            "template9by7": "components/templates/micro-activity-template/template9_7/app",
            "template9by8": "components/templates/micro-activity-template/template9_8/app",
            "template9by9": "components/templates/micro-activity-template/template9_9/app", //tp_mat_t9_9
            "microLeaflet3by1": "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_1/app", //tp_mlt_3_1
            "microLeaflet3by2": "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_2/app",
            "microLeaflet3by3": "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_3/app", //tp_mlt_3_3
            
            "microLeaflet4by1": "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_1/app", //tp_mlt_4_1
            "microLeaflet4by2": "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_2/app",
            "microLeaflet4by3": "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_3/app", //tp_mlt_4_3

            "microLeaflet5by1": "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_1/app", //����5
            "microLeaflet5by2": "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_2/app",
            "microLeaflet5by3": "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_3/app",
            //微砍价
            "microBargain1by1": "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/app", //tp_mpt_1_1
            "microBargain1by1Step1": "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/app", //tp_mpt_1_1_1
            "microBargain1by1Step2": "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/app", //tp_mpt_1_1_2
            "microBargain1by2": "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_2/app",
            "microBargain1by3": "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_3/app",
            "microBargain1by4": "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_4/app",
            "microBargain1by6": "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_6/app", //tp_mpt_1_1
            //微拼团
            "microSpellgroup1by1": "components/templates/micro-power-template/micro_spellgroup_1/app",
            "microSpellgroup1by1Step1": "components/templates/micro-power-template/micro_spellgroup_1/app",
            "microSpellgroup1by1Step2": "components/templates/micro-power-template/micro_spellgroup_1/app",
            "microSpellgroup1by2": "components/templates/micro-power-template/micro_spellgroup_1/app",
            "microSpellgroup1by3": "components/templates/micro-power-template/micro_spellgroup_1/app",
            "microSpellgroup1by4": "components/templates/micro-power-template/micro_spellgroup_1/app",
            "microSpellgroup1by5": "components/templates/micro-power-template/micro_spellgroup_1/app",
            "microSpellgroup1by6": "components/templates/micro-power-template/micro_spellgroup_1/app",

            "microTemplate1": "components/templates/micro-site-template/template1/app", //tp_mst_t1
            "microTemplate2": "components/templates/micro-site-template/template2/app",
            "microTemplate3": "components/templates/micro-site-template/template3/app",
            "microTemplate4": "components/templates/micro-site-template/template4/app",
            "microTemplate5": "components/templates/micro-site-template/template5/app",
            "microTemplate6": "components/templates/micro-site-template/template6/app", //tp_mst_t6

            "microPoster1by1": "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_1/app", //海报1
            "microPoster1by2": "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_2/app",
            "microPoster1by3": "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_3/app",
            "microPoster1by4": "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_4/app",
            "microPoster1by5": "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_5/app",
            "microPoster1by6": "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_6/app",

            "microPoster2by1": "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_1/app", //海报1
            "microPoster2by2": "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_2/app",
            "microPoster2by3": "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_3/app",
            "microPoster2by4": "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_4/app",
            "microPoster2by5": "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_5/app",
            "microPoster2by6": "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_6/app",
            "microPoster2by7": "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_7/app",
            "microPoster2by8": "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_8/app",

            "microPoster3by1": "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/app", //海报3
            "microPoster3by2": "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_2/app",

            "siteAboutUsInfo": "components/templates/new-micro-site-template/site-about-us-info/app", //tp_nmst_1
            "siteAboutUsInfoEdit": "components/templates/new-micro-site-template/site-about-us-info/app",
            "siteCourseInfo": "components/templates/new-micro-site-template/site-course-info/app",
            "siteCourseInfoEdit": "components/templates/new-micro-site-template/site-course-info/app",
            // "siteCover": "components/templates/new-micro-site-template/site-cover/app",
            // "siteCover": "components/templates/new-micro-site-template/site-qr-cover/app",
            "siteNews": "components/templates/new-micro-site-template/site-news/app",
            "siteOrgInfo": "components/templates/new-micro-site-template/site-org-info/app",
            // "siteQrCode": "components/templates/new-micro-site-template/site-cover/app",
            // "siteQrCode": "components/templates/new-micro-site-template/site-qr-cover/app",
            "siteTeacherInfo": "components/templates/new-micro-site-template/site-teacher-info/app",
            "siteTeacherInfoEdit": "components/templates/new-micro-site-template/site-teacher-info/app", //tp_nmst_7
            "textInput": "components/textinput/app",
            "textInputCallback": "components/textinput_callback/app",
            "newTextInput": "components/textinput_new/app",
            "uploadImg": "components/upload_img/app",
            "userTerms": "components/user_terms/app",
            "websiteUploadImg": "components/WebsiteUpload_img/app",
            //微店图片上传，分享组件
            "multiImageUpload": "components/multi_image_upload/app",
            "sharePopup": "components/share_popup/app"
        },

        /**
         * ����state��ȡģ��
         */
        getModuleByState: function(name) {
            var convertName = this.getConvertName(name);
            return this.config[convertName];
        },
        /**
         * 
         */
        getConvertName: function(name) {
            var word = [],
                sum = "",
                lh;
            if (name.indexOf("-") !== -1) {
                word = name.split("-");
            } else if (name.indexOf("_") !== -1) {
                word = name.split("_");
            } else {
                return name;
            }
            sum += word[0];
            for (var i = 1; i < word.length; i++) {
                var abc = word[i].split("");
                abc[0] = abc[0].toUpperCase();
                lh = abc.join("");
                sum += lh;
            }
            return sum;
        }
    }
});