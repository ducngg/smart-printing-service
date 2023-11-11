import React, { ChangeEventHandler } from 'react';
import { Input, Modal, ModalBody } from 'reactstrap';

interface ManagerKeyModalProps {
  show: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void | void;
  onCloseClick: () => void;
  disabled?: boolean;
}

const ManagerKeyModal = ({
  show,
  value,
  onChange,
  onSubmit,
  onCloseClick,
  disabled,
}: ManagerKeyModalProps) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <div className='modal-content'>
        <ModalBody className='px-4 py-5 text-center'>
          <button
            type='button'
            onClick={onCloseClick}
            className='btn-close position-absolute end-0 top-0 m-3'
          />
          <div className='avatar-sm mb-4 mx-auto'>
            <div className='avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3'>
              <i className='bx bx-lock-alt'></i>
            </div>
          </div>
          <p className='text-muted font-size-16 mb-4'>Nhập mật khẩu</p>

          <div className='mb-3'>
            <Input
              name='managerKey'
              type='password'
              placeholder='Mật khẩu'
              autoComplete='off'
              value={value}
              onChange={onChange}
            />
          </div>

          <p className='mb-4'>
            Lưu ý: Thao tác này nhằm mã hoá thông tin quan trọng, nhập sai mật khẩu sẽ dẫn đến thông
            tin bị sai lệch.
          </p>

          <div className='hstack gap-2 justify-content-center mb-0'>
            <button
              type='button'
              disabled={disabled}
              className='btn btn-primary'
              onClick={onSubmit}
            >
              Xác nhận
            </button>
            <button type='button' className='btn btn-secondary' onSubmit={onCloseClick}>
              Đóng
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default ManagerKeyModal;
