"use client";

import { District } from "@/lib/types";
import {
  Col,
  Flex,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Typography,
  Grid,
} from "antd";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getKabupaten,
  getKecamatan,
  getKelurahan,
  getProvinsi,
} from "../lib/fetch";
import styles from "./styles.module.css";

const { useBreakpoint } = Grid;

type SelectName = "provinsi" | "kabupaten" | "kecamatan" | "kelurahan";

const optionsWithDisabled = [
  { label: "Semua", value: "all" },
  { label: "Valid", value: "valid" },
  { label: "Tidak Valid", value: "invalid" },
];

function Filter() {
  const breakpoint = useBreakpoint();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const provinsiParams = searchParams.get("provinsi");
  const kabupatenParams = searchParams.get("kabupaten");
  const kecamatanParams = searchParams.get("kecamatan");
  const kelurahanParams = searchParams.get("kelurahan");
  const statusParams = searchParams.get("status") ?? "all";

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

  const kelurahanQuery = useQuery({
    queryKey: ["kelurahan", provinsiParams, kabupatenParams, kecamatanParams],
    queryFn: () =>
      getKelurahan(provinsiParams, kabupatenParams, kecamatanParams),
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
  const kelurahanDataList: District[] = kelurahanQuery.data
    ? kelurahanQuery.data.data
    : [];

  const handleChangeDistrict = (value: string, name: SelectName) => {
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
  };

  const handleChangeStatus = (event: RadioChangeEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", event.target.value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={24} lg={3}>
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              lineHeight: "2.05rem",
              fontWeight: 500,
            }}
          >
            Lokasi TPS
          </Typography.Title>
        </Col>
        <Col xs={24} lg={5}>
          <Select
            value={provinsiParams?.toUpperCase()}
            placeholder="Pilih Provinsi"
            onChange={(value) => handleChangeDistrict(value, "provinsi")}
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
        <Col xs={24} lg={5}>
          <Select
            value={kabupatenParams?.toUpperCase()}
            placeholder="Pilih Kabupaten"
            onChange={(value) => handleChangeDistrict(value, "kabupaten")}
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
        <Col xs={24} lg={5}>
          <Select
            value={kecamatanParams?.toUpperCase()}
            placeholder="Pilih Kecamatan"
            onChange={(value) => handleChangeDistrict(value, "kecamatan")}
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
        <Col xs={24} lg={5}>
          <Select
            value={kelurahanParams?.toUpperCase()}
            placeholder="Pilih Kelurahan"
            onChange={(value) => handleChangeDistrict(value, "kelurahan")}
            options={kelurahanDataList.map((item) => ({
              label: item.kelurahan,
              value: item.kelurahan,
            }))}
            showSearch
            allowClear
            loading={kelurahanQuery.isLoading || kelurahanQuery.isRefetching}
            style={{
              width: "100%",
            }}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]} style={{ marginTop: 18 }}>
        <Col xs={24} lg={3}>
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              lineHeight: "2.05rem",
              fontWeight: 500,
            }}
          >
            Status Data
          </Typography.Title>
        </Col>
        <Col span={24} lg={20}>
          <Radio.Group
            options={optionsWithDisabled}
            onChange={handleChangeStatus}
            defaultValue={statusParams}
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          />
        </Col>
      </Row>
    </>
  );
}

export default Filter;
