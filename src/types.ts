/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum DeviceCategory {
  CCTV_CAMERA = "CCTV Camera",
  NVR_VMS_SERVER = "NVR / VMS Server",
  NETWORK_SWITCH = "Network Switch",
  ACCESS_CONTROL_PANEL = "Access Control Panel",
  INTERCOM_INDOOR = "IP Intercom / Indoor Station",
  IP_PA_SPEAKER = "IP PA Speaker",
  WORKSTATION_CLIENT = "Workstation / Client",
  ROUTER_GATEWAY = "Router / Gateway",
  NAS_STORAGE = "NAS / Storage Server",
  SMART_CONTROLLER = "Smart Controller",
  OTHER = "Other ELV Device"
}

export enum IpAllocationStatus {
  STATIC_ASSIGNED = "Static / Assigned",
  RESERVED = "Reserved / Spare",
  DHCP_POOL = "DHCP Pool",
  UNASSIGNED = "Unassigned / Available"
}

export interface IpAllocationRow {
  ip: string;
  category: DeviceCategory;
  deviceName: string;
  vlan: string;
  status: IpAllocationStatus;
  notes: string;
}

export interface SubnetResult {
  networkAddress: string;
  subnetMask: string;
  broadcastAddress: string;
  wildcardMask: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalUsableHosts: number;
  cidr: number;
  binarySubnetMask: string;
  binaryNetworkAddress: string;
}

export interface CctvCameraStream {
  id: string;
  name: string;
  quantity: number;
  resolution: "720p" | "1080p" | "4MP" | "5MP" | "8MP/4K";
  codec: "H.264" | "H.265" | "H.265+";
  fps: number;
  days: number;
  complexity: "Low" | "Medium" | "High";
  audio: boolean;
  motionFactor: number; // 0.1 to 1.0 (percent of day recording/active)
}

export interface PoeDeviceRow {
  id: string;
  name: string;
  quantity: number;
  poeClass: "Class 0" | "Class 1" | "Class 2" | "Class 3" | "Class 4 (PoE+)" | "Class 6 (bt)" | "Class 8 (bt)" | "Custom";
  customWattage: number;
  cableDistance: number; // meters
  cableType: "Cat5e" | "Cat6" | "Cat6a";
}

export interface SavedProject {
  id: string;
  name: string;
  customerName: string;
  projectNo: string;
  updatedAt: string;
  subnetIp: string;
  cidr: number;
  allocations: IpAllocationRow[];
  cctvStreams: CctvCameraStream[];
  poeDevices: PoeDeviceRow[];
  poeBufferPercent: number;
}
