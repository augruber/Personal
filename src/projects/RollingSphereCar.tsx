import React from "react";

const RollingSphereCar: React.FC = () => (
  <article className="grid gap-8">
    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Glorbomat 3000</h1>

    {/* Tagline */}
    <p className="text-lg italic">
      An electric art car enclosed in a rotating triangular sphere becomes a glowing orb rolling trough the desert night.    
    </p>

    <div className="prose prose-neutral max-w-none">
      <p>

      The <em>Glorbomat 3000 </em> (Known to its friends as <em>The Glorb</em>) is a rolling light sculpture built around the chassis of an electric cart. A 3000 Milimeter diameter skeleton sphere, 
      assembled from triangular frames, surrounds the vehicle. LEDs mark the vertices, outlining the geometry with shifting light patterns.

      When the cart drives, the sphere itself rotates. From a distance it appears as a glowing orb moving across the playa, 
      a shape that is both mechanical and otherworldly. The motion is simple, yet the scale and luminous form give it a presence that feels larger than the machine inside.

      The design balances practical engineering with spectacle. The triangular skeleton must be strong but lightweight, 
      the handling smooth enough to enable driving, and the lighting robust enough to withstand dust and weather. Within those constraints, 
      the Glorbomat 3000 is less about control than about delight: a luminous sphere that playfully rolls through the desert night.
      </p>

    </div>

  </article>
);

export default RollingSphereCar;