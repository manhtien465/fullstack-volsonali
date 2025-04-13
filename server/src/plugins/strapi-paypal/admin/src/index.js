import { Initializer } from './components/Initializer/index';
import { PluginIcon } from './components/PluginIcon/index';
import pluginId from './pluginId';

export default {
  register(app) {
    app.addMenuLink({
      to: `plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: pluginId,
      },
      Component: async () => {
        const { App } = await import('./pages/App/index');

        return App;
      },
    });
    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: 'paypal',
        },
      },
      [
        {
          intlLabel: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: 'Configuration',
          },
          id: 'Paypal-Configuration',
          to: `/settings/${pluginId}`,
          // permissions: pluginPermissions.settingsRoles,
          Component: async () => {
            const { Settings } = await import('./pages/Settings/index');
    
            return Settings;
          },
        },
      ]
    );
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: pluginId,
    });
  },

  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
