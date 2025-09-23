import React from "react";

const TreeOfLight: React.FC = () => (
  <article className="grid gap-8">
    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Tree of Light</h1>

    {/* Tagline */}
    <p className="text-lg italic">
      A luminous willow that powers itself with the sun and harvests its own water from the desert air.
    </p>

    {/* Hero (optional) */}
    {/* <figure className="rounded-2xl overflow-hidden shadow">
      <img src="/tree-of-light-hero.jpg" alt="Tree of Light render" className="w-full h-auto" />
      <figcaption className="mt-2 text-sm text-neutral-600 text-center">Concept render (placeholder)</figcaption>
    </figure> */}

    <div className="prose prose-neutral max-w-none">
      <p>
        The <em>Tree of Light</em> is a five-meter sculptural installation, inspired by the form of a
        weeping willow and designed for Burning Man’s harsh desert conditions. From its branches hang
        dozens of LED-lit strings that glow at night while droplets of water trickle down their length,
        scattering light into sparkling fragments. In a landscape defined by dust, heat, and scarcity,
        the tree becomes both symbol and oasis: a structure that generates its own water and light to thrive.
      </p>

      <h3>Concept & Experience</h3>
      <p>
        By day, the tree stands as a quiet silhouette on the playa. As the desert cools at night, its branches
        awaken: LEDs shimmer across the strands while tiny droplets run downward, catching and refracting the light.
        Participants experience the improbable spectacle of water in the desert—carefully captured, recycled,
        and celebrated as part of the artwork.
      </p>

      <h3>Technical Approach</h3>
      <ul>
        <li>
          <strong>Atmospheric Water Generation:</strong> The system combines <em>passive radiative cooling</em>—
          surfaces that reject heat to the night sky to promote dew formation—with <em>active condensation</em>
          using compact electrically powered coolers. Together they extract small but meaningful quantities of water
          from desert air.
        </li>
        <li>
          <strong>Solar Power:</strong> Photovoltaic panels harvest energy during the day to power LEDs, pumps,
          and condensers at night, enabling autonomous, off-grid operation.
        </li>
        <li>
          <strong>Desert-Ready Engineering:</strong> The trunk and branches are designed for playa storms and dust:
          sealed electronics, robust anchoring, weather-resistant materials, and thermal management for day heat.
        </li>
      </ul>

      <h3>Why It Matters</h3>
      <p>
        The installation tackles two core desert challenges—<strong>heat</strong> and <strong>water</strong>—by
        turning them into the very medium of the work. Solar energy drives light and cooling; radiative surfaces and
        condensers harvest water. The result is a sustainable, poetic
        encounter with resilience and beauty in extreme conditions.
      </p>
    </div>
  </article>
);

export default TreeOfLight;