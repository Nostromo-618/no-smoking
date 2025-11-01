"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/vuetify.ts
require("vuetify/styles");
var vuetify_1 = require("vuetify");
var components = require("vuetify/components");
var directives = require("vuetify/directives");
var mdi_1 = require("vuetify/iconsets/mdi");
require("@mdi/font/css/materialdesignicons.css"); // Ensure you are using css-loader
var vuetify = (0, vuetify_1.createVuetify)({
    components: components,
    directives: directives,
    icons: {
        defaultSet: 'mdi',
        aliases: mdi_1.aliases,
        sets: {
            mdi: mdi_1.mdi,
        },
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#1976D2',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                },
            },
            dark: {
                dark: true,
                colors: {
                    primary: '#2196F3',
                    secondary: '#424242',
                    accent: '#FF4081',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                },
            },
        },
    },
    defaults: {
        global: {
            font: {
                family: 'Ubuntu, sans-serif',
            },
        },
        VBtn: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VCard: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VTextField: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VSelect: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VCheckbox: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VRadio: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VList: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VListItem: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VDialog: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VToolbar: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
        VAppBar: {
            style: [{ fontFamily: 'Ubuntu, sans-serif' }],
        },
    },
});
exports.default = vuetify;
