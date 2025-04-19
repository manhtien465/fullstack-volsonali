import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::payment.payment',
  ({ strapi }) => ({
    async create(ctx) {

      const user = ctx.state.user;      
      ctx.request.body.data = {
        ...ctx.request.body.data,
        email:user.email,
        username:user.username,
        user_id:user.id
      };
      return super.create(ctx);
    },
  })
);