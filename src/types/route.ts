export interface Point {
    x: number;
    y: number;
}

export interface RouteResponse {
  start: string;
  end: string;
  path: Point[];
  pathString: string;
}