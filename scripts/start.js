const path = require('path');
const Hapi = require('@hapi/hapi');

const port = process.env.PORT || 3000;
const { NODE_ENV } = process.env;
const FILES = /\.(js|js.map|woff|woff2|svg|bmp|jpg|jpeg|gif|png|ico)(\?v=\d+\.\d+\.\d+)?$/;
const PATH = {
  '/': 'index.html',
};
const pathFromEnvMode = NODE_ENV === 'production'
  ? 'build'
  : 'dist';

console.log('Server: => NODE_ENV: ', NODE_ENV);
console.log('pathFromEnvMode: ', pathFromEnvMode);

const init = async () => {
  const server = Hapi.server({
    port,
  });
  // eslint-disable-next-line global-require
  await server.register(require('@hapi/inert'));

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: (request, h) => {
      if (FILES.test(request.path)) {
        return h.file(path.join(process.cwd(), pathFromEnvMode, request.path));
      }

      return h.file(path.join(process.cwd(), pathFromEnvMode, PATH[request.path]));
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
