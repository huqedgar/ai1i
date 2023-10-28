import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import panda from '../../assets/images/panda.png';

const cx = classNames.bind(styles);

const Loading = () => {
   return (
      <div className={cx('mainContainer')}>
         <div className={cx('circleContainer')}>
            <div className={cx('circle')}>
               <div className={cx('inner')}></div>
            </div>
         </div>
         <img src={panda} alt='logo' />
      </div>
   );
};

export default Loading;
