import GlobolStyle from "../styles/GlobolStyle";

export default function MyApp({ Component, pageProps }) {
  return(
    <>
      <GlobolStyle />
      <Component {...pageProps} />
    </>
  )
}