export default () => ({
  seo: {
    enabled: true,
  },
  comments: {
    enabled: true,
    config: {
      enabledCollections:['api::post.post'],
      badWords: true,
      moderatorRoles: ["Authenticated"],
      approvalFlow: ["api::page.page"],
      entryLabel: {
        "*": ["Title", "title", "Name", "name", "Subject", "subject"],
        "api::page.page": ["avatar"],
      },
      blockedAuthorProps: ["name", "email"],
      reportReasons: {
        MY_CUSTOM_REASON: "MY_CUSTOM_REASON",
      },
      gql: {
        // ...
      },
    },
  },
  // 'strapi-paypal': {
  //   enabled: true,
  //   resolve: './src/plugins/strapi-paypal'
  // },
  // 'aa': {
  //   enabled: true,
  //   resolve: './src/plugins/aa'
  // },
});
