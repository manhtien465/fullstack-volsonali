// @ts-nocheck
/* eslint-disable node/no-extraneous-require */
/* eslint-disable node/no-missing-require */

'use strict';

const { ApplicationError } = require('@strapi/utils').errors;
const axiosInstance = require('axios');

const paypalSandBoxUrl = process.env.STRAPI_ADMIN_PAYPAL_SANDBOX_API_URL;
const paypalLiveUrl = process.env.STRAPI_ADMIN_PAYPAL_LIVE_API_URL;

module.exports = ({ strapi }) => ({
  async initialize() {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-paypal',
    });
    const settings = await pluginStore.get({ key: 'paypalSetting' });

    return { settings, paypalSandBoxUrl, paypalLiveUrl };
  },

  async createStrapiProduct(
    title,
    productPrice,
    description,
    isSubscription,
    paymentInterval,
    trialPeriodDays,
    productType,
    slug
  ) {
    try {
      // get access token
      const accessToken = await strapi
        .plugin('strapi-paypal')
        .service('paypalAccessToken')
        .getAccessToken();

      let result;

      const { settings, paypalSandBoxUrl, paypalLiveUrl } = await this.initialize();

      const { isLiveMode, checkoutCancelUrl, checkoutSuccessUrl, currency } = settings;

      const url = isLiveMode ? paypalLiveUrl : paypalSandBoxUrl;

      if (isSubscription) {
        result = await strapi
          .plugin('strapi-paypal')
          .service('paypalSubscription')
          .createSubscription(
            title,
            productPrice,
            description,
            isSubscription,
            paymentInterval,
            trialPeriodDays,
            productType,
            accessToken,
            url,
            checkoutCancelUrl,
            checkoutSuccessUrl,
            currency
          );
        const { id, links } = result;
        console.log('subscription', links);
        if (id) {
          const product = await strapi.query('plugin::strapi-paypal.paypal-product').create({
            data: {
              title,
              description,
              price: productPrice,
              currency: settings.currency,
              isSubscription,
              interval: paymentInterval,
              trialPeriodDays,
              paypalSubcriptionId: id,
              paypalLinks: links,
              slug:slug
            },
            populate: true,
          });
          return product;
        }
      } else {
        // create paypal order
        result = await strapi
          .plugin('strapi-paypal')
          .service('paypalOrder')
          .createOrder(
            title,
            productPrice,
            description,
            accessToken,
            checkoutSuccessUrl,
            checkoutCancelUrl,
            currency,
            url
          );
        const { id, status, links } = result;
        // onsuccess create order store in database
        if (status === 'CREATED') {
          const create = await strapi.query('plugin::strapi-paypal.paypal-product').create({
            data: {
              title,
              description,
              price: productPrice,
              currency: settings.currency,
              isSubscription,
              interval: paymentInterval,
              trialPeriodDays,
              paypalOrderId: id,
              paypalLinks: links,
            },
            populate: true,
          });
          return create;
        }
      }
    } catch (error) {
      console.log(error.response.data);
      throw new ApplicationError(error.message);
    }
  },
  async find(offset, limit, sort, order) {
    try {
      let needToshort;
      if (sort === 'name') {
        needToshort = { title: `${order}` };
      } else if (sort === 'price') {
        needToshort = { price: `${order}` };
      }
      const count = await strapi.query('plugin::strapi-paypal.paypal-product').count();

      const response = await strapi.query('plugin::strapi-paypal.paypal-product').findMany({
        orderBy: needToshort,
        offset,
        limit,
        populate: true,
      });

      return { response, count };
    } catch (error) {
      console.log(error);
      throw new ApplicationError(error.message);
    }
  },

  async findOne(id) {
    try {
      const response = await strapi
        .query('plugin::strapi-paypal.paypal-product')
        .findOne({ where: { id }, populate: true });
      return response;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(error.message);
    }
  },
  async findSlug(slug) {
    try {
      const response = await strapi
        .query('plugin::strapi-paypal.paypal-product')
        .findOne({ where: { slug }, populate: true });
      return response;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(error.message);
    }
  },
  
  async getPaypalCheckout(isSubscription, paypalOrderId, paypalSubcriptionId) {
    try {
      // get access token
      const accessToken = await strapi
        .plugin('strapi-paypal')
        .service('paypalAccessToken')
        .getAccessToken();
      const { settings, paypalSandBoxUrl, paypalLiveUrl } = await this.initialize();

      const { isLiveMode } = settings;

      const url = isLiveMode ? paypalLiveUrl : paypalSandBoxUrl;
      let response;

      if (isSubscription) {
        // get paypal subscription details
        response = await axiosInstance.get(
          `${url}/v1/billing/subscriptions/${paypalSubcriptionId}`,

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        // get paypal order details
        response = await axiosInstance.get(`${url}/v2/checkout/orders/${paypalOrderId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
      }
      return response.data;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(error.message);
    }
  },

  async createOrderPaypal(id){
    
    try {
      const accessToken = await strapi
    .plugin('strapi-paypal')
    .service('paypalAccessToken')
    .getAccessToken();

    const { settings, paypalSandBoxUrl, paypalLiveUrl } = await this.initialize();

    const { isLiveMode, checkoutCancelUrl, checkoutSuccessUrl, currency } = settings;

    const url = isLiveMode ? paypalLiveUrl : paypalSandBoxUrl;

    const product = await strapi
        .query('plugin::strapi-paypal.paypal-product')
        .findOne({ where: { id }, populate: true });
    
    if(product){
      const order= await strapi
      .plugin('strapi-paypal')
      .service('paypalOrder')
      .createOrder(
        product.title,
        product.price,
        product.description,
        accessToken,
        checkoutSuccessUrl,
        checkoutCancelUrl,
        currency,
        url
      );
      const {  status, links } = result;
        if (status === 'CREATED') {
          //TODO create order in system
          }
      return order
    }
   
    } catch (error) {
      throw new ApplicationError(error.message);
    }
   
  },

  async delete(id){
    await strapi
    .query('plugin::strapi-paypal.paypal-product')
    .delete({ where: { id } });
  },

  async updateStrapiProduct(
    productId,
    title,
    productPrice,
    description,
    isSubscription,
    paymentInterval,
    trialPeriodDays,
    productType
  ) {
    try {
     
        if (isSubscription) {
          const updatedProduct = await strapi.query('plugin::strapi-paypal.paypal-product').update({
            where: { id: productId },
            data: {
              title,
              description,
              price: productPrice,
              currency,
              isSubscription,
              interval: paymentInterval,
              trialPeriodDays,
             
            },
            populate: true,
          });
  
          return updatedProduct;
        
      } else {
        const updated = await strapi.query('plugin::strapi-paypal.paypal-product').update({
          where: { id: productId },
          data: {
            title,
            description,
            price: productPrice,
            currency,
            isSubscription,
            interval: paymentInterval,
            trialPeriodDays,
          },
          populate: true,
        });
        return updated;
      }
    } catch (error) {
      console.log(error.response || error);
      throw new ApplicationError(error.message);
    }
  }

});
