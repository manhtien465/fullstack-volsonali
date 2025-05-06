import cronTasks from "./cron-tasks";

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL', 'https://lazyblogadmin.productminting.com'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: true,
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
  
});
