import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ScrollToTop.module.scss';

const cx = classNames.bind(styles);

const ScrollToTop = () => {
   const [backToTop, setBackToTop] = useState(false);

   useEffect(() => {
      window.addEventListener('scroll', () => {
         if (window.scrollY > 100) {
            setBackToTop(true);
         } else {
            setBackToTop(false);
         }
      });
   }, []);

   useEffect(() => {
      let timeoutId;

      const handleScroll = () => {
         setBackToTop(true);

         clearTimeout(timeoutId);

         timeoutId = setTimeout(() => {
            setBackToTop(false);
         }, 2000);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
         clearTimeout(timeoutId);
      };
   }, []);

   const handleScrollUp = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   };

   return (
      <button className={cx('wrapperScroll', backToTop ? 'show' : 'hide')} onClick={handleScrollUp}>
         <FontAwesomeIcon icon={faArrowUp} />
      </button>
   );
};

export default ScrollToTop;
