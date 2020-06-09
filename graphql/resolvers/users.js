const register = require('./users/register');
const login = require('./users/login');

/* -------------------------------------------------------------------------- */

module.exports = {
  Mutation: {
    register: (_, { input }) => register(input),

    login: (_, { username, password }) => login(username, password),
  },
};
