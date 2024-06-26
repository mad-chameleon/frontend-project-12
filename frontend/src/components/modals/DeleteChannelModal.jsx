import {
  Alert,
  Button,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import { useModal } from '../../hooks';
import routes from '../../routes';

const DeleteChannelModal = () => {
  const { t } = useTranslation();
  const { channelId, hideModal } = useModal();

  const { userInfo: { token } } = useSelector((state) => state.user);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorState, setErrorState] = useState({});

  const onHandleDeleteChannel = async () => {
    try {
      setIsSubmitting(true);
      setErrorState({});
      const { status } = await axios.delete(routes.editChannelApiPath(channelId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
        setIsSubmitting(false);
        hideModal();
        toast.success(t('toasts.channelDeleted'));
      }
    } catch (error) {
      setIsSubmitting(false);
      if (isAxiosError(error)) {
        toast.error(t('errors.formErrors.networkError'));
        return;
      }
      toast.error(t('errors.formErrors.unknownError'));
    }
  };

  return (
    <Modal centered show onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorState.isError && <Alert variant="danger">{errorState.errorMessage}</Alert>}
        <p>{t('questions.confirmChannelDeletion')}</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary"
            className="me-2"
            onClick={() => hideModal()}
            disabled={isSubmitting}
          >
            {t('form.cancelBtn')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={onHandleDeleteChannel}
            disabled={isSubmitting || errorState.isError}
          >
            {t('form.deleteBtn')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
