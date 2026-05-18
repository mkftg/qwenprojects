const storeKey = "aiBuilderDataV1";
let state = {
  projects: [],
  activeProjectId: null,
  activeFile: null,
  settings: { apiUrl: "https://api.openai.com/v1", apiKey: "", model: "gpt-4o-mini" },
  messages: [{ role: "system", content: "You are an expert coding assistant. Return clean project code." }],
};
let editor;

function uid() { return Math.random().toString(36).slice(2, 10); }
function activeProject() { return state.projects.find((p) => p.id === state.activeProjectId); }

function saveState() { localStorage.setItem(storeKey, JSON.stringify(state)); }
function loadState() {
  const raw = localStorage.getItem(storeKey);
  if (raw) state = JSON.parse(raw);
  if (!state.projects.length) createProject("Starter Web App", false);
  renderAll();
}

function createProject(name = prompt("Project name?") || "Untitled Project", persist = true) {
  const p = { id: uid(), name, files: { "index.html": "<h1>Hello Builder</h1>\n<p>Start prompting AI.</p>", "style.css": "body { font-family: sans-serif; }", "script.js": "console.log('ready');" } };
  state.projects.unshift(p);
  state.activeProjectId = p.id;
  state.activeFile = "index.html";
  if (persist) saveState();
  renderAll();
}

function renderProjects() {
  const ul = document.getElementById("projectList");
  ul.innerHTML = "";
  state.projects.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = p.name;
    li.className = p.id === state.activeProjectId ? "active" : "";
    li.onclick = () => { state.activeProjectId = p.id; state.activeFile = Object.keys(p.files)[0]; renderAll(); saveState(); };
    ul.appendChild(li);
  });
}

function renderFiles() {
  const p = activeProject();
  const ul = document.getElementById("fileList");
  ul.innerHTML = "";
  if (!p) return;
  Object.keys(p.files).forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    li.className = name === state.activeFile ? "active" : "";
    li.onclick = () => { commitEditor(); state.activeFile = name; renderAll(); };
    ul.appendChild(li);
  });
}

function renderEditor() {
  const p = activeProject();
  const label = document.getElementById("activeFileLabel");
  if (!p || !state.activeFile) return;
  label.textContent = state.activeFile;
  const model = editor.getModel();
  editor.setValue(p.files[state.activeFile] || "");
  monaco.editor.setModelLanguage(model, languageFromFile(state.activeFile));
}

function languageFromFile(file) {
  if (file.endsWith(".html")) return "html";
  if (file.endsWith(".css")) return "css";
  if (file.endsWith(".js")) return "javascript";
  if (file.endsWith(".dart")) return "dart";
  if (file.endsWith(".java")) return "java";
  return "plaintext";
}

function commitEditor() {
  const p = activeProject();
  if (!p || !state.activeFile || !editor) return;
  p.files[state.activeFile] = editor.getValue();
  saveState();
}

function renderChat() {
  const box = document.getElementById("chatMessages");
  box.innerHTML = "";
  state.messages.filter((m) => m.role !== "system").forEach((m) => {
    const div = document.createElement("div");
    div.className = `msg ${m.role === "user" ? "user" : "assistant"}`;
    div.textContent = m.content;
    box.appendChild(div);
  });
  box.scrollTop = box.scrollHeight;
}

function renderAll() { renderProjects(); renderFiles(); if (editor) renderEditor(); renderChat(); }

function runPreview() {
  commitEditor();
  const p = activeProject();
  if (!p) return;
  const html = p.files["index.html"] || "";
  const css = `<style>${p.files["style.css"] || ""}</style>`;
  const js = `<script>${p.files["script.js"] || ""}\/script>`;
  document.getElementById("previewFrame").srcdoc = html + css + js;
}

function addFileFromAI(text) {
  const p = activeProject();
  if (!p) return;
  const blocks = [...text.matchAll(/```([\w.-]+)?\n([\s\S]*?)```/g)];
  blocks.forEach((b, i) => {
    const maybeName = b[1] || "generated.txt";
    const name = maybeName.includes(".") ? maybeName : `generated-${i + 1}.${maybeName === "javascript" ? "js" : maybeName === "html" ? "html" : maybeName === "css" ? "css" : "txt"}`;
    p.files[name] = b[2].trim();
    state.activeFile = name;
  });
  saveState();
  renderAll();
}

async function sendPrompt(promptText) {
  const { apiUrl, apiKey, model } = state.settings;
  const userMsg = { role: "user", content: promptText };
  state.messages.push(userMsg);
  renderChat();
  try {
    const res = await fetch(`${apiUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages: state.messages, temperature: 0.7 }),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "No response";
    state.messages.push({ role: "assistant", content: text });
    addFileFromAI(text);
  } catch (e) {
    state.messages.push({ role: "assistant", content: `Request failed: ${e.message}` });
  }
  saveState();
  renderChat();
}

function exportProject() {
  commitEditor();
  const p = activeProject();
  if (!p) return;
  const blob = new Blob([JSON.stringify(p, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${p.name.replace(/\s+/g, "-").toLowerCase()}.json`;
  a.click();
}

function wireEvents() {
  document.getElementById("newProjectBtn").onclick = () => createProject();
  document.getElementById("newFileBtn").onclick = () => {
    const name = prompt("File name (e.g., main.dart)?");
    if (!name) return;
    const p = activeProject();
    p.files[name] = "";
    state.activeFile = name;
    saveState();
    renderAll();
  };
  document.getElementById("runPreviewBtn").onclick = runPreview;
  document.getElementById("saveLocalBtn").onclick = () => { commitEditor(); saveState(); alert("Saved to browser localStorage."); };
  document.getElementById("exportBtn").onclick = exportProject;
  document.getElementById("settingsBtn").onclick = () => {
    document.getElementById("apiUrl").value = state.settings.apiUrl;
    document.getElementById("apiKey").value = state.settings.apiKey;
    document.getElementById("apiModel").value = state.settings.model;
    document.getElementById("settingsModal").showModal();
  };
  document.getElementById("closeSettings").onclick = () => document.getElementById("settingsModal").close();
  document.getElementById("settingsForm").onsubmit = (e) => {
    e.preventDefault();
    state.settings = {
      apiUrl: document.getElementById("apiUrl").value.trim(),
      apiKey: document.getElementById("apiKey").value.trim(),
      model: document.getElementById("apiModel").value.trim(),
    };
    saveState();
    document.getElementById("settingsModal").close();
  };
  document.getElementById("chatForm").onsubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    await sendPrompt(text);
  };
  window.addEventListener("beforeunload", commitEditor);
}

require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs" } });
require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: "",
    language: "html",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
  });
  wireEvents();
  loadState();
  runPreview();
});
