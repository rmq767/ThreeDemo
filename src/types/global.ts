export interface RoutesList {
  path: string;
  component: () => Promise<unknown>;
}
