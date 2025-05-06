// src/extensions/users-permissions/strapi-server.js

module.exports = (plugin) => {
    const originalGoogleCallback = plugin.controllers.auth.callback;
  
    plugin.controllers.auth.callback = async (ctx) => {
      // Lưu lại state hoặc redirectTo
      const redirectTo = ctx.query.state || 'https://default-frontend.com'; // fallback nếu không có state
  
      // Gọi logic gốc để xử lý login
      await originalGoogleCallback(ctx);
  
      // Sau khi xử lý xong, ctx.state.user và ctx.state.jwt đã có
      const { user, jwt } = ctx.state;
  
      if (user && jwt) {
        // Redirect về đúng trang client + kèm token
        return ctx.redirect(`${redirectTo}?jwt=${jwt}`);
      }
  
      // Nếu fail, bạn có thể redirect về trang lỗi hoặc trả lỗi
      return ctx.redirect(`${redirectTo}?error=LoginFailed`);
    };
  
    return plugin;
  };
  