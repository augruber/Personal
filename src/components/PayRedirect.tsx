import { useEffect } from "react";

const PayRedirect = ({ target }) => {
  useEffect(() => {
    // Try to open the app
    window.location.replace(`myapp://pay/${target}`);

    // Fallback link in case the automatic redirect fails
    const timer = setTimeout(() => {
      window.location.href = `myapp://pay/${target}`;
    }, 1000);

    return () => clearTimeout(timer);
  }, [target]);

  return (
    <div style={{
      fontFamily: "system-ui",
      textAlign: "center",
      marginTop: "20vh"
    }}>
      <h2>Returning to the app…</h2>
      <p>If nothing happens, <a href={`myapp://pay/${target}`}>tap here</a>.</p>
    </div>
  );
};