import React from "react";
import { useState } from "react";
import { HashRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import RollingSphereCarImageUrl from "./assets/RollingSphereCar.png";
import DroneLightCubeMovieUrl from "./assets/DroneCubeTest1.mov";
import DroneLightCubeImageUrl from "./assets/DroneCubeStill.png";
import TreeOfLightImageUrl from "./assets/TreeOfLight.png";
import DroneRibbonDanceImageUrl from "./assets/DroneRibbonDanceStill.png";
import DroneRibbonDanceMovieUrl from "./assets/DroneRibbonDance.mov";

import GantlitzImageUrl from "./assets/Gantlitz.png";
import SculptingImageUrl from "./assets/Sculpting.png";
import OptimizationImageUrl from "./assets/Optimization.png";
import SLIMImageUrl from "./assets/SLIM.png";
import UBSImageUrl from "./assets/UBS.png";


import MeUrl from "./assets/Me.jpeg";
import DroneLightCube from "./projects/DroneLightCube";
import TreeOfLight from "./projects/TreeOfLight";
import DroneRibbonDance from "./projects/DroneRibbondance";

import CVPage from "./cv/CvPage";

import RollingSphereCar from "./projects/RollingSphereCar";

// ---- Utility Components ----

import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";

const Container = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [isArtOpenMobile, setIsArtOpenMobile] = useState(false);
  const [isTechOpenMobile, setIsTechOpenMobile] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block w-full text-left text-sm px-2 py-1 rounded whitespace-nowrap
     ${isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`;

  return (
    <div className="w-full min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link to="/" className="font-semibold tracking-tight text-lg flex items-center gap-2 whitespace-nowrap">
            Aurel
            <img
              src={`${import.meta.env.BASE_URL}Logo-128-bw.png`}
              alt="Logo"
              className="h-8 w-8"
            />
            Gruber
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3">


            {/* Technical Projects dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 whitespace-nowrap text-sm px-2 py-1 rounded hover:bg-neutral-200"
                onClick={() => setIsTechOpen((v) => !v)}
                aria-expanded={isTechOpen}
                aria-haspopup="true"
              >
                Technical Projects
                <ChevronDown className={`h-4 w-4 transition ${isTechOpen ? "rotate-180" : ""}`} />
              </button>

              {isTechOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 rounded-xl border border-neutral-200 bg-white shadow-lg p-2 flex flex-col gap-1"
                  onMouseLeave={() => setIsTechOpen(false)}
                >
                  <a href="https://syntec-research.github.io/GANtlitz/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    GANtlitz <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                  <a href="https://studios.disneyresearch.com/2020/07/03/interactive-sculpting-of-digital-faces-using-an-anatomical-modeling-paradigm/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    Interactive Sculpting of Faces <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                  <a href="https://studios.disneyresearch.com/2020/05/25/fast-nonlinear-least-squares-optimization-of-large-scale-semi-sparse-problems/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    Fast Nonlinear Optimization <ExternalLink className="h-4 w-4 ml-2" />
                  </a>                  
                  <a href="https://www.youtube.com/watch?v=PLUoLQUK3-s" target="_blank" rel="noopener noreferrer"
                     className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    UV Mapping for Blender   <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                  <a href="https://pixcube.com/reader/ubs-2.html" target="_blank" rel="noopener noreferrer"
                     className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    3D Animation   <ExternalLink className="h-4 w-4 ml-2" />
                  </a>

                </div>
              )}
            </div>

            {/* Art Concepts dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 whitespace-nowrap text-sm px-2 py-1 rounded hover:bg-neutral-200"
                onClick={() => setIsArtOpen((v) => !v)}
                aria-expanded={isArtOpen}
                aria-haspopup="true"
              >
                Art Concepts
                <ChevronDown className={`h-4 w-4 transition ${isArtOpen ? "rotate-180" : ""}`} />
              </button>

              {isArtOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-200 bg-white shadow-lg p-2 flex flex-col gap-1"
                  onMouseLeave={() => setIsArtOpen(false)}
                >
                  <NavLink to="/project-drone-light-cube" className={navLinkClass}>LumiGlide</NavLink>
                  <NavLink to="/project-tree-of-light" className={navLinkClass}>Lucent Willow</NavLink>
                  <NavLink to="/project-rolling-sphere-car" className={navLinkClass}>Glorbomat 3000</NavLink>
                  <NavLink to="/project-drone-ribbon-dance" className={navLinkClass}>Skyweave</NavLink>
                </div>
              )}
            </div>


            {/* Standalone link */}
            <NavLink to="/cv" className={navLinkClass}>
              CV
            </NavLink>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="md:hidden px-4 pb-4 border-t border-neutral-200 bg-white/95 backdrop-blur">


            {/* Technical Projects accordion */}
            <button
              className="w-full flex items-center justify-between py-3"
              onClick={() => setIsTechOpenMobile((v) => !v)}
              aria-expanded={isTechOpenMobile}
            >
              <span className="text-sm font-medium">Technical Projects</span>
              <ChevronDown className={`h-4 w-4 transition ${isTechOpenMobile ? "rotate-180" : ""}`} />
            </button>
            {isTechOpenMobile && (
              <div className="flex flex-col gap-2 pl-2 pb-2">
                <a href="https://syntec-research.github.io/GANtlitz/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    GANtlitz  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
                <a href="https://studios.disneyresearch.com/2020/07/03/interactive-sculpting-of-digital-faces-using-an-anatomical-modeling-paradigm/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    Interactive Sculpting of Faces  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
                  <a href="https://studios.disneyresearch.com/2020/05/25/fast-nonlinear-least-squares-optimization-of-large-scale-semi-sparse-problems/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    Fast Nonlinear Optimization <ExternalLink className="h-4 w-4 ml-2" />
                  </a>                
                  <a href="https://www.youtube.com/watch?v=PLUoLQUK3-s" target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    UV Mapping for Blender  <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                  <a href="https://pixcube.com/reader/ubs-2.html" target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-neutral-100">
                    3D Animation <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
              </div>
            )}

            {/* Art Concepts accordion */}
            <button
              className="w-full flex items-center justify-between py-3"
              onClick={() => setIsArtOpenMobile((v) => !v)}
              aria-expanded={isArtOpenMobile}
            >
              <span className="text-sm font-medium">Art Concepts</span>
              <ChevronDown className={`h-4 w-4 transition ${isArtOpenMobile ? "rotate-180" : ""}`} />
            </button>
            {isArtOpenMobile && (
              <div className="flex flex-col gap-2 pl-2 pb-2">
                <NavLink to="/project-drone-light-cube" className={navLinkClass} onClick={() => setIsMobileOpen(false)}>LumiGlide</NavLink>
                <NavLink to="/project-tree-of-light" className={navLinkClass} onClick={() => setIsMobileOpen(false)}>Lucent Willow</NavLink>
                <NavLink to="/project-rolling-sphere-car" className={navLinkClass} onClick={() => setIsMobileOpen(false)}>Glorbomat 3000</NavLink>
                <NavLink to="/project-drone-ribbon-dance" className={navLinkClass} onClick={() => setIsMobileOpen(false)}>Skyweave</NavLink>
              </div>
            )}


            {/* Standalone link */}
            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-200">
              <NavLink to="/cv" className={navLinkClass} onClick={() => setIsMobileOpen(false)}>
                CV
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>

      <footer className="max-w-4xl mx-auto px-4 py-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} Aurel Gruber. All rights reserved.
      </footer>
    </div>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">{children}</h1>
);

const Prose = ({ children }: { children: React.ReactNode }) => (
  <div className="prose prose-neutral max-w-none">{children}</div>
);

// ---- Pages ----
const Home = () => (
  <Container>
    <div className="grid gap-8">
      <SectionTitle>Welcome, I'm Aurel Gruber</SectionTitle>
      <Prose>
      <figure className="flex flex-col items-center">
		  <img
		    src={MeUrl}
		    alt="Portrait of Aurel"
		    className="w-96 h-96 rounded-full shadow-md object-cover mb-6 filter grayscale transition duration-500 hover:grayscale-0  hover:scale-98"
		  />
		</figure>

        <p>
          I come from a technical background in academic research, computer graphics, machine learning, and mechanical manufacturing, 
          but I am steadily moving toward work that lives at the intersection of art and technology. Over the past 
          years I have worked on algorithms, generative models, and production software; now I am interested in 
          applying these skills to create installations that engage people in physical space. Burning Man and other 
          encounters with large-scale collaborative art inspired me to see technology as more than function — 
          it can be a medium for shared experience. This site collects some of the ideas I am developing along that path and highlights some of my past technical projects.
        </p>

      </Prose>

	  <SectionTitle>Technical Projects</SectionTitle>

      <div className="grid md:grid-cols-2 gap-6">
        <Card href="https://syntec-research.github.io/GANtlitz/" title="GANtlitz" subtitle="Published a StyleGAN based method for ultra high resolution texture synthesis at Eurographics as first author." img={GantlitzImageUrl} />
        <Card href="https://studios.disneyresearch.com/2020/07/03/interactive-sculpting-of-digital-faces-using-an-anatomical-modeling-paradigm/" title="Interactive Sculpting of Faces" subtitle="Published a method for interactive sculpting of digital faces using an anatomical modeling paradigm to the Symposium on Geometry Processing as first author." img={SculptingImageUrl} />
        <Card href="https://studios.disneyresearch.com/2020/05/25/fast-nonlinear-least-squares-optimization-of-large-scale-semi-sparse-problems/" title="Fast Nonlinear Optimization" subtitle="Co-authored a paper on fast non-linear optimization which we published to Eurographics." img={OptimizationImageUrl} />
        <Card href="https://www.youtube.com/watch?v=PLUoLQUK3-s" title="SLIM Based UV Mapping for Blender" subtitle="Implemented a distance preserving UV unwrapping algorithm into Blender and presented it at the Blender Conference 2016." img={SLIMImageUrl} />
        <Card href="https://pixcube.com/reader/ubs-2.html" title="3D Animation" subtitle="I contributed to different projects across the full 3D pipeline at Pixcube as an intern in 2013." img={UBSImageUrl} />
      </div>


	  <SectionTitle>Art Concepts</SectionTitle>

      <div className="grid md:grid-cols-2 gap-6">


        <Card to="/project-drone-light-cube" title="LumiGlide" subtitle="Drones project luminous shapes inside haze." img={DroneLightCubeImageUrl} />
        <Card to="/project-tree-of-light" title="Lucent Willow" subtitle="A glowing willow weaving light and water." img={TreeOfLightImageUrl} />
        <Card to="/project-rolling-sphere-car" title="Glorbomat 3000" subtitle="Rolling LED sphere art car." img={RollingSphereCarImageUrl} />
        <Card to="/project-drone-ribbon-dance" title="Skyweave" subtitle="Drones weave flowing ribbons through the sky." img={DroneRibbonDanceImageUrl} />

      </div>
    </div>
  </Container>
);

const ProjectDroneLightCube = () => (
  <Container>
    <article className="grid gap-8">
      <SectionTitle>LumiGlide</SectionTitle>

      {/* Video */}
      <figure className="rounded-2xl overflow-hidden shadow">
        <video
          className="w-full h-auto"
          controls
          playsInline
          poster={DroneLightCubeImageUrl}
          autoPlay
		  loop
		  muted
        >
          <source src={DroneLightCubeMovieUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <figcaption className="text-sm text-neutral-600 mt-2 text-center">A simple animation to convey the effect. Note that I envision a larger cube, multiple drones and a sophisticated choreography.</figcaption>
      </figure>

      {/* Text */}
      <DroneLightCube></DroneLightCube>
    </article>
  </Container>
);

const ProjectTreeOfLight = () => (
  <Container>
    <article className="grid gap-8">
      <SectionTitle>Lucent Willow</SectionTitle>
      <figure className="rounded-2xl overflow-hidden shadow">
        <img
          className="w-full h-auto"
          src={TreeOfLightImageUrl}
          alt="Hero image of the project"
          loading="lazy"
        />
        <figcaption className="text-sm text-neutral-600 mt-2 text-center">Visualization of the installation in the desert. Note that some components (e.g. solar panels) are missing.</figcaption>
      </figure>
      <TreeOfLight></TreeOfLight>
    </article>
  </Container>
);

const ProjectRollingSphereCar = () => (
  <Container>
    <article className="grid gap-8">
      <SectionTitle>Glorbomat 3000</SectionTitle>
      <figure className="rounded-2xl overflow-hidden shadow">
        <img
          className="w-full h-auto"
          src={RollingSphereCarImageUrl}
          alt="Hero image of the project"
          loading="lazy"
        />
        <figcaption className="text-sm text-neutral-600 mt-2 text-center">A car, confined to a LED sphere, which when driven causes the sphere to roll controllably across flat surfaces.</figcaption>
      </figure>
      <RollingSphereCar></RollingSphereCar>
    </article>
  </Container>
);

const ProjectDroneRibbonDance = () => (
  <Container>
    <article className="grid gap-8">
      <SectionTitle>Skyweave</SectionTitle>
      <figure className="rounded-2xl overflow-hidden shadow">
		<video
          className="w-full h-auto"
          controls
          playsInline
          poster={DroneRibbonDanceImageUrl}
          autoPlay
		  loop
		  muted
        >
          <source src={DroneRibbonDanceMovieUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <figcaption className="text-sm text-neutral-600 mt-2 text-center">A single ribbon gliding through the air. Multiple ribbons could add additional complexity, both in appearance and technical sophistication.</figcaption>
      </figure>
      <DroneRibbonDance></DroneRibbonDance>
    </article>
  </Container>
);

type CommonProps = {
  title: string;
  subtitle?: string;
  img: string; // imported URL or absolute path
  className?: string;
};

// Use exactly ONE of these props:
type CardProps =
  | (CommonProps & { to: string; href?: never })
  | (CommonProps & { href: string; to?: never });

function Card(props: CardProps) {
  const { title, subtitle, img, className } = props;

  const Inner = (
    <div className={`group block rounded-2xl overflow-hidden shadow hover:shadow-lg transition ${className || ""}`}>
      <div className="relative aspect-[16/9]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover transition duration-500 filter grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
          style={{ backgroundImage: `url(${img})` }}
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
        {/* Text overlay */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold tracking-tight">{title}</h3>
            {"href" in props && <ExternalLink className="h-4 w-4 text-white/80" />}
          </div>
          {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  if ("to" in props) {
    return (
      <Link to={props.to} className="block">
        {Inner}
      </Link>
    );
  }

  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer" className="block">
      {Inner}
    </a>
  );
}

// ---- App (no mounting here!) ----
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cv" element={<Container><CVPage /></Container>} />
      <Route path="/project-drone-light-cube" element={<ProjectDroneLightCube />} />
      <Route path="/project-tree-of-light" element={<ProjectTreeOfLight />} />
      <Route path="/project-drone-ribbon-dance" element={<ProjectDroneRibbonDance />} />
      <Route path="/project-rolling-sphere-car" element={<ProjectRollingSphereCar />} />
      <Route path="/rolling-sphere-car" element={<RollingSphereCar />} />
      <Route path="/drone-light-cube" element={<DroneLightCube />} />
      <Route path="/tree-of-light" element={<TreeOfLight />} />
      <Route path="/drone-ribbon-dance" element={<DroneRibbonDance />} />
    </Routes>
  </Router>
);

export default App;