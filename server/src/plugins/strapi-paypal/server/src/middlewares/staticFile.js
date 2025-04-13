/* eslint-disable node/no-extraneous-require */
/* eslint-disable node/no-missing-require */

// "use strict";

// const path = require("path");
// const koaStatic = require("koa-static");

// module.exports = async ({ strapi }) => {
//   strapi.server.routes([
//     {
//       method: "GET",
//       path: "/plugins/strapi-paypal/static/(.*)",
//       async handler(ctx, next) {
//         ctx.url = path.basename(`${ctx.url}/paypal.js`);
//         const folderPath =
//           strapi.dirs.extensions || strapi.dirs.dist.extensions;
//         const staticFolder = path.resolve(
//           folderPath,
//           "strapi-paypal",
//           "public"
//         );
//         return koaStatic(staticFolder)(ctx, next);
//       },
//       config: {
//         auth: false,
//       },
//     },
//   ]);
// };


// "use strict";

// const path = require("path");
// const koaStatic = require("koa-static");
// const mount = require("koa-mount");

// module.exports = async ({ strapi }) => {
//   // Resolve path to plugin's public folder
//   const extensionsPath = strapi.dirs.extensions || strapi.dirs.dist.extensions;

//   const pluginPublicPath = path.resolve(
//     extensionsPath,
//     "strapi-paypal",
//     "public"
//   );

//   // Mount static route to serve files like /paypal.js
//   strapi.server.app.use(
//     mount("/plugins/strapi-paypal/static", koaStatic(pluginPublicPath))
//   );
// };


"use strict";

const path = require("path");
const koaStatic = require("koa-static");
const mount = require("koa-mount");

module.exports = async ({ strapi }) => {
  // This resolves to /project/src/plugins/strapi-paypal/dist
  const pluginDistPath = path.resolve(__dirname, "dist");

  console.log("Serving PayPal static files from:", pluginDistPath);

  strapi.server.app.use(
    mount("/plugins/strapi-paypal/static", koaStatic(pluginDistPath))
  );
};

