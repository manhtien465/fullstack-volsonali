const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('aa')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },
  get(ctx) {
    ctx.body = strapi
      .plugin('aa')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },
});

export default controller;
