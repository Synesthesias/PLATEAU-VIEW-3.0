import { Infobox } from "../../Crust/Infobox/types";

export type LegacyLayer<P = any, IBP = any> = {
  id: string;
  type?: string;
  pluginId?: string;
  extensionId?: string;
  title?: string;
  property?: P;
  infobox?: Infobox<IBP>;
  isVisible?: boolean;
  propertyId?: string;
  tags?: Tag[];
  readonly children?: LegacyLayer[];
  creator?: string;
};

export type Tag = {
  id: string;
  label: string;
  tags?: Tag[];
};

export type Rect = {
  north: number;
  south: number;
  east: number;
  west: number;
};

/** Represents the camera position and state */
export type CameraPosition = {
  /** degrees */
  lat: number;
  /** degrees */
  lng: number;
  /** meters */
  height: number;
  /** radians */
  heading: number;
  /** radians */
  pitch: number;
  /** radians */
  roll: number;
  /** Field of view expressed in radians */
  fov: number;
  /** Aspect ratio of frustum */
  aspectRatio?: number;
};

export type Typography = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  textAlign?: "left" | "center" | "right" | "justify" | "justify_all";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type LegacyCluster = {
  id: string;
  default?: {
    clusterPixelRange: number;
    clusterMinSize: number;
    clusterLabelTypography?: Typography;
    clusterImage?: string;
    clusterImageHeight?: number;
    clusterImageWidth?: number;
  };
  layers?: { layer?: string }[];
};
