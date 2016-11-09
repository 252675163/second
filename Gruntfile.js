"use strict";

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);
    var cfg = {
        src: "app/",
        dist: "dist/",
        tmp: "tmp/"
    };

    grunt.initConfig({
        cfg: cfg,
        requireExcludes: grunt.file.readJSON(cfg.src + "require-exclude.json"),
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            main: {
                options: {
                    banner: "/*! <%= pkg.name %>-<%= grunt.template.today(\"yyyy-mm-dd HH\") %> */\n",
                    //是否混淆变量名
                    mangle: true,
                    compress: {
                        //删除console.log
                        drop_console: true,
                        sequences: true, // join consecutive statemets with the “comma operator”
                        properties: true, // optimize property access: a["foo"] → a.foo
                        dead_code: true, // discard unreachable code
                        drop_debugger: true, // discard “debugger” statements
                        unsafe: true, // some unsafe optimizations (see below)
                        conditionals: true, // optimize if-s and conditional expressions
                        comparisons: true, // optimize comparisons
                        evaluate: true, // evaluate constant expressions
                        booleans: true, // optimize boolean expressions
                        loops: true, // optimize loops
                        unused: true, // drop unused variables/functions
                        hoist_funs: true, // hoist function declarations
                        hoist_vars: false, // hoist variable declarations
                        if_return: true, // optimize if-s followed by return/continue
                        join_vars: true, // join var declarations
                        cascade: true, // try to cascade `right` into `left` in sequences
                        side_effects: true, // drop side-effect-free statements
                        warnings: true, // warn about potentially dangerous optimizations/code
                    },
                    //删除注释
                    preserveComments: false,
                    //输出压缩率
                    report: "min",
                    maxLineLen: 3200000,
                    //采用单引号
                    quoteStyle: 1
                },
                files: [{
                    expand: true,
                    src: ["dist/**/*.js", "!*.min.js"],
                }]
            },
            pc_site: {
                options: {
                    //                    banner: "/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> */\n",
                    //                    是否混淆变量名
                    mangle: true,
                    compress: {
                        //删除console.log
                        drop_console: true,
                        dead_code: true
                    },
                    //删除注释
                    preserveComments: false,
                    //输出压缩率
                    report: "min",
                    maxLineLen: 3200000

                },
                files: {
                    'pc_site/script/app.js': ["pc_site/script/app.js"]
                }
            },
            vip: {
                options: {
                    //                banner: "/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> */\n",
                    //是否混淆变量名
                    mangle: true,
                    compress: {
                        //删除console.log
                        drop_console: true,
                        dead_code: true
                    },
                    //删除注释
                    preserveComments: false,
                    //输出压缩率
                    report: "min",
                    maxLineLen: 3200000

                },
                files: {
                    'mobile/js/app.js': ["mobile/js/app.js"]
                }
            },
            mobile_site: {
                options: {
                    //                    banner: "/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> */\n",
                    //是否混淆变量名
                    mangle: true,
                    compress: {
                        //删除console.log
                        drop_console: true,
                        dead_code: true
                    },
                    //删除注释
                    preserveComments: false,
                    //输出压缩率
                    report: "min",
                    maxLineLen: 3200000

                },
                files: {
                    'mobile/js/mobile.min.js': ["mobile/js/mobile.min.js"]
                }
            },
            bind_phone: {
                options: {
                    //                    banner: "/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> */\n",
                    //是否混淆变量名
                    mangle: true,
                    compress: {
                        //删除console.log
                        drop_console: true,
                        dead_code: true
                    },
                    //删除注释
                    preserveComments: false,
                    //输出压缩率
                    report: "min",
                    maxLineLen: 3200000

                },
                files: {
                    'mobile/js/bindphone.all.js': ["mobile/js/bindphone.all.js"]
                }
            }
        },
        // Optimize RequireJS projects using r.js.
        requirejs: {
            compile: {
                options: {
                    paths: {
                        'jquery': "libs/jquery/jquery-2.1.4.min",
                        "ionic": "libs/ionic/js/ionic.bundle",
                        'slip': "libs/slip/slip",
                        'app': "modules/baseapp/app",
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
                    },
                    shim: {
                        "ionic": {
                            'deps': ["jquery"]
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
                    },
                    baseUrl: "app",
                    removeCombined: true,
                    findNestedDependencies: true,
                    dir: "tmp",
                    //no minification will be done.
                    skipDirOptimize: true,
                    optimizeCss: "none",
                    optimize: "none",
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        compress: {
                            sequences: true,
                            //删除console.log
                            drop_console: true,
                            dead_code: true
                        },
                        warnings: false,
                        mangle: true
                    },
                    modules: [{
                            name: "lib",
                            include: [
                                "jquery", "ionic", "slip", "remlib", "ocLazyLoad", "txtinputevent", "qrCode", "cropper",
                                "localResizeIMG4", "islider", "islider.animate", "mobiscrolldatetime", "es6-promise",
                                "html2canvas"
                            ],
                        }, {
                            name: "commonservices",
                            include: [
                                "services/common-filter", "services/common-service", "services/permission",
                                "services/verify-service", "services/net/active-form", "services/net/activity-add",
                                "services/net/activity-audio", "services/net/activity-back",
                                "services/net/activity-edit",
                                "services/net/activity-index", "services/net/activity-new-activity",
                                "services/net/activity-preview", "services/net/activity-statistics",
                                "services/net/activity-template", "services/net/activity-view", "services/net/common",
                                "services/net/consult", "services/net/consult-weekly-reports", "services/net/grass",
                                "services/net/index", "services/net/new", "services/net/new-site-edit",
                                "services/net/new-site-preview", "services/net/new-site-publish",
                                "services/net/new-site-rank", "services/net/new-site-view",
                                "services/net/registration-book", "services/net/site-add", "services/net/site-back",
                                "services/net/site-index", "services/net/site-preview", "services/net/site-publish",
                                "services/net/site-statistics", "services/net/site-template", "services/net/site-view",
                                "services/net/templatesmodel", "services/net/user-center",
                                "services/net/user-orderlist", "services/net/micro-shop-index", "services/net/micro-shop-management",
                                "services/net/user-redeemcode-exchange", "services/net/user-signupremind",
                                "services/net/vip-club", "services/net/schoolpal-wallet", "services/net/micro-shop-koubei"
                            ],
                            exclude: ["lib"]
                        }, {
                            name: "commoncomponents",
                            include: [
                                "components/audio/app",
                                "components/combobox/app",
                                "components/common/directive",
                                "components/consult_item/app",
                                "components/error_remind/app",
                                "components/feedbackform/app",
                                "components/footer/app",
                                "components/is_shaked/app",
                                "components/multi_image_upload/app",
                                "components/mask/app",
                                "components/multi_textinput/app",
                                "components/new_site_nav/app",
                                "components/next_button/app",
                                "components/prompt_bar/app",
                                "components/scratch_card/app",
                                "components/show_image_big/app",
                                "components/share_popup/app",
                                "components/site_form/app",
                                "components/site_praise/app",
                                "components/textinput/app",
                                "components/textinput_callback/app",
                                "components/textinput_new/app",
                                "components/upload_img/app",
                                "components/user_terms/app",
                                "components/WebsiteUpload_img/app",
                                "components/templates/new-micro-site-template/site-qr-cover/app"
                            ],
                            exclude: ["lib"]
                        }, {
                            name: "main",
                        }, {
                            name: "modules/baseapp/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-grass-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-grassavatar-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-grassconsult-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-grassgrow-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-grassindex-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-grassindexb-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-grassmusic-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-oldandnew-add-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-oldandnew-audio-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-oldandnew-back-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-oldandnew-edit-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-oldandnew-preview-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-oldandnew-view-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-activity-statistics-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-consult-weekly-reports-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-consultbook-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-index-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-new-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-preview-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-registrationbook-all-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-registrationbook-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-registrationbook-detail-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-registrationbook-ongoing-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-registrationbook-schedule-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-registrationbook-statistics-app/app",
                            exclude: ["echarts", "lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-registrationbook-channel-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/micro-registrationbook-search-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/microactivityapp/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-microsite-consultbook-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-microsite-edit-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-microsite-mode-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-microsite-preview-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-microsite-publish-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-microsite-rank-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-microsite-statistics-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-microsite-style-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-microsite-view-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/new-micrositeapp/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-account-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-bind-phone-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-bind-schoolpal-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-center-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-location-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-login-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-old-invite-new-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-orderlist-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-redeemcode-exchange-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-refrezeguide-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/user-signupremind-setting-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "modules/vip-club-app/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template10_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template10_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template10_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template10_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template10_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template10_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template11/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template12_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template12_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template12_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template12_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template12_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template12_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template12_7/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template12_8/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template12_9/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            //     name: 'components/templates/micro-activity-template/template13_1/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template13_2/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template13_3/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template13_4/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template13_5/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            name: "components/templates/micro-activity-template/template13/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            //     name: 'components/templates/micro-activity-template/template14_1/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template14_2/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template14_3/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template14_4/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template14_5/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            name: "components/templates/micro-activity-template/template14/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template15_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template15_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template15_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template16_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template17_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template17_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template18_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template19/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: "components/templates/micro-activity-template/template19_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: "components/templates/micro-activity-template/template_img_show/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: "components/templates/micro-activity-template/template_text_show/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: "components/templates/micro-activity-template/template2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template2_2_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template2_2_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template2_2_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template2_2_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template2_2_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template2_2_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template2_2_7/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template20/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            //     name: 'components/templates/micro-activity-template/template21_1/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template21_2/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            //     name: 'components/templates/micro-activity-template/template21_3/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            name: "components/templates/micro-activity-template/template21/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template22_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template22_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template22_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template23/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template24/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template25_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template25_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template25_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template3_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template3_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template3_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template3_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template3_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template3_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template3_7/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template3_8/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template5_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template5_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template5_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template5_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template5_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template5_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template6_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template6_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template6_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template6_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template6_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template6_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template6_7/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template7/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template7_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template7_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template7_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template7_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template7_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template7_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template7_7/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template8_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template8_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template8_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template8_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template8_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template8_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template9_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template9_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template9_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template9_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template9_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template9_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template9_7/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template9_8/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-activity-template/template9_9/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_5/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_7/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_2/micro_poster_2_8/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_3/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_4/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_6/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/new-micro-site-template/site-news/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/new-micro-site-template/site-course-info/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/new-micro-site-template/site-org-info/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            //     name: 'components/templates/new-micro-site-template/site-cover/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            name: "components/templates/new-micro-site-template/site-about-us-info/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            // name: 'components/templates/new-micro-site-template/site-qr-code/app',
                            // exclude: ["lib", "commoncomponents", "commonservices"]
                            //     name: 'components/templates/new-micro-site-template/site-qr-cover/app',
                            //     exclude: ["lib", "commoncomponents", "commonservices"]
                            // }, {
                            name: "components/templates/new-micro-site-template/site-teacher-info/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_2/app",
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        //微店、校宝钱包
                        {
                            name: 'modules/micro-shop-activity-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-activity-bargain-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-index-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-login-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-apply-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-create-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-index-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-order-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-syn-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-product-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-product-edit-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-shop-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-my-order-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-my-product-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-my-shop-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-order-check-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-participate-activity-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-product-detail-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/schoolpal-wallet-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/schoolpal-wallet-order-detail-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/schoolpal-wallet-withdrawals-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/schoolpal-wallet-withdrawals-confirm-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        }, {
                            name: 'modules/micro-shop-management-syn-qrCode-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        //微店、钱包结束
                        //微店口碑页面begin
                        {
                            name: 'modules/micro-shop-koubei-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: 'modules/micro-shop-koubei-create-shop-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: 'modules/micro-shop-koubei-locate-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: 'modules/micro-shop-koubei-login-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: 'modules/micro-shop-koubei-management-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: 'modules/micro-shop-koubei-management-order-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: 'modules/micro-shop-koubei-management-product-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        {
                            name: 'modules/micro-shop-koubei-management-productedit-app/app',
                            exclude: ["lib", "commoncomponents", "commonservices"]
                        },
                        //微店口碑页面end
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: "tmp/", src: ["css/**"], dest: "dist/" },
                    { expand: true, cwd: "tmp/", src: ["img/**"], dest: "dist/" },
                    { expand: true, cwd: "tmp/", src: ["fonts/**"], dest: "dist/" },
                    { expand: true, cwd: "tmp/", src: ["libs/ionic/fonts/*"], dest: "dist/" },
                    { expand: true, cwd: "tmp/", src: ["libs/requirejs/*"], dest: "dist/" },
                    { expand: true, cwd: "tmp/", src: ["main.js"], dest: "dist/" },
                    { expand: true, cwd: "tmp/", src: ["modules/**/*"], dest: "dist/" },
                    { expand: true, cwd: "tmp/", src: ["components/**/*"], dest: "dist/" },
                    { expand: true, cwd: "tmp/", src: ["libs/echart/echarts.min.js"], dest: "dist/" }
                ]
            }
        },
        clean: {
            tmp: cfg.tmp,
            dist: cfg.dist,
            src: cfg.src
        },
        html2js: {
            custom: {
                options: {
                    base: "app",
                    module: "templateStore",
                    //重命名
                    rename: function(moduleName) {
                        return "/" + moduleName;
                    },
                    //压缩html
                    htmlmin: {
                        collapseBooleanAttributes: false,
                        collapseWhitespace: true,
                        removeAttributeQuotes: false,
                        removeComments: true,
                        removeEmptyAttributes: false,
                        removeRedundantAttributes: false,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                //files : [{
                //    src: ['components/**/*.html', 'modules/*/*.html'],
                //    dest : 'build/scripts/templateStore.js'
                //}]
                // src: ["app/components/**/*.html", "app/modules/**/*.html"],
                // dest: "app/modules/baseapp/templatestore.js"
                src: [
                    "app/components/templates/new-micro-site-template/site-cover/template.html",
                    "app/components/templates/new-micro-site-template/site-qr-code/template.html"
                ],
                dest: "app/modules/baseapp/templatestore.js"
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                keepSpecialComments: 1,
                report: "min",
                sourceMap: false
            },
            shiningStarCss: {
                src: "app/css/shiningstar.css",
                dest: "app/css/shiningstar.min.css"
            },
            shiningStarCssSite: {
                src: "app/css/shiningstarsite.css",
                dest: "app/css/shiningstarsite.min.css"
            },
            shiningStarCssActive: {
                src: "app/css/shiningstaractive.css",
                dest: "app/css/shiningstaractive.min.css"
            },
            //微店口碑
            shiningMicroShop: {
                src: "app/css/shiningstarmicroshop.css",
                dest: "app/css/shiningstarmicroshop.min.css"
            },
            pc_site_css: {
                src: "pc_site/css/app.css",
                dest: "pc_site/css/app.min.css"
            },
            mobile_site_css: {
                src: "mobile/css/index.css",
                dest: "mobile/css/index.css"
            },
            vip: {
                src: "mobile/red_css/style.css",
                dest: "mobile/red_css/coupon.min.css"
            },
            bind_phone_css: {
                src: "mobile/css/bindphone.css",
                dest: "mobile/css/bindphone.min.css"
            },
            //生成传单
            leaflet_css: {
                src: "leaflet/css/style.css",
                dest: "leaflet/css/style.min.css"
            },
        },
        sass: {
            options: {
                //是否生成sourceMap
                sourceMap: false,
                //                style: "compressed",
                outputStyle: "expanded"

            },
            dist: {
                //属性为源文件，值为生成对象  生成 微官网/微活动/正常后台三份 
                files: {
                    'app/css/site.css': "app/scss/custom/custom-site.scss",
                    'app/css/active.css': "app/scss/custom/custom-active.scss",
                    'app/css/ionic.app.css': "app/scss/ionic.app.scss",
                    'leaflet/css/style.css': "leaflet/scss/bootstrap.scss",
                    'app/css/microShop.css': "app/scss/micro-shop-all.scss",
                }
            }
        },
        rename: {
            moveThat: {
                src: "dist/",
                dest: "app/"
            }
        },
        concat: {
            options: {
                //用于合并文件之间的分隔符
                separator: "\n",
                stripBanners: true,
                banner: "/*! <%= pkg.name %>-<%= grunt.template.today(\"yyyy-mm-dd HH\") %> */\n"
            },

            shiningStarCss: {
                src: [
                    "app/css/ionic.app.css",
                    "app/libs/cropper/cropper.min.css",
                    "app/libs/islider/iSlider.min.css",
                    "app/libs/mobiscrolldatetime/css/mobiscroll.custom-2.17.0.min.css"
                ],
                dest: "app/css/shiningstar.css"
            },
            shiningStarCssSite: {
                src: [
                    "app/css/site.css",
                    "app/libs/cropper/cropper.min.css",
                    "app/libs/islider/iSlider.min.css",
                    "app/libs/mobiscrolldatetime/css/mobiscroll.custom-2.17.0.min.css"
                ],
                dest: "app/css/shiningstarsite.css"
            },
            shiningStarCssActive: {
                src: [
                    "app/css/active.css",
                    "app/libs/cropper/cropper.min.css",
                    "app/libs/islider/iSlider.min.css",
                    "app/libs/mobiscrolldatetime/css/mobiscroll.custom-2.17.0.min.css"
                ],
                dest: "app/css/shiningstaractive.css"
            },
            microShop: {
                src: [
                    "app/css/microShop.css",
                    "app/libs/cropper/cropper.min.css",
                    "app/libs/islider/iSlider.min.css",
                    "app/libs/mobiscrolldatetime/css/mobiscroll.custom-2.17.0.min.css"
                ],
                dest: "app/css/shiningstarmicroshop.css"
            },
            pc_site: {
                src: [
                    "pc_site/script/lib/jquery-1.11.3.min.js",
                    "pc_site/script/lib/jquery.easing.min.js",
                    "pc_site/script/lib/jquery.scrollify.js",
                    "pc_site/script/lib/clicker.js",
                    "pc_site/script/lib/index.js"
                ],
                dest: "pc_site/script/app.js"
            },
            pc_site_css: {
                src: [
                    "pc_site/css/index.css"
                ],
                dest: "pc_site/css/app.css"
            },
            vip: {
                src: [
                    "mobile/js/jquery-2.1.4.min.js",
                    "mobile/js/ScreenAdaptation.js",
                    "mobile/js/Animation.js"
                ],
                dest: "mobile/js/app.js"
            },
            mobile_site: {
                src: [
                    "mobile/js/zepto.js",
                    "mobile/js/touch.js",
                    "mobile/js/clicker.js",
                    "mobile/js/sun.js",
                    "mobile/js/index.js",
                    "mobile/js/ScreenAdaptation.js"
                ],
                dest: "mobile/js/mobile.min.js"
            },
            bind_phone: {
                src: [
                    "mobile/js/ScreenAdaptation.js",
                    "mobile/js/jquery-2.1.4.min.js",
                    "mobile/js/bindphone.js"
                ],
                dest: "mobile/js/bindphone.all.js"
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({ //add prefix with browser that privately-owned. 
                        browsers: [
                            "last 2 versions",
                            "> 5%",
                            "IOS > 0",
                            "UCAndroid > 0",
                        ]
                    })
                ]
            },
            dev: {
                src: "app/css/microShop.css",
                dest: "app/css/microShop.css"
            }
        },

        htmlmin: {
            minAllHtml: {
                options: {
                    collapseBooleanAttributes: false,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false,
                    removeComments: true,
                    removeEmptyAttributes: false,
                    removeRedundantAttributes: false,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['**/*.html'],
                    // 输出和输入在同一目录
                    dest: 'app/',
                    ext: '.html'
                }]
            }
        }
    });

    // grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-html2js");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    //    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-rename");
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.registerTask("default", ["release", "pc", "vip", "mobile", "phone", "leaflet"]);
    // grunt.registerTask("default", ["requirejs:compile4"]);
    grunt.registerTask("release", [
        "clean:tmp", "clean:dist", "sass", "postcss",
        "concat:shiningStarCssSite", "concat:shiningStarCssActive", "concat:shiningStarCss", "concat:microShop",
        "cssmin:shiningStarCssSite", "cssmin:shiningStarCssActive", "cssmin:shiningStarCss", "cssmin:shiningMicroShop",
        //    "template2js",
        "requirejs:compile", "copy:main", "uglify:main", "clean:src", "rename:moveThat", "htmlmin:minAllHtml"
    ]);
    grunt.registerTask("template2js", ["html2js:custom"]);

    grunt.registerTask("pc", ["concat:pc_site", "concat:pc_site_css", "cssmin:pc_site_css", "uglify:pc_site"]);
    grunt.registerTask("vip", ["concat:vip", "uglify:vip", "cssmin:vip"]);
    grunt.registerTask("mobile", ["concat:mobile_site", "cssmin:mobile_site_css", "uglify:mobile_site"]);
    grunt.registerTask("phone", ["concat:bind_phone", "cssmin:bind_phone_css", "uglify:bind_phone"]);
    grunt.registerTask("preheat", ["pc", "vip", "mobile", "phone"]);
    grunt.registerTask("leaflet", ["cssmin:leaflet_css"]);
    grunt.registerTask("au", ["sass", "postcss"]);
};