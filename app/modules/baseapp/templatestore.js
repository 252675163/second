angular.module('templateStore', ['components/error_remind/error_remind.html', 'components/mask/template.html', 'components/upload_img/upload_img.html', 'modules/micro-activity-grass-app/micro-activity-grass-app.html', 'modules/micro-activity-grassavatar-app/micro-activity-grassavatar-app.html', 'modules/micro-activity-grassconsult-app/micro-activity-grassconsult-app.html', 'modules/micro-activity-grassgrow-app/micro-activity-grassgrow-app.html', 'modules/micro-activity-grassindex-app/micro-activity-grassindex-app.html', 'modules/micro-activity-grassindexb-app/micro-activity-grassindexb-app.html', 'modules/micro-activity-grassmusic-app/micro-activity-grassmusic-app.html', 'modules/micro-activity-index-app/micro-activity-index-app.html', 'modules/micro-activity-oldandnew-add-app/micro-activity-oldandnew-add-app.html', 'modules/micro-activity-oldandnew-app/micro-activity-oldandnew-app.html', 'modules/micro-activity-oldandnew-audio-app/micro-activity-oldandnew-audio-app.html', 'modules/micro-activity-oldandnew-back-app/micro-activity-oldandnew-back-app.html', 'modules/micro-activity-oldandnew-edit-app/micro-activity-oldandnew-edit-app-directive.html', 'modules/micro-activity-oldandnew-edit-app/micro-activity-oldandnew-edit-app.html', 'modules/micro-activity-oldandnew-preview-app/micro-activity-oldandnew-preview-app.html', 'modules/micro-activity-oldandnew-preview-app/microactivityoldandmewpreviewview-directive.html', 'modules/micro-activity-oldandnew-view-app/micro-activity-oldandnew-view-app.html', 'modules/micro-activity-oldandnew-view-app/microactivityoldandnewviewview-directive.html', 'modules/microactivityapp/microactivityapp.html', 'modules/microsite-add-app/microsite-add-app.html', 'modules/microsite-back-app/microsite-back-app.html', 'modules/new-microsite-edit-app/new-microsite-edit-app.html', 'modules/new-microsite-edit-app/micrositeeditview-directive.html', 'modules/microsite-index-app/microsite-index-app.html', 'modules/microsite-preview-app/microsite-preview-app.html', 'modules/microsite-preview-app/micrositepreviewview-directive.html', 'modules/microsite-publish-app/microsite-publish-app.html', 'modules/microsite-statistics-app/microsite-statistics-app.html', 'modules/new-microsite-view-app/new-microsite-view-app.html', 'modules/new-microsite-view-app/micrositeviewview-directive.html', 'modules/new-micrositeapp/new-micrositeapp.html']);

angular.module("components/error_remind/error_remind.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/error_remind/error_remind.html",
    "<div class=\"bar bar-header item-icon-right tips_error_wrap\" ng-style=\"{'display':isShowShare?'block':'none'}\"><div class=\"text-left col-center\" style=padding-left:20px><h6 class=light style=\"word-break: break-all\">{{myRemind}}</h6></div><i class=\"icon ion-android-close\" style=font-size:20px ng-click=closeRemind()></i></div>");
}]);

angular.module("components/mask/template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/mask/template.html",
    "<div style=\"display: none\" ng-show=mask.isShow><div class=\"lockMask lcstyle\"></div><div class=\"lockMask_index popup-tips\">{{mask.info}}</div></div>");
}]);

angular.module("components/upload_img/upload_img.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/upload_img/upload_img.html",
    "<div><div id=showResult style=\"display: none\"><div style=\"width: 50%;margin: 0 auto;margin-top: 10px\"><input id=image type=file capture=\"camera\"></div><div style=\"width: 80%;margin: 0 auto;margin-top: 10px\"><div id=elapsedTime style=\"margin-bottom: 10px\"></div><p id=zipResult></p><div id=ua></div></div><div ng-transclude></div><div id=changeAvatar style=\"margin-top: 35px\"><img src=\"\" style=\"width: 100px;margin-top: 10px;margin: 0 auto;display:block\"></div></div><div id=showEdit style=\"display: none;width:100%;height: 100%;position: absolute;top:0;left: 0;z-index: 9; background-color: #09090A\"><div style=\"width:100%;position: absolute;top:10px;left:0px\"><button class=mui-btn data-mui-style=fab id=cancleBtn style=\"margin-left: 10px\">取消</button> <button class=mui-btn data-mui-style=fab data-mui-color=primary id=confirmBtn style=\"float:right;margin-right: 10px\">确定</button></div><div id=report></div></div><error-remind my-remind=remind is-show=isShowError></error-remind></div>");
}]);

angular.module("modules/micro-activity-grass-app/micro-activity-grass-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-grass-app/micro-activity-grass-app.html",
    "<ion-view class=paneabird1 title=后台编辑><div class=grass_head_bg><div class=grass_title1></div><textarea class=textarea_style1 ng-model=title maxlength=200></textarea></div><ion-footer-bar><ion-tabs class=\"tabs-icon-top tabs-color-active-positive grass-edit-tabs\"><ion-tab title=改背景 icon-off=sireeditback icon-on=sireeditback></ion-tab><ion-tab title=改音乐 icon-off=siteeditmusic icon-on=siteeditmusic ng-click=goChoseMusic()></ion-tab><ion-tab title=加页面 icon-off=siteeditnew icon-on=siteeditnew ng-click=addPage()></ion-tab><ion-tab title=删页面 icon-off=siteeditdelete icon-on=siteeditdelete ng-click=delCurrentPage()></ion-tab><ion-tab title=预览 icon-off=siteeditpreview icon-on=siteeditpreview ng-click=goPreview()></ion-tab></ion-tabs></ion-footer-bar></ion-view>");
}]);

angular.module("modules/micro-activity-grassavatar-app/micro-activity-grassavatar-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-grassavatar-app/micro-activity-grassavatar-app.html",
    "<ion-view class=body-bg-s1 title=上传头像><preview-btn ng-if=\"ispreview=='true'\"></preview-btn><div class=\"template6 section6\" ng-class=\"{'edit':isEdit, 'show': !isEdit}\" ng-show=!isUpdateImg><div class=btnGroup1 style=top:4.8rem><button type=button class=btn-changeFace ng-click=updateImg()></button></div><div style=\"right:1.3rem;position: absolute;top: .49rem\"><button type=button ng-class=\"!flg?'btnG3_music':'btnG3_musicon'\" ng-click=pause(flg)></button></div><div class=vatar-tips></div><div class=person_box id=animateContainer><div class=\"person_head unhappy\"><div class=flowers></div><img ng-src={{imageUrl}} class=\"person_head-face\"></div><div class=person_dialogBox_big style=\"display: none\"><p class=person_dialogText>我的头上还没有草<br>一棵都没有…</p></div><div class=person_dialogBox_small style=\"display: none\"><p class=person_dialogText>我有6颗草哟...</p></div><img src=/app/img/mushroom_grow.gif class=\"person_head_grass one\" id=grass style=\"display: none\"> <img src=/app/img/mushroom_dance.gif class=\"person_head_grasss one\" id=grassDance style=\"display: none\"></div><div class=btnGroup2><button type=button class=btn_style1 ng-click=goConsult()>喊人帮我种草</button></div><div class=lockMask-loading style=display:none></div><audio autoplay loop><source ng-src={{musicUrl}} type=\"audio/mpeg\">Your browser does not support the audio element.</audio></div></ion-view>");
}]);

angular.module("modules/micro-activity-grassconsult-app/micro-activity-grassconsult-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-grassconsult-app/micro-activity-grassconsult-app.html",
    "<ion-view class=content_bg_s2 title=立刻喊人><preview-btn ng-if=\"ispreview=='true'\"></preview-btn><error-remind my-remind=remind is-show=isShow></error-remind><div class=consult_title></div><div class=\"list list-inset\"><label class=\"item item-input item-input-wrapper\"><span class=\"input-label col-10\" style=\"border-right: 1px #ccc solid;padding: 2px 8px 2px 0;margin-right: 9px\">姓名</span> <input placeholder=\"\" ng-model=people.Name maxlength=15></label><br><label class=\"item item-input item-input-wrapper\"><span class=\"input-label col-10\" style=\"border-right: 1px #ccc solid;padding: 2px 8px 2px 0;margin-right: 9px\">电话</span> <input type=tel placeholder=\"\" ng-model=people.Phone></label></div><br><div class=padding><button class=btn_style1 ng-click=callSomeone()>立刻喊人</button></div><div ng-style=\"{'display':isShowShare}\"><div class=\"lockMask lcstyle\"></div><div class=\"lockMask_index share\"></div></div></ion-view>");
}]);

angular.module("modules/micro-activity-grassgrow-app/micro-activity-grassgrow-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-grassgrow-app/micro-activity-grassgrow-app.html",
    "<ion-view class=body-bg-s1 title=种草><preview-btn ng-if=\"ispreview=='true'\"></preview-btn><div style=\"right:1.6rem;position: absolute;top: .8rem\"><button type=button ng-click=pause(flg) ng-class=\"!flg?'btnG3_music':'btnG3_musicon'\"></button></div><div class=btnGroup1 style=top:4.8rem ng-show=isAllowGrow><button id=btnRace type=button class=btn-chooseType ng-click=chooseGrass()></button></div><div class=person_box id=animateContainer><div class=\"person_head unhappy\"><div class=flowers></div><img ng-src={{avatar}} class=\"person_head-face\"></div><div class=person_dialogBox_big style=\"display: none\"><p class=person_dialogText>我的头上还没有草<br>一棵都没有…</p></div><div class=person_dialogBox_small style=\"display: none\"><p class=person_dialogText>我有6颗草哟...</p></div><img ng-src={{grassGrowUrl}} class=\"person_head_grass one\" id=grass ng-show=\"isGrow\"> <img ng-src={{grassDanceUrl}} class=\"person_head_grass one\" id=grassDance ng-show=\"isDance\"></div><div class=btnGroup2><button type=button class=btn_style1 ng-click=goConsult()>喊人帮我种草</button></div><div ng-show=isChoose><div class=lockMask></div><div class=page_box1_wrap><div class=page_box1_head>选择你喜欢的草</div><button type=button class=btn_round_close ng-click=closeGrass()></button><div class=\"page_box1 clearfix\"><button type=button class=\"page_box1_item item1\" ng-click=chooseGrassAction(1)><span class=page_box1_text>小豆芽</span></button> <button type=button class=\"page_box1_item item2\" ng-click=chooseGrassAction(2)><span class=page_box1_text>蕨菜</span></button> <button type=button class=\"page_box1_item item3\" ng-click=chooseGrassAction(3)><span class=page_box1_text>小树苗</span></button> <button type=button class=\"page_box1_item item4\" ng-click=chooseGrassAction(4)><span class=page_box1_text>幸运草</span></button> <button type=button class=\"page_box1_item item5\" ng-click=chooseGrassAction(5)><span class=page_box1_text>小花花</span></button> <button type=button class=\"page_box1_item item6\" ng-click=chooseGrassAction(6)><span class=page_box1_text>蒲公英</span></button> <button type=button class=\"page_box1_item item7\" ng-click=chooseGrassAction(7)><span class=page_box1_text>向日葵</span></button> <button type=button class=\"page_box1_item item8\" ng-click=chooseGrassAction(8)><span class=page_box1_text>小雏菊</span></button> <button type=button class=\"page_box1_item item9\" ng-click=chooseGrassAction(9)><span class=page_box1_text>小蘑菇</span></button></div></div></div><div class=lockMask-loading-grass ng-show=isLoging></div><audio autoplay loop><source ng-src={{musicUrl}} type=\"audio/mpeg\">Your browser does not support the audio element.</audio></ion-view>");
}]);

angular.module("modules/micro-activity-grassindex-app/micro-activity-grassindex-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-grassindex-app/micro-activity-grassindex-app.html",
    "<style>.textarealbl {\n" +
    "        margin: .3rem auto 0;\n" +
    "        height: 3.2rem;\n" +
    "        width: 10.78rem;\n" +
    "        /*border: #53a9f1 1px dashed;*/\n" +
    "        padding: 5px;\n" +
    "        background: none;\n" +
    "        color: #fff;\n" +
    "        font-size: .8rem;\n" +
    "    }</style><ion-view class=paneabird1 title=种草><div class=grass_head_bg><div class=grass_title1></div><div class=textarealbl>{{title}}</div></div><div class=btnGroup2><button type=button class=btn_style1 ng-click=goConsult()>我也要喊人种草</button></div></ion-view>");
}]);

angular.module("modules/micro-activity-grassindexb-app/micro-activity-grassindexb-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-grassindexb-app/micro-activity-grassindexb-app.html",
    "<ion-view class=paneabird title=帮他种草><preview-btn ng-if=\"ispreview=='true'\"></preview-btn><div class=grass_head_bg><div class=grass_title1></div><div class=textarealbl>{{title}}</div><div class=textarealbl1 ng-if=\"score>0\">我是{{name}}，我头上已经有{{score}}棵草</div><div class=textarealbl1 ng-if=\"score<=0\">我是{{name}}，我头上一棵草都没有</div></div><div class=person_box id=animateContainer><div class=\"person_head unhappy\"><img ng-src={{headImg}} class=\"person_head-face\"></div><img ng-src={{grassUrl}} ng-if=isShow class=\"person_head_grass {{grassClass}}\"></div><div class=btnGroup2><button type=button class=btn_style2 ng-click=goGrow()>帮他种草</button> <button type=button class=btn_style1 ng-click=goConsult()>我也要喊人种草</button></div><div class=footer-copyright ng-bind-html=foot></div></ion-view>");
}]);

angular.module("modules/micro-activity-grassmusic-app/micro-activity-grassmusic-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-grassmusic-app/micro-activity-grassmusic-app.html",
    "<ion-view title=选择音乐 style=\"background-color:#e7e7e9; overflow-y: auto; overflow-x: hidden\"><div class=list><a class=\"item text-center\" ng-click=changeIndex(-1) ng-class=\"{'item-selected':index==-1}\"><img class=icon_music src=/app/img/nomusic.png ng-show=\"index==-1\"> <span class=padding-left>无音乐</span></a> <a class=\"item text-center\" ng-click=changeIndex($index) ng-class=\"{'item-selected':index==$index}\" ng-repeat=\"music in musics\"><img class=icon_music src=/app/img/musicing.png ng-show=\"index==$index\"> <span class=padding-left>{{music.Name}}</span></a></div><div class=list><div class=\"item text-center\"><button class=\"button button-clear\" style=width:100%;height:100%;color:black ng-click=goGrass()>确认更改</button></div></div><audio autoplay loop><source ng-src={{musicUrl}} type=\"audio/mpeg\">Your browser does not support the audio element.</audio></ion-view>");
}]);

angular.module("modules/micro-activity-index-app/micro-activity-index-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-index-app/micro-activity-index-app.html",
    "<ion-view class=activity-index_box><img src=/app/img/activity_inedx_1.jpg ng-click=\"goToOldAndNewPreview()\"><div class=activity-index_title><span>{{data[0].Name}}</span></div><ion-tabs class=\"tabs-icon-left activity-index_tabs\"><ion-tab title=编辑 icon-off=tab-icon1 icon-on=tab-icon1 ng-click=goToOldAndNew()></ion-tab><ion-tab title=发起活动 icon-off=tab-icon2 icon-on=tab-icon2 ng-click=shareOldAndNew()></ion-tab><ion-tab title=数据统计 icon-off=tab-icon3 icon-on=tab-icon3 ng-click=statistics(0)></ion-tab></ion-tabs></ion-view><ion-view class=activity-index_box><img src=/app/img/activity_inedx_2.jpg ng-click=\"goGrassPreview()\"><div class=activity-index_title><span>{{data[1].Name}}</span></div><ion-tabs class=\"tabs-icon-left activity-index_tabs\"><ion-tab title=编辑 icon-off=tab-icon1 icon-on=tab-icon1 ng-click=goToGrass()></ion-tab><ion-tab title=发起活动 icon-off=tab-icon2 icon-on=tab-icon2 ng-click=shareGrass()></ion-tab><ion-tab title=数据统计 icon-off=tab-icon3 icon-on=tab-icon3 ng-click=statistics(1)></ion-tab></ion-tabs></ion-view><div style=\"display:{{isShare ? 'block':'none'}}\"><div class=\"lockMask lcstyle\"></div><div class=\"lockMask_index share\"></div></div>");
}]);

angular.module("modules/micro-activity-oldandnew-add-app/micro-activity-oldandnew-add-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-add-app/micro-activity-oldandnew-add-app.html",
    "<ion-view title=ѡ��ģ��ҳ��><ion-content scroll=false class=temp-add-wrap><ion-list><ion-item ng-click=saveMould(section.templateName,section.backgroundImage) class=temp-add-item ng-repeat=\"section in sections.template\"><img ng-src={{section.templateUrl}}></ion-item></ion-list></ion-content></ion-view>");
}]);

angular.module("modules/micro-activity-oldandnew-app/micro-activity-oldandnew-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-app/micro-activity-oldandnew-app.html",
    "<!DOCTYPE html><html lang=en><head><meta charset=UTF-8><title></title></head><body></body></html>");
}]);

angular.module("modules/micro-activity-oldandnew-audio-app/micro-activity-oldandnew-audio-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-audio-app/micro-activity-oldandnew-audio-app.html",
    "<ion-view style=\"background-color:#e7e7e9; overflow-y: auto; overflow-x: hidden\" title=选择背景音乐><audio id=myaudio autoplay><source ng-src={{musicUrl}} type=\"audio/mpeg\"></audio><div class=list><a class=\"item text-center\" ng-click=pickAudio(-1) ng-class=\"{'item-selected':selectAudioIndex==-1}\"><img class=icon_music src=/app/img/nomusic.png ng-show=\"selectAudioIndex==-1\"> <span class=padding-left>无音乐</span></a> <a class=\"item text-center\" ng-click=pickAudio($index) ng-class=\"{'item-selected':selectAudioIndex==$index}\" ng-repeat=\"audioModel in audios\"><img class=icon_music src=/app/img/musicing.png ng-show=\"selectAudioIndex==$index\"> <span class=padding-left>{{audioModel.Name}}</span></a></div><div class=list><div class=\"item text-center\"><button class=\"button button-clear\" style=width:100%;height:100%;color:black ng-click=saveAudioSelector()>确认更改</button></div></div></ion-view>");
}]);

angular.module("modules/micro-activity-oldandnew-back-app/micro-activity-oldandnew-back-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-back-app/micro-activity-oldandnew-back-app.html",
    "<ion-view title=ѡ�񱳾�><ion-content class=temp-add-wrap><ion-list><ion-item ng-click=savePic(back) class=temp-add-item ng-repeat=\"back in backs\"><img ng-src={{back.Url}}></ion-item></ion-list></ion-content></ion-view>");
}]);

angular.module("modules/micro-activity-oldandnew-edit-app/micro-activity-oldandnew-edit-app-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-edit-app/micro-activity-oldandnew-edit-app-directive.html",
    "");
}]);

angular.module("modules/micro-activity-oldandnew-edit-app/micro-activity-oldandnew-edit-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-edit-app/micro-activity-oldandnew-edit-app.html",
    "<ion-view cache-view=false title=编辑模板><ion-content scroll=false class=has-footer_cover><error-remind my-remind=remind is-show=isShowError></error-remind><div id=editdiv class=editor-box-wrap><old-and-new-edit-view site-model=siteModel></old-and-new-edit-view></div><button ng-if=\"siteModel.currentSectionIndex!=0\" class=btn-turnToTop ng-click=upIcon()>↑</button> <button ng-if=\"siteModel.currentSectionIndex!=(siteModel.pages[siteModel.currentPageIndex].sections.length-1)\" class=btn-turnToBottom ng-click=downIcon()>↓</button></ion-content><ion-footer-bar><ion-tabs class=\"tabs-icon-top tabs-color-active-positive editPage-tabs\"><ion-tab title=改背景 icon-off=sireeditback icon-on=sireeditback ng-click=changeBackGround()></ion-tab><ion-tab title=改音乐 icon-off=siteeditmusic icon-on=siteeditmusic ng-click=changeAudio()></ion-tab><ion-tab title=加页面 icon-off=siteeditnew icon-on=siteeditnew disabled ng-click=addPage()></ion-tab><ion-tab title=删页面 icon-off=siteeditdelete icon-on=siteeditdelete disabled ng-click=delCurrentPage()></ion-tab><ion-tab title=预览 icon-off=siteeditpreview icon-on=siteeditpreview ng-click=preview()></ion-tab></ion-tabs></ion-footer-bar></ion-view>");
}]);

angular.module("modules/micro-activity-oldandnew-preview-app/micro-activity-oldandnew-preview-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-preview-app/micro-activity-oldandnew-preview-app.html",
    "<ion-view cache-view=false title=预览页面><div id=container><micro-activity-old-and-new-preview-view site-model=siteModel></micro-activity-old-and-new-preview-view></div><audio id=myaudio autoplay loop><source ng-src={{musicUrl}} type=\"audio/mpeg\"></audio><div class=btnGroup3><button type=button class=btnG3_publish ng-click=finish()><span>完成</span></button> <button type=button class=btnG3_edit ng-click=goToEdit()><span>编辑</span></button></div><div style=\"right:1.3rem;position: absolute;top: .49rem\"><button type=button ng-class=\"!isOpen?'btnG3_music':'btnG3_musicon'\" ng-click=closeAndOpenMusic()></button></div><div ng-show=isBottom class=footer-copyright ng-bind-html=footer></div></ion-view>");
}]);

angular.module("modules/micro-activity-oldandnew-preview-app/microactivityoldandmewpreviewview-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-preview-app/microactivityoldandmewpreviewview-directive.html",
    "");
}]);

angular.module("modules/micro-activity-oldandnew-view-app/micro-activity-oldandnew-view-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-view-app/micro-activity-oldandnew-view-app.html",
    "<ion-view cache-view=false><div id=container><micro-activity-old-and-new-view-view site-model=siteModel></micro-activity-old-and-new-view-view></div><audio id=myaudio autoplay loop><source ng-src={{musicUrl}} type=\"audio/mpeg\"></audio><div ng-show=isBottom class=footer-copyright ng-bind-html=data.Footer></div></ion-view>");
}]);

angular.module("modules/micro-activity-oldandnew-view-app/microactivityoldandnewviewview-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/micro-activity-oldandnew-view-app/microactivityoldandnewviewview-directive.html",
    "");
}]);

angular.module("modules/microactivityapp/microactivityapp.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/microactivityapp/microactivityapp.html",
    "<div upload-img></div><mask></mask><ion-nav-view></ion-nav-view>");
}]);

angular.module("modules/microsite-add-app/microsite-add-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/microsite-add-app/microsite-add-app.html",
    "<ion-view cache-view=false title=选择页面模板><ion-content scroll=false class=temp-add-wrap><ion-list><ion-item ng-click=saveMould(section.templateName,section.backgroundImage) class=temp-add-item ng-repeat=\"section in sections.templates\"><img ng-src={{section.templateUrl}}></ion-item></ion-list></ion-content></ion-view>");
}]);

angular.module("modules/microsite-back-app/microsite-back-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/microsite-back-app/microsite-back-app.html",
    "<ion-view cache-view=false title=选择背景><ion-content class=temp-add-wrap><ion-list><ion-item ng-click=savePic(back) class=temp-add-item ng-repeat=\"back in backs\"><img ng-src={{back.Url}}></ion-item></ion-list></ion-content></ion-view>");
}]);

angular.module("modules/new-microsite-edit-app/new-microsite-edit-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/new-microsite-edit-app/new-microsite-edit-app.html",
    "<ion-view cache-view=false title=编辑模板><error-remind my-remind=remind is-show=isShowError></error-remind><ion-content scroll=false class=has-footer_cover><div id=editdiv class=editor-box-wrap><micro-site-edit-view site-model=siteModel></micro-site-edit-view></div><button ng-if=\"siteModel.currentSectionIndex!=0\" class=btn-turnToTop ng-click=upIcon()>↑</button> <button ng-if=\"siteModel.currentSectionIndex!=(siteModel.pages[siteModel.currentPageIndex].sections.length-1)\" class=btn-turnToBottom ng-click=downIcon()>↓</button> <button ng-if=\"siteModel.currentPageIndex!=0 \" class=btn-turnToLeft ng-click=leftIcon()>←</button> <button ng-if=\"siteModel.currentPageIndex!=(siteModel.pages.length-1)\" class=btn-turnToRight ng-click=rightIcon()>→</button><div class=foot-tab-bg><div class=btn_about ng-class=\"{'active': siteModel.currentPageIndex==0}\"><input ng-disabled=\"siteModel.currentPageIndex!=0\" ng-model=siteModel.pages[0].pageName value=\"{{siteModel.pages[0].pageName}}\"></div><div class=btn_show ng-class=\"{'active': siteModel.currentPageIndex==1}\"><input ng-disabled=\"siteModel.currentPageIndex!=1\" ng-model=siteModel.pages[1].pageName value=\"{{siteModel.pages[1].pageName}}\"></div><div class=btn_course ng-class=\"{'active': siteModel.currentPageIndex==2}\"><input ng-disabled=\"siteModel.currentPageIndex!=2\" ng-model=siteModel.pages[2].pageName value=\"{{siteModel.pages[2].pageName}}\"></div></div></ion-content><ion-footer-bar><ion-tabs class=\"tabs-icon-top tabs-color-active-positive editPage-tabs\"><ion-tab title=改背景 icon-off=sireeditback icon-on=sireeditback ng-click=changeBackGround()></ion-tab><ion-tab title=加页面 icon-off=siteeditnew icon-on=siteeditnew disabled ng-click=addPage()></ion-tab><ion-tab title=删页面 icon-off=siteeditdelete icon-on=siteeditdelete disabled ng-click=delCurrentPage()></ion-tab><ion-tab title=预览 icon-off=siteeditpreview icon-on=siteeditpreview ng-click=preview()></ion-tab></ion-tabs></ion-footer-bar></ion-view>");
}]);

angular.module("modules/new-microsite-edit-app/micrositeeditview-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/new-microsite-edit-app/micrositeeditview-directive.html",
    "");
}]);

angular.module("modules/microsite-index-app/microsite-index-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/microsite-index-app/microsite-index-app.html",
    "<ion-view><div style=\"display:{{isShare ? 'block':'none'}}\"><div class=\"lockMask lcstyle\" style=z-index:250></div><div class=\"lockMask_index share\" style=z-index:250></div></div><ion-content scroll=false class=has-footer_cover><div class=lockMask_index ng-click=goToPreview()></div><div id=editdiv class=editor-box-wrap ng-hide=isHide><micro-site-index-view site-model=siteModel></micro-site-index-view></div><div class=foot-tab-bg><a class=\"btn_about active\">{{siteModel.pages[0].pageName}}</a> <a class=btn_show>{{siteModel.pages[1].pageName}}</a> <a class=btn_course>{{siteModel.pages[2].pageName}}</a></div></ion-content><ion-tabs class=\"tabs-icon-left activity-index_tabs\"><ion-tab title=编辑 icon-off=tab-icon1 icon-on=tab-icon1 ng-click=editView()></ion-tab><ion-tab title=分享 icon-off=tab-icon2 icon-on=tab-icon2 ng-click=share()></ion-tab><ion-tab title=数据统计 icon-off=tab-icon3 icon-on=tab-icon3 ng-click=statistics()></ion-tab></ion-tabs></ion-view>");
}]);

angular.module("modules/microsite-preview-app/microsite-preview-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/microsite-preview-app/microsite-preview-app.html",
    "<ion-view cache-view=false title=预览页面><div id=container><micro-site-preview-view site-model=siteModel></micro-site-preview-view></div><div class=btnGroup3><button type=button class=btnG3_publish ng-click=goToPublish()><span>发布</span></button> <button type=button class=btnG3_edit ng-click=goToEdit()><span>编辑</span></button></div><div class=foot-tab-bg><a class=btn_about ng-class=\"{'active': siteModel.currentPageIndex==0}\" ng-click=pickPage(0)>{{siteModel.pages[0].pageName}}</a> <a class=btn_show ng-class=\"{'active': siteModel.currentPageIndex==1}\" ng-click=pickPage(1)>{{siteModel.pages[1].pageName}}</a> <a class=btn_course ng-class=\"{'active': siteModel.currentPageIndex==2}\" ng-click=pickPage(2)>{{siteModel.pages[2].pageName}}</a></div><div ng-show=isBottom class=footer-copyright ng-bind-html=footer></div></ion-view>");
}]);

angular.module("modules/microsite-preview-app/micrositepreviewview-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/microsite-preview-app/micrositepreviewview-directive.html",
    "");
}]);

angular.module("modules/microsite-publish-app/microsite-publish-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/microsite-publish-app/microsite-publish-app.html",
    "<ion-view class=content-bg cache-view=false title=保存发布><error-remind my-remind=remind is-show=isShowError></error-remind><div class=lockMask_box ng-show=isPublish><div class=lockMask></div><div class=lockMask_content><div class=lock_title ng-class=\"{'lock_fail_title': isPublishFail}\"></div><div class=lock_text ng-class=\"{'lock_fail_text': isPublishFail}\"><div class=ps_success>{{isPublishFail?\"发布失败！\":\"发布成功！\"}}</div><div class=ps_text>{{calMessage}}正在为 您跳转{{isPublishFail?\"回编辑页面\":\"到首页\"}}...</div></div></div></div><div><div class=publish-wrap><div class=publish-item><span class=\"checkbox-copy disabled\"></span> 发布到我的微官网</div><div class=publish-item ng-click=\"isSelectSynchro=!isSelectSynchro\"><span class=checkbox-copy ng-class=\"{'checked': isSelectSynchro}\"></span> 同步到微信公众号</div></div><div class=publish-wrap ng-show=isSelectSynchro><div class=\"publish-box clearfix\"><div ng-show=isErrorByMessage class=publish-tips>您的ID和密码不匹配！</div><div class=publish-label>公众号Id</div><input class=publish-text ng-class=\"{'publish-text-error': isErrorByMessage}\" ng-model=publicId><div class=publish-label>密码</div><input class=publish-text ng-class=\"{'publish-text-error': isErrorByMessage}\" ng-model=publicPassword type=password> <a class=publish-tips2 href=\"https://mp.weixin.qq.com/\">找不到账号信息怎么办？</a></div></div><div class=publish-btnBox><button class=btn_style1 ng-click=savePublish(isSelectSynchro,publicId,publicPassword)>确认发布</button></div></div></ion-view>");
}]);

angular.module("modules/microsite-statistics-app/microsite-statistics-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/microsite-statistics-app/microsite-statistics-app.html",
    "<ion-view class=content-bg><ion-content scroll=false><div class=statistics-title>7天数据汇总</div><div class=\"statistics-total-wrap clearfix\"><div class=statistics-total-item><span class=bg-s1>{{data.Sum.Pv}}</span><em>总访问量</em></div><div class=statistics-total-item><span class=bg-s2>{{data.Sum.Uv}}</span><em>总访客量</em></div><div class=statistics-total-item><span class=bg-s3>{{data.Sum.Consult}}</span><em>总咨询量</em></div></div><div class=statistics-list><table><tr><th>日期</th><th>访问量</th><th>访客量</th><th>咨询量</th></tr><tr ng-repeat=\"rowData in data.Daily\"><td>{{formatDateByStatistics(rowData.CreatedAt)}}</td><td class=color-s1>{{rowData.Pv}}</td><td class=color-s2>{{rowData.Uv}}</td><td class=color-s3>{{rowData.Consult}}</td></tr></table></div><a href=# class=statistics-tips>详情请登录校宝，在前台业务咨询记录中查看访客详细信息</a></ion-content></ion-view>");
}]);

angular.module("modules/new-microsite-view-app/new-microsite-view-app.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/new-microsite-view-app/new-microsite-view-app.html",
    "<ion-view cache-view=false><div id=container><micro-site-view-view site-model=siteModel></micro-site-view-view></div><div class=foot-tab-bg><a class=btn_about ng-class=\"{'active': siteModel.currentPageIndex==0}\" ng-click=pickPage(0)>{{siteModel.pages[0].pageName}}</a> <a class=btn_show ng-class=\"{'active': siteModel.currentPageIndex==1}\" ng-click=pickPage(1)>{{siteModel.pages[1].pageName}}</a> <a class=btn_course ng-class=\"{'active': siteModel.currentPageIndex==2}\" ng-click=pickPage(2)>{{siteModel.pages[2].pageName}}</a></div><div ng-show=isBottom class=footer-copyright ng-bind-html=data.Footer></div></ion-view>");
}]);

angular.module("modules/new-microsite-view-app/micrositeviewview-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/new-microsite-view-app/micrositeviewview-directive.html",
    "");
}]);

angular.module("modules/new-micrositeapp/new-micrositeapp.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/new-micrositeapp/new-micrositeapp.html",
    "<div upload-img image-type=0></div><mask></mask><ion-nav-view></ion-nav-view>");
}]);
