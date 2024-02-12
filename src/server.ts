import * as http from 'http';
import * as methods from './controllers/users';
import * as errors from './utils/errorRes';

const app = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  if (req.url.startsWith('/api')) {
    const endpoint = req.url.split('/')[2];

    if (endpoint === 'users') {
      switch (req.method) {
        case 'GET':
          const hasId = req.url.split('/')[3];
          if (hasId) {
            methods.getUserById(req, res);
          } else {
              methods.getAllUsers(req, res);
          }
          break;
        case 'POST':
          methods.createUser(req, res);
          break;
        case 'PUT':
          methods.updateUser(req, res);
          break;
        case 'DELETE':
          methods.deleteUser(req, res);
          break;
        default:
          errors.notFound(res);
          break;
      }
    }
  } else {
    errors.notFound(res);
  }
};

const server = http.createServer(app);

export { server };
