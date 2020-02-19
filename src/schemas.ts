import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Route {
    id: ID
    name: String
    stops: [Int]
    description: String
    color: String
    active: Boolean
    path: [Float]
  }

  type Stop {
    id: ID
    name: String
    description: String
    lat: Float
    lon: Float
  }

  type Eta {
    bus_id: Int
    route: Int
    avg: Float
    type: String
    trip_id: Int
  }

  type Query {
    routes: [Route]
    activeRoutes: [Route]
    stops: [Stop]
    activeStops: [Stop]
    etas(stop: Int): [Eta]
  }
`;
