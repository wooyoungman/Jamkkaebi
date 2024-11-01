// TMap 기본 옵션 타입
export interface MapOptions {
  center: TMapLatLng;
  width: string;
  height: string;
  zoom: number;
  zoomControl?: boolean;
  mapTypeId?: "ROADMAP" | "SATELLITEMAP" | "HYBRIDMAP" | "VECTORMAP";
}

// 내부 속성을 포함한 위치 정보 타입
export interface TMapLatLng {
  // 메서드
  lat(): number;
  lng(): number;
  toString(): string;

  // 내부 속성
  _lat: number;
  _lng: number;
}

// 크기 관련 타입
export interface TMapSize {
  _width: number;
  _height: number;
}

// 이벤트 관련 타입
type EventType = "Click";

export interface TMapEvent {
  type: EventType;
  data: {
    lngLat: TMapLatLng;
  };
}

// Vector Map 관련 스타일 타입
export interface VectorMapStyle {
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

// 마커 관련 타입
export interface TMapMarker {
  // 메서드
  setMap: (map: TMap | null) => void;
  getPosition: () => TMapLatLng;
  setPosition: (latLng: TMapLatLng) => void;
  setIcon: (icon: string | MarkerIcon) => void;
  setLabel: (label: string) => void;
  setVisible: (visible: boolean) => void;
  setZIndex: (zIndex: number) => void;

  // 내부 속성
  _element: HTMLElement;
  _iconSize: TMapSize;
}

export interface MarkerIcon {
  url: string;
  size: TMapSize;
  offset?: {
    x: number;
    y: number;
  };
}

// 폴리라인 관련 타입
export interface TMapPolyline {
  // 메서드
  setMap: (map: TMap | null) => void;
  setPath: (path: TMapLatLng[]) => void;
  getPath: () => TMapLatLng[];
  setStyle: (style: VectorMapStyle) => void;
  setVisible: (visible: boolean) => void;

  // 내부 속성
  _path: TMapLatLng[];
  _style: VectorMapStyle;
}

// API 응답 타입
export interface NewAddress {
  centerLat: string;
  centerLon: string;
  frontLat: string;
  frontLon: string;
  fullAddressRoad: string;
}

export interface NewAddressList {
  newAddress: NewAddress[];
}

export interface Poi {
  newAddressList: NewAddressList;
  id: string;
  pkey: string;
  name: string;
  noorLat: string;
  noorLon: string;
}

export interface Pois {
  poi: Poi[];
}

export interface SearchPoiInfo {
  totalCount: string;
  count: string;
  page: string;
  pois: Pois;
}

export interface TmapResponse {
  searchPoiInfo: SearchPoiInfo;
}

export interface TmapAddressInfo {
  fullAddress: string;
}

export interface TmapReverseGeocodingResponse {
  addressInfo: TmapAddressInfo;
}

// 메인 TMap 인터페이스
export interface TMap {
  // 기본 지도 제어
  setCenter(latLng: TMapLatLng): void;
  getCenter(): TMapLatLng;
  setZoom(level: number): void;
  getZoom(): number;
  setZoomLimit(minZoom: number, maxZoom: number): void;
  setOptions(options: Partial<MapOptions>): void;

  // 이벤트 처리
  on(eventType: EventType, listener: (event: TMapEvent) => void): void;
  off(eventType: EventType, listener: (event: TMapEvent) => void): void;

  // Vector Map 전용 기능
  setMapTypeId(mapTypeId: MapOptions["mapTypeId"]): void;
  setStyle(style: VectorMapStyle): void;

  // 마커 & 폴리라인 생성
  addMarker(options: MarkerIcon & { position: TMapLatLng }): TMapMarker;
  addPolyline(options: {
    path: TMapLatLng[];
    style?: VectorMapStyle;
  }): TMapPolyline;

  // 영역 관련
  fitBounds(bounds: TMapLatLngBounds): void;
  getBounds(): TMapLatLngBounds;

  // 기타
  destroy(): void;
  refresh(): void;
}

// 영역 관련 타입
export interface TMapLatLngBounds {
  // 메서드
  extend(latLng: TMapLatLng): void;
  contains(latLng: TMapLatLng): boolean;
  getCenter(): TMapLatLng;

  // 내부 속성
  _sw: TMapLatLng; // 남서쪽 경계
  _ne: TMapLatLng; // 북동쪽 경계
}
