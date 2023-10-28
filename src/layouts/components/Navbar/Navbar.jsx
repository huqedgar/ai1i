import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const Navbar = () => {
   const location = useLocation();

   return (
      <div className={cx('navbar')}>
         <div className={cx('navbarLeft')}>
            <h1>AI1I</h1>
         </div>
         <div className={cx('navbarRight')}>
            <Link to={'/image-generator'}>
               <FontAwesomeIcon
                  className={cx('icon', location.pathname === '/image-generator' ? 'selected' : null)}
                  icon={faImage}
               />
            </Link>
            <Link to={'/image-enhancer'}>
               <FontAwesomeIcon
                  className={cx('icon', location.pathname === '/image-enhancer' ? 'selected' : null)}
                  icon={faWandMagicSparkles}
               />
            </Link>
         </div>
      </div>
   );
};

export default Navbar;
