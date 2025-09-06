import { importShared } from './__federation_fn_import-B6gXDxfr.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const {createContext,useContext,useReducer} = await importShared('react');

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((s) => s.id !== action.payload.id);
    case "SET":
      return action.payload;
    default:
      return state;
  }
}
const SongsContext = createContext(null);
const SongsProvider = ({ initial, children }) => {
  const [songs, dispatch] = useReducer(reducer, initial);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SongsContext.Provider, { value: { songs, dispatch }, children });
};
const useSongs = () => {
  const ctx = useContext(SongsContext);
  if (!ctx) throw new Error("useSongs must be used within SongsProvider");
  return ctx;
};

const initialSongs = [
  { id: "1", title: "Yellow", artist: "Coldplay", album: "Parachutes" },
  { id: "2", title: "Fix You", artist: "Coldplay", album: "X&Y" },
  { id: "3", title: "Lose Yourself", artist: "Eminem", album: "8 Mile" },
  { id: "4", title: "Numb", artist: "Linkin Park", album: "Meteora" },
  { id: "5", title: "Shape of You", artist: "Ed Sheeran", album: "÷" },
  { id: "6", title: "Skyfall", artist: "Adele", album: "Skyfall" }
];

const {useMemo,useState} = await importShared('react');
const AddForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ title: "", artist: "", album: "" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Title", value: form.title, onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Artist", value: form.artist, onChange: (e) => setForm((f) => ({ ...f, artist: e.target.value })) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Album", value: form.album, onChange: (e) => setForm((f) => ({ ...f, album: e.target.value })) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      if (!form.title || !form.artist || !form.album) return;
      onSubmit({ title: form.title, artist: form.artist, album: form.album });
      setForm({ title: "", artist: "", album: "" });
    }, children: "Add" })
  ] });
};
const ExternalUI = ({ role, songs, onAdd, onDelete }) => {
  const [q, setQ] = useState(""), [filterKey, setFilterKey] = useState("title");
  const [sortKey, setSortKey] = useState("title");
  const [groupBy, setGroupBy] = useState(void 0);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return songs.filter((s) => s[filterKey].toLowerCase().includes(needle)).sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }, [songs, filterKey, q, sortKey]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Music Library" }),
    role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "controls", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddForm, { onSubmit: onAdd }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "controls", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Search...", value: q, onChange: (e) => setQ(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filterKey, onChange: (e) => setFilterKey(e.target.value), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "title", children: "Filter by Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", children: "Filter by Artist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", children: "Filter by Album" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sortKey, onChange: (e) => setSortKey(e.target.value), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "title", children: "Sort by Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", children: "Sort by Artist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", children: "Sort by Album" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: groupBy ?? "", onChange: (e) => setGroupBy(e.target.value || void 0), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No Grouping" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "title", children: "Group by Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", children: "Group by Artist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", children: "Group by Album" })
      ] })
    ] }),
    groupBy ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: Object.entries(filtered.reduce((acc, s) => {
      (acc[s[groupBy]] ||= []).push(s);
      return acc;
    }, {})).map(([key, list]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { marginTop: 0 }, children: [
        groupBy,
        ": ",
        key,
        " (",
        list.length,
        ")"
      ] }),
      list.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.title }),
          " — ",
          s.artist,
          " · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children: s.album })
        ] }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete(s.id), children: "Delete" })
      ] }, s.id))
    ] }, key)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list", children: filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.title }),
        " — ",
        s.artist,
        " · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children: s.album })
      ] }),
      role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete(s.id), children: "Delete" })
    ] }, s.id)) })
  ] });
};
const InternalUI = ({ role }) => {
  const { songs, dispatch } = useSongs();
  const [q, setQ] = useState(""), [filterKey, setFilterKey] = useState("title");
  const [sortKey, setSortKey] = useState("title");
  const [groupBy, setGroupBy] = useState(void 0);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return songs.filter((s) => s[filterKey].toLowerCase().includes(needle)).sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }, [songs, filterKey, q, sortKey]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card library-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Music Library" }),
    role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "controls", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddForm, { onSubmit: (d) => dispatch({ type: "ADD", payload: { id: crypto.randomUUID?.() ?? String(Date.now()), ...d } }) }) }),
    groupBy ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: Object.entries(filtered.reduce((acc, s) => {
      (acc[s[groupBy]] ||= []).push(s);
      return acc;
    }, {})).map(([key, list]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { marginTop: 0 }, children: [
        groupBy,
        ": ",
        key,
        " (",
        list.length,
        ")"
      ] }),
      list.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.title }),
          " — ",
          s.artist,
          " · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children: s.album })
        ] }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dispatch({ type: "DELETE", payload: { id: s.id } }), children: "Delete" })
      ] }, s.id))
    ] }, key)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list", children: filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.title }),
        " — ",
        s.artist,
        " · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children: s.album })
      ] }),
      role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dispatch({ type: "DELETE", payload: { id: s.id } }), children: "Delete" })
    ] }, s.id)) })
  ] });
};
const MusicLibrary = ({ role = "user", songs, onAdd, onDelete }) => {
  console.log("[music-lib] props seen:", {
    role,
    songsLen: Array.isArray(songs) ? songs.length : void 0,
    hasOnAdd: typeof onAdd === "function",
    hasOnDelete: typeof onDelete === "function"
  });
  if (Array.isArray(songs) && typeof onAdd === "function" && typeof onDelete === "function") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalUI, { role, songs, onAdd, onDelete });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SongsProvider, { initial: initialSongs, children: /* @__PURE__ */ jsxRuntimeExports.jsx(InternalUI, { role }) });
};

export { MusicLibrary as default, jsxRuntimeExports as j };
