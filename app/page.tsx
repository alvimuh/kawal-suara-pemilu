"use client";

import Layout from "@/components/Layout";
import {
  Alert,
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Row,
  Skeleton,
  Statistic,
  Tooltip,
} from "antd";
import { Group } from "antd/es/avatar";
import Card from "antd/es/card/Card";
import Link from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

import {
  MdOutlineDataExploration,
  MdOutlineRunningWithErrors,
} from "react-icons/md";
import { PiChartPieDuotone } from "react-icons/pi";
import { BsDatabaseSlash } from "react-icons/bs";
import Iframe from "@/components/IframeWithLoader";
import ModalDisclaimer from "@/components/ModalDisclaimer";
import { useQuery } from "@tanstack/react-query";
import { getInsight } from "@/lib/fetch";

export default function Page() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["insight", "data-error"],
    queryFn: () => getInsight("data-error"),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: insight } = data ?? { data: null };

  return (
    <Layout>
      <header
        style={{
          background: "#4096ff",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Title
          level={2}
          style={{
            marginTop: "4rem",
            marginBottom: 12,
            color: "white",
            padding: "0 2rem",
            textAlign: "center",
            fontSize: "3.5rem",
          }}
        >
          Kawal Suara Pemilu 2024
        </Title>
        <Paragraph
          style={{
            fontSize: "1.3rem",
            color: "#f9f9f9",
            fontWeight: 300,
            padding: "0 2rem",
            textAlign: "center",
          }}
        >
          Analisa sederhana dari hasil perhitungan Real Count Pilpres 2024. Data
          TPS didapatkan langsung dari web KPU.
        </Paragraph>
        <div
          style={{
            marginTop: "3rem",
            marginBottom: "-3rem",
            padding: "0 2rem",
            width: "70%",
          }}
        >
          <img
            src="/screenshot.png"
            alt="Website Kawal Suara Pemilu"
            style={{
              borderRadius: 4,
              width: "100%",
            }}
          />
        </div>
      </header>
      <section style={{ padding: "32px 48px" }}>
        <Row>
          <Col>
            <Title
              level={2}
              style={{
                fontSize: "1.8rem",
                marginTop: "3rem",
              }}
            >
              Tentang Kawal Suara Pemilu 2024
            </Title>
            <Paragraph>
              Balakangan ini ramai di media sosial terkait kesalahan input data
              dari aplikasi Sirekap, di mana banyak yang mengunggah foto/video
              aplikasi Sirekap yang menunjukan scan formulir C, dan data yang
              terinput di aplikasi tersebut berbeda.
            </Paragraph>
            <Paragraph>
              Sebagai warga negara, kami merasa hal tersebut tidak boleh
              diabaikan, dan perlu data yang cukup untuk membuktikan apakah
              benar terdapat kekeliruan tersebut, atau hanya asumsi saja.
            </Paragraph>
            <Paragraph>
              Asumsi awal kami adalah adanya kekurangan dari aplikasi Sirekap,
              terutama pada fitur scan lembar formulir C, dan beberapa fungsi
              validasi data, sehingga berpotensi adanya kesalahan data mulai
              dari proses penginputan. Hal tersebut cukup dikuatkan dengan
              cuitan thread dari akun @lakamarta di platform X yang menjelaskan
              apa yang terjadi dengan aplikasi Sirekap,{" "}
              <Link
                href="https://twitter.com/lakamarta/status/1757908278762492207"
                target="blank"
              >
                baca lengkap disini
              </Link>
              .
            </Paragraph>
            <Paragraph>
              Oleh karena itu kami mencoba mengumpulkan data dari web resmi KPU,
              yakni{" "}
              <Link href="https://pemilu2024.kpu.go.id" target="_blank">
                pemilu2024.kpu.go.id
              </Link>{" "}
              dengan metode web scraping secara berkala. Kemudian kami mencoba
              menguji data tersebut valid atau berpotensi tidak valid dengan
              validasi data yang cukup sederhana:
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Title
              level={3}
              style={{
                fontSize: "1.3rem",
                marginTop: "2.5rem",
              }}
            >
              #1 Mengecek TPS dengan Jumlah Perolehan Suara yang Melebihi Jumlah
              Suara Sah
            </Title>
            <Paragraph>
              Kami mendefinisikan dua status data tiap TPS, yakni valid dan
              berpotensi tidak valid. Contoh: Jika dijumlahkan hasil perolehan
              suara Paslon 01 + 02 + 03 adalah 300 suara, kemudian pada atribut
              Jumlah Suara Sah adalah 200, maka terdapat selisih 100 data yang
              menyebabkan data dari TPS tersebut berpotensi tidak valid. Jika
              tidak ada selisih antara dua atribut data tersebut, maka kami
              anggap data TPS tersebut adalah valid. Dari validasi sederhana ini
              saja, kami menemukan cukup banyak data yang berpotensi keliru.
            </Paragraph>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              {isLoading || isError ? (
                <Skeleton paragraph={false} avatar loading active />
              ) : (
                <Tooltip
                  title="Jumlah TPS dengan jumlah suara seluruh paslon dan jumlah surat suara sah adalah sama"
                  placement="bottomLeft"
                >
                  <Statistic
                    title="Data Valid / Bersih"
                    value={insight?.total_data_not_error_1}
                    valueStyle={{ color: "#3f8600" }}
                    groupSeparator="."
                    prefix={
                      <PiChartPieDuotone
                        size={30}
                        style={{
                          verticalAlign: "-0.25em",
                        }}
                      />
                    }
                    suffix="TPS"
                    style={{
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              )}
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              {isLoading || isError ? (
                <Skeleton paragraph={false} avatar loading active />
              ) : (
                <Tooltip
                  title="Jumlah TPS dengan jumlah suara seluruh paslon berbeda dengan jumlah surat suara sah"
                  placement="bottomLeft"
                >
                  <Statistic
                    title="Data Berpotensi Tidak Valid"
                    value={insight?.total_data_error_1}
                    valueStyle={{ color: "#cf1322" }}
                    groupSeparator="."
                    prefix={
                      <MdOutlineRunningWithErrors
                        size={30}
                        style={{
                          verticalAlign: "-0.25em",
                        }}
                      />
                    }
                    suffix="TPS"
                    style={{
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              )}
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false}>
              {isLoading || isError ? (
                <Skeleton paragraph={false} avatar loading active />
              ) : (
                <Tooltip
                  title="Jumlah TPS dengan total suara seluruh paslon adalah 0"
                  placement="bottomLeft"
                >
                  <Statistic
                    title="Data Kosong / Diproses KPU"
                    value={insight?.total_data_null}
                    valueStyle={{ color: "#faad14" }}
                    groupSeparator="."
                    prefix={
                      <BsDatabaseSlash
                        size={30}
                        style={{
                          verticalAlign: "-0.25em",
                        }}
                      />
                    }
                    suffix="TPS"
                    style={{
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              )}
            </Card>
          </Col>
          {isError && (
            <Col xs={24} sm={16}>
              <Alert
                message="Kemungkinan proses sync data sedang berjalan, sehingga data terbaru belum bisa ditampilkan, harap coba lagi beberapa saat lagi."
                type="warning"
              />
            </Col>
          )}
          <Col xs={24} style={{ marginTop: "0.8rem" }}>
            <Link href="/data-error-1">
              <Button
                size="large"
                type="primary"
                icon={
                  <MdOutlineDataExploration
                    fontSize={20}
                    style={{
                      verticalAlign: "-0.18em",
                    }}
                  />
                }
              >
                Buka Detail Data
              </Button>
            </Link>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Title
              level={3}
              style={{
                fontSize: "1.3rem",
                marginTop: "2.5rem",
              }}
            >
              #2 Mengecek TPS dengan Jumlah Perolehan Suara yang Melebihi Jumlah
              Pengguna Hak Pilih
            </Title>
            <Paragraph>
              Pada pengujian kedua ini, kami juga mendefinisikan dua status data
              tiap TPS, yakni valid dan berpotensi tidak valid. Contoh: Jika
              dijumlahkan hasil perolehan suara Paslon 01 + 02 + 03 adalah 400
              suara, kemudian pada atribut Jumlah Hak Suara adalah 300, maka
              terdapat kelebihan 100 suara yang menyebabkan data dari TPS
              tersebut berpotensi tidak valid. Jika tidak ada selisih antara dua
              atribut data tersebut, maka kami anggap data TPS tersebut adalah
              valid.
            </Paragraph>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              {isLoading || isError ? (
                <Skeleton paragraph={false} avatar loading active />
              ) : (
                <Tooltip
                  title="Jumlah TPS dengan total suara seluruh paslon tidak melebihi jumlah pengguna hak pilih"
                  placement="bottomLeft"
                >
                  <Statistic
                    title="Data Valid / Bersih"
                    value={insight?.total_data_not_error_2}
                    valueStyle={{ color: "#3f8600" }}
                    groupSeparator="."
                    prefix={
                      <PiChartPieDuotone
                        size={30}
                        style={{
                          verticalAlign: "-0.25em",
                        }}
                      />
                    }
                    suffix="TPS"
                    style={{
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              )}
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              {isLoading || isError ? (
                <Skeleton paragraph={false} avatar loading active />
              ) : (
                <Tooltip
                  title="Jumlah TPS dengan total suara seluruh paslon melebihi jumlah pengguna hak pilih"
                  placement="bottomLeft"
                >
                  <Statistic
                    title="Data Berpotensi Tidak Valid"
                    value={insight?.total_data_error_2}
                    valueStyle={{ color: "#cf1322" }}
                    groupSeparator="."
                    prefix={
                      <MdOutlineRunningWithErrors
                        size={30}
                        style={{
                          verticalAlign: "-0.25em",
                        }}
                      />
                    }
                    suffix="TPS"
                    style={{
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              )}
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false}>
              {isLoading || isError ? (
                <Skeleton paragraph={false} avatar loading active />
              ) : (
                <Tooltip
                  title="Jumlah TPS dengan total suara seluruh paslon adalah 0"
                  placement="bottomLeft"
                >
                  <Statistic
                    title="Data Kosong / Diproses KPU"
                    value={insight?.total_data_null}
                    valueStyle={{ color: "#faad14" }}
                    groupSeparator="."
                    prefix={
                      <BsDatabaseSlash
                        size={30}
                        style={{
                          verticalAlign: "-0.25em",
                        }}
                      />
                    }
                    suffix="TPS"
                    style={{
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              )}
            </Card>
          </Col>
          {isError && (
            <Col xs={24} sm={16}>
              <Alert
                message="Kemungkinan proses sync data sedang berjalan, sehingga data terbaru belum bisa ditampilkan, harap coba lagi beberapa saat lagi."
                type="warning"
              />
            </Col>
          )}
          <Col xs={24} style={{ marginTop: "0.8rem" }}>
            <Link href="/data-error-2">
              <Button
                size="large"
                type="primary"
                icon={
                  <MdOutlineDataExploration
                    fontSize={20}
                    style={{
                      verticalAlign: "-0.18em",
                    }}
                  />
                }
              >
                Buka Detail Data
              </Button>
            </Link>
          </Col>
        </Row>

        <Divider />
        <Row gutter={[12, 12]} style={{ marginTop: "4rem" }}>
          <Col span={24}>
            <Title
              level={2}
              style={{
                fontSize: "1.8rem",
                marginBottom: 4,
              }}
            >
              Dashboard Kawal Pemilu 2024
            </Title>
          </Col>
          <Col span={24}>
            <Paragraph style={{ fontSize: "1rem", color: "GrayText" }}>
              <span style={{ marginRight: 12 }}>
                Anda juga dapat membuka dashboard yang lebih lengkap di
              </span>
              <Button href="https://kawalrealcount.isnan.me" target="_blank">
                kawalrealcount.isnan.me
              </Button>
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Iframe
              src="https://kawalrealcount.isnan.me/d-solo/b8adb7ab-b6fd-4cef-87e6-d75201223b8c/kawal-real-count?orgId=2&from=1708252648800&to=1708253548801&theme=light&panelId=28"
              style={{
                border: 0,
                width: "100%",
                height: "240px",
              }}
            ></Iframe>
          </Col>
          <Col xs={24} md={8}>
            <Iframe
              src="https://kawalrealcount.isnan.me/d-solo/b8adb7ab-b6fd-4cef-87e6-d75201223b8c/kawal-real-count?orgId=2&from=1708252660145&to=1708253560146&theme=light&panelId=29"
              style={{
                border: 0,
                width: "100%",
                height: "240px",
              }}
            ></Iframe>
          </Col>
          <Col xs={24} md={8}>
            <Iframe
              src="https://kawalrealcount.isnan.me/d-solo/b8adb7ab-b6fd-4cef-87e6-d75201223b8c/kawal-real-count?orgId=2&from=1708252682144&to=1708253582144&theme=light&panelId=30"
              style={{
                border: 0,
                width: "100%",
                height: "240px",
              }}
            ></Iframe>
          </Col>
          <Col xs={24} md={4}>
            <Iframe
              src="https://kawalrealcount.isnan.me/d-solo/b8adb7ab-b6fd-4cef-87e6-d75201223b8c/kawal-real-count?orgId=2&from=1708252525908&to=1708253425909&theme=light&panelId=5"
              style={{
                border: 0,
                width: "100%",
                height: "300px",
              }}
            ></Iframe>
          </Col>
          <Col xs={24} md={4}>
            <Iframe
              src="https://kawalrealcount.isnan.me/d-solo/b8adb7ab-b6fd-4cef-87e6-d75201223b8c/kawal-real-count?orgId=2&from=1708252394882&to=1708253294882&theme=light&panelId=6"
              style={{
                border: 0,
                width: "100%",
                height: "300px",
              }}
            ></Iframe>
          </Col>
          <Col xs={24} md={8}>
            <Iframe
              src="https://kawalrealcount.isnan.me/d-solo/b8adb7ab-b6fd-4cef-87e6-d75201223b8c/kawal-real-count?orgId=2&from=1708253020711&to=1708253920711&theme=light&panelId=8"
              style={{
                border: 0,
                width: "100%",
                height: "300px",
              }}
            ></Iframe>
          </Col>
          <Col xs={24} md={8}>
            <Iframe
              src="https://kawalrealcount.isnan.me/d-solo/b8adb7ab-b6fd-4cef-87e6-d75201223b8c/kawal-real-count?orgId=2&from=1708253043618&to=1708253943618&theme=light&panelId=10"
              style={{
                border: 0,
                width: "100%",
                height: "300px",
              }}
            ></Iframe>
          </Col>
          <Col span={24}>
            <ModalDisclaimer />
          </Col>
        </Row>
        <Divider />

        <Flex vertical style={{ marginTop: "4rem" }}>
          <Paragraph
            style={{ marginBottom: 20, color: "black", maxWidth: "400px" }}
          >
            "Kami berharap data yang kami sajikan dapat membantu bagi yang
            sedang mengawal suara pemilu khususnya pilpres kali ini, dan menjadi
            masukan bagi KPU dalam penyelanggaraan pemilu saat ini dan yang akan
            datang."
          </Paragraph>
          <Flex align="center">
            <Group size={40}>
              <Tooltip title="Alfian Isnan - Backend Engineer" placement="top">
                <Avatar src="https://media.licdn.com/dms/image/C4D03AQHnkg-cFBsk_g/profile-displayphoto-shrink_100_100/0/1644459244130?e=1713398400&v=beta&t=iBT_kkfSds8zsCbMTGGv0k39bT8AoTAN31e_xo-QH5U" />
              </Tooltip>
              <Tooltip title="Alvi Mohamad - Frontend Engineer" placement="top">
                <Avatar src="https://media.licdn.com/dms/image/C5603AQHRYkTKabcPwA/profile-displayphoto-shrink_100_100/0/1648181494002?e=1713398400&v=beta&t=al5W726Na0x2A1f5-BDWKIhUqw0Immr1Bn9GwCfT5mQ" />
              </Tooltip>
            </Group>
          </Flex>
        </Flex>
      </section>
    </Layout>
  );
}
