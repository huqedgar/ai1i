import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Loading from './pages/Loading/Loading';
import LoadingSpinner from './shared/LoadingSpinner/LoadingSpinner';

const MainLayout = lazy(() => wait(2000).then(() => import('./layouts/MainLayout/MainLayout.jsx')));
const ImageGenerator = lazy(() => import('./components/ImageGenerator/ImageGenerator.jsx'));
const ImageRemoval = lazy(() => import('./components/ImageRemoval/ImageRemoval.jsx'));
const ImageEnhancer = lazy(() => import('./components/ImageEnhancer/ImageEnhancer.jsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

export default function useRouteElements() {
   const routeElements = useRoutes([
      {
         path: '/',
         element: (
            <Suspense fallback={<Loading />}>
               <MainLayout />
            </Suspense>
         ),
         children: [
            {
               path: '',
               element: <Navigate to='/image-generator' />
            },
            {
               path: 'image-generator',
               element: (
                  <Suspense fallback={<LoadingSpinner />}>
                     <ImageGenerator />
                  </Suspense>
               )
            },
            {
               path: 'image-removal',
               element: (
                  <Suspense fallback={<LoadingSpinner />}>
                     <ImageRemoval />
                  </Suspense>
               )
            },
            {
               path: 'image-enhancer',
               element: (
                  <Suspense fallback={<LoadingSpinner />}>
                     <ImageEnhancer />
                  </Suspense>
               )
            }
         ]
      },
      {
         path: '*',
         element: <NotFound />
      }
   ]);

   return routeElements;
}

function wait(time) {
   return new Promise((resolve) => {
      setTimeout(resolve, time);
   });
}
