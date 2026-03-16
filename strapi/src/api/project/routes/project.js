'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

try {
  module.exports = createCoreRouter('api::project.project');
} catch (error) {
  console.error('[router-init] failed for api::project.project');
  throw error;
}
