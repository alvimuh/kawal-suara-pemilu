interface TpsData {
  code: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  tps: string;
  total_votes_01: number;
  total_votes_02: number;
  total_votes_03: number;
  total_sum_votes: number;
  total_valid_votes: number;
  total_invalid_votes: number;
  total_votes: number;
  dpt: number;
  dptb: number;
  dptk: number;
  jml_hak_pilih: number;
  selisih_suara_paslon_dan_jumlah_sah: number;
  selisih_suara_sah_tidak_sah_dan_total: number;
  link: string;
  pic_urls: string[];
  updated_at: number;
  obtained_at: number;
  update_id: number;
  all_in: number;
  status: number;
}
