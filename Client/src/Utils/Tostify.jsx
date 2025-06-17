import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right',
        autoClose: 1000
    });
};

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right',
    });
};
