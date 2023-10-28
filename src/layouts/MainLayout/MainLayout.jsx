import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../shared/ScrollToTop/ScrollToTop';

const cx = classNames.bind(styles);

const MainLayout = () => {
   return (
      <>
         <div className={cx('text-container')}>
            <Navbar />
            <Outlet />
            <Footer />
         </div>
         <ScrollToTop />
      </>
   );
};

export default MainLayout;
