import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
   return (
      <div className={cx('footerContainer')}>
         <span></span>
         <span>Created by Hung Vo 🐼</span>
      </div>
   );
};

export default Footer;
