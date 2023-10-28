import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';
import pandaFill from '../../assets/images/panda-fill.png';

const cx = classNames.bind(styles);

const NotFound = () => {
   const navigate = useNavigate();
   const goBack = () => navigate(-1);

   return (
      <section className={cx('page404')}>
         <h1>404!</h1>
         <img src={pandaFill} alt='pandaFill' />
         <div className={cx('pageInfo')}>
            <h2>Không tìm thấy trang</h2>
            <span>Rất tiếc, không thể tìm thấy trang bạn yêu cầu</span>
         </div>
         <button onClick={goBack}>Quay lại</button>
      </section>
   );
};

export default NotFound;
