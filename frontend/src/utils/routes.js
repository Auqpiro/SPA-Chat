const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  createPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
};

export default routes;
