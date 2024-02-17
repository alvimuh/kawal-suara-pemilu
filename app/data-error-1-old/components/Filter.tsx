"use client";

import { District } from "@/lib/types";
import { Col, Radio, RadioChangeEvent, Row, Select, Typography } from "antd";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getKabupaten,
  getKecamatan,
  getKelurahan,
  getProvinsi,
} from "../lib/fetch";
import { useState } from "react";

type SelectName = "provinsi" | "kabupaten" | "kecamatan" | "kelurahan";

const optionsWithDisabled = [
  { label: "Semua", value: "all" },
  { label: "Valid", value: "valid" },
  { label: "Tidak Valid", value: "invalid" },
];

function Filter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    provinsi: searchParams.get("provinsi"),
    kabupaten: searchParams.get("kabupaten"),
    kecamatan: searchParams.get("kecamatan"),
    kelurahan: searchParams.get("kelurahan"),
    status: searchParams.get("status") ?? "all",
  });

  const provinsiQuery = useQuery({
    queryKey: ["provinsi"],
    queryFn: getProvinsi,
    refetchOnWindowFocus: false,
  });

  const kabupatenQuery = useQuery({
    queryKey: ["kabupaten", formData.provinsi],
    queryFn: () => getKabupaten(formData.provinsi),
    refetchOnWindowFocus: false,
  });

  const kecamatanQuery = useQuery({
    queryKey: ["kecamatan", formData.provinsi, formData.kabupaten],
    queryFn: () => getKecamatan(formData.provinsi, formData.kabupaten),
    refetchOnWindowFocus: false,
  });

  const kelurahanQuery = useQuery({
    queryKey: [
      "kelurahan",
      formData.provinsi,
      formData.kabupaten,
      formData.kecamatan,
    ],
    queryFn: () =>
      getKelurahan(formData.provinsi, formData.kabupaten, formData.kecamatan),
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
      setFormData((prevState) => ({
        ...prevState,
        provinsi: value,
        kabupaten: null,
        kecamatan: null,
        kelurahan: null,
      }));

      params.delete("provinsi");
      params.delete("kabupaten");
      params.delete("kecamatan");
      params.delete("kelurahan");
    }

    if (name === "kabupaten" && value === undefined) {
      setFormData((prevState) => ({
        ...prevState,
        kabupaten: value,
        kecamatan: null,
        kelurahan: null,
      }));

      params.delete("kabupaten");
      params.delete("kecamatan");
      params.delete("kelurahan");
    }

    if (name === "kecamatan" && value === undefined) {
      setFormData((prevState) => ({
        ...prevState,
        kecamatan: value,
        kelurahan: null,
      }));

      params.delete("kecamatan");
      params.delete("kelurahan");
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeStatus = (event: RadioChangeEvent) => {
    setFormData((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));

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
            value={formData.provinsi?.toUpperCase()}
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
            value={formData.kabupaten?.toUpperCase()}
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
            value={formData.kecamatan?.toUpperCase()}
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
            value={formData.kelurahan?.toUpperCase()}
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
            value={formData.status}
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
