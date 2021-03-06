// @ts-check
const { Navigation } = require('react-native-navigation');
const { registerScreens } = require('./screens');
const { Platform } = require('react-native');
const { setDefaultOptions } = require('./commons/Options')
const testIDs = require('./testIDs');
const Screens = require('./screens/Screens');

if (Platform.OS === 'android') {
  alert = (title) => {
    Navigation.showOverlay({
      component: {
        name: Screens.Alert,
        passProps: {
          title
        },
        options: {
          layout: {
            componentBackgroundColor: 'transparent'
          },
          overlay: {
            interceptTouchOutside: true
          }
        }
      }
    });
  };
}

function start() {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(async () => {
    setDefaultOptions();

    Navigation.setRoot({
      root: {
        sideMenu: {
          center: {
            stack: {
              children: [
                {
                  bottomTabs: {
                    children: [
                      {
                        stack: {
                          children: [
                            {
                              component: {
                                name: 'Layouts'
                              }
                            }
                          ],
                          options: {
                            bottomTab: {
                              text: 'Layouts',
                              icon: require('../img/layouts.png'),
                              selectedIcon: require('../img/layouts_selected.png'),
                              testID: testIDs.LAYOUTS_TAB
                            }
                          }
                        }
                      },
                    ]
                  }
                },
                // The second child can come from a deeplink or something like that. This component will change the
                // application root.
                {
                  component: {
                    name: 'Layouts',
                  },
                },
              ],
            },
          },
        },
      },
    });
  });
}

module.exports = {
  start
};
