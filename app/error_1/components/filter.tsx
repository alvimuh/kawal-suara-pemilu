"use client";

import { District } from "@/lib/types";
import { Col, Flex, Row, Select, Space, Typography } from "antd";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getKabupaten, getKecamatan, getProvinsi } from "../lib/fetch";
import Title from "antd/es/skeleton/Title";

type SelectName = "provinsi" | "kabupaten" | "kecamatan";

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
    params.set(name, value);
    params.set("page", "1");

    if (name === "provinsi" && value === undefined) {
      params.delete("provinsi");
      params.delete("kabupaten");
      params.delete("kecamatan");
    }
    if (name === "kabupaten" && value === undefined) {
      params.delete("kabupaten");
      params.delete("kecamatan");
    }
    if (name === "kecamatan" && value === undefined) {
      params.delete("kecamatan");
    }
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
    <>
      <Row gutter={[12, 12]} style={{ marginTop: "1rem" }}>
        <Col sm={24} lg={4} xl={3}>
          <Typography.Title
            level={5}
            style={{ margin: 0, lineHeight: "2rem", fontWeight: 500 }}
          >
            Pilih Lokasi TPS
          </Typography.Title>
        </Col>
        <Col xs={24} md={8} lg={4}>
          <Select
            value={provinsiParams?.toUpperCase()}
            placeholder="Pilih Provinsi"
            onChange={(value) => handleChange(value, "provinsi")}
            options={provinsiDataList.map((item: District) => ({
              label: item.provinsi,
              value: item.provinsi,
            }))}
            showSearch
            allowClear
            loading={provinsiQuery.isLoading || provinsiQuery.isRefetching}
            style={{
              width: "100%",
            }}
          />
        </Col>
        <Col xs={24} md={8} lg={4}>
          <Select
            value={kabupatenParams?.toUpperCase()}
            placeholder="Pilih Kabupaten"
            onChange={(value) => handleChange(value, "kabupaten")}
            options={kabupatenDataList.map((item) => ({
              label: item.kabupaten,
              value: item.kabupaten,
            }))}
            showSearch
            allowClear
            loading={kabupatenQuery.isLoading || kabupatenQuery.isRefetching}
            style={{
              width: "100%",
            }}
          />
        </Col>
        <Col span={24} md={8} lg={4}>
          <Select
            value={kecamatanParams?.toUpperCase()}
            placeholder="Pilih Kecamatan"
            onChange={(value) => handleChange(value, "kecamatan")}
            options={kecamatanDataList.map((item) => ({
              label: item.kecamatan,
              value: item.kecamatan,
            }))}
            showSearch
            allowClear
            loading={kecamatanQuery.isLoading || kecamatanQuery.isRefetching}
            style={{
              width: "100%",
            }}
          />
        </Col>
      </Row>
    </>
  );
}

export default Filter;
