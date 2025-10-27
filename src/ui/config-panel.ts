import { ConfigBooleanType, ConfigTextType, ConfigItem, ConfigItems, ConfigNumberType, ConfigSelectType, defaultConf, resetConf } from "../config";
import { ADAPTER } from "../platform/adapt";
import { I18nValue, i18n } from "../utils/i18n";
import q from "../utils/query-element";
import relocateElement from "../utils/relocate-element";
import { Events } from "./event";

export class ConfigPanel {
  root: HTMLElement;
  panel: HTMLElement;
  configSelect: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.panel = q("#config-panel", root);

    this.configSelect = q("#config-a-select", root);
  }

  initEvents(events: Events) {
    this.flushConfigItems(events);

    this.configSelect.addEventListener("click", (event) => {
      const value = (event.target as HTMLElement).getAttribute("data-value");
      if (value) {
        ADAPTER.conf.selectedSiteNameConfig = value === "global" ? undefined : value;
        console.log("ADAPTER.conf.selectedSiteNameConfig: ", ADAPTER.conf.selectedSiteNameConfig);
        Array.from(this.configSelect.querySelectorAll(".b-main-option")).forEach((element) => {
          if (element.getAttribute("data-value") === ADAPTER.conf.selectedSiteNameConfig) {
            element.classList.add("b-main-option-selected");
          } else if (element.getAttribute("data-value") === "global" && ADAPTER.conf.selectedSiteNameConfig === undefined) {
            element.classList.add("b-main-option-selected");
          } else {
            element.classList.remove("b-main-option-selected");
          }
        });
        this.flushConfigItems(events);
      }
    });

    q("#show-guide-element", this.panel).addEventListener("click", events.showGuideEvent);
    q("#show-keyboard-custom-element", this.panel).addEventListener("click", events.showKeyboardCustomEvent);
    q("#show-site-profiles-element", this.panel).addEventListener("click", events.showSiteProfilesEvent);
    q("#show-style-custom-element", this.panel).addEventListener("click", events.showStyleCustomEvent);
    q("#show-action-custom-element", this.panel).addEventListener("click", events.showActionCustomEvent);
    q("#reset-config-element", this.panel).addEventListener("click", () => {
      const selectedConfig = ADAPTER.conf.selectedSiteNameConfig;
      if (resetConf(selectedConfig)) {
        ADAPTER.conf = ADAPTER.globalConf = selectedConfig ? ADAPTER.globalConf : defaultConf();
        ADAPTER.conf.selectedSiteNameConfig = selectedConfig;
        this.flushConfigItems(events);
      }
    });
  }

  flushConfigItems(events: Events) {
    const header = q("#config-panel-header", this.panel);
    Array.from(this.panel.querySelectorAll<HTMLElement>(".config-panel-item")).forEach(elem => elem.remove());
    const nodes = ConfigItems.map(createOption).map(str => {
      const template = document.createElement("template");
      template.innerHTML = str.trim();
      return template.content.firstElementChild!;
    });
    header.after(...nodes);
    // modify config event
    ConfigItems.forEach(item => {
      switch (item.typ) {
        case "number":
          q(`#${item.key}MinusBTN`, this.panel).addEventListener("click", () => events.modNumberConfigEvent(item.key as ConfigNumberType, 'minus'));
          q(`#${item.key}AddBTN`, this.panel).addEventListener("click", () => events.modNumberConfigEvent(item.key as ConfigNumberType, 'add'));
          q(`#${item.key}Input`, this.panel).addEventListener("wheel", (event: WheelEvent) => {
            event.preventDefault();
            if (event.deltaY < 0) {
              events.modNumberConfigEvent(item.key as ConfigNumberType, 'add');
            } else if (event.deltaY > 0) {
              events.modNumberConfigEvent(item.key as ConfigNumberType, 'minus');
            }
          });
          break;
        case "boolean":
          q(`#${item.key}Checkbox`, this.panel).addEventListener("click", () => events.modBooleanConfigEvent(item.key as ConfigBooleanType));
          break;
        case "select":
          q(`#${item.key}Select`, this.panel).addEventListener("change", () => events.modSelectConfigEvent(item.key as ConfigSelectType));
          break;
        case "input":
          q(`#${item.key}TextInput`, this.panel).addEventListener("change", () => events.modTextConfigEvent(item.key as ConfigTextType));
          break;
      }
    });
    // tooltip hovering
    this.panel.querySelectorAll<HTMLElement>(".p-tooltip").forEach(element => {
      const child = element.querySelector<HTMLElement>(".p-tooltiptext");
      if (!child) return;
      element.addEventListener("mouseenter", () => {
        child.style.display = "block";
        relocateElement(child, element, this.root.offsetWidth, this.root.offsetHeight);
      });
      element.addEventListener("mouseleave", () => child.style.display = "none");
    });
  }

  static html() {
    return `
<div id="config-panel" class="p-panel p-config p-collapse">
    <div id="config-panel-header" style="position: sticky;border: 1px solid black;grid-column-start: 1;grid-column-end: 11;padding: 0px 0.3em;top: 0;z-index: 1;background-color: #33333390">
      <div id="config-a-select"
      ><a class="b-main-option clickable ${ADAPTER.conf.selectedSiteNameConfig === undefined ? "b-main-option-selected" : ""}" data-value="global">${i18n.global.get()}</a
      ><a class="b-main-option clickable ${ADAPTER.conf.selectedSiteNameConfig === ADAPTER.matcher!.name ? "b-main-option-selected" : ""}" data-value="${ADAPTER.matcher!.name}">${ADAPTER.matcher!.name}</a></div>
    </div>

    <!-- config items will place here -->
    <div style="grid-column-start: 1; grid-column-end: 11; padding-left: 5px;">
        <label class="p-label">
            <span>${i18n.dragToMove.get()}:</span>
            <span id="dragHub" style="font-size: 1.85rem;cursor: grab;">✠</span>
        </label>
    </div>
    <div style="grid-column-start: 1; grid-column-end: 11; padding-left: 5px; text-align: left;">
         <a id="show-guide-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showHelp.get()}</a>
         <a id="show-keyboard-custom-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showKeyboard.get()}</a>
         <a id="show-site-profiles-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showSiteProfiles.get()}</a>
         <a id="show-style-custom-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showStyleCustom.get()}</a>
         <a id="show-action-custom-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showActionCustom.get()}</a>
         <a id="reset-config-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.resetConfig.get()}</a>
         <a class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;" href="https://github.com/MapoMagpie/comic-looms" target="_blank">${i18n.letUsStar.get()}</a>
    </div>
</div>`;
  }
}

function createOption(item: ConfigItem) {
  const i18nKey = item.i18nKey || item.key;
  const i18nValue = (i18n as any)[i18nKey] as I18nValue;
  const i18nValueTooltip = (i18n as any)[`${i18nKey}Tooltip`] as I18nValue;
  if (!i18nValue) {
    throw new Error(`i18n key ${i18nKey} not found`);
  }
  let display = true;
  if (item.displayInSite) {
    display = item.displayInSite.test(location.href);
  }

  const conf = ADAPTER.conf.selectedSiteNameConfig ? ADAPTER.conf : ADAPTER.globalConf;

  let input = "";
  switch (item.typ) {
    case "boolean":
      input = `<input id="${item.key}Checkbox" ${conf[item.key as ConfigBooleanType] ? "checked" : ""} type="checkbox" />`;
      break;
    case "number":
      input = `<span>
                  <button id="${item.key}MinusBTN" class="p-btn" type="button">-</button>
                  <input id="${item.key}Input" value="${conf[item.key as ConfigNumberType]}" disabled type="text" />
                  <button id="${item.key}AddBTN" class="p-btn" type="button">+</button></span>`;
      break;
    case "select":
      if (!item.options) {
        throw new Error(`options for ${item.key} not found`);
      }
      const optionsStr = item.options.map(o => `<option value="${o.value}" ${conf[item.key as ConfigSelectType] == o.value ? "selected" : ""}>${o.display}</option>`).join("");
      input = `<select id="${item.key}Select">${optionsStr}</select>`;
      break;
    case "input":
      input = `<span><input id="${item.key}TextInput" ${conf[item.key as ConfigTextType] ? "value=" + conf[item.key] : ""} class="text-input" placeholder="${item.placeholder ?? ""}" type="text" /></span>`
      break;

  }
  const [start, end] = item.gridColumnRange ? item.gridColumnRange : [1, 11];
  return `<div class="config-panel-item" style="grid-column-start: ${start}; grid-column-end: ${end}; padding-left: 5px;${display ? "" : " display: none;"}"><label class="p-label"><span><span>${i18nValue.get()}</span><span class="p-tooltip">${i18nValueTooltip ? " ?:" : " :"}<span class="p-tooltiptext">${i18nValueTooltip?.get() || ""}</span></span></span>${input}</label></div>`;
}
