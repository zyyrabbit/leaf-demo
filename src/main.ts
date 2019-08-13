import App from '@leafs/app';
import data from './paas/data';
import httpConfig from './paas/htttpConfig';

new App({
  theme: 'default',
  beforeCreate: app => {
    app.http.config(httpConfig);
  },
  getData: async app => {
    let globalData = await data.init(app);
    return globalData;
  }
}).run('#leaf-app');

