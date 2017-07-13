// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      from: '0xe98b66de7c650e009f4362dcfb5ab5b20140b2bb'
    },
    kovan: {
      network_id: 42,
      host:'localhost',
      port:8545,
      from:'0xe98b66de7c650e009f4362dcfb5ab5b20140b2bb'
    },
    rinkeby: {
      host: "10.0.0.14",
      port: 8545,
      network_id: 4,
      from:'0xe98b66de7c650e009f4362dcfb5ab5b20140b2bb'
    }
  }
}
