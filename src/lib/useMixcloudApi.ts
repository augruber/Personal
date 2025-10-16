import * as React from "react";

export function useMixcloudApi() {
  const [ready, setReady] = React.useState<boolean>(!!(window as any).Mixcloud?.PlayerWidget);

  React.useEffect(() => {
    if ((window as any).Mixcloud?.PlayerWidget) {
      setReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
    s.async = true;
    s.onload = () => setReady(!!(window as any).Mixcloud?.PlayerWidget);
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  return ready;
}