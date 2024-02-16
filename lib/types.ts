import { valueType } from "antd/es/statistic/utils";

export interface Insight {
  jumlah_sama: valueType;
  jumlah_tidak_sama: valueType;
  jumlah_tps: number;
  last_update: number;
}

export interface District {
  provinsi: string | null;
  kabupaten: string | null;
  kecamatan: string | null;
  kelurahan: string | null;
}
