import '@/styles/globals.css'
import Layout from '@/layout'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
          token: {
            colorPrimary: '#FF7F00',
          },
          //float button mudar a cor do background
          components: {
            FloatButton: {
              colorPrimary: '#22c55e',
            },
          },
        }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  )
}
