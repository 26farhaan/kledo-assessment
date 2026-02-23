import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/filter.tsx'),
  route('filter', 'routes/filter.tsx'),
] satisfies RouteConfig;
