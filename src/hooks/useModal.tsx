import React, { useEffect, useRef } from "react";
import { Modal } from "antd";
import { Root, createRoot } from "react-dom/client";
import useBoolean from "./useBoolean";
type ModalProps = {
  onConfirm: () => Promise<void> | void;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
  originProps: object;
};
const useModal = () => {
  const [visible, { on: open, off: close }] = useBoolean(false);
  const [loading, { on: showLoading, off: hideLoading }] = useBoolean(false);
  const onOk = useRef<() => Promise<void> | void>();
  const onClose = useRef<() => void>();
  const modalProps = useRef<ModalProps>();
  const Portal = useRef<Root | null>();
  const showModal = (props: ModalProps): void => {
    open();
    onOk.current = async () => {
      showLoading();
      if (props.onConfirm.constructor.name === "AsyncFunction") {
        await props.onConfirm();
      } else {
        props.onConfirm();
      }
      hideLoading();
      onClose.current && onClose.current();
    };
    onClose.current = () => {
      close();
      props.onClose && props.onClose();
    };
    modalProps.current = props;
  };

  useEffect(() => {
    const modalPortal: HTMLElement = document.createElement("div");
    document.body.appendChild(modalPortal);
    modalPortal.id = "modal-portal";
    if (!Portal.current) {
      Portal.current = createRoot(modalPortal);
    }
    return () => {
      Portal.current = null;
      document.body.removeChild(modalPortal);
    };
  }, []);

  useEffect(() => {
    const modalPortal = document.getElementById("modal-portal");
    if (!Portal.current || !modalPortal) return;
    Portal.current.render(
      <Modal
        {...modalProps?.current?.originProps}
        open={visible}
        onOk={() => {
          onOk.current && onOk.current();
        }}
        onCancel={() => {
          onClose.current && onClose.current();
        }}
        okButtonProps={{
          loading,
        }}
        title={modalProps?.current?.title}
      >
        {modalProps?.current?.children}
      </Modal>
    );
  }, [visible, loading]);
  return showModal;
};
export default useModal;
