import { NextSeoProps } from "next-seo";

const config: NextSeoProps = {
    title: "Company",
    description: "Description",
    canonical: "https://www.canonical.ie/",
    openGraph: {
        url: "https://www.url.ie/a",
        site_name: "SiteName",
        title: "Open Graph Title",
        description: "Open Graph Description",
        images: [
            {
                url: "https://www.example.ie/og-image-01.jpg",
                width: 800,
                height: 600,
                alt: "Og Image Alt",
                type: "image/jpeg",
            },
            {
                url: "https://www.example.ie/og-image-02.jpg",
                width: 900,
                height: 800,
                alt: "Og Image Alt Second",
                type: "image/jpeg",
            },
            { url: "https://www.example.ie/og-image-03.jpg" },
            { url: "https://www.example.ie/og-image-04.jpg" },
        ],
    },
};

export default config;
