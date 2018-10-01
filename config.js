module.exports = {
  port: 8000,
  dbConnectionString: `postgres://postgres:password@localhost:5436/postgres`,
  saltRounds: 2,
  jwtSecret: 'yo-its-a-secret',
  tokenExpireTime: '6h'
}

