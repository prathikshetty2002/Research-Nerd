import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { AppProps } from "next/app";
import Head from "next/head";
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion";
import dynamic from "next/dynamic";

// import { IKContext} from 'imagekitio-react'; //download npm imagekitio-react

// import * as gtag from "../utils/gtag"; gtag for google analytics
// import Script from "next/script";

// import { init } from "emailjs-com"; //download npm emailjs-com



function MyApp({ Component, pageProps }: AppProps) {
    // const PUBLIC_KEY = "public_DdnXL0ip5CRZeQdeSI4QrmwIetA="; //imagekit publickey elightlabs
    // const URL_ENDPOINT = "https://ik.imagekit.io/elightlabs/Annamaya"; //change annamaya to proj folder in imagekit

    // init(process.env.EMAILJS_USERID!); //initalise email.js
    
    // const Router = useRouter(); //Events for google analtyics gtag
    // useEffect(() => {
    //     const handleRouteChange = (url: any) => {
    //         gtag.pageview(url);
    //     };
    //     Router.events.on("routeChangeComplete", handleRouteChange);
    //     return () => {
    //         Router.events.off("routeChangeComplete", handleRouteChange);
    //     };
    // }, [Router.events]);
    

    return (
        <>
        {/* 2 Scripts for gtag  */}
        {/* <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id="gtag"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            /> */}
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=utf-8 "
                />
            </Head>
            {/* <IKContext
            publicKey={PUBLIC_KEY}
            urlEndpoint={URL_ENDPOINT}>             */}
            {/* setup of imagekitio-react */}
            <div className="bg-background font-sans" >
                <DefaultSeo {...SEO} />
                <LazyMotion features={domAnimation}>
                    <AnimatePresence exitBeforeEnter>
                        <Component {...pageProps} />
                    </AnimatePresence>
                </LazyMotion>
            </div>
            {/* </IKContext> */}
        </>
    );
}

export default MyApp;
