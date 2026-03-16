'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

try {
  module.exports = createCoreRouter('api::experience.experience');
} catch (error) {
  console.error('[router-init] failed for api::experience.experience');
  throw error;
}
