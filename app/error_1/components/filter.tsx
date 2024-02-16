"use client";

import { District } from "@/lib/types";
import { Select, Space } from "antd";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type SelectName = "provinsi" | "kabupaten" | "kecamatan";

const handleChange = (value: string, type: SelectName) => {
  switch (type) {
    case "kabupaten":
      break;
  }
};

interface FilterProps {
  provinsiDataList: District[];
  kabupatenDataList: District[];
  kecamatanDataList: District[];
  //   kelurahanDataList: District[];
}
function Filter({
  provinsiDataList,
  kabupatenDataList,
  kecamatanDataList,
}: //   kelurahanDataList,
FilterProps) {
  const searchParams = useSearchParams();
  const defaultProvinsi = searchParams.get("provinsi");
  const defaultKabupaten = searchParams.get("kabupaten");
  const defaultKecamatan = searchParams.get("kecamatan");
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleChange(value: string, name: SelectName) {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== undefined) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    // window.history.pushState(null, "", `?${params.toString()}`);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Space wrap>
      <Select
        defaultValue={defaultProvinsi?.toUpperCase()}
        placeholder="Pilih Provinsi"
        onChange={(value) => handleChange(value, "provinsi")}
        options={provinsiDataList.map((item: District) => ({
          label: item.provinsi,
          value: item.provinsi,
        }))}
        showSearch
        allowClear
      />
      <Select
        defaultValue={defaultKabupaten?.toUpperCase()}
        placeholder="Pilih Kabupaten"
        onChange={(value) => handleChange(value, "kabupaten")}
        options={kabupatenDataList.map((item) => ({
          label: item.kabupaten,
          value: item.kabupaten,
        }))}
        showSearch
        allowClear
      />
      <Select
        defaultValue={defaultKecamatan?.toUpperCase()}
        placeholder="Pilih Kecamatan"
        onChange={(value) => handleChange(value, "kecamatan")}
        options={kecamatanDataList.map((item) => ({
          label: item.kecamatan,
          value: item.kecamatan,
        }))}
        showSearch
        allowClear
      />
    </Space>
  );
}

export default Filter;
