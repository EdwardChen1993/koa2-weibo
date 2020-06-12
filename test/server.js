/**
 * @description jest server
 * @author 泽华
 */

const request = require('supertest');
const server = require('../src/app').callback();

module.exports = request(server);