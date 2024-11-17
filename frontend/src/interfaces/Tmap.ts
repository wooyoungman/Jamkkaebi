// TMap 관련 모든 타입 정의
export interface MapOptions {
  center: TMapLatLng;
  width: string | number;
  height: string | number;
  zoom?: number;
  zoomControl?: boolean;
  scrollwheel?: boolean;
}

export interface TMap {
  setCenter: (latLng: TMapLatLng) => void;
  setZoom: (level: number) => void;
  getCenter: () => TMapLatLng;
  addControl: (control: any, position: any) => void;
  setOptions: (options: any) => void;
  removeAllOverlays: () => void;
  destroy: () => void;
  addPolyline: (options: PolylineOptions) => TMapPolyline;
  getBounds: () => TMapBounds;
  getLevel: () => number;
  addListener: (eventName: string, callback: Function) => void;
  removeListener: (eventName: string, callback: Function) => void;
}

export interface TMapLatLng {
  lat: () => number;
  lng: () => number;
}

export interface TMapMarker {
  setMap: (map: TMap | null) => void;
  getPosition: () => TMapLatLng;
  setPosition: (latLng: TMapLatLng) => void;
  setIcon: (icon: string | MarkerIcon) => void;
  setLabel: (label: string) => void;
  setVisible: (visible: boolean) => void;
  setZIndex: (zIndex: number) => void;
  addListener: (eventName: string, callback: Function) => void;
  removeListener: (eventName: string, callback: Function) => void;

  // 내부 속성
  _element: HTMLElement;
  _iconSize: TMapSize;
}

export interface MarkerIcon {
  url: string;
  size?: TMapSize;
  anchor?: TMapPoint;
}

export interface TMapPoint {
  x: number;
  y: number;
}

export interface TMapSize {
  width: number;
  height: number;
}

export interface TMapBounds {
  getSouthWest: () => TMapLatLng;
  getNorthEast: () => TMapLatLng;
  extend: (latLng: TMapLatLng) => void;
}

export interface PolylineStyle {
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeStyle?: string;
}

export interface PolylineOptions {
  path?: TMapLatLng[];
  map?: TMap;
  style?: PolylineStyle;
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  strokeStyle?: string;
}

export interface TMapPolyline {
  setMap: (map: TMap | null) => void;
  setPath: (path: TMapLatLng[]) => void;
  setVisible: (visible: boolean) => void;
  setStyles: (styles: PolylineOptions) => void;
}

// window 객체에 Tmapv2 타입 추가
declare global {
  interface Window {
    Tmapv2: {
      Map: new (element: HTMLElement, options: MapOptions) => TMap;
      LatLng: new (lat: number, lng: number) => TMapLatLng;
      Marker: new (options: any) => TMapMarker;
      Polyline: new (options: any) => TMapPolyline;
      Point: new (x: number, y: number) => TMapPoint;
      Size: new (width: number, height: number) => TMapSize;
      Control: {
        ScaleControl: new () => any;
      };
      MapTypeId: {
        ROAD: string;
        SATELLITE: string;
        HYBRID: string;
      };
    };
  }
}

export interface MapContainerProps {
  width?: string;
  height?: string;
  initialCenter?: {
    lat: number;
    lng: number;
  };
  initialZoom?: number;
  children?: React.ReactNode;
}

export type TMapInstance = TMap;
