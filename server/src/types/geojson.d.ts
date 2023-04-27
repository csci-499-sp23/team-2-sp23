type GeoJsonPolygon = "Polygon" | "MultiPolygon";

type Polygon = {
  type: GeoJsonPolygon;
  coordinates: number[][][];
};

type MultiPolygon = {
  type: "MultiPolygon";
  coordinates: number[][][][];
};

type Feature = {
  type: string;
  properties: {
    cartodb_id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  geometry: Polygon | MultiPolygon;
};

type GeoJson = {
  type: string;
  features: Feature[];
};

type RegionInfo = {
  name: string;
  coordinates: any[];
  area: number;
};
