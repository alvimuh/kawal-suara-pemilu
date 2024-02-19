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
import Iframe from "@/components/IframeWithLoader";
import ModalDisclaimer from "@/components/ModalDisclaimer";
import { useQuery } from "@tanstack/react-query";
import { getInsight } from "@/lib/fetch";

export default function Page() {
  return (
    <Layout>
      <section style={{ padding: "32px 48px" }}>
        <Row gutter={[12, 12]} style={{ marginTop: "4rem" }}>
          <Col xs={24} md={18} style={{ marginBottom: "1rem" }}>
            <Title
              level={2}
              style={{
                fontSize: "1.8rem",
                marginBottom: "1rem",
              }}
            >
              Status Server
            </Title>
          </Col>
          <Col xs={24} md={8}>
            <Iframe
              src="http://kawalrealcount.isnan.me/d-solo/b8adb7ab-b6fd-4cef-87e6-d75201223b8c/kawal-real-count?orgId=2&from=1708319342804&to=1708320242804&theme=light&panelId=15"
              style={{
                border: 0,
                width: "100%",
                height: "240px",
              }}
            ></Iframe>
          </Col>
          <Col xs={24} md={8}></Col>
          <Col xs={24} md={8}></Col>
          <Col xs={24} md={4}></Col>
          <Col xs={24} md={4}></Col>
          <Col xs={24} md={8}></Col>
          <Col xs={24} md={8}></Col>
        </Row>
        <Row>
          <Paragraph
            style={{ fontSize: "1rem", marginTop: "2rem", color: "GrayText" }}
          >
            <span style={{ marginRight: 12 }}>
              Anda juga dapat membuka dashboard yang lebih lengkap di
            </span>
            <Button href="https://kawalrealcount.isnan.me" target="_blank">
              kawalrealcount.isnan.me
            </Button>
          </Paragraph>
        </Row>
        <Divider />
      </section>
    </Layout>
  );
}
