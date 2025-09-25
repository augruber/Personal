import React from "react";
import { useState } from "react";
import { HashRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import RollingSphereCarImageUrl from "./assets/RollingSphereCar.png";
import DroneLightCubeMovieUrl from "./assets/DroneCubeTest1.mov";
import DroneLightCubeImageUrl from "./assets/DroneCubeStill.png";
import TreeOfLightImageUrl from "./assets/TreeOfLight.png";
import DroneRibbonDanceImageUrl from "./assets/DroneRibbonDanceStill.png";
import DroneRibbonDanceMovieUrl from "./assets/DroneRibbonDance.mov";

import MeUrl from "./assets/Me.jpeg";
import DroneLightCube from "./projects/DroneLightCube";
import TreeOfLight from "./projects/TreeOfLight";
import DroneRibbonDance from "./projects/DroneRibbondance";

import CVPage from "./cv/CvPage";

import RollingSphereCar from "./projects/RollingSphereCar";

// ---- Utility Components ----

import { Menu, X } from "lucide-react"; // for icons

const Container = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm px-2 py-1 rounded ${
      isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-200"
    }`;

  return (
    <div className="w-full min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-semibold tracking-tight text-lg flex items-center gap-2"
          >
            Aurel
            <img
              src={`${import.meta.env.BASE_URL}Logo-128-bw.png`}
              alt="Logo"
              className="h-8 w-8"
            />
            Gruber
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4">
            <NavLink to="/project-drone-light-cube" className={navLinkClass}>
              LumiGlide
            </NavLink>
            <NavLink to="/project-tree-of-light" className={navLinkClass}>
              Lucent Willow
            </NavLink>
            <NavLink to="/project-rolling-sphere-car" className={navLinkClass}>
              Glorbomat 3000
            </NavLink>
            <NavLink to="/project-drone-ribbon-dance" className={navLinkClass}>
              Skyweave
            </NavLink>
            <NavLink to="/cv" className={navLinkClass}>
              CV
            </NavLink>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav (dropdown) */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-2 px-4 pt-4 pb-4 border-t border-neutral-200 bg-white/95 backdrop-blur">
            <NavLink to="/cv" className={navLinkClass} onClick={() => setIsOpen(false)}>
              CV
            </NavLink>
            <NavLink
              to="/project-drone-light-cube"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              LumiGlide
            </NavLink>
            <NavLink
              to="/project-tree-of-light"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Lucent Willow
            </NavLink>
            <NavLink
              to="/project-rolling-sphere-car"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Glorbomat 3000
            </NavLink>
            <NavLink
              to="/project-drone-ribbon-dance"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Skyweave
            </NavLink>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>

      <footer className="max-w-4xl mx-auto px-4 py-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} Aurel Gruber. All rights reserved.
      </footer>
    </div>
  );
};

// const Container = ({ children }: { children: React.ReactNode }) => (
//   <div className="w-full min-h-screen bg-neutral-50 text-neutral-900">
//     <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
//       <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">    
//         <Link to="/" className="font-semibold tracking-tight text-lg flex items-center gap-2">
// 		  Aurel <img
// 		    src={`${import.meta.env.BASE_URL}Logo-128-bw.png`} 
// 		    alt="Logo"
// 		    className="h-8 w-8"
// 		  /> Gruber</Link>
//         <nav className="flex gap-4">
//           <NavLink
// 		    to="/cv"
// 		    className={({ isActive }) =>
// 		      `text-sm px-2 py-1 rounded ${isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-200"}`
// 		    }
// 		  >
// 		    CV
// 		  </NavLink>
//           <NavLink
//             to="/project-drone-light-cube"
//             className={({ isActive }) =>
//               `text-sm px-2 py-1 rounded ${isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-200"}`
//             }
//           >
//             LumiGlide
//           </NavLink>
//           <NavLink
//             to="/project-tree-of-light"
//             className={({ isActive }) =>
//               `text-sm px-2 py-1 rounded ${isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-200"}`
//             }
//           >
//             Lucent Willow
//           </NavLink>
//           <NavLink
//             to="/project-rolling-sphere-car"
//             className={({ isActive }) =>
//               `text-sm px-2 py-1 rounded ${isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-200"}`
//             }
//           >
//           Glorbomat 3000
//         </NavLink>
//         <NavLink
//             to="/project-drone-ribbon-dance"
//             className={({ isActive }) =>
//               `text-sm px-2 py-1 rounded ${isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-200"}`
//             }
//           >
//             Skyweave
//           </NavLink>
//         </nav>
//       </div>
//     </header>
//     <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
//     <footer className="max-w-4xl mx-auto px-4 py-10 text-sm text-neutral-500">
//       © {new Date().getFullYear()} Aurel Gruber. All rights reserved.
//     </footer>
//   </div>
// );

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
          I come from a technical background in computer graphics, machine learning, and mechanical manufacturing, 
          but I am steadily moving toward work that lives at the intersection of art and technology. Over the past 
          years I have worked on algorithms, generative models, and production software; now I am interested in 
          applying these skills to create installations that engage people in physical space. Burning Man and other 
          encounters with large-scale collaborative art left me convinced that technology can be more than function — 
          it can be a medium for shared experience. This site collects some of the ideas and projects I am developing along that path.
        </p>

      </Prose>
      <div className="grid md:grid-cols-2 gap-6">
        <CardLink to="/project-drone-light-cube" title="LumiGlide" subtitle="Drones project luminous shapes inside haze." img={DroneLightCubeImageUrl} />
        <CardLink to="/project-tree-of-light" title="Lucent Willow" subtitle="A glowing willow weaving light and water." img={TreeOfLightImageUrl} />
        <CardLink to="/project-rolling-sphere-car" title="Glorbomat 3000" subtitle="Rolling LED sphere art car." img={RollingSphereCarImageUrl} />
        <CardLink to="/project-drone-ribbon-dance" title="Skyweave" subtitle="Drones weave flowing ribbons through the sky." img={DroneRibbonDanceImageUrl} />

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

const CardLink = ({
  to,
  title,
  subtitle,
  img,
}: {
  to: string;
  title: string;
  subtitle?: string;
  img: string; // imported URL
}) => (
  <Link
    to={to}
    className="group block rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
  >
    <div className="relative aspect-[16/9]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover transition duration-500 filter grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
        style={{ backgroundImage: `url(${img})` }}
        aria-hidden="true"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

      {/* Text */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <h3 className="text-white font-semibold tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-white/80 text-sm">{subtitle}</p>
        )}
      </div>
    </div>
  </Link>
);

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