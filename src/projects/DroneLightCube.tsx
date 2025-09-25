import React from "react";

const DroneLightCube = () => (
  <article className="grid gap-8">
    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
      LumiGlide
    </h1>
    <p className="text-lg italic">
      A swarm of light-carrying drones transforms a transparent cube into a living sculpture of lines, planes, and shifting fog.
    </p>

    <div className="prose prose-neutral max-w-none">
      <p>
        The <em>LumiGlide</em> explores the intersection of autonomous flight,
        light, and spatial perception. Imagine a five-meter cube filled with a fine
        haze, where a fleet of small drones carry light sources to sketch shifting
        geometries in mid-air. Lines become planes, beams intersect, and fog layers
        swirl as drones dive in and out, transforming the space into a dynamic,
        living sculpture.
      </p>

      <p>
        Behind the apparent simplicity lies a demanding technical foundation.
        Multiple drones must be precisely positioned and synchronized within a
        confined volume, requiring high-accuracy indoor tracking, swarm coordination,
        and safety mechanisms. Each drone carries a lightweight light module, so
        flight dynamics, power management, and payload integration must be carefully
        balanced.
      </p>

      <p>
        Light choice is another key factor. Regulatory limits (e.g. Class 1 laser
        safety) constrain raw brightness, but perceptual tricks—green wavelengths,
        beam spreading optics, or alternative high-intensity LEDs—can be used to
        create visually compelling results while remaining safe and compliant.
      </p>

      <p>
        The enclosing cube itself doubles as stage and safeguard, but its surfaces
        must be treated to minimize reflections that could interfere with the visual
        experience. Within this framework, atmospheric effects play a critical role:
        thin haze reveals beams and volumetric shapes, while denser fog at the base
        invites the drones to stir shifting patterns, adding texture and depth.
      </p>

      <p>
        Overall, the <em>LumiGlide</em> is not just an artistic concept but a
        technical challenge: integrating autonomous flight, optical design, and
        environmental effects into a controlled, safe, and awe-inspiring installation.
      </p>
    </div>
  </article>
);

export default DroneLightCube;