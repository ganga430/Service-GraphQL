// Avoids open handle issues from attempting connections to Redis (unless Redis is explicitly mocked)
// eslint-disable-next-line strict
process.env.ENABLE_REDIS = 'false';
