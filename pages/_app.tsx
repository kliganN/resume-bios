import '../styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

const ndsBios = localFont({
  src: '../public/fonts/NDS-Bios.ttf',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={ndsBios.className}>
      <Component {...pageProps} />
    </div>
  )
}
