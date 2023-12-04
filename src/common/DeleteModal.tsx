import { Modal, ModalBody } from 'reactstrap';

interface Props {
  text: string;
  show: boolean;
  onDeleteClick: () => void;
  onCloseClick: () => void;
}

const DeleteModal = ({ text, show, onDeleteClick, onCloseClick }: Props) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <div className='modal-content'>
        <ModalBody className='px-4 py-5 text-center'>
          <button
            type='button'
            onClick={onDeleteClick}
            className='btn-close position-absolute end-0 top-0 m-3'
          ></button>
          <div className='avatar-sm mb-4 mx-auto'>
            <div className='avatar-title bg-danger text-danger bg-opacity-10 font-size-20 rounded-3'>
              <i className='mdi mdi-trash-can-outline'></i>
            </div>
          </div>
          <p className='text-muted font-size-16 mb-4'>{text}</p>

          <div className='hstack gap-2 justify-content-center mb-0'>
            <button type='button' className='btn btn-danger' onClick={onDeleteClick}>
              Delete Now
            </button>
            <button type='button' className='btn btn-secondary' onClick={onCloseClick}>
              Close
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default DeleteModal;
