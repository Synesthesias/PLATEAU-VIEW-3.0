import { Camera } from "./camera";
import type { ExpressionContainer } from "./expression";
import { Feature } from "./layer";
import type {
  LUT,
  Bound,
  ClassificationType,
  EXPERIMENTAL_clipping,
  LngLat,
  Typography,
} from "./value";

export type LayerAppearance<T> = {
  [K in keyof T]?: T[K] | LayerAppearance<T[K]> | ExpressionContainer;
};

export type LayerAppearanceTypes = {
  [K in keyof AppearanceTypes]: LayerAppearance<AppearanceTypes[K]>;
};

export type AppearanceTypes = {
  marker: MarkerAppearance;
  polyline: PolylineAppearance;
  polygon: PolygonAppearance;
  model: ModelAppearance;
  "3dtiles": Cesium3DTilesAppearance;
  ellipsoid: EllipsoidAppearance;
  ellipse: EllipseAppearance;
  box: BoxAppearance;
  photooverlay: LegacyPhotooverlayAppearance;
  resource: ResourceAppearance;
  raster: RasterAppearance;
  frustum: FrustumAppearance;
  transition: TransitionAppearance;
  heatMap: HeatMapAppearance;
};

export type MarkerAppearance = {
  show?: boolean;
  height?: number;
  heightReference?: "none" | "clamp" | "relative";
  style?: "none" | "point" | "image";
  pointSize?: number;
  pointColor?: string;
  pointOutlineColor?: string;
  pointOutlineWidth?: number;
  image?: string;
  imageSize?: number | "__default__"; // "__default__" is for reset since override with undefined is not allowed
  imageSizeInMeters?: boolean;
  imageHorizontalOrigin?: "left" | "center" | "right";
  imageVerticalOrigin?: "top" | "center" | "baseline" | "bottom";
  imageColor?: string;
  imageCrop?: "none" | "rounded" | "circle";
  imageShadow?: boolean;
  imageShadowColor?: string;
  imageShadowBlur?: number;
  imageShadowPositionX?: number;
  imageShadowPositionY?: number;
  label?: boolean;
  labelText?: string;
  labelPosition?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "lefttop"
    | "leftbottom"
    | "righttop"
    | "rightbottom";
  labelTypography?: Typography;
  labelBackground?: boolean;
  labelBackgroundColor?: string;
  labelBackgroundPaddingHorizontal?: number;
  labelBackgroundPaddingVertical?: number;
  extrude?: boolean;
  near?: number;
  far?: number;
  pixelOffset?: [number, number];
  eyeOffset?: [number, number, number];
  hideIndicator?: boolean;
  selectedFeatureColor?: string; // This doesn't support expression
};

export type PolylineAppearance = {
  show?: boolean;
  clampToGround?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  shadows?: "disabled" | "enabled" | "cast_only" | "receive_only";
  near?: number;
  far?: number;
  classificationType?: ClassificationType;
  hideIndicator?: boolean;
  selectedFeatureColor?: string; // This doesn't support expression
};

export type PolygonAppearance = {
  show?: boolean;
  fill?: boolean;
  fillColor?: string;
  stroke?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  heightReference?: "none" | "clamp" | "relative";
  shadows?: "disabled" | "enabled" | "cast_only" | "receive_only";
  lineJoin?: CanvasLineJoin;
  near?: number;
  far?: number;
  extrudedHeight?: number;
  classificationType?: ClassificationType;
  hideIndicator?: boolean;
  selectedFeatureColor?: string; // This doesn't support expression
};

export type EllipsoidAppearance = {
  show?: boolean;
  heightReference?: "none" | "clamp" | "relative";
  shadows?: "disabled" | "enabled" | "cast_only" | "receive_only";
  radius?: number;
  fillColor?: string;
  near?: number;
  far?: number;
};

export type EllipseAppearance = {
  show?: boolean;
  heightReference?: "none" | "clamp" | "relative";
  classificationType?: ClassificationType;
  shadows?: "disabled" | "enabled" | "cast_only" | "receive_only";
  radius?: number;
  fill?: boolean;
  fillColor?: string;
  near?: number;
  far?: number;
};

export type ModelAppearance = {
  show?: boolean;
  model?: string; // For compat
  url?: string;
  heightReference?: "none" | "clamp" | "relative";
  heading?: number;
  pitch?: number;
  roll?: number;
  scale?: number;
  maximumScale?: number;
  minimumPixelSize?: number;
  animation?: boolean; // default: true
  shadows?: "disabled" | "enabled" | "cast_only" | "receive_only";
  colorBlend?: "none" | "highlight" | "replace" | "mix";
  color?: string;
  colorBlendAmount?: number;
  lightColor?: string;
  silhouette?: boolean;
  silhouetteColor?: string;
  bearing?: number;
  silhouetteSize?: number; // default: 1
  near?: number;
  far?: number;
  pbr?: boolean | "withTexture";
  specularEnvironmentMaps?: string;
  sphericalHarmonicCoefficients?: [x: number, y: number, z: number][];
  imageBasedLightIntensity?: number;
};

export type FrustumAppearance = {
  show?: boolean;
  color?: string;
  opacity?: number;
  zoom?: number;
  aspectRatio?: number;
  length?: number;
};

export type Cesium3DTilesAppearance = {
  show?: boolean;
  color?: string;
  styleUrl?: string;
  shadows?: "disabled" | "enabled" | "cast_only" | "receive_only";
  colorBlendMode?: "highlight" | "replace" | "mix" | "default";
  edgeWidth?: number;
  edgeColor?: string;
  tileset?: string;
  apiKey?: string;
  experimental_clipping?: EXPERIMENTAL_clipping;
  pointSize?: number;
  meta?: unknown;
  pbr?: boolean | "withTexture";
  specularEnvironmentMaps?: string;
  sphericalHarmonicCoefficients?: [x: number, y: number, z: number][];
  imageBasedLightIntensity?: number;
  selectedFeatureColor?: string;
  disableIndexingFeature?: boolean;
  onLoadFeature?: (feature: Partial<Feature> | undefined) => void;
};

export type LegacyPhotooverlayAppearance = {
  show?: boolean;
  location?: LngLat;
  height?: number;
  heightReference?: "none" | "clamp" | "relative";
  camera?: Camera; // You may also update the field name in storytelling widget
  image?: string;
  imageSize?: number;
  imageHorizontalOrigin?: "left" | "center" | "right";
  imageVerticalOrigin?: "top" | "center" | "baseline" | "bottom";
  imageCrop?: "none" | "rounded" | "circle";
  imageShadow?: boolean;
  imageShadowColor?: string;
  imageShadowBlur?: number;
  imageShadowPositionX?: number;
  imageShadowPositionY?: number;
  photoOverlayImage?: string;
  photoOverlayDescription?: string;
  near?: number;
  far?: number;
};

export type ResourceAppearance = {
  show?: boolean;
  url?: string;
  type?: "geojson" | "kml" | "czml" | "auto";
  clampToGround?: boolean;
  markerSize?: number;
  markerColor?: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  hideIndicator?: boolean;
};

export type RasterAppearance = {
  show?: boolean;
  minimumLevel?: number;
  maximumLevel?: number;
  credit?: string;
  alpha?: number;
  hideIndicator?: boolean;
};

export type BoxAppearance = {
  show?: boolean;
  height?: number;
  width?: number;
  length?: number;
  heading?: number;
  pitch?: number;
  roll?: number;
  fillColor?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  outlineWidth?: number;
  draggableOutlineColor?: string;
  activeDraggableOutlineColor?: string;
  draggableOutlineWidth?: number;
  scalePoint?: boolean;
  axisLine?: boolean;
  pointFillColor?: string;
  pointOutlineColor?: string;
  activePointOutlineColor?: string;
  pointOutlineWidth?: number;
  axisLineColor?: string;
  axisLineWidth?: number;
  allowEnterGround?: boolean;
  cursor?: string;
  activeBox?: boolean;
  activeScalePointIndex?: number; // 0 ~ 11
  activeEdgeIndex?: number; // 0 ~ 11
  near?: number;
  far?: number;
  hideInactive?: boolean;
  disabledSelection?: boolean;
};

export type TransitionAppearance = {
  useTransition?: boolean;
  translate?: [lng: number, lat: number, height: number];
  rotate?: [heading: number, pitch: number, roll: number];
  scale?: [x: number, y: number, z: number];
};

export type HeatMapAppearance = {
  valueMap: string;
  bounds: Bound;
  colorMap?: LUT;
  cropBounds?: Bound;
  width?: number;
  height?: number;
  minValue?: number;
  maxValue?: number;
  opacity?: number;
  contourSpacing?: number;
  contourThickness?: number;
  contourAlpha?: number;
  logarithmic?: boolean;
};
