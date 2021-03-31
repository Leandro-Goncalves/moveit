import { AnimatePresence } from 'framer-motion'
import NextNProgress from 'nextjs-progressbar'
import '../styles/global.css'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <NextNProgress
        color="#5965E0"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps}  key={router.route}/>
    </AnimatePresence>
  )
}

export default MyApp
