import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Container, Row, Col, Card, CardBody, Label } from 'reactstrap';
import * as yup from 'yup';

import Breadcrumb from 'Components/Common/Breadcrumb';
import withRouter from 'Components/Common/withRouter';
import useAppSelector from 'hooks/useAppSelector';
import useTitle from 'hooks/useTitle';
import AuthService from 'services/auth.service';
import { RootState } from 'slices';
import { ResponseError } from 'types';

type ChangePasswordType = {
  oldSystemKey: string;
  newSystemKey: string;
  retypeNewSystemKey: string;
};

const UserProfile = () => {
  useTitle('Tài khoản của tôi', {
    restoreOnUnmount: true,
  });

  const { user } = useAppSelector((state: RootState) => state.Login);

  const handleChangePassword = async (values: ChangePasswordType) => {
    try {
      await AuthService.changePassword(values.oldSystemKey, values.newSystemKey);
      toast.success('Đổi mật khẩu thành công');
    } catch (error: unknown) {
      if (error instanceof ResponseError) toast.error(error?.response?.data?.message);
      else console.log(error);
    }
  };

  const formik = useFormik<ChangePasswordType>({
    initialValues: {
      oldSystemKey: '',
      newSystemKey: '',
      retypeNewSystemKey: '',
    },
    validationSchema: yup.object().shape({
      oldSystemKey: yup.string().required('Mật khẩu cũ không được để trống'),
      newSystemKey: yup.string().required('Mật khẩu mới không được để trống'),
      retypeNewSystemKey: yup
        .string()
        .required('Nhập lại mật khẩu mới')
        .oneOf([yup.ref('newSystemKey'), null], 'Mật khẩu mới không trùng khớp'),
    }),
    onSubmit: (values) => {
      handleChangePassword(values);
      formik.resetForm();
    },
  });

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title='Ứng dụng' breadcrumbItem='Tài khoản của tôi' />

          <Row>
            <Col lg='12'>
              <Card>
                <CardBody>
                  <div className='d-flex justify-content-between'>
                    <div className='ms-3'>
                      <img
                        src={user?.picture}
                        alt=''
                        className='avatar-md rounded-circle img-thumbnail'
                      />
                    </div>
                    <div className='ms-4 flex-grow-1 align-self-center'>
                      <div className='text-muted'>
                        <h5>{user?.name}</h5>
                        <p className='mb-1'>{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className='card-title mb-4'>Thông tin cơ bản</h4>

          <Card>
            <CardBody>
              <div className='form-group mb-3'>
                <Label className='form-label'>Tên</Label>
                {/* <Input
                  className="form-control"
                  placeholder="VD: Trần Văn A"
                  type="text"
                  value={user?.name}
                  onChange={() => {}}
                /> */}
                <p className='form-control'>{user?.name}</p>
              </div>
              <div className='form-group mb-3'>
                <Label className='form-label'>Email</Label>
                {/* <Input
                  name='username'
                  className='form-control'
                  placeholder='VD: a@hcmut.edu.vn'
                  type='text'
                  value={user?.email}
                  onChange={() => {}}
                  disabled
                /> */}
                <p className='form-control'>{user?.email}</p>
              </div>
              <div className='form-group'>
                <Label className='form-label'>Quyền hạn</Label>
                {/* <Input
                  name="username"
                  className="form-control"
                  placeholder="VD: a@hcmut.edu.vn"
                  type="text"
                  value={
                    user?.isManager
                      ? "Quản lý"
                      : (user?.accessLevels as AccessLevel[])
                          ?.map((accessLevel) => accessLevel.name)
                          .join(", ")
                  }
                  onChange={() => {}}
                /> */}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
