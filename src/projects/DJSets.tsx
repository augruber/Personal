import React from "react";
import MixcloudControlled from "../components/MixcloudControlled";
import MixcloudWaveformPlayer from "../components/MixcloudWaveformPlayer";

const DJSets: React.FC = () => (
  <div className="grid gap-8">
    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">DJ Sets</h1>
    <p className="text-neutral-600">Headphones recommended :)</p>

    <MixcloudWaveformPlayer
      feed="https://www.mixcloud.com/RLAmadeo/session-1/"
	  peaksUrl={`${import.meta.env.BASE_URL}WaveForms/01 Session 1.json`}
      title="Session 01 - No Controller"
      subtitle="Progressive / Melodic"
      hideIframe
	/>
  </div>
);

export default DJSets;