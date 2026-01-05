import { BaseRecord } from "@/apis/base";

export interface IBlock extends BaseRecord {
  root: Root;
}

export interface Root {
  type: string;
  version: number;
  detail: null;
  format: string;
  mode: null;
  style: null;
  textFormat: null;
  textStyle: null;
  indent: number;
  direction: string;
  children: Child[];
}

export interface Child {
  type: string;
  version: number;
  detail: number;
  format: string;
  mode: string;
  style: string;
  textFormat: number;
  textStyle: string;
  indent: number;
  direction: string;
  children: any[];
  text?: string;
  level?: number;
  " text"?: string;
  code?: string;
  language?: string;
}
