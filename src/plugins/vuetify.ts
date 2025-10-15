// src/plugins/vuetify.ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
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
})

export default vuetify
