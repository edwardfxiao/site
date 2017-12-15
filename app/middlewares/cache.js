import wrapper from 'co-redis';
import Redis from 'redis';

module.exports = function (options) {
  options = options || {};
  const prefix = options.prefix || 'edwardxiao-cache:';
  const expire = options.expire || 1800;

  let redisAvailable = false;
  let redisOptions = options.redis || {};

  const redisClient = wrapper(
    Redis.createClient(redisOptions.url, redisOptions.options)
  );

  redisClient.on('error', (_error)=> {
    redisAvailable = false;
  });

  redisClient.on('end', () => {
    redisAvailable = false;
  });

  redisClient.on('connect', () => {
    redisAvailable = true;
  });

  const setCache = async function(key, value, options) {
    if(!redisAvailable){
      return;
    }
    if (value == null) {
      return;
    }
    options = options || {};
    key = prefix + key;
    const tty = options.expire || expire;
    value = JSON.stringify(value);
    await redisClient.setex(key, tty, value);
  };

  const getCache = async function(key) {
    if(!redisAvailable){
      return;
    }
    key = prefix + key;
    let data = await redisClient.get(key);
    if(data) {
      data = JSON.parse(data.toString());
    }
    return data;
  };

  const delCache = async function(key) {
    if(!redisAvailable){
      return;
    }
    key = prefix + key;
    // success 1, faild: 0
    let data = await redisClient.del(key);
    if (data === 1){
      return true;
    }
    else{
      return false;
    }
  };

  const cacheMiddle = async function(ctx, next) {
    ctx.cache = {
      get: getCache,
      set: setCache,
      del: delCache,
    };
    await next();
  };

  return cacheMiddle;
};
