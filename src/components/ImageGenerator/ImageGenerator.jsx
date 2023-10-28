import classNames from 'classnames/bind';
import styles from './ImageGenerator.module.scss';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useToastAlert from '../../hooks/useToastAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cx = classNames.bind(styles);

const ImageGenerator = () => {
   const [prompt, setPrompt] = useState('');
   const [output, setOutput] = useState({
      outputV15: null,
      outputXL: null
   });
   const [isLoading, setIsLoading] = useState(false);
   const toastTimeout = useRef(null);
   const toastId = useRef(null);
   const toastUpdate = useToastAlert;

   const handleGenerateSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      toastId.current = toast.loading('Weather is thinking...', { position: 'bottom-right' });
      try {
         const options = {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_TOKEN}`,
               'Content-type': 'application/json'
            },
            body: JSON.stringify({ inputs: prompt })
         };

         const [responseV15, responseXL] = await Promise.all([
            fetch('https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', options),
            fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', options)
         ]);
         //  console.log(responseV15);
         //  console.log(responseXL);

         if (!responseV15.ok && !responseXL.ok) {
            toastUpdate(toastId.current, 'Failed to generate image', 'error');
         } else {
            toastUpdate(toastId.current, '🐼 Successfully', 'default');
            const blobV15 = await responseV15.blob();
            const blobXL = await responseXL.blob();

            setOutput({
               outputV15: URL.createObjectURL(blobV15),
               outputXL: URL.createObjectURL(blobXL)
            });
         }
      } catch (ex) {
         toast.error('An error has occurred');
         console.error(ex);
      } finally {
         toastTimeout.current = setTimeout(() => {
            setIsLoading(false);
         }, 500);
      }
   };

   const handleDownload = (key) => {
      if (!output[key]) return;
      const a = document.createElement('a');
      a.href = output[key];
      a.download = 'imageV15.png';
      a.click();
   };

   // Cleanup useEffect to clear the toastTimeout when the component unmounts or when it's updated.
   useEffect(() => {
      return () => {
         // Clear the toast timeout when the component unmounts or when it's updated.
         if (toastTimeout.current) {
            clearTimeout(toastTimeout.current);
         }
      };
   }, []);

   return (
      <section className={cx('section')}>
         <form onSubmit={handleGenerateSubmit} className={cx('generate')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
               id='prompt'
               name='prompt'
               placeholder='Your imagination'
               autoComplete='off'
               spellCheck={false}
               required
               value={prompt}
               onChange={(e) => {
                  setPrompt(e.target.value);
               }}
            />
            <button type='submit' disabled={isLoading ? true : false}>
               Generate
            </button>
         </form>
         <div className={cx('imageContainer')}>
            {output.outputV15 && !isLoading ? (
               <>
                  <div className={cx('image')}>
                     <img src={output.outputV15} alt='img' />
                     <button onClick={() => handleDownload('outputV15')}>
                        <FontAwesomeIcon icon={faArrowDown} />
                     </button>
                  </div>
               </>
            ) : isLoading ? (
               <Skeleton
                  width={256}
                  height={256}
                  borderRadius={2}
                  baseColor='rgba(230, 230, 230, 1)'
                  highlightColor='rgba(210, 210, 210, 0.75)'
               />
            ) : null}

            {output.outputXL && !isLoading ? (
               <>
                  <div className={cx('image')}>
                     <img src={output.outputXL} alt='img' />
                     <button onClick={() => handleDownload('outputXL')}>
                        <FontAwesomeIcon icon={faArrowDown} />
                     </button>
                  </div>
               </>
            ) : isLoading ? (
               <Skeleton
                  width={256}
                  height={256}
                  borderRadius={2}
                  baseColor='rgba(230, 230, 230, 1)'
                  highlightColor='rgba(210, 210, 210, 0.75)'
               />
            ) : null}
         </div>
      </section>
   );
};

export default ImageGenerator;
