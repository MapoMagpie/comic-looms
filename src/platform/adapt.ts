import { Config, getConf, getSiteConfig, SiteConfig } from "../config";
import { Matcher } from "./platform";

export type MatcherSetup = {
  // The name shown in the site profiles UI.
  name: string,
  // URLs on which this script should take effect.
  workURLs: RegExp[],
  // Unused; normally, you can just set it to the site's domain.
  match?: string[],
  // This site's gallery has a finite number of pages, usually fewer than 100,
  // so we can load all pages one by one without waiting for scroll-triggered lazy loading.
  preloadAllPages?: boolean,
  constructor: () => Matcher<any>,
}

export class Adapter {
  ready: Promise<MatcherSetup>;
  private resolve?: (matcher: MatcherSetup) => void;
  // private reject: any;
  matchers: MatcherSetup[];
  matcher?: MatcherSetup;
  conf: Config & { selectedSiteNameConfig?: string };
  globalConf: Config;
  siteConf?: SiteConfig;

  constructor() {
    this.ready = new Promise<MatcherSetup>((resolve, _reject) => this.resolve = resolve);
    this.matchers = [];
    this.globalConf = this.conf = getConf();
  }

  addSetup(setup: MatcherSetup) {
    this.matchers.push(setup);
    this.handleMatcher(setup);
  }

  handleMatcher(setup: MatcherSetup) {
    const siteConf = getSiteConfig(setup.name);
    let workURLs = siteConf.workURLs?.map(regex => new RegExp(regex)) ?? [];
    if (workURLs.length === 0) {
      workURLs = setup.workURLs;
    }
    if (workURLs.find(regex => regex.test(window.location.href))) {
      this.conf = { ...this.conf, ...siteConf };
      this.siteConf = siteConf;
      this.matcher = setup;
      this.resolve?.(setup);
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.ready = new Promise<MatcherSetup>((resolve, _reject) => this.resolve = resolve);
    for (const setup of this.matchers) {
      if (this.handleMatcher(setup)) break;
    }
  }
}

export const ADAPTER = new Adapter();
