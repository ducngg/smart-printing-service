import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

interface DeleteModalProps {
  show: boolean;
  title: string;
  content?: string;
  onDeleteClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onCloseClick: React.MouseEventHandler | undefined;
  disabled?: boolean;
}

const DeleteModal = ({
  show,
  title,
  content,
  onDeleteClick,
  onCloseClick,
  disabled,
}: DeleteModalProps) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <div className='modal-content'>
        <ModalBody className='px-4 py-5 text-center'>
          <button
            type='button'
            onClick={onCloseClick}
            className='btn-close position-absolute end-0 top-0 m-3'
          ></button>
          <div className='avatar-sm mb-4 mx-auto'>
            <div className='avatar-title bg-danger text-danger bg-opacity-10 font-size-20 rounded-3'>
              <i className='mdi mdi-trash-can-outline'></i>
            </div>
          </div>
          <p className='text-muted font-size-16 mb-4'>{title}</p>
          {content && <p className='text-muted mb-4'>{content}</p>}

          <div className='hstack gap-2 justify-content-center mb-0'>
            <button
              type='button'
              disabled={disabled}
              className='btn btn-danger'
              onClick={onDeleteClick}
            >
              Xoá ngay
            </button>
            <button type='button' className='btn btn-secondary' onClick={onCloseClick}>
              Đóng
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default DeleteModal;
