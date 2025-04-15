'use strict';

module.exports = [
  {
    method: 'PUT',
    path: '/updateSettings',
    handler: 'configurationController.updateSetting',
    config: {
      auth: false,
      policies: ['plugin::strapi-paypal.apiToken'],
    },
  },
  {
    method: 'GET',
    path: '/getSettings',
    handler: 'configurationController.getSetting',
    config: {
      auth: false,
      policies: ['plugin::strapi-paypal.apiToken'],
    },
  },
  {
    method: 'POST',
    path: '/createProduct',
    handler: 'paypalController.createProduct',
    config: {
      auth: false,
      policies: ['plugin::strapi-paypal.apiToken'],
    },
  },
  
  {
    method: 'GET',
    path: '/getProduct/:offset/:limit/:sort/:order',
    handler: 'paypalController.findProducts',
    config: {
      auth: false,
      // policies: ['plugin::strapi-paypal.apiToken'],
    },
  },

  {
    method: 'GET',
    path: '/getProduct/:id',
    handler: 'paypalController.findProductById',
    config: {
      auth: false,
      policies: ['plugin::strapi-paypal.apiToken'],
    },
  },
  {
    method: 'GET',
    path: '/getPaypalCheckout/:id',
    handler: 'paypalController.getPaypalCheckout',
    config: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/webhook',
    handler: 'paypalController.webhook',
    config: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/create-order-paypal/:id',
    handler: 'paypalController.createOrderPaypal',
    config: {
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/delete-product/:id',
    handler: 'paypalController.delete',
    config: {
      auth: false,
      policies: ['plugin::strapi-paypal.apiToken'],

    },
  },
  {
    method: 'PATCH',
    path: '/update-product/:id',
    handler: 'paypalController.updateProduct',
    config: {
      auth: false,
      policies: ['plugin::strapi-paypal.apiToken'],

    },
  },
];
