"use client";

import { District } from "@/lib/types";
import { Select, Space } from "antd";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getKabupaten, getKecamatan, getProvinsi } from "../lib/fetch";

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

function Filter() {
  const searchParams = useSearchParams();
  const provinsiParams = searchParams.get("provinsi");
  const kabupatenParams = searchParams.get("kabupaten");
  const kecamatanParams = searchParams.get("kecamatan");
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

  const provinsiQuery = useQuery({
    queryKey: ["provinsi"],
    queryFn: getProvinsi,
    refetchOnWindowFocus: false,
  });

  const kabupatenQuery = useQuery({
    queryKey: ["kabupaten", provinsiParams],
    queryFn: () => getKabupaten(provinsiParams),
    refetchOnWindowFocus: false,
  });

  const kecamatanQuery = useQuery({
    queryKey: ["kecamatan", provinsiParams, kabupatenParams],
    queryFn: () => getKecamatan(provinsiParams, kabupatenParams),
    refetchOnWindowFocus: false,
  });

  const provinsiDataList: District[] = provinsiQuery.data
    ? provinsiQuery.data.data
    : [];
  const kabupatenDataList: District[] = kabupatenQuery.data
    ? kabupatenQuery.data.data
    : [];
  const kecamatanDataList: District[] = kecamatanQuery.data
    ? kecamatanQuery.data.data
    : [];

  return (
    <Space wrap>
      <Select
        defaultValue={provinsiParams?.toUpperCase()}
        placeholder="Pilih Provinsi"
        onChange={(value) => handleChange(value, "provinsi")}
        options={provinsiDataList.map((item: District) => ({
          label: item.provinsi,
          value: item.provinsi,
        }))}
        showSearch
        allowClear
        loading={provinsiQuery.isLoading || provinsiQuery.isRefetching}
      />
      <Select
        defaultValue={kabupatenParams?.toUpperCase()}
        placeholder="Pilih Kabupaten"
        onChange={(value) => handleChange(value, "kabupaten")}
        options={kabupatenDataList.map((item) => ({
          label: item.kabupaten,
          value: item.kabupaten,
        }))}
        showSearch
        allowClear
        loading={kabupatenQuery.isLoading || kabupatenQuery.isRefetching}
      />
      <Select
        defaultValue={kecamatanParams?.toUpperCase()}
        placeholder="Pilih Kecamatan"
        onChange={(value) => handleChange(value, "kecamatan")}
        options={kecamatanDataList.map((item) => ({
          label: item.kecamatan,
          value: item.kecamatan,
        }))}
        showSearch
        allowClear
        loading={kecamatanQuery.isLoading || kecamatanQuery.isRefetching}
      />
    </Space>
  );
}

export default Filter;
