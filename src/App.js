import { useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRouteElements from './useRouteElements.js';
import classNames from 'classnames/bind';
import styles from './styles/global.scss';

const cx = classNames.bind(styles);

function App() {
   const routeElements = useRouteElements();
   const interBubbleRef = useRef(null);
   //  const curX = useRef(0);
   //  const curY = useRef(0);
   //  const tgX = useRef(0);
   //  const tgY = useRef(0);

   //  useEffect(() => {
   //     const interBubble = interBubbleRef.current;
   //     let animationFrameId = null;

   //     const handleMouseMove = () => {
   //        curX.current += (tgX.current - curX.current) / 20;
   //        curY.current += (tgY.current - curY.current) / 20;
   //        interBubble.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`;

   //        // Thay vì kiểm tra bằng Math.abs
   //        const threshold = 1;
   //        if (Math.abs(tgX.current - curX.current) < threshold && Math.abs(tgY.current - curY.current) < threshold) {
   //           cancelAnimationFrame(animationFrameId);
   //           animationFrameId = null;
   //        } else {
   //           animationFrameId = requestAnimationFrame(handleMouseMove);
   //        }
   //     };

   //     const handleMouseMoveWrapper = (e) => {
   //        tgX.current = e.clientX;
   //        tgY.current = e.clientY;

   //        if (!animationFrameId) {
   //           animationFrameId = requestAnimationFrame(handleMouseMove);
   //        }
   //     };
   //     document.addEventListener('mousemove', handleMouseMoveWrapper);

   //     return () => {
   //        cancelAnimationFrame(animationFrameId);
   //        document.removeEventListener('mousemove', handleMouseMoveWrapper);
   //     };
   //  }, []); // Chạy một lần khi component được mount

   return (
      <>
         {routeElements}
         <div className={cx('gradient-bg')}>
            <svg xmlns='http://www.w3.org/2000/svg'>
               <defs>
                  <filter id='goo'>
                     <feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur' />
                     <feColorMatrix
                        in='blur'
                        mode='matrix'
                        values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8'
                        result='goo'
                     />
                     <feBlend in='SourceGraphic' in2='goo' />
                  </filter>
               </defs>
            </svg>
            <div className={cx('gradients-container')}>
               <div className={cx('g1')}></div>
               <div className={cx('g2')}></div>
               <div className={cx('g3')}></div>
               <div className={cx('g4')}></div>
               <div className={cx('g5')}></div>
               <div id='interactive' className={cx('interactive')} ref={interBubbleRef}></div>;
            </div>
         </div>
         <ToastContainer />
      </>
   );
}

export default App;
