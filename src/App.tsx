import React from "react";
import { HashRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import RollingSphereCarImageUrl from "./assets/RollingSphereCar.png";
import DroneLightCubeMovieUrl from "./assets/DroneCubeTest1.mov";
import DroneLightCubeImageUrl from "./assets/DroneCubeStill.png";
import TreeOfLightImageUrl from "./assets/TreeOfLight.png";
import MeUrl from "./assets/Me.jpeg";
import DroneLightCube from "./projects/DroneLightCube";
import TreeOfLight from "./projects/TreeOfLight";
import RollingSphereCar from "./projects/RollingSphereCar";

// ---- Utility Components ----
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full min-h-screen bg-neutral-50 text-neutral-900">
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
      <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">    
        <Link to="/" className="font-semibold tracking-tight text-lg flex items-center gap-2">
		  Aurel <img
		    src={`${import.meta.env.BASE_URL}Logo-128-bw.png`} 
		    alt="Logo"
		    className="h-8 w-8"
		  /> Projects</Link>
        <nav className="flex gap-4">
          <NavLink
            to="/project-drone-light-cube"
            className={({ isActive }) =>
              `text-sm px-2 py-1 rounded ${isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-200"}`
            }
          >
            Drone Light Cube
          </NavLink>
          <NavLink
            to="/project-tree-of-light"
            className={({ isActive }) =>
              `text-sm px-2 py-1 rounded ${isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-200"}`
            }
          >
            Tree Of Light
          </NavLink>
          <NavLink
            to="/project-rolling-sphere-car"
            className={({ isActive }) =>
              `text-sm px-2 py-1 rounded ${isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-200"}`
            }
          >
            Rolling Sphere Car
          </NavLink>
        </nav>
      </div>
    </header>
    <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
    <footer className="max-w-4xl mx-auto px-4 py-10 text-sm text-neutral-500">
      © {new Date().getFullYear()} Aurel. All rights reserved.
    </footer>
  </div>
);

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
      <SectionTitle>Welcome</SectionTitle>
      <Prose>
      <figure className="flex flex-col items-center">
		  <img
		    src={MeUrl}
		    alt="Portrait of Aurel"
		    className="w-96 h-96 rounded-full shadow-md object-cover mb-6 filter grayscale transition duration-500 hover:grayscale-0  hover:scale-98"
		  />
		  <figcaption className="mt-2 text-sm text-neutral-600">
		    Hi, I’m Aurel 👋
		  </figcaption>
		</figure>

        <p>
          This is a minimal single-page application (SPA) portfolio for immersive art projects. Use the
          navigation above to view two simple project layouts: one with <strong>video + image + text</strong>
          and one with <strong>image + text</strong>.
        </p>
      </Prose>
      <div className="grid md:grid-cols-2 gap-6">
        <CardLink to="/project-drone-light-cube" title="Drone Light Cube" subtitle="Video · Image · Text" img={DroneLightCubeImageUrl} />
        <CardLink to="/project-tree-of-light" title="Tree Of Light" subtitle="Image · Text" img={TreeOfLightImageUrl} />
        <CardLink to="/project-rolling-sphere-car" title="Rolling Sphere Car" subtitle="Image · Text" img={RollingSphereCarImageUrl} />
      </div>
    </div>
  </Container>
);

const ProjectDroneLightCube = () => (
  <Container>
    <article className="grid gap-8">
      <SectionTitle>Drone Light Cube</SectionTitle>

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
      <SectionTitle>Tree Of Light</SectionTitle>
      <figure className="rounded-2xl overflow-hidden shadow">
        <img
          className="w-full h-auto"
          src={TreeOfLightImageUrl}
          alt="Hero image of the project"
          loading="lazy"
        />
        <figcaption className="text-sm text-neutral-600 mt-2 text-center">Visualization of the installation in the desert. Note that some components such (e.g. solar panels) are missing.</figcaption>
      </figure>
      <TreeOfLight></TreeOfLight>
    </article>
  </Container>
);

const ProjectRollingSphereCar = () => (
  <Container>
    <article className="grid gap-8">
      <SectionTitle>Rolling Sphere Car</SectionTitle>
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

// // ---- Small UI Building Blocks ----
// const CardLink = ({ to, title, subtitle }: { to: string; title: string; subtitle?: string }) => (
//   <Link
//     to={to}
//     className="group rounded-2xl border border-neutral-200 p-5 shadow-sm hover:shadow-md transition"
//   >
//     <div className="flex items-center justify-between">
//       <div>
//         <h3 className="font-medium tracking-tight">{title}</h3>
//         {subtitle && <p className="text-sm text-neutral-600">{subtitle}</p>}
//       </div>
//       <span className="transition group-hover:translate-x-1">→</span>
//     </div>
//   </Link>
// );


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
      <Route path="/project-drone-light-cube" element={<ProjectDroneLightCube />} />
      <Route path="/project-tree-of-light" element={<ProjectTreeOfLight />} />
      <Route path="/project-rolling-sphere-car" element={<ProjectRollingSphereCar />} />
      <Route path="/rolling-sphere-car" element={<RollingSphereCar />} />
      <Route path="/drone-light-cube" element={<DroneLightCube />} />
      <Route path="/tree-of-light" element={<TreeOfLight />} />
    </Routes>
  </Router>
);

export default App;