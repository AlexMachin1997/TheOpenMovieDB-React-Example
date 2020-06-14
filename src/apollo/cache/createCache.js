import { InMemoryCache } from 'apollo-cache-inmemory';

const createCache = () => new InMemoryCache();

export default createCache;
