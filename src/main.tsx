
import ReactDOM from 'react-dom/client'
import { router } from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { register } from 'swiper/element-bundle';
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './context/authContext';


register();
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'


ReactDOM.createRoot(document.getElementById('root')!).render(
     <>
          <AuthProvider>
               <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"

               />
               <RouterProvider router={router} />
          </AuthProvider>
     </>


)
