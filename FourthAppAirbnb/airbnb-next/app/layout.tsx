import { ClientOnly } from './components/ClientOnly';
import Navbar from './components/navbar/Navbar';
import Modal from './components/modal/Modal';
import './globals.css'

import {Poppins, Nunito} from 'next/font/google'
import RegisterModal from './components/modal/RegisterModal';
import ToastProvider from './providers/ToastProvider';
import { Toaster } from 'react-hot-toast';
import LoginModal from './components/modal/LoginModal';
import getCurrentUser from './actions/getCurrentUset';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  console.log(currentUser)
  return (
    <html lang="en" className={`${poppins.className} `}>
      
      <head />
      <body>
        <ClientOnly>
          <LoginModal/>
          <RegisterModal/>
          <ToastProvider/>
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}