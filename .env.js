module.exports = {
  PORT: Number.parseInt(process.env.PORT) || 3000,
  // APP_ENV: 'production',
  APP_ENV: 'development',
  APP_KEY: 'SomeRandomString',
  APP_NAME: 'site',
  REDIS_URL: 'redis://192.168.10.10:6379/1',
  REDIS_PASSWORD: '',
  SERVE_STATIC: 'redis://localhost:6379/1',
  SECRET_KEY_BASE: '',
  DB_URL: 'mongodb://127.0.0.1:27017/site',
  QINIU: {
    'BUCKET_NAME': '',
    'ACCESS_KEY': '',
    'SECRET_KEY': '',
    'DOMAIN': '',
  },
}