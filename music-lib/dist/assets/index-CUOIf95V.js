import { importShared } from './__federation_fn_import-B6gXDxfr.js';
import MusicLibrary, { j as jsxRuntimeExports } from './__federation_expose_MusicLibrary-CTNy01B4.js';
import { r as reactDomExports } from './index-D9Af7wOI.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Music Library (Remote Dev View)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { opacity: 0.7, marginTop: 0 }, children: "This page is for developing the remote micro frontend. In the container app it will be loaded via Module Federation." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MusicLibrary, { role: "admin" })
  ] }) })
);
