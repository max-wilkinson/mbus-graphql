import getAsync from './HttpAsync';

const baseUrl = 'http://mbus.doublemap.com/map/v2';
const routesUrl = new URL(baseUrl + '/routes');
const stopsUrl = new URL(baseUrl + '/stops');
const etasUrl = baseUrl + '/eta?stop=';

export const resolvers = {
  Query: {
    routes: async () => getAsync(routesUrl),
    stops: async () => getAsync(stopsUrl),
    etas: async (parent: any, args: { stop: number }) => {
      const response = await getAsync(new URL(etasUrl + args.stop.toString()));
      return response['etas'][args.stop]['etas'];
    }
  }
};
