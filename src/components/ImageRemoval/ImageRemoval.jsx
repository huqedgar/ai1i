import classNames from 'classnames/bind';
import styles from './ImageRemoval.module.scss';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useToastAlert from '../../hooks/useToastAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCloudArrowUp, faTrash, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cx = classNames.bind(styles);

const ImageRemoval = () => {
   const avatar = useRef(null);
   const [image, setImage] = useState(null);
   const [imageOutput, setImageOutput] = useState(null);
   const [fileName, setFileName] = useState('No selected file');
   const [isLoading, setIsLoading] = useState(false);
   const toastTimeout = useRef(null);
   const toastId = useRef(null);
   const toastUpdate = useToastAlert;

   const handleChooseAvt = useCallback(({ target: { files } }) => {
      if (files) {
         files[0] && setFileName(files[0].name);
         setImage(URL.createObjectURL(files[0]));
      }
   }, []);

   const handleDeleteAvt = useCallback(() => {
      setFileName('No selected file');
      setImage(null);
      // Clear the file input to allow re-selection of the same file
      avatar.current.value = null;
   }, [avatar]);

   const handleEnhanceSubmit = async (e) => {
      e.preventDefault();
      if (!image) {
         toast('🐼 You must select photo', {
            position: 'bottom-right'
         });
         return;
      }
      setIsLoading(true);
      toastId.current = toast.loading('Weather is working hard...', { position: 'bottom-right' });

      const url = 'https://background-removal13.p.rapidapi.com/api/v1/uploadFile';
      const data = new FormData();
      data.append('file', avatar.current.files[0]);

      const options = {
         method: 'POST',
         headers: {
            'X-RapidAPI-Key': 'c84de3135emshaee62832924cb90p1be106jsn13cee420d9b8',
            'X-RapidAPI-Host': 'background-removal13.p.rapidapi.com'
         },
         body: data
      };

      try {
         const response = await fetch(url, options);
         const result = await response.text();

         if (response.ok) {
            setImageOutput(JSON.parse(result).base64);
            toastUpdate(toastId.current, '🐼 Successfully', 'default');
         } else {
            toastUpdate(toastId.current, 'Failed to enhance image', 'error');
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

   const handleDownload = () => {
      if (!imageOutput) return;
      const a = document.createElement('a');
      a.href = imageOutput;
      a.download = 'image.png';
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
      <section className={cx('ImageRemovalContainer')}>
         <form onSubmit={handleEnhanceSubmit} className={cx('formUploadContainer')}>
            {imageOutput === null ? (
               <div className={cx('formUpload')} onClick={() => document.querySelector('.input-field').click()}>
                  <input
                     type='file'
                     accept='image/*'
                     className={cx('input-field')}
                     ref={avatar}
                     onChange={handleChooseAvt}
                     hidden
                  />
                  {image ? (
                     <img src={image} alt={fileName} />
                  ) : (
                     <>
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                        <p>Browse files to background removal</p>
                     </>
                  )}
               </div>
            ) : isLoading ? (
               <Skeleton
                  borderRadius={2}
                  baseColor='rgba(230, 230, 230, 1)'
                  highlightColor='rgba(210, 210, 210, 0.75)'
                  style={{ width: '100%', height: '100%' }}
               />
            ) : (
               <ReactCompareSlider
                  boundsPadding={0}
                  itemOne={
                     <ReactCompareSliderImage
                        src={image ? image : null}
                        style={{ objectFit: 'contain', border: '2px dashed white', borderRadius: 5 }}
                        alt='Image One'
                     />
                  }
                  itemTwo={
                     <ReactCompareSliderImage
                        src={imageOutput ? `data:image/png;base64, ${imageOutput}` : null}
                        style={{
                           transform: 'scale(1)',
                           objectFit: 'contain',
                           border: '2px dashed white',
                           borderRadius: 5
                        }}
                        alt='Image Two'
                     />
                  }
                  position={50}
                  style={{ width: '100%', height: '450px' }}
               />
            )}
            <div className={cx('uploadedRow')}>
               {imageOutput === null ? (
                  <>
                     <button type='submit' disabled={isLoading ? true : false}>
                        <FontAwesomeIcon icon={faWandMagicSparkles} />
                        <span>Removal</span>
                     </button>
                     <div className={cx('uploadContent')}>
                        <span>{fileName}</span>
                        <span>-</span>
                        <FontAwesomeIcon
                           icon={faTrash}
                           onClick={(e) => {
                              e.preventDefault();
                              handleDeleteAvt();
                           }}
                        />
                     </div>
                  </>
               ) : isLoading ? (
                  <LoadingSpinner />
               ) : (
                  <>
                     <button
                        onClick={(e) => {
                           e.preventDefault();
                           setFileName('No selected file');
                           setImage(null);
                           setImageOutput(null);
                        }}
                        style={{ flex: '1', background: 'transparent' }}
                     >
                        <FontAwesomeIcon icon={faAngleLeft} />
                        <span>Back</span>
                     </button>
                     <button
                        onClick={(e) => {
                           e.preventDefault();
                           handleDownload();
                        }}
                        style={{ flex: '4' }}
                     >
                        <span>Download</span>
                     </button>
                  </>
               )}
            </div>
         </form>
      </section>
   );
};

export default ImageRemoval;
