import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Loading from './pages/Loading/Loading';

const MainLayout = lazy(() => wait(1000).then(() => import('./layouts/MainLayout/MainLayout.jsx')));
const ImageGenerator = lazy(() => import('./components/ImageGenerator/ImageGenerator.jsx'));
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
               element: <ImageGenerator />
            },
            {
               path: 'image-enhancer',
               element: <ImageEnhancer />
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
