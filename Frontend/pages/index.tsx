import { AnimatePresence, LazyMotion, m } from "framer-motion";
// import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "../firebase";
// import { SwiperSlide, Swiper } from "swiper/react"; //install npm swiper
// import 'swiper/css'; //swiper styles, add more based upon features used

// import { IKImage } from "imagekitio-react";
// import data2 from "../public/csvjson.json";

import data3 from "../public/titles.json";

import algoliasearch from "algoliasearch/lite";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";

// ...

const Footer = dynamic(() => import("../components/Footer"));
const Header = dynamic(() => import("../components/Header"));
const PaperCard = dynamic(() => import("../components/PaperCard"));
const PaperModal = dynamic(() => import("../components/PaperModal"));

const data = [
    {
        id: 704.0002,
        authors: "Ileana Streinu and Louis Theran",
        title: "Sparsitycertifying Graph Decompositions",
        categories: "math.CO cs.CG",
        abstract:
            " We describe a new algorithm the kellpebble game with colors and use\r\nit obtain a characterization of the family of kellsparse graphs and\r\nalgorithmic solutions to a family of problems concerning tree decompositions of\r\ngraphs Special instances of sparse graphs appear in rigidity theory and have\r\nreceived increased attention in recent years In particular our colored\r\npebbles generalize and strengthen the previous results of Lee and Streinu and\r\ngive a new proof of the TutteNashWilliams characterization of arboricity We\r\nalso present a new decomposition that certifies sparsity based on the\r\nkellpebble game with colors Our work also exposes connections between\r\npebble game algorithms and previous sparse graph algorithms by Gabow Gabow and\r\nWestermann and Hendrickson\r\n",
        date: "2008-12-13",
    },
    {
        id: 704.0003,
        authors: "Hongjun Pan",
        title:
            "The evolution of the EarthMoon system based on the dark matter field fluid model",
        categories: "physics.gen-ph",
        abstract:
            " The evolution of EarthMoon system is described by the dark matter field\r\nfluid model proposed in the Meeting of Division of Particle and Field 2004\r\nAmerican Physical Society The current behavior of the EarthMoon system agrees\r\nwith this model very well and the general pattern of the evolution of the\r\nMoonEarth system described by this model agrees with geological and fossil\r\nevidence The closest distance of the Moon to Earth was about 259000 km at 45\r\nbillion years ago which is far beyond the Roches limit The result suggests\r\nthat the tidal friction may not be the primary cause for the evolution of the\r\nEarthMoon system The average dark matter field fluid constant derived from\r\nEarthMoon system data is 439 x 1022 s1m1 This model predicts\r\nthat the Marss rotation is also slowing with the angular acceleration rate\r\nabout 438 x 1022 rad s2\r\n",
        date: "2008-01-13",
    },
    {
        id: 704.0004,
        authors: "David Callan",
        title:
            "A determinant of Stirling cycle numbers counts unlabeled acyclic singlesource automata",
        categories: "math.CO",
        abstract:
            " We show that a determinant of Stirling cycle numbers counts unlabeled acyclic\r\nsinglesource automata The proof involves a bijection from these automata to\r\ncertain marked lattice paths and a signreversing involution to evaluate the\r\ndeterminant\r\n",
        date: "2007-05-23",
    },
    {
        id: 704.0005,
        authors: "Wael Abu-Shammala and Alberto Torchinsky",
        title: "From dyadic Lambdaalpha to Lambdaalpha",
        categories: "math.CA math.FA",
        abstract:
            " In this paper we show how to compute the Lambdaalpha norm alphage\r\n0 using the dyadic grid This result is a consequence of the description of\r\nthe Hardy spaces HpRN in terms of dyadic and special atoms\r\n",
        date: "2013-10-15",
    },
    {
        id: 704.0006,
        authors: "Y. H. Pong and C. K. Law",
        title: "Bosonic characters of atomic Cooper pairs across resonance",
        categories: "cond-mat.mes-hall",
        abstract:
            " We study the twoparticle wave function of paired atoms in a Fermi gas with\r\ntunable interaction strengths controlled by Feshbach resonance The Cooper pair\r\nwave function is examined for its bosonic characters which is quantified by\r\nthe correction of Bose enhancement factor associated with the creation and\r\nannihilation composite particle operators An example is given for a\r\nthreedimensional uniform gas Two definitions of Cooper pair wave function are\r\nexamined One of which is chosen to reflect the offdiagonal long range order\r\nODLRO Another one corresponds to a pair projection of a BCS state On the\r\nside with negative scattering length we found that paired atoms described by\r\nODLRO are more bosonic than the pair projected definition It is also found\r\nthat at kF a1 ge 1 both definitions give similar results where more\r\nthan 90 of the atoms occupy the corresponding molecular condensates\r\n",
        date: "2015-05-13",
    },
    {
        id: 704.0007,
        authors: "Alejandro Corichi, Tatjana Vukasinac and Jose A. Zapata",
        title: "Polymer Quantum Mechanics and its Continuum Limit",
        categories: "gr-qc",
        abstract:
            " A rather nonstandard quantum representation of the canonical commutation\r\nrelations of quantum mechanics systems known as the polymer representation has\r\ngained some attention in recent years due to its possible relation with Planck\r\nscale physics In particular this approach has been followed in a symmetric\r\nsector of loop quantum gravity known as loop quantum cosmology Here we explore\r\ndifferent aspects of the relation between the ordinary Schroedinger theory and\r\nthe polymer description The paper has two parts In the first one we derive\r\nthe polymer quantum mechanics starting from the ordinary Schroedinger theory\r\nand show that the polymer description arises as an appropriate limit In the\r\nsecond part we consider the continuum limit of this theory namely the reverse\r\nprocess in which one starts from the discrete theory and tries to recover back\r\nthe ordinary Schroedinger quantum mechanics We consider several examples of\r\ninterest including the harmonic oscillator the free particle and a simple\r\ncosmological model\r\n",
        date: "2008-11-26",
    },
    {
        id: 704.0008,
        authors: "Damian C. Swift",
        title:
            "Numerical solution of shock and ramp compression for general material properties",
        categories: "cond-mat.mtrl-sci",
        abstract:
            " A general formulation was developed to represent material models for\r\napplications in dynamic loading Numerical methods were devised to calculate\r\nresponse to shock and ramp compression and ramp decompression generalizing\r\nprevious solutions for scalar equations of state The numerical methods were\r\nfound to be flexible and robust and matched analytic results to a high\r\naccuracy The basic ramp and shock solution methods were coupled to solve for\r\ncomposite deformation paths such as shockinduced impacts and shock\r\ninteractions with a planar interface between different materials These\r\ncalculations capture much of the physics of typical material dynamics\r\nexperiments without requiring spatiallyresolving simulations Example\r\ncalculations were made of loading histories in metals illustrating the effects\r\nof plastic work on the temperatures induced in quasiisentropic and\r\nshockrelease experiments and the effect of a phase transition\r\n",
        date: "2009-02-05",
    },
    {
        id: 704.0009,
        authors:
            "Paul Harvey, Bruno Merin, Tracy L. Huard, Luisa M. Rebull, Nicholas\r\n Chapman, Neal J. Evans II, Philip C. Myers",
        title:
            "The Spitzer c2d Survey of Large Nearby Insterstellar Clouds IX The Serpens YSO Population As Observed With IRAC and MIPS",
        categories: "astro-ph",
        abstract:
            " We discuss the results from the combined IRAC and MIPS c2d Spitzer Legacy\r\nobservations of the Serpens starforming region In particular we present a set\r\nof criteria for isolating bona fide young stellar objects YSOs from the\r\nextensive background contamination by extragalactic objects We then discuss\r\nthe properties of the resulting high confidence set of YSOs We find 235 such\r\nobjects in the 085 deg2 field that was covered with both IRAC and MIPS An\r\nadditional set of 51 lower confidence YSOs outside this area is identified\r\nfrom the MIPS data combined with 2MASS photometry We describe two sets of\r\nresults colorcolor diagrams to compare our observed source properties with\r\nthose of theoretical models for stardiskenvelope systems and our own modeling\r\nof the subset of our objects that appear to be stardisks These objects\r\nexhibit a very wide range of disk properties from many that can be fit with\r\nactively accreting disks to some with both passive disks and even possibly\r\ndebris disks We find that the luminosity function of YSOs in Serpens extends\r\ndown to at least a few x 001 Lsun or lower for an assumed distance of 260 pc\r\nThe lower limit may be set by our inability to distinguish YSOs from\r\nextragalactic sources more than by the lack of YSOs at very low luminosities\r\nA spatial clustering analysis shows that the nominally lessevolved YSOs are\r\nmore highly clustered than the later stages and that the background\r\nextragalactic population can be fit by the same twopoint correlation function\r\nas seen in other extragalactic studies We also present a table of matches\r\nbetween several previous infrared and Xray studies of the Serpens YSO\r\npopulation and our Spitzer data set\r\n",
        date: "2010-03-18",
    },
    {
        id: 704.001,
        authors: "Sergei Ovchinnikov",
        title: "Partial cubes structures characterizations and constructions",
        categories: "math.CO",
        abstract:
            " Partial cubes are isometric subgraphs of hypercubes Structures on a graph\r\ndefined by means of semicubes and Djokovics and Winklers relations play\r\nan important role in the theory of partial cubes These structures are employed\r\nin the paper to characterize bipartite graphs and partial cubes of arbitrary\r\ndimension New characterizations are established and new proofs of some known\r\nresults are given\r\n The operations of Cartesian product and pasting and expansion and\r\ncontraction processes are utilized in the paper to construct new partial cubes\r\nfrom old ones In particular the isometric and lattice dimensions of finite\r\npartial cubes obtained by means of these operations are calculated\r\n",
        date: "2007-05-23",
    },
    {
        id: 704.0011,
        authors: "Clifton Cunningham and Lassina Dembele",
        title:
            "Computing genus 2 HilbertSiegel modular forms over Qsqrt5 via the JacquetLanglands correspondence",
        categories: "math.NT math.AG",
        abstract:
            " In this paper we present an algorithm for computing Hecke eigensystems of\r\nHilbertSiegel cusp forms over real quadratic fields of narrow class number\r\none We give some illustrative examples using the quadratic field\r\nQsqrt5 In those examples we identify HilbertSiegel eigenforms that\r\nare possible lifts from Hilbert eigenforms\r\n",
        date: "2008-08-20",
    },
];
const Home = () => {
    // const slides: any[] = []; //slides array to go in SwiperSlide
    // [1,2,3,4,5].forEach((d) => {
    //     slides.push(
    //         <SwiperSlide tag="li" key={`drink-${d.name}`}>
    //             <div>
    //                 <IKImage
    //                     loading="lazy"
    //                     path={`/d`}
    //                     width="348"
    //                     height="523"
    //                     transformation={[
    //                         {
    //                             width: 348,
    //                             height: 523,
    //                             radius: 25,
    //                             quality: 75,
    //                         },
    //                     ]}
    //                     className="mx-auto w-full list-none rounded-[25px]"
    //                     alt={`drink ${d.name}`}
    //                 />
    //             </div>
    //         </SwiperSlide>
    //     );
    // });

    const [selectedPaper, setSelectedPaper] = useState<boolean | number>(false);
    const [paperModalActive, setPaperModalActive] = useState<boolean>(false);

    // const addDataToFirebase = async () => {
    //     console.log("Start data add");

    // const [data, setData] = useState();
    // useEffect(() => {
    //     fetch("http://localhost:5000/random")
    //         .then((response) => response.json())
    //         .then((data) => setData(data));

    //     console.log(data);
    // }, []);

    const [searchText, setSearchText] = useState<string>("");
    const [searchResult, setSearchResult] = useState(false);

    const recommendedSearch = async () => {
        fetch("http://localhost:5000/search?q=" + searchText)
            .then((response) => response.json())
            .then((data) => setSearchResult(data));

        console.log(searchResult[0]);
    };

    const [modalData, setModalData] = useState();

    useEffect(() => {
        if (searchResult) {
            setModalData({
                ...searchResult.find((d) => d.id === selectedPaper),
            });
        } else {
            setModalData({ ...data.find((d) => d.id === selectedPaper) });
        }
    }, [paperModalActive, searchResult, selectedPaper]);

    return (
        <m.div
            className="md:flex"
            initial={{
                opacity: 0,
                y: -50,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 50,
            }}
        >
            <Header />
            <main>
                {/* Container for swiper */}
                {/* <div className="w-11/12 md-w-full relative z-0"> 
                <Swiper
                    tag="section"
                    wrapperTag="ul"
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                >
                    {slides}
                </Swiper>
            </div> */}
                <div className="md:flex flex-row-reverse md:mt-10 xl:mt-20">
                    <div>
                        <img
                            className="w-4/5  mx-auto my-8"
                            src="/hero.svg"
                            alt="Hero illustration"
                        />
                    </div>
                    <div className="mx-8 xl:w-2/4 ">
                        <h1 className="text-4xl font-bold xl:text-7xl">
                            Discover Quality Research Papers
                        </h1>
                        <div className="mt-8 xl:mt-20">
                            {/* <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <input className="aa-Input" {...autocomplete.getInputProps({})} />
      <div className="aa-Panel" {...autocomplete.getPanelProps({})}>
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;

            return (
              <div key={`source-${index}`} className="aa-Source">
                {items.length > 0 && (
                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {items.map((item) => (
                      <li
                        key={item.objectID}
                        className="aa-Item"
                        {...autocomplete.getItemProps({
                          item,
                          source,
                        })}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
      </div>
    </div> */}
                            <h2 className="font-medium xl:text-3xl ">
                                Search {"you're"} next quality read here
                            </h2>
                            <span className="flex mt-4 xl:mt-8 bg-secondary px-4 py-2 rounded-xl xl:w-3/4">
                                <svg
                                    className="w-1/6 xl:w-auto"
                                    width="30  "
                                    height="30  "
                                    viewBox="0 0 45 45"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={(e) => recommendedSearch()}
                                >
                                    <path
                                        d="M21.5625 40.7812C10.9687 40.7812 2.34375 32.1563 2.34375 21.5625C2.34375 10.9687 10.9687 2.34375 21.5625 2.34375C32.1563 2.34375 40.7812 10.9687 40.7812 21.5625C40.7812 32.1563 32.1563 40.7812 21.5625 40.7812ZM21.5625 5.15625C12.5063 5.15625 5.15625 12.525 5.15625 21.5625C5.15625 30.6 12.5063 37.9688 21.5625 37.9688C30.6187 37.9688 37.9688 30.6 37.9688 21.5625C37.9688 12.525 30.6187 5.15625 21.5625 5.15625Z"
                                        fill="#292D32"
                                    />
                                    <path
                                        d="M41.25 42.6562C40.8938 42.6562 40.5375 42.525 40.2563 42.2438L36.5063 38.4938C35.9625 37.95 35.9625 37.05 36.5063 36.5062C37.05 35.9625 37.95 35.9625 38.4938 36.5062L42.2438 40.2562C42.7875 40.8 42.7875 41.7 42.2438 42.2438C41.9625 42.525 41.6063 42.6562 41.25 42.6562Z"
                                        fill="#292D32"
                                    />
                                </svg>
                                <input
                                    className="w-5/6  bg-transparent outline-none ml-4 placeholder:text-black placeholder:font-semibold"
                                    type="text"
                                    placeholder="Type here . . ."
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                    list="titleList"
                                    id="titleList"
                                    name="titleList"
                                />

                                {/* <datalist id="titleList">
                                    {data3.map(d => <option key={d} value={d} /> )}
                                </datalist> */}
                            </span>
                        </div>
                    </div>
                </div>
                {searchResult && (
                    <div className="mt-10 mx-8">
                        <h3 className="font-bold text-2xl xl:text-4xl">
                            Recommended Papers
                        </h3>
                        <div className="mt-8 space-y-4">
                            {/* <article className="font-semibold rounded-xl bg-primary px-4 py-6 hover:bg-secondary cursor-pointer transition-all active:scale-95" >
                            <h1 className=" text-lg" >Calculation of prompt diphoton production cross sections at Tevatron and LHC energies</h1>
                            <div className="text-sm mt-4 space-y-2" >
                                <h2>C. {"Bal\'azs"}, E. L. Berger, P. M. Nadolsky, C.-P. Yuan</h2>
                                <h3>hep-ph  /  2008-11-26</h3>
                            </div>
                        </article> */}
                            {searchResult.map((d) => (
                                <PaperCard
                                    setOnClick={setSelectedPaper}
                                    setModalActive={setPaperModalActive}
                                    key={d.id}
                                    authors={d.author}
                                    date={d.update_date}
                                    {...d}
                                />
                            ))}
                        </div>
                        <AnimatePresence exitBeforeEnter>
                            {paperModalActive && selectedPaper && (
                                <PaperModal
                                    setModalActive={setPaperModalActive}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                )}
                {!!data && (
                    <div className="mt-10 mx-8">
                        <h3 className="font-bold text-2xl xl:text-4xl">
                            Papers you may like !
                        </h3>
                        <div className="mt-8 space-y-4">
                            {/* <article className="font-semibold rounded-xl bg-primary px-4 py-6 hover:bg-secondary cursor-pointer transition-all active:scale-95" >
                            <h1 className=" text-lg" >Calculation of prompt diphoton production cross sections at Tevatron and LHC energies</h1>
                            <div className="text-sm mt-4 space-y-2" >
                                <h2>C. {"Bal\'azs"}, E. L. Berger, P. M. Nadolsky, C.-P. Yuan</h2>
                                <h3>hep-ph  /  2008-11-26</h3>
                            </div>
                        </article> */}
                            {data.map((d) => (
                                <PaperCard
                                    setOnClick={setSelectedPaper}
                                    setModalActive={setPaperModalActive}
                                    key={d.id}
                                    {...d}
                                />
                            ))}
                        </div>
                        <AnimatePresence exitBeforeEnter>
                            {paperModalActive && selectedPaper && (
                                <PaperModal
                                    setModalActive={setPaperModalActive}
                                    // {...data.find((d) => d.id === selectedPaper)}
                                    {...modalData}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            <Footer />
        </m.div>
    );
};

export default Home;
