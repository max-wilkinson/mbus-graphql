import getAsync from './HttpAsync';

const baseUrl = 'http://mbus.doublemap.com/map/v2';

export const resolvers = {
  Query: {
    routes: async () => getRoutes(),
    activeRoutes: async () => getActiveRoutes(),
    stops: async () => getStops(),
    activeStops: async () => getActiveStops(),
    etas: async (parent: any, args: { stop: number }) => getEtas(args.stop)
  }
};

async function getRoutes() {
  const routesUrl = new URL(baseUrl + '/routes');
  return getAsync(routesUrl);
}

async function getActiveRoutes() {
  const routes = await getRoutes();
  return routes.filter((route: any) => route.active === true);
}

async function getStops() {
  const stopsUrl = new URL(baseUrl + '/stops');
  return getAsync(stopsUrl);
}

async function getActiveStops() {
  const activeRoutes = await getActiveRoutes();
  const stops = await getStops();

  let activeStops: Set<number> = new Set();
  activeRoutes.forEach((route: any) => {
    route.stops.forEach((stop: any) => {
      activeStops.add(stop);
    });
  });

  return stops.filter((stop: any) => activeStops.has(stop.id));
}

async function getEtas(stop: number) {
  const etasUrl = baseUrl + '/eta?stop=';
  const response = await getAsync(new URL(etasUrl + stop.toString()));
  return response['etas'][stop]['etas'];
}
