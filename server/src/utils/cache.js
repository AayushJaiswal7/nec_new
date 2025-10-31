// utils/cache.js
import redis from "../config/redisconfig.js";

/**
 * Set cache with TTL
 * @param {string} key
 * @param {any} value
 * @param {number} ttlInSeconds
 */
export const setCache = async (key, value, ttlInSeconds = 3600) => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttlInSeconds);
  } catch (error) {
    console.error("Redis SET error:", error);
  }
};

/**
 * Get cached value
 * @param {string} key
 * @returns {Promise<any|null>}
 */
export const getCache = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Redis GET error:", error);
    return null;
  }
};

/**
 * Delete cached key
 */
export const deleteCache = async (key) => {
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Redis DEL error:", error);
  }
};
