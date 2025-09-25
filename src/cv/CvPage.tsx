import React from "react";

/**
 * CVPage — content-rendered CV (no PDF)
 *
 * Usage in App.tsx:
 *   import CVPage from "./CVPage";
 *   <Route path="/cv" element={<Container><CVPage /></Container>} />
 * (Use the same <Container> wrapper you already use for other pages.)
 */

export default function CVPage() {
  return (
    <article className="grid gap-10">
      {/* Hero */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Aurel Gruber</h1>
          <p className="text-neutral-600">Generative Graphics & Creative Technology</p>
        </div>
        <ul className="text-sm text-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
          <li><span className="font-medium">Email:</span> <a className="underline" href="mailto:aurel.gruber@gmail.com">aurel.gruber@gmail.com</a></li>
          <li><span className="font-medium">Location:</span> Zürich, Wiedikon</li>
          <li><span className="font-medium">Website:</span> <a className="underline" href="https://aurelgruber.com" target="_blank" rel="noreferrer">aurelgruber.com</a></li> 
        </ul>
      </header>

      {/* 2‑column layout */}
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Left rail */}
        <aside className="md:col-span-1">
          <div className="rounded-2xl overflow-hidden shadow bg-neutral-100">
            <div className="p-5 md:p-6 space-y-8">
              <section>
                <h2 className="text-base font-semibold tracking-tight mb-2">Profile Summary</h2>
                <p className="text-sm text-neutral-800">
                  With 12 years of experience in computer graphics, machine learning, and software engineering, and a background in mechanical manufacturing and automation, I am steadily moving toward work at the intersection of art and technology—creating immersive artistic installations and live experiences.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold tracking-tight mb-2">Personal</h2>
                <ul className="text-sm text-neutral-800 space-y-1">
                  <li><span className="font-medium">Nationality:</span> Swiss</li>
                  <li><span className="font-medium">Languages:</span> German (Native), English (Proficient), French (School Level), Spanish (Basic)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold tracking-tight mb-2">Skills</h2>
                <ul className="text-sm text-neutral-800 list-disc pl-5 space-y-1">
                  <li>Academic Research: literature review, scientific writing</li>
                  <li>Project & Team: Planning, Communication, Collaboration</li>
                  <li>Computer Graphics: 3D Reconstruction, Geometry & Image Processing, Tracking</li>
                  <li>Machine Learning: Training, Finetuning & Deployment (TensorFlow, JAX, PyTorch)</li>
                  <li>Software Development: C++, Python, Git, CI/CD</li>
                  <li>Mechanical / Automation: Manual & CNC Machining, Pneumatics, Hydraulics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold tracking-tight mb-2">Hobbies</h2>
                <p className="text-sm text-neutral-800">
                  Woodworking & furniture design, climbing & mountaineering, ski touring, travel, short‑form videography
                </p>
              </section>
            </div>
          </div>
        </aside>

        {/* Main rail */}
        <div className="md:col-span-2 space-y-10">
          {/* Experience */}
          <section>
            <h2 className="text-lg font-semibold tracking-tight mb-3">Experience</h2>
            <ul className="space-y-6">
              <li>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-medium">Early hire · betterPortrait</div>
                  <div className="text-sm text-neutral-600">2025</div>
                </div>
                <p className="text-sm text-neutral-800">
                  Developed and deployed diffusion‑based and traditional computer‑vision pipelines for portrait enhancement (<a className="underline" href="https://betterportrait.ch" target="_blank" rel="noreferrer">betterportrait.ch</a>).
                </p>
              </li>

              <li>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-medium">Doctoral Researcher · Computer Graphics Lab (ETH/Google)</div>
                  <div className="text-sm text-neutral-600">2020–2024</div>
                </div>
                <p className="text-sm text-neutral-800">
                  Conducted research on generative models for computer graphics (StyleGAN for textures, diffusion control, Neural Radiance Fields). 
                  One project <a className="underline"  href="https://syntec-research.github.io/GANtlitz/" target="_blank" rel="noreferrer">published at Eurographics</a>. 
                  Collaborated with Google Research on domain translation. Taught students for the lectures Parallel Programming and Linear Algebra. Four years of doctoral work (program discontinued before completion).
                </p>
              </li>

              <li>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-medium">Co‑founder · infix</div>
                  <div className="text-sm text-neutral-600">2015–2019</div>
                </div>
                <p className="text-sm text-neutral-800">
                  Co‑founded and shipped apps and services; acquired by novu in 2019 (<a className="underline" href="https://infix.ch" target="_blank" rel="noreferrer">infix.ch</a>).
                </p>
              </li>

              <li>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-medium">Intern · Fision/Meepl (acquired by Zalando)</div>
                  <div className="text-sm text-neutral-600">2016</div>
                </div>
                <p className="text-sm text-neutral-800">
                  Implemented geometry‑processing algorithms in C++ and 3D WebGL tools for garment visualization, inspection and processing.
                </p>
              </li>

              <li>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-medium">Intern · Pixcube</div>
                  <div className="text-sm text-neutral-600">2012</div>
                </div>
                <p className="text-sm text-neutral-800">
                  Contributed across the 3D animation pipeline (storyboarding to post‑production) for advertising spots (<a className="underline" href="https://pixcube.com/reader/ubs-2.html" target="_blank" rel="noreferrer">UBS spots</a>).
                </p>
              </li>

              <li>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-medium">Apprenticeship · Polymechaniker · ETA</div>
                  <div className="text-sm text-neutral-600">2007–2011</div>
                </div>
                <p className="text-sm text-neutral-800">
                  Mechanical manufacturing (manual & CNC), fundamentals of automation with pneumatics, hydraulics, and PLC control.
                </p>
              </li>
            </ul>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-semibold tracking-tight mb-3">Education</h2>
            <ul className="space-y-6">
              <li>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-medium">PhD Studies · ETH Zürich</div>
                  <div className="text-sm text-neutral-600">2020–2024</div>
                </div>
                <p className="text-sm text-neutral-800">See Experience for research context.</p>
              </li>
              <li>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-medium">BSc and</div>
                  <div className="text-sm text-neutral-600">2013–2016</div>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-medium">MSc Computer Science · ETH Zürich</div>    
                  <div className="text-sm text-neutral-600">2017–2019</div>
                </div>
                <p className="text-sm text-neutral-800">
                  BSc thesis on UV mapping (Interactive Geometry Lab), <a className="underline"  href="https://www.youtube.com/watch?v=PLUoLQUK3-s" target="_blank" rel="noreferrer"> 
                    presented at Blender Conference Amsterdam
                  </a>; MSc thesis on statistical face models (Disney Research Zurich), <a className="underline" href="https://studios.disneyresearch.com/2020/07/03/interactive-sculpting-of-digital-faces-using-an-anatomical-modeling-paradigm/" target="_blank" rel="noreferrer">Published at the Symposium on Geometry Processing</a>. 
                    Coauthor of a paper on Numerical Optimization <a className="underline" href="https://studios.disneyresearch.com/2020/05/25/fast-nonlinear-least-squares-optimization-of-large-scale-semi-sparse-problems/" target="_blank" rel="noreferrer">published at Eurographics</a>.
                </p>
              </li>
            </ul>
          </section>

          {/* Creative projects */}
          <section>
            <h2 className="text-lg font-semibold tracking-tight mb-3">Art & Creative Projects</h2>
            <a className="underline" href="https://aurelgruber.com" target="_blank" rel="noreferrer">See my website</a>
            <ul className="space-y-6">
              <li>
                <div className="font-medium">Lucent Willow (Concept, Burning Man 2026)</div>
                <p className="text-sm text-neutral-800">
                  LED installation combining atmospheric lighting with kinetic elements.
                </p>
              </li>
              <li>
                <div className="font-medium">LumiGlide (Concept)</div>
                <p className="text-sm text-neutral-800">
                  “Confinement cube” with haze and lasers for drone choreography.
                </p>
              </li>
              <li>
                <div className="font-medium">Skyweave (Concept)</div>
                <p className="text-sm text-neutral-800">Drone‑driven ribbon dance inspired by traditional Chinese performance art.</p>
              </li>
              <li>
                <div className="font-medium">Glorbomat 3000 (Concept)</div>
                <p className="text-sm text-neutral-800">Rolling LED sphere art car.</p>
              </li>
            </ul>
          </section>
        </div>
      </div>

            <div className="flex justify-center">
              <a href="/CV.pdf"
             className="inline-block px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition">
             Download CV (PDF)
        </a>    
      </div>
    </article>
  );
}
