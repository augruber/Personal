import React from "react";

export default function SourcePayRedirect({target}: {
  target: string}) {
  React.useEffect(() => {
    // try to open the Flutter app
    window.location.replace(`myapp://pay/${target}`);

    // fallback attempt a second later
    const timer = setTimeout(() => {
      window.location.href = `myapp://pay/${target}`;
    }, 1000);

    return () => clearTimeout(timer);
  }, [target]);

  return (
    <div style={{
      fontFamily: "system-ui",
      textAlign: "center",
      marginTop: "25vh"
    }}>
      <h2>Returning to the app…</h2>
      <p>
        If nothing happens, <a href={`myapp://pay/${target}`}>tap here</a>.
      </p>
    </div>
  );
}