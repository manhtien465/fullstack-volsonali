"use strict";

module.exports = {
  async createOrderPaypal(ctx){
    const {
     id
    } = ctx.params;
    const response = await strapi
    .plugin("strapi-paypal")
    .service("paypalService")
    .createOrderPaypal(id);
  ctx.send(response, 200);
  },
  async createProduct(ctx) {
    try {
      const {
        title,
        price,
        description,
        isSubscription,
        paymentInterval,
        trialPeriodDays,
        productType,
        slug,
      } = ctx.request.body;
      const stripeProductResponse = await strapi
        .plugin("strapi-paypal")
        .service("paypalService")
        .createStrapiProduct(
          title,
          price,
          description,
          isSubscription,
          paymentInterval,
          trialPeriodDays,
          productType,
          slug
        );
      ctx.send(stripeProductResponse, 200);
    } catch (error) {
      console.log("error",error)
      return {
        status: 500,
        message: error.message,
      };
    }
  },
  async findProducts(ctx) {
    try {
      const { offset, limit, sort, order } = ctx.params;
      const response = await strapi
        .plugin("strapi-paypal")
        .service("paypalService")
        .find(offset, limit, sort, order);
      ctx.send(response, 200);
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  },
  async findProductById(ctx) {
    try {
      const { id } = ctx.params;
      const response = await strapi
        .plugin("strapi-paypal")
        .service("paypalService")
        .findOne(id);
      ctx.send(response, 200);
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  },
  
  async getPaypalCheckout(ctx) {
    try {
      const { id } = ctx.params;
      const product = await strapi
        .plugin("strapi-paypal")
        .service("paypalService")
        .findOne(id);
      const { isSubscription, paypalOrderId, paypalSubcriptionId } = product;
      const response = await strapi
        .plugin("strapi-paypal")
        .service("paypalService")
        .getPaypalCheckout(isSubscription, paypalOrderId, paypalSubcriptionId);
      ctx.send(response, 200);
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  },

  async webhook(ctx){
    const response={
      message:'ok'
    }
    ctx.send(response, 200);
  },

  async delete(ctx){
    const { id } = ctx.params;

      await strapi
        .plugin("strapi-paypal")
        .service("paypalService")
        .delete(id);
    ctx.send({}, 200);
  },

  async updateProduct(ctx) {
    try {
      const {
        title,
        price,
        description,
        isSubscription,
        paymentInterval,
        trialPeriodDays,
        productType,
      } = ctx.request.body;
      const { id } = ctx.params;
      const stripeProductResponse = await strapi
        .plugin("strapi-paypal")
        .service("paypalService")
        .updateStrapiProduct(
          id,
          title,
          price,
          description,
          isSubscription,
          paymentInterval,
          trialPeriodDays,
          productType
        );
      ctx.send(stripeProductResponse, 200);
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  },
};
