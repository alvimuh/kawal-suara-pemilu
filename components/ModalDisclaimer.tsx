"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import { IoMdInformationCircleOutline } from "react-icons/io";

const ModalDisclaimer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        color="warning"
        onClick={showModal}
        icon={
          <IoMdInformationCircleOutline
            size={18}
            style={{
              verticalAlign: "-0.28em",
            }}
          />
        }
      >
        Penting untuk dibaca
      </Button>
      <Modal
        title="Disclaimer"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" key="back" onClick={handleOk}>
            Oke, paham
          </Button>,
        ]}
      >
        <ul style={{ marginLeft: 18 }}>
          <li>
            Situs ini merupakan situs personal yang bersifat netral dan tidak
            berafiliasi dengan pihak manapun.
          </li>
          <li>
            Perlu diingat bahwa data yang disajikan bersifat sementara dan tidak
            disarankan untuk digunakan dalam keperluan akademis atau sebagai
            bukti hukum.
          </li>
          <li>
            Mungkin terdapat perbedaan data antara situs ini dengan situs KPU
            resmi akibat data yang disinkronisasi secara berkala dan bukan
            real-time.
          </li>
          <li>
            Disarankan untuk selalu memeriksa ulang ke situs KPU dari link yang
            tersedia untuk mendapatkan data yang paling akurat dan terbaru.
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default ModalDisclaimer;
