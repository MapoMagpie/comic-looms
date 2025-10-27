import { ImageActionDesc, saveConf } from "../config";
import { i18n } from "../utils/i18n";
import { ADAPTER } from "../platform/adapt";

export function createActionCustomPanel(root: HTMLElement, onclose?: () => void) {
  const HTML_STR = `
<div class="ehvp-custom-panel" style="min-width:30vw;">
  <div class="ehvp-custom-panel-title">
    <span>${i18n.showActionCustom.get()}</span>
    <span id="ehvp-custom-panel-close" class="ehvp-custom-panel-close">✖</span>
  </div>

  <div class="ehvp-custom-panel-container">

    <div class="ehvp-custom-panel-content">
      <div class="ehvp-custom-panel-item">
       <div class="ehvp-custom-panel-item-title">
         <span>${i18n.showActionCustom.get()}</span>
       </div>
       <div id="ehvp-image-action-values" class="ehvp-custom-panel-item-values">
         <!-- wait element created from button event -->
       </div>
      </div>
    </div>

    <div class="ehvp-custom-panel-content">
      <div class="ehvp-custom-panel-item">
        <div class="ehvp-custom-panel-item-title">
         <span>${i18n.example.get()}</span>
        </div>
        <div>
          <span class="ehvp-action-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="0">Example 1</span>
          <span class="ehvp-action-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="1">Example 2</span>
          <span class="ehvp-action-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="2">Example 3</span>
          <span class="ehvp-action-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="3">Example 4</span>
        </div>
      </div>
    </div>

    <div class="ehvp-custom-panel-content" style="position:relative;">
      <div><span style="font-size:1.6em;color:#888;">${i18n.description.get()}</span></div>
      <div>
        <div>
          <label>
            <span>${i18n.icon.get()}</span>
            <input id="ehvp-action-input-icon" style="width: 2em;" type="text">
          </label>
        </div>
        <div>
          <label>
            <span>${i18n.description.get()} (${i18n.optional.get()})</span>
            <input id="ehvp-action-input-desc" style="width: 98%;" type="text">
          </label>
        </div>
        <div>
          <label>
            <span>${i18n.workon.get()} (${i18n.optional.get()},${i18n.regexp.get()})</span>
            <input id="ehvp-action-input-workon" style="width: 98%;" type="text">
          </label>
        </div>
      </div>
      <div><span style="font-size:1.6em;color:#888;">${i18n.function.get()} ${i18n.parameters.get()}</span></div>
      <div>
        <a class="ehvp-custom-btn-green" target="_blank" href="https://github.com/MapoMagpie/comic-looms/blob/9ec4f7970983501ca3c5d8165c455a2654b52bf6/src/img-fetcher.ts#L30">imf</a>
        <a class="ehvp-custom-btn-green" target="_blank" href="https://github.com/MapoMagpie/comic-looms/blob/9ec4f7970983501ca3c5d8165c455a2654b52bf6/src/img-node.ts#L47">imn</a>
        <a class="ehvp-custom-btn-green" target="_blank" href="https://www.tampermonkey.net/documentation.php?locale=en#api:GM_xmlhttpRequest">gm_xhr</a>
        <a class="ehvp-custom-btn-green" target="_blank" href="https://github.com/MapoMagpie/comic-looms/blob/9ec4f7970983501ca3c5d8165c455a2654b52bf6/src/event-bus.ts#L8">EBUS</a>
      </div>
      <div><span style="font-size:1.6em;color:#888;">${i18n.function.get()} ${i18n.body.get()}</span></div>
      <textarea id="ehvp-action-input-funcbody" style="min-width: 60vw; height: 50vh;border:none;background-color:#00000090;color:#97ff97;text-align:left;vertical-align:top;font-size:1.2em;font-weight:600;"></textarea>
      <span id="ehvp-action-add-confirm" style="position:absolute;bottom:2em;right:1em;" class="ehvp-custom-btn ehvp-custom-btn-green">&nbspAdd&nbsp</span>
    </div>

  </div>
</div>
`;
  const fullPanel = document.createElement("div");
  fullPanel.classList.add("ehvp-full-panel");
  fullPanel.innerHTML = HTML_STR;
  const close = () => {
    fullPanel.remove();
    onclose?.();
  };
  fullPanel.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).classList.contains("ehvp-full-panel")) {
      close();
    }
  });
  root.appendChild(fullPanel);
  fullPanel.querySelector(".ehvp-custom-panel-close")!.addEventListener("click", close);


  const actionsContainer = fullPanel.querySelector("#ehvp-image-action-values")!;
  const iconInput = fullPanel.querySelector<HTMLInputElement>("#ehvp-action-input-icon")!;
  const descInput = fullPanel.querySelector<HTMLInputElement>("#ehvp-action-input-desc")!;
  const workonInput = fullPanel.querySelector<HTMLInputElement>("#ehvp-action-input-workon")!;
  const funcbodyInput = fullPanel.querySelector<HTMLTextAreaElement>("#ehvp-action-input-funcbody")!;
  const actionCustomComfirm = fullPanel.querySelector<HTMLButtonElement>("#ehvp-action-add-confirm")!;

  function createActionValues() {
    actionsContainer.innerHTML = "";
    const tamplate = document.createElement("div");
    ADAPTER.conf.imgNodeActions.map(action => {
      const str = `<span class="ehvp-custom-panel-item-value"><span class="ehvp-span-action-icon">${action.icon}</span><span class="ehvp-custom-btn ehvp-custom-btn-plain" style="padding:0;border:none;">&nbspx&nbsp</span></span>`;
      tamplate.innerHTML = str;
      const element = tamplate.firstElementChild as HTMLElement;
      actionsContainer.append(element);
      element.querySelector(".ehvp-custom-btn")!.addEventListener("click", () => {
        const index = ADAPTER.conf.imgNodeActions.findIndex(a => a.icon === action.icon && a.funcBody === action.funcBody);
        if (index === -1) return;
        setActionValue(action);
        ADAPTER.conf.imgNodeActions.splice(index, 1);
        saveConf({ imgNodeActions: ADAPTER.conf.imgNodeActions });
        createActionValues();
      });
      element.querySelector(".ehvp-span-action-icon")!.addEventListener("click", () => setActionValue(action));
    });
    tamplate.remove();
  }

  createActionValues();

  function addActionCustom() {
    const icon = iconInput.value;
    const desc = descInput.value;
    const workon = workonInput.value;
    const funcBody = funcbodyInput.value;
    if (!icon) {
      confirm("icon cannot be empty!");
      return;
    }
    if (!funcBody) {
      confirm("func body cannot be empty!");
      return;
    }
    try {
      const AsyncFunction = async function() { }.constructor;
      AsyncFunction("imf", "imn", "gm_xhr", "EBUS", funcBody);
    } catch (err) {
      confirm("cannot create function (this site limit), " + err);
      return;
    }
    if (workon) {
      try {
        new RegExp(workon);
      } catch (err) {
        confirm("invalid regexp: " + err);
        return;
      }
    }
    ADAPTER.conf.imgNodeActions.push({ icon, description: desc, workon, funcBody });
    saveConf({ imgNodeActions: ADAPTER.conf.imgNodeActions });
    createActionValues();
    fullPanel.querySelector(".ehvp-custom-panel-container")?.scrollTo({ top: 0 });
  }

  function setActionValue(action: ImageActionDesc) {
    iconInput.value = action.icon;
    descInput.value = action.description;
    workonInput.value = action.workon ?? "";
    funcbodyInput.value = action.funcBody;
  }

  fullPanel.querySelectorAll(".ehvp-action-preset-btn").forEach(element => {
    element.addEventListener("click", () => {
      const index = parseInt(element.getAttribute("data-index") ?? "0");
      const action = actionExample(index);
      if (!action) return;
      setActionValue(action);
    });
  });

  funcbodyInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Tab") {
      ev.preventDefault();
      const cursor = funcbodyInput.selectionStart;
      const left = funcbodyInput.value.slice(0, cursor);
      const right = funcbodyInput.value.slice(cursor);
      funcbodyInput.value = left + "  " + right;
      funcbodyInput.selectionStart = cursor + 2;
      funcbodyInput.selectionEnd = cursor + 2;
    }
  });

  actionCustomComfirm.addEventListener("click", () => addActionCustom());
}

function actionExample(index: number): ImageActionDesc | undefined {
  const list: ImageActionDesc[] = [
    {
      icon: "S", description: "Upload this image to local (miniserve --port 14001 --upload-files . .)",
      workon: `e[-x]hentai.org|x.com|pixiv.com`,
      funcBody: `
if (imf.stage === 3 && imf.data) {
  const formData = new FormData();
  formData.append("file", new Blob([imf.data]), imn.title);
  formData.append("path", "/");
  const p = new Promise((resolve, reject) => {
    gm_xhr({
      url: "http://localhost:14001/upload?path=/",
      method: "POST",
      timeout: 10 * 1000,
      data: formData,
      onload: () => resolve(true),
      onabort: () => reject("abort"),
      onerror: (ev) => reject(ev.error),
      ontimeout: () => reject("timeout"),
    });
  });
  await p;
}
  `},
    {
      icon: "换", description: "Download and Replace this image",
      workon: ".*",
      funcBody: `
const p = new Promise((resolve, reject) => {
  gm_xhr({
    url: "https://media.senscritique.com/media/000022161329/0/les_miserables_shoujo_cosette.jpg",
    method: "GET",
    responseType: "blob",
    timeout: 10 * 1000,
    onload: (ev) => resolve(ev.response),
    onabort: () => reject("abort"),
    onerror: (ev) => reject(ev.error),
    ontimeout: () => reject("timeout"),
  });
});
const data = await p;
return {data};
  `},
    {
      icon: "✔", description: "Cherry pick this image",
      funcBody: `EBUS.emit("add-cherry-pick-range", imf.chapterIndex, imf.index, true, false);`
    },
    {
      icon: "✖", description: "Cherry pick but exclude this image",
      funcBody: `EBUS.emit("add-cherry-pick-range", imf.chapterIndex, imf.index, false, false);`
    },
  ];
  return list[index];
}
