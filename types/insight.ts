import { valueType } from "antd/es/statistic/utils";

export interface Insight {
  jumlah_sama: valueType;
  jumlah_tidak_sama: valueType;
  last_update: number;
}
