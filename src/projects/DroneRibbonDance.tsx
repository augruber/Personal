import React from "react";

const DroneRibbondance: React.FC = () => (
  <article className="grid gap-8">
    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Skyweave</h1>

    {/* Tagline */}
    <p className="text-lg italic">
      A pair of drones carry a suspended ribbon through the air, weaving flowing patterns that recall traditional ribbon dances. The choreography balances precision and unpredictability, as the drones’ motion and the air itself shape the fabric’s form.
    </p>

    {/* Hero (optional) */}
    {/* <figure className="rounded-2xl overflow-hidden shadow">
      <img src="/tree-of-light-hero.jpg" alt="Lucent Willow render" className="w-full h-auto" />
      <figcaption className="mt-2 text-sm text-neutral-600 text-center">Concept render (placeholder)</figcaption>
    </figure> */}

    <div className="prose prose-neutral max-w-none">
      <p>
      
      <em>Skyweave </em> is an aerial performance where drones carry a suspended ribbon through space, leaving flowing trails 
      reminiscent of traditional ribbon dances. The fabric floats and shifts in response to movement and air currents, 
      turning the drones’ choreography into lines of color that ripple across the sky.

      The idea is simple, but the execution is complex. The drones must coordinate precisely to hold the ribbon taut while 
      avoiding collisions with the fabric itself. Their propellers disturb the air, adding unpredictable motion that transforms 
      the ribbon into a living element. The challenge lies in embracing these dynamics—designing paths, speeds, and formations that 
      let the drones guide the ribbon without overpowering its natural flow.

      Skyweave lives in the balance between control and chaos: a woven line of light fabric, animated by both machines and the invisible currents they create.
      </p>
    </div>
  </article>
);

export default DroneRibbondance;