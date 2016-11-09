define([
    "directiveMap"
], function(directiveMap) {

    return {
        /**
         * 路由和模块的映射关系,即state和module的映射
         */
        config: {
            "activity.grass": "modules/micro-activity-grass-app/app",
            "activity.grassavatar": "modules/micro-activity-grassavatar-app/app",
            "activity.consult": "modules/micro-activity-grassconsult-app/app",
            "activity.grow": "modules/micro-activity-grassgrow-app/app",
            "activity.grassindex": "modules/micro-activity-grassindex-app/app",
            "activity.grassindexb": "modules/micro-activity-grassindexb-app/app",
            "activity.music": "modules/micro-activity-grassmusic-app/app",
            "activity.index": "modules/micro-activity-index-app/app",
            "activity.new": "modules/micro-activity-new-app/app",
            "activity.oldandnewadd": "modules/micro-activity-oldandnew-add-app/app",
            "activity.oldandnewaudio": "modules/micro-activity-oldandnew-audio-app/app",
            "activity.oldandnewback": "modules/micro-activity-oldandnew-back-app/app",
            "activity.oldandnewedit": "modules/micro-activity-oldandnew-edit-app/app",
            "activity.oldandnewpreview": "modules/micro-activity-oldandnew-preview-app/app",
            "activity.oldandnewview": "modules/micro-activity-oldandnew-view-app/app",
            "activity.statistics": "modules/micro-activity-statistics-app/app",
            "activity": "modules/microactivityapp/app",
            "consultWeeklyReports": "modules/micro-consult-weekly-reports-app/app",
            "consultbook": "modules/micro-consultbook-app/app",
            "consultbooklist": "modules/micro-consultbook-list-app/app",
            "index": "modules/micro-index-app/app",
            "new": "modules/micro-new-app/app",
            "activity.preview": "modules/micro-preview-app/app",
            "registrationbook.registrationbookall": "modules/micro-registrationbook-all-app/app",
            "registrationbook": "modules/micro-registrationbook-app/app",
            "registrationbook.registrationbookdetail": "modules/micro-registrationbook-detail-app/app",
            "registrationbook.schedule": "modules/micro-registrationbook-schedule-app/app",
            "registrationbook.statistics": "modules/micro-registrationbook-statistics-app/app",
            "registrationbook.channel": "modules/micro-registrationbook-channel-app/app",
            /*路由state更改过*/
            "registrationbook.registrationbookongoing": "modules/micro-registrationbook-ongoing-app/app",
            "registrationbook.registrationbooksearch": "modules/micro-registrationbook-search-app/app",
            "site.add": "modules/microsite-add-app/app",
            "site.back": "modules/microsite-back-app/app",
            "site.edit": "modules/microsite-edit-app/app",
            "site.index": "modules/microsite-index-app/app",
            "site.preview": "modules/microsite-preview-app/app",
            "site.publish": "modules/microsite-publish-app/app",
            "site.view": "modules/microsite-view-app/app",
            "newsite": "modules/new-micrositeapp/app",
            "newsite.consultbook": "modules/new-microsite-consultbook-app/app",
            "newsite.edit": "modules/new-microsite-edit-app/app",
            "newsite.chooseMode": "modules/new-microsite-mode-app/app",
            "newsite.preview": "modules/new-microsite-preview-app/app",
            "newsite.publish": "modules/new-microsite-publish-app/app",
            "newsite.rank": "modules/new-microsite-rank-app/app",
            "newsite.statistics": "modules/new-microsite-statistics-app/app",
            "newsite.style": "modules/new-microsite-style-app/app",
            "newsite.view": "modules/new-microsite-view-app/app",
            "userAccount": "modules/user-account-app/app",
            "bindPhone": "modules/user-bind-phone-app/app",
            "bindSchoolPal": "modules/user-bind-schoolpal-app/app",
            "userCenter": "modules/user-center-app/app",
            "userLocation": "modules/user-location-app/app",
            "userLogin": "modules/user-login-app/app",
            "oldinvitenew": "modules/user-old-invite-new-app/app",
            "userOrderList": "modules/user-orderlist-app/app",
            "userRedeemCodeExchange": "modules/user-redeemcode-exchange-app/app",
            "refrezeguide": "modules/user-refrezeguide-app/app",
            "userSignUpRemindSetting": "modules/user-signupremind-setting-app/app",
            "VIPclub": "modules/vip-club-app/app",
            //微店C端页面模块
            "microshop": "modules/micro-shop-app/app",
            "microshop.login": "modules/micro-shop-login-app/app",
            "microshop.ordercheck": "modules/micro-shop-order-check-app/app",
            "microshop.participateactivity": "modules/micro-shop-participate-activity-app/app",
            "microshop.productdetail": "modules/micro-shop-product-detail-app/app",
            "microshop.activity": "modules/micro-shop-activity-app/app",
            "microshop.activity.bargain": "modules/micro-shop-activity-bargain-app/app",
            "microshop.index": "modules/micro-shop-index-app/app",
            "microshop.index.myorder": "modules/micro-shop-my-order-app/app",
            "microshop.index.myproduct": "modules/micro-shop-my-product-app/app",
            "microshop.index.myshop": "modules/micro-shop-my-shop-app/app",
            //微店B端页面模块
            "microshopmanagement": "modules/micro-shop-management-app/app",
            "microshopmanagementapply": "modules/micro-shop-management-apply-app/app",
            "microshopmanagement.create": "modules/micro-shop-management-create-app/app",
            "microshopmanagement.productedit": "modules/micro-shop-management-product-edit-app/app",
            "microshopmanagement.index": "modules/micro-shop-management-index-app/app",
            "microshopmanagement.index.order": "modules/micro-shop-management-order-app/app",
            "microshopmanagement.index.product": "modules/micro-shop-management-product-app/app",
            "microshopmanagement.index.shop": "modules/micro-shop-management-shop-app/app",
            "microshopmanagement.syn": "modules/micro-shop-management-syn-app/app",
            "microshopmanagement.synqrcode": "modules/micro-shop-management-syn-qrCode-app/app",
            "microshopmanagement.koubeisync": "modules/micro-shop-management-koubei-sync-app/app",
            //微店-口碑
            "microshopkoubei.login": "modules/micro-shop-koubei-login-app/app",
            "microshopkoubei": "modules/micro-shop-koubei-app/app",
            "microshopkoubei.createshop": "modules/micro-shop-koubei-create-shop-app/app",
            "microshopkoubei.locate": "modules/micro-shop-koubei-locate-app/app",
            "microshopkoubei.management": "modules/micro-shop-koubei-management-app/app",
            "microshopkoubei.management.order": "modules/micro-shop-koubei-management-order-app/app",
            "microshopkoubei.management.product": "modules/micro-shop-koubei-management-product-app/app",
            "microshopkoubei.productedit": "modules/micro-shop-koubei-management-productedit-app/app",

            //校宝钱包
            "schoolpalwallet": "modules/schoolpal-wallet-app/app",
            "schoolpalwallet.orderdetail": "modules/schoolpal-wallet-order-detail-app/app",
            "schoolpalwallet.withdrawals": "modules/schoolpal-wallet-withdrawals-app/app",
            "schoolpalwallet.withdrawalsconfirm": "modules/schoolpal-wallet-withdrawals-confirm-app/app"
        },
        /**
         * 模块之间的依赖关系,即表明某个模块依赖哪些其他的模块,可以是模板/指令/其他模块等
         */
        relyConfig: {
            "modules/micro-activity-grass-app/app": ["modules/microactivityapp/app"],
            "modules/micro-activity-grassavatar-app/app": ["modules/microactivityapp/app"],
            "modules/micro-activity-grassconsult-app/app": ["modules/microactivityapp/app"],
            "modules/micro-activity-grassgrow-app/app": ["modules/microactivityapp/app"],
            "modules/micro-activity-grassindexb-app/app": ["modules/microactivityapp/app"],
            "modules/micro-activity-grassmusic-app/app": ["modules/microactivityapp/app"],

            "modules/micro-index-app/app": ["modules/microactivityapp/app"],
            "modules/micro-new-app/app": ["modules/microactivityapp/app"],


            // "modules/micro-activity-oldandnew-audio-app/app": ["components/templates/micro-activity-template/app"],
            // "modules/micro-activity-oldandnew-edit-app/app": ["components/templates/micro-activity-template/app",
            //                                                   "components/templates/micro-power-template/app",
            //                                                   "components/templates/micro-leaflet-template/app"],
            // "modules/micro-activity-oldandnew-preview-app/app": ["components/templates/micro-activity-template/app",
            //                                                      "components/templates/micro-power-template/app",
            //                                                      "components/templates/micro-leaflet-template/app"],
            // "modules/micro-activity-oldandnew-view-app/app": ["components/templates/micro-activity-template/app",
            //                                                   "components/templates/micro-power-template/app",
            //                                                   "components/templates/micro-leaflet-template/app"],
            // "modules/micro-preview-app/app": ["components/templates/micro-activity-template/app",
            //                                   "components/templates/micro-power-template/app",
            //                                   "components/templates/micro-leaflet-template/app"],

            // "modules/micro-registrationbook-all-app/app": ["modules/micro-registrationbook-app/app"],
            //"modules/micro-registrationbook-app/app": ["modules/micro-registrationbook-all-app/app",
            //                                           "modules/micro-registrationbook-ongoing-app/app",
            //                                           "modules/micro-registrationbook-search-app/app"],
            // "modules/micro-registrationbook-detail-app/app": ["components/consult_item/app"],
            //"modules/micro-registrationbook-ongoing-app/app": ["modules/micro-registrationbook-app/app"],
            "modules/user-login-app/app": ["app"]


            // "modules/microsite-edit-app/app": ["components/templates/micro-site-template/app"],
            // "modules/microsite-index-app/app": ["components/templates/micro-site-template/app"],
            // "modules/microsite-preview-app/app": ["components/templates/micro-site-template/app"],
            // "modules/microsite-view-app/app": ["components/templates/micro-site-template/app"],
            // "modules/new-microsite-edit-app/app": ["components/templates/new-micro-site-template/app",
            //                                        "components/WebsiteUpload_img/app"],
            // "modules/new-microsite-preview-app/app": ["components/templates/new-micro-site-template/app"],
            // "modules/new-microsite-style-app/app": ["components/templates/new-micro-site-template/app"],
            // "modules/new-microsite-view-app/app": ["components/templates/new-micro-site-template/app",
            //                                        "components/site_praise/app"],
            //"modules/user-center-app/app": ["components/upload_img/app"]
        },
        /**
         * 系统初次加载模块,可以不配置,默认是index
         */
        indexModule: {
            moduleName: "modules/micro-index-app/app",
            state: "index"
        },

        getDirectiveModuleByName: function(name) {
            return directiveMap.getModuleByState(name);
        },
        /**
         * 根据state获取模块
         */
        getModuleByState: function(state) {
            return this.config[state];
        },
        /**
         * 根据state获取模块,
         * states : 路由数组
         * @returns  模块数组
         */
        getModuleByStates: function(states) {
            var modules = [];
            if (Object.prototype.toString.call(states) === "[object Array]") {
                states.forEach(function(state) {
                    var module = this.getModuleByState(state);
                    if (module) {
                        modules.push(module);
                    } else {
                        console.log('无法找到state' + state + "对应的模块,请检查配置文件");
                    }
                }, this)
            } else if (typeof(states) == "string") {
                modules.push(this.getModuleByState(states));
            }
            return modules;
        },
        /**
         * 根据模块数组获取其依赖的模块数组
         */
        getRelyModuleByModules: function(modules) {
            var relyModules = [];
            modules.forEach(function(module) {
                var relyModule = this.relyConfig[module];
                if (relyModule && relyModule.length > 0) {
                    relyModules = relyModules.concat(relyModule);
                    //    relyModules[module]=relyModule;
                } else {
                    console.log("模块  " + module + "  没有依赖的模块");
                }
            }, this);
            return relyModules;
        }
    }
});