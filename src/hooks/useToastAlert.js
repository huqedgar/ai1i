import { toast } from 'react-toastify';

export default function useToastAlert(id, title, type) {
   toast.update(id, {
      render: title,
      type: type,
      isLoading: false,
      autoClose: 5000,
      delay: 500
   });
}
