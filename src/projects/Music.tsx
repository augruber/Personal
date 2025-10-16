import React from "react";
import MixcloudControlled from "../components/MixcloudControlled";
import MixcloudWaveformPlayer from "../components/MixcloudWaveformPlayer";

const DJSets: React.FC = () => (
  <div className="grid gap-8">
    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">DJ Sets & Tracks</h1>
    <p className="text-neutral-600">Headphones recommended :)</p>


  <MixcloudWaveformPlayer
      feed="https://www.mixcloud.com/RLAmadeo/simplicity-council/"
      peaksUrl={`${import.meta.env.BASE_URL}WaveForms/Psytrancetest.json`}
      title="Track: Simplicity Council"
      subtitle="Techno"
      hideIframe
  />
      <MixcloudWaveformPlayer
      feed="https://www.mixcloud.com/RLAmadeo/session-1/"
	    peaksUrl={`${import.meta.env.BASE_URL}WaveForms/01 Session 1.json`}
	    cueUrl={`${import.meta.env.BASE_URL}tracklists/01 Session 1.cue`}
      title="Set: Session 01 - No Controller"
      subtitle="Progressive / Melodic"
      hideIframe
	/>

  </div>
);

export default DJSets; 