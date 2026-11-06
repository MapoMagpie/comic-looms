import { saveConf } from "../config";
import { i18n } from "../utils/i18n";
import parseKey from "../utils/keyboard";
import { AppEventDesc, AppEvents, AppEventIDInBigImgFrame, AppEventIDInFullViewGrid, AppEventIDInMain } from "./event";
import { ADAPTER } from "../platform/adapt";

type Category = keyof typeof ADAPTER.conf.keyboards;
type ID = AppEventIDInBigImgFrame;
type IDKeys = { [key in ID]?: string[] }
type IDDesc = { [key in ID]: AppEventDesc }


export default function createKeyboardCustomPanel(keyboardEvents: AppEvents, root: HTMLElement, onclose?: () => void) {

  function addKeyboardDescElement(button: HTMLElement, category: Category, id: ID, key: string) {
    const str = `<span data-id="${id}" data-key="${key}" class="ehvp-custom-panel-item-value"><span>${key}</span><span class="ehvp-custom-btn ehvp-custom-btn-plain" style="padding:0;border:none;">&nbspx&nbsp</span></span>`;
    const tamplate = document.createElement("div");
    tamplate.innerHTML = str;
    const element = tamplate.firstElementChild as HTMLElement;
    button.before(element);
    element.querySelector(".ehvp-custom-btn")!.addEventListener("click", (event) => {
      // try to remove key from conf
      const keys = (ADAPTER.conf.keyboards[category] as IDKeys)[id];
      if (keys && keys.length > 0) {
        const index = keys.indexOf(key);
        if (index !== -1) keys.splice(index, 1);
        if (keys.length === 0) {
          delete (ADAPTER.conf.keyboards[category] as IDKeys)[id];
        }
        saveConf({ keyboards: ADAPTER.conf.keyboards });
      }
      (event.target as HTMLElement).parentElement!.remove();
      // restore default keys
      const values = Array.from(button.parentElement!.querySelectorAll(".ehvp-custom-panel-item-value"));
      if (values.length === 0) {
        const desc = (keyboardEvents[category] as IDDesc)[id];
        desc.defaultKeys.forEach((key) => addKeyboardDescElement(button, category, id, key));
      }
    });
    tamplate.remove();
  }

  const HTML_STR = `
<div class="ehvp-custom-panel">
  <div class="ehvp-custom-panel-title">
    <span>${i18n.showKeyboard.get()}</span>
    <span id="ehvp-custom-panel-close" class="ehvp-custom-panel-close">✖</span>
  </div>
  <div class="ehvp-custom-panel-container">
    <div class="ehvp-custom-panel-content">
      ${Object.entries(keyboardEvents.inMain).filter(entry => !entry[1].noKeyboard).map(([id]) => `
        <div class="ehvp-custom-panel-item">
         <div class="ehvp-custom-panel-item-title">
           <span>${i18n.keyboard[id as AppEventIDInMain].get()}</span>
         </div>
         <div class="ehvp-custom-panel-item-values">
           <!-- wait element created from button event -->
           <button class="ehvp-add-keyboard-btn ehvp-custom-btn ehvp-custom-btn-green" style="margin-left: 0.2em;" data-cate="inMain" data-id="${id}">+</button>
         </div>
        </div>
      `).join("")}
    </div>
    <div class="ehvp-custom-panel-content">
      ${Object.entries(keyboardEvents.inFullViewGrid).filter(entry => !entry[1].noKeyboard).map(([id]) => `
        <div class="ehvp-custom-panel-item">
         <div class="ehvp-custom-panel-item-title">
           <span>${i18n.keyboard[id as AppEventIDInFullViewGrid].get()}</span>
         </div>
         <div class="ehvp-custom-panel-item-values">
           <!-- wait element created from button event -->
           <button class="ehvp-add-keyboard-btn ehvp-custom-btn ehvp-custom-btn-green" style="margin-left: 0.2em;" data-cate="inFullViewGrid" data-id="${id}">+</button>
         </div>
        </div>
      `).join("")}
    </div>
    <div class="ehvp-custom-panel-content">
      ${Object.entries(keyboardEvents.inBigImageMode).filter(entry => !entry[1].noKeyboard).map(([id]) => `
        <div class="ehvp-custom-panel-item">
         <div class="ehvp-custom-panel-item-title">
           <span>${i18n.keyboard[id as AppEventIDInBigImgFrame].get()}</span>
         </div>
         <div class="ehvp-custom-panel-item-values">
           <!-- wait element created from button event -->
           <button class="ehvp-add-keyboard-btn ehvp-custom-btn ehvp-custom-btn-green" style="margin-left: 0.2em;display:inline-block;" data-cate="inBigImageMode" data-id="${id}">+</button>
         </div>
        </div>
      `).join("")}
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
  fullPanel.querySelectorAll<HTMLElement>(".ehvp-add-keyboard-btn").forEach(button => {
    const category = button.getAttribute("data-cate") as Category;
    const id = button.getAttribute("data-id") as ID;
    let keys = (ADAPTER.conf.keyboards[category] as IDKeys)[id];
    if (keys === undefined || keys.length === 0) {
      keys = (keyboardEvents[category] as IDDesc)[id].defaultKeys;
    }
    keys.forEach((key) => addKeyboardDescElement(button, category, id, key));
    const addKeyBoardDesc = (event: KeyboardEvent | MouseEvent) => {
      event.preventDefault();
      if (event instanceof KeyboardEvent) {
        const checkKey = event.key.toLowerCase();
        if (checkKey === "alt" || checkKey === "shift" || checkKey === "control" || checkKey === "meta") return;
      }
      const key = parseKey(event);
      if ((ADAPTER.conf.keyboards[category] as IDKeys)[id] !== undefined) {
        (ADAPTER.conf.keyboards[category] as IDKeys)[id]!.push(key);
      } else {
        (ADAPTER.conf.keyboards[category] as IDKeys)[id] = keys!.concat(key);
      }
      saveConf({ keyboards: ADAPTER.conf.keyboards });
      addKeyboardDescElement(button, category, id, key);
      button.textContent = "+";
      button.removeAttribute("d-pressing");
      button.removeEventListener("keyup", addKeyBoardDesc);
      button.removeEventListener("mouseup", addKeyBoardDesc);
    };
    button.addEventListener("click", (event) => {
      event.preventDefault();
      button.textContent = "Press Key";
      button.setAttribute("d-pressing", "");
      button.addEventListener("keyup", addKeyBoardDesc, { once: false });
      button.addEventListener("mouseup", addKeyBoardDesc, { once: false });
    });
    button.addEventListener("mouseleave", () => {
      button.textContent = "+";
      button.removeAttribute("d-pressing");
      button.removeEventListener("keyup", addKeyBoardDesc);
      button.removeEventListener("mouseup", addKeyBoardDesc);
    });
  });
}
