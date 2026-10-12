import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode, { NodeAction } from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { evLog } from "../../utils/ev-log";
import { GM_XHR } from "../../utils/query";
import { transactionId, uuid } from "../../utils/random";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";
import { streamHomeLists, observeListRequests } from "./twitter-lists";
import { applyTweetState, readTweetState, trackTweetActions } from "./twitter-action-state";
import { performTweetAction } from "./twitter-actions";

observeListRequests();

type Size = {
  h: number,
  w: number,
}
type VideoInfo = {
  variants: [
    {
      bitrate?: number,
      content_type: string,
      url: string,
    },
  ]
}
type Media = {
  id_str: string,
  expanded_url: string,// href
  media_url_https: string, //img base
  type: "photo" | "video" | "animated_gif",
  sizes: {
    large: Size,
    medium: Size,
    small: Size,
    thumb: Size,
  },
  original_info?: {
    height: number,
    width: number,
  }
  video_info?: VideoInfo,
}
type Legacy = {
  entities: {
    media: Media[],
  },
  id_str: string,
  full_text: string,
  possibly_sensitive: boolean,
  possibly_sensitive_editable: boolean,
  retweeted_status_result: {
    result: {
      legacy?: Legacy,
      tweet?: {
        legacy: Legacy,
      },
      quoted_status_result?: {
        result: ItemResult,
      },
    }
  },
}

type ItemResult = {
  legacy?: Legacy,
  tweet?: {
    legacy: Legacy,
  },
  rest_id?: string,
  quoted_status_result?: {
    result: ItemResult,
  },
  core?: {
    user_results?: {
      result: {
        legacy?: {
          name?: string,
          screen_name?: string,
        }
        core?: {
          name?: string,
          screen_name?: string,
        }
      }
    }
  }
}
type Item = {
  itemContent: {
    tweet_results: {
      result: ItemResult
    },
  }
}
type UserMediaTimeline = {
  entryType: "TimelineTimelineModule"
  items: { item: Item }[],
}
type TimelineTimelineCursor = {
  entryType: "TimelineTimelineCursor"
  value: string,
  cursorType: "Bottom" | "Top",
}
type UserMediaAddToModule = {
  type: "TimelineAddToModule",
  moduleItems: { item: Item }[],
}
type UserMediaEntries = {
  type: "TimelineAddEntries",
  entries: [
    { entryId: string, content: TimelineTimelineCursor | UserMediaTimeline }
  ]
}
type HomeForYouEntries = {
  type: "TimelineAddEntries",
  entries: [
    { entryId: string, content: TimelineTimelineCursor | HomeForYouTweet | HomeConversation }
  ]
}
type HomeForYouTweet = {
  entryType: "TimelineTimelineItem",
  itemContent: Item["itemContent"],
};
type HomeConversation = {
  entryType: "TimelineTimelineModule",
  displayType: "VerticalConversation",
  items: { entryId: string, item: Item }[],
};

type Instructions = [UserMediaAddToModule, UserMediaEntries];

interface TwitterAPIClient {
  fetchChapters(): AsyncGenerator<Chapter[]>;
  next(chapter: Chapter, cursor?: string): Promise<[Item[], string | undefined]>;
}

class TwitterUserMediasAPI implements TwitterAPIClient {
  uuid = uuid();
  userID?: string;

  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    if (window.location.href.includes("/media")) {
      return [new Chapter(1, "User Medias", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg")];
    } else {
      return [
        new Chapter(0, "User Posts", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
        new Chapter(1, "User Media", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg")
      ];
    }
  }

  async next(chapter: Chapter, cursor?: string): Promise<[Item[], string | undefined]> {
    if (!this.userID) this.userID = getUserID();
    if (!this.userID) throw new Error("Cannot obatained User ID");
    let url = "";
    if (chapter.id === 0) {
      const variables = `{"userId":"${this.userID}","count":20,${cursor ? "\"cursor\":\"" + cursor + "\"," : ""}"includePromotedContent":true,"withQuickPromoteEligibilityTweetFields":true,"withVoice":true}`;
      const features = "&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22responsive_web_profile_redirect_enabled%22%3Afalse%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Atrue%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22responsive_web_grok_annotations_enabled%22%3Afalse%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22post_ctas_fetch_enabled%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_imagine_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_community_note_auto_translation_is_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D";
      url = `${window.location.origin}/i/api/graphql/ehYmFq6d3xwc49yqt52MIg/UserTweets?variables=${encodeURIComponent(variables)}${features}`;
    } else {
      const variables = `{"userId":"${this.userID}","count":20,${cursor ? "\"cursor\":\"" + cursor + "\"," : ""}"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true}`;
      const features = "&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22responsive_web_profile_redirect_enabled%22%3Afalse%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Atrue%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22responsive_web_grok_annotations_enabled%22%3Afalse%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22post_ctas_fetch_enabled%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_imagine_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_community_note_auto_translation_is_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D";
      url = `${window.location.origin}/i/api/graphql/MjGtmDI0wpveHq8k2zIlUQ/UserMedia?variables=${encodeURIComponent(variables)}${features}`;
    }
    try {
      const res = await window.fetch(url, { headers: createHeader(this.uuid), signal: AbortSignal.timeout(10000) });
      const json = await res.json();
      if (res.status !== 200 && json?.errors?.[0].message) {
        throw new Error(json?.errors?.[0].message);
      }
      if (chapter.id === 0) {
        const instructions = json.data.user.result.timeline.timeline.instructions as Instructions;
        const entries = instructions.find(ins => ins.type === "TimelineAddEntries") as HomeForYouEntries | undefined;
        if (!entries) throw new Error("Not found TimelineAddEntries");
        const { items, cursor } = homeForYouEntriesToItems(entries);
        return [items, cursor];
      } else {
        const instructions = json.data.user.result.timeline.timeline.instructions as Instructions;
        const items: Item[] = [];
        const addToModule = instructions.find(ins => ins.type === "TimelineAddToModule") as UserMediaAddToModule | undefined;
        const entries = instructions.find(ins => ins.type === "TimelineAddEntries") as UserMediaEntries | undefined;
        if (!entries) {
          throw new Error("Not found TimelineAddEntries");
        }
        if (addToModule) {
          addToModule.moduleItems.forEach(i => items.push(i.item));
        }
        if (items.length === 0) {
          const timelineModule = entries.entries.find(entry => entry.content.entryType === "TimelineTimelineModule")?.content as UserMediaTimeline | undefined;
          timelineModule?.items.forEach(i => items.push(i.item));
        }
        const cursor = (entries.entries.find(entry => entry.content.entryType === "TimelineTimelineCursor" && entry.entryId.startsWith("cursor-bottom"))?.content as TimelineTimelineCursor | undefined)?.value;
        return [items, cursor];
      }
    } catch (error) {
      throw new Error(`twitter api query error: ${error}`);
    }
  }

}

class TwitterListsAPI implements TwitterAPIClient {
  uuid = uuid();
  listID?: string;

  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    return [new Chapter(1, "User Medias", window.location.href)];
  }

  getListID() {
    return window.location.href.match(/i\/lists\/(\d+)$/)?.[1]
  }

  async next(_chapter: Chapter, cursor?: string): Promise<[Item[], string | undefined]> {
    if (!this.listID) this.listID = this.getListID();
    if (!this.listID) throw new Error("Cannot obatained list ID");
    const variables = `{"listId":"${this.listID}","count":20${cursor ? ",\"cursor\":\"" + cursor + "\"" : ""}}`;
    const features = "&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Afalse%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D";
    const url = `${window.location.origin}/i/api/graphql/LSefrrxhpeX8HITbKfWz9g/ListLatestTweetsTimeline?variables=${encodeURIComponent(variables)}${features}`;
    try {
      const res = await window.fetch(url, { headers: createHeader(this.uuid), signal: AbortSignal.timeout(10000) });
      const json = await res.json();
      if (res.status !== 200 && json?.errors?.[0].message) {
        throw new Error(json?.errors?.[0].message);
      }
      const instructions = json.data.list.tweets_timeline.timeline.instructions as Instructions;
      const entries = instructions.find(ins => ins.type === "TimelineAddEntries") as HomeForYouEntries | undefined;
      if (!entries) {
        throw new Error("Not found TimelineAddEntries");
      }
      const { items, cursor } = homeForYouEntriesToItems(entries);
      return [items, cursor];
    } catch (error) {
      throw new Error(`twitter api query error: ${error}`);
    }
  }

}

class TwitterHomeForYouAPI implements TwitterAPIClient {
  listAPIs = new Map<number, TwitterListsAPI>();
  uuid = uuid();
  seenTweetIds: Record<number, string[]> = { 1: [], 2: [], 3: [] };
  chapterCursors: Record<number, string | undefined> = { 1: undefined, 2: undefined, 3: undefined };
  myID?: string;

  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    let chapters = [
      new Chapter(1, "For you", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
      new Chapter(2, "Following", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
      new Chapter(3, "Your Likes", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
    ];
    try {
      let nextID = 100;
      this.listAPIs.clear();
      for await (const lists of streamHomeLists(() => createHeader(this.uuid))) {
        const listChapters = lists.map(list => {
          const id = nextID++;
          const api = new TwitterListsAPI();
          api.listID = list.id;
          this.listAPIs.set(id, api);
          return new Chapter(id, list.name, `${location.origin}/i/lists/${list.id}`, list.cover);
        });
        chapters.push(...listChapters);
        if (chapters.length) yield chapters;
        chapters = [];
      }
    } catch (error) {
      evLog("debug", "Unable to discover X home lists", error);
    }
    if (chapters.length) yield chapters;
  }
  async next(chapter: Chapter, listCursor?: string): Promise<[Item[], string | undefined]> {
    const listAPI = this.listAPIs.get(chapter.id);
    if (listAPI) return listAPI.next(chapter, listCursor);
    const cursor = this.chapterCursors[chapter.id];
    const seenTweetIds_ = this.seenTweetIds[chapter.id];
    const seenTweetIds = seenTweetIds_.slice(-30).map(e => "\"" + e + "\"").join(",");
    const headers = createHeader(this.uuid);
    const [url, body] = (() => {
      if (chapter.id === 1) { // for you
        const url = `${window.location.origin}/i/api/graphql/ci_OQZ2k0rG0Ax_lXRiWVA/HomeTimeline`;
        const cursorStr = cursor ? `"cursor":"${cursor}",` : "";
        const body = `{"variables":{"count":20,${cursorStr}"includePromotedContent":true,"latestControlAvailable":true,"requestContext":"launch","withCommunity":true,"seenTweetIds":[${seenTweetIds}]},"features":{"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false},"queryId":"ci_OQZ2k0rG0Ax_lXRiWVA"}`
        return [url, body];
      } else if (chapter.id === 2) { // following
        const url = `${window.location.origin}/i/api/graphql/HN6oP_7h7HayqyYimz97Iw/HomeLatestTimeline`;
        const cursorStr = cursor ? `"cursor":"${cursor}",` : "";
        const features = `{"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_profile_redirect_enabled":false,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"responsive_web_grok_annotations_enabled":false,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"post_ctas_fetch_enabled":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_imagine_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false}`;
        const body = `{"variables":{"count":20,${cursorStr}"includePromotedContent":true,"enableRanking":false,"seenTweetIds":[${seenTweetIds}]},"features":${features},"queryId":"HN6oP_7h7HayqyYimz97Iw"}`;
        return [url, body];
      } else {
        if (!this.myID) this.myID = getMyID();
        if (!this.myID) throw new Error("cannot find my id from current page");
        const cursorStr = cursor ? `"cursor":"${cursor}",` : "";
        const variables = `{"userId":"${this.myID}","count":20,${cursorStr}"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true}`;
        const features = "&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Afalse%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D";
        const url = `${window.location.origin}/i/api/graphql/uxjTlmrTI61zreSIV1urbw/Likes?variables=${encodeURIComponent(variables)}${features}`;
        return [url, ""];
      }
    })();

    try {
      const h: Record<string, string> = {};
      headers.forEach((v, k) => { h[k] = v });
      // window.fetch on x.com cannot send post query with body, property "body" no permissions
      const text = await new Promise<string>((resolve, reject) => {
        GM_XHR({
          method: (body) ? "POST" : "GET",
          url,
          headers: h,
          data: (body) ? body : undefined,
          timeout: 20000,
          onload: (event) => resolve(event.response),
          ontimeout: () => reject("timeout"),
          onerror: (reason) => reject(reason),
        });
      });
      const json = JSON.parse(text);
      if (json?.errors?.[0].message) {
        throw new Error(json?.errors?.[0].message);
      }
      const instructions = (() => {
        if (chapter.id === 3) {
          if (json?.data?.user?.result?.timeline_v2?.timeline?.instructions) {
            return json.data.user.result.timeline_v2.timeline.instructions as Instructions;
          } else if (json?.data?.user?.result?.timeline?.timeline?.instructions) {
            return json.data.user.result.timeline.timeline.instructions as Instructions;
          } else {
            throw new Error("cannot found: json?.data?.user?.result?.timeline_v2?.timeline?.instructions");
          }
        } else {
          if (!json?.data?.home?.home_timeline_urt?.instructions) {
            throw new Error("cannot found: json?.data?.home?.home_timeline_urt?.instructions");
          }
          const instructions = json.data.home.home_timeline_urt.instructions as Instructions;
          return instructions;
        }
      })();
      const entries = instructions.find(ins => ins.type === "TimelineAddEntries") as HomeForYouEntries | undefined;
      if (!entries) throw new Error("Not found TimelineAddEntries");
      const { items, ids, cursor } = homeForYouEntriesToItems(entries);
      this.seenTweetIds[chapter.id] = ids;
      this.chapterCursors[chapter.id] = cursor;
      return [items, cursor];
    } catch (error) {
      throw new Error(`twitter api query error: ${error}`);
    }
  }

}

class TwitterMatcher extends BaseMatcher<Item[]> {
  postCount: number = 0;
  mediaCount: number = 0;
  api: TwitterAPIClient;
  uuid = uuid();

  constructor() {
    super();
    if (/\/home$/.test(window.location.href)) {
      this.api = new TwitterHomeForYouAPI();
    } else if (/i\/lists\/\d+$/.test(window.location.href)) {
      this.api = new TwitterListsAPI();
    } else {
      this.api = new TwitterUserMediasAPI();
    }
  }

  fetchChapters(): AsyncGenerator<Chapter[]> {
    return this.api.fetchChapters();
  }

  async *fetchPagesSource(chapter: Chapter): AsyncGenerator<Result<Item[]>> {
    let cursor: string | undefined;
    while (true) {
      try {
        const [mediaPage, nextCursor] = await this.api.next(chapter, cursor);
        cursor = nextCursor || "last";
        if (!mediaPage || mediaPage.length === 0) break;
        yield Result.ok(mediaPage);
        if (!nextCursor) break;
      } catch (error) {
        yield Result.err(error as Error);
      }
    }
  }

  async parseImgNodes(items: Item[]): Promise<ImageNode[]> {
    if (!items) throw new Error("warn: cannot find items");
    const list: ImageNode[] = [];
    for (const item of items) {
      const [mediaList, tweetID] = checkoutMedias(item);
      if (mediaList.length === 0) {
        const user = item.itemContent?.tweet_results?.result?.core?.user_results?.result?.legacy?.screen_name ?? item.itemContent?.tweet_results?.result?.core?.user_results?.result?.core?.screen_name;
        const rest_id = item.itemContent.tweet_results.result.rest_id;
        evLog("error", `cannot found mediaList: ${window.location.origin}/${user}/status/${rest_id}`, item);
        continue;
      }
      const actions = this.tweetActions(tweetID, item);
      this.postCount++;
      if (ADAPTER.conf.reverseMultipleImagesPost) {
        mediaList.reverse();
      }
      for (let i = 0; i < mediaList.length; i++) {
        const media = mediaList[i];
        if (ADAPTER.conf.excludeVideo && media.type === "video") {
          continue;
        }
        if (media.type !== "video" && media.type !== "photo" && media.type !== "animated_gif") {
          evLog("error", `Not supported media type: ${media.type}`);
          continue;
        }
        const node = this.mediaNode(media, i, actions);
        list.push(node);
        this.mediaCount++;
      }
    }
    return list;
  }

  private actionsByTweet = new Map<string, NodeAction[]>();

  private tweetActions(tweetID: string | undefined, item: Item): NodeAction[] {
    if (tweetID && this.actionsByTweet.has(tweetID)) return this.actionsByTweet.get(tweetID)!;
    let actionLike: NodeAction | undefined;
    let actionBookmark: NodeAction | undefined;
    if (tweetID) {
      actionLike = new NodeAction("♥", "like this tweet", async () => {
        await performTweetAction("FavoriteTweet", tweetID, () => createHeader(this.uuid));
      });
      actionBookmark = new NodeAction("🔖", "bookmark this tweet", async () => {
        await performTweetAction("CreateBookmark", tweetID, () => createHeader(this.uuid));
      });
      const actions = { like: actionLike, bookmark: actionBookmark };
      applyTweetState(actions, readTweetState(item, tweetID));
      trackTweetActions(tweetID, actions);
      this.actionsByTweet.set(tweetID, [actionLike, actionBookmark]);
    }
    return [actionLike, actionBookmark].filter((action): action is NodeAction => action !== undefined);
  }

  private mediaNode(media: Media, index: number, actions: NodeAction[]) {
    const ext = media.media_url_https.split(".").pop();
    const baseSrc = media.media_url_https.replace(`.${ext}`, "");
    const src = `${baseSrc}?format=${ext}&name=${media.sizes.small ? "small" : "thumb"}`;
    let href = media.expanded_url.replace(/\/(photo|video)\/\d+/, "");
    href = `${href}/${media.type === "video" ? "video" : "photo"}/${index + 1}`
    let largeSrc = "";
    if (ADAPTER.conf.fetchOriginal && media.original_info) {
      // largeSrc = `${baseSrc}?format=${ext}&name=4096x4096`;
      largeSrc = `${baseSrc}?format=${ext}&name=orig`;
    } else {
      largeSrc = `${baseSrc}?format=${ext}&name=${media.sizes.large ? "large" : media.sizes.medium ? "medium" : "small"}`
    }
    const title = `${media.id_str}-${baseSrc.split("/").pop()}.${ext}`
    const wh = { w: media.sizes.small.w, h: media.sizes.small.h };
    const node = new ImageNode(src, href, title, undefined, largeSrc, wh);
    node.actions.push(...actions);

    this.selectVideoVariant(node, media.video_info);
    return node;
  }

  private selectVideoVariant(node: ImageNode, info?: VideoInfo) {
    if (info) {
      let bitrate = 0;
      for (const variant of info.variants) {
        if (variant.bitrate !== undefined && variant.bitrate >= bitrate) {
          bitrate = variant.bitrate;
          node.originSrc = variant.url;
          node.mimeType = variant.content_type;
          node.title = node.title.replace(/\.\w+$/, `.${variant.content_type.split("/")[1]}`);
        }
      }
    }
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

  galleryMeta(): GalleryMeta {
    const userName = window.location.href.match(/(twitter|x).com\/(\w+)\/?/)?.[2];
    return new GalleryMeta(window.location.href, `twitter-${userName || document.title}-${this.postCount}-${this.mediaCount}`);
  }

}

function getMyID(): string | undefined {
  return Array.from(document.querySelectorAll("script"))
    .find((sc) => sc.innerText.startsWith("window.__INITIAL_STATE__"))
    ?.innerText.match(/"id_str":\s?"(\d+)"/)?.[1];
}

function getUserID(): string | undefined {
  const userName = window.location.href.match(/(twitter|x).com\/(\w+)\/?/)?.[2] || "lililjiliijili";
  const followBTNs = Array.from(document.querySelectorAll<HTMLButtonElement>("button[data-testid][aria-label]"));
  if (followBTNs.length === 0) return undefined;
  const theBTN = followBTNs.find(btn => (btn.getAttribute("aria-label") ?? "").toLowerCase().includes(`@${userName.toLowerCase()}`)) || followBTNs[0];
  return theBTN.getAttribute("data-testid")!.match(/(\d+)/)?.[1];
}
// authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
// "cache-control": "no-cache"
// "content-type": "application/json"
// pragma: "no-cache"
// "sec-fetch-dest": "empty"
// "sec-fetch-mode": "cors"
// "sec-fetch-site": "same-origin"
// "x-client-transaction-id": "YWY5Njg3MzMtMjRmZS00MmE0LTk1ZTUtNzgwYTJjN2QyOWY3"
// "x-client-uuid": "9604a155-47c7-4f3b-b17e-004c9c692a89"
// "x-csrf-token": "562a2d3168dc8f5e097859328b33451be1422e2f6285aeaefc3a0692442dea783ff9fdf89ad603cffb8eb0e9884a7d9afb3eccb2a9e26f7b8265fc3fe9846b164088c2e3468bc5fcf4769b614beb8493"
// "x-twitter-active-user": "yes"
// "x-twitter-auth-type": "OAuth2Session"
// "x-twitter-client-language": "en"
function createHeader(uuid: string): Headers {
  const headers = new Headers();
  headers.set("authorization", "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA");
  headers.set("Pragma", "no-cache");
  headers.set("Cache-Control", "no-cache");
  headers.set("content-type", "application/json");
  headers.set("x-client-uuid", uuid);
  headers.set("x-twitter-auth-type", "OAuth2Session");
  headers.set("x-twitter-client-language", "en");
  headers.set("x-twitter-active-user", "yes");
  headers.set("x-client-transaction-id", transactionId());
  headers.set("Sec-Fetch-Dest", "empty");
  headers.set("Sec-Fetch-Mode", "cors");
  headers.set("Sec-Fetch-Site", "same-origin");
  // get cookie for authorization
  const csrfToken = document.cookie.match(/ct0=(\w+)/)?.[1];
  if (!csrfToken) throw new Error("Not found csrfToken");
  headers.set("x-csrf-token", csrfToken);
  return headers;
}

function homeForYouEntriesToItems(entries: HomeForYouEntries): { items: Item[], ids: string[], cursor?: string } {
  const items: Item[] = [];
  const ids: string[] = [];
  let cursor: string | undefined;
  for (const entry of entries.entries) {
    if (entry.content.entryType === "TimelineTimelineItem" && !entry.entryId.startsWith("promoted-")) {
      if (!entry.content.itemContent.tweet_results?.result) {
        continue;
      }
      items.push(entry.content);
      if (entry.content.itemContent.tweet_results.result.legacy?.id_str) {
        ids.push(entry.content.itemContent.tweet_results.result.legacy.id_str);
      }
      if (entry.content.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str) {
        ids.push(entry.content.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str);
      }
    } else if (entry.content.entryType === "TimelineTimelineModule" && entry.content.displayType === "VerticalConversation") {
      entry.content.items.forEach(i => {
        if (i.item.itemContent.tweet_results?.result) {
          items.push(i.item);
          if (i.item.itemContent.tweet_results.result.legacy?.id_str) {
            ids.push(i.item.itemContent.tweet_results.result.legacy?.id_str);
          }
          if (i.item.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str) {
            ids.push(i.item.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str);
          }
        }
      });
    } else if (entry.content.entryType === "TimelineTimelineCursor" && entry.entryId.startsWith("cursor-bottom")) {
      cursor = entry.content.value;
    }
  }
  return { items, ids, cursor };
}

function checkoutMedias(item: Item): [Media[], string | undefined] {
  // item?.itemContent?.tweet_results?.result?.legacy
  // item?.itemContent?.tweet_results?.result?.tweet?.legacy
  // item?.itemContent?.tweet_results?.result?.legacy?.retweeted_status_result?.result?.legacy;
  let media1 = item.itemContent?.tweet_results?.result?.legacy?.entities?.media;
  let media2 = item.itemContent?.tweet_results?.result?.legacy?.retweeted_status_result?.result?.tweet?.legacy?.entities?.media;
  let media3 = item.itemContent?.tweet_results?.result?.legacy?.retweeted_status_result?.result?.legacy?.entities?.media;
  let media4 = item.itemContent?.tweet_results?.result?.tweet?.legacy?.entities?.media;
  let media5 = item.itemContent?.tweet_results?.result?.tweet?.legacy?.retweeted_status_result?.result?.tweet?.legacy?.entities?.media;
  let media6 = item.itemContent?.tweet_results?.result?.tweet?.legacy?.retweeted_status_result?.result?.legacy?.entities?.media;

  const mediaIdSet = new Set();
  let medias = [media1 ?? [], media2 ?? [], media3 ?? [], media4 ?? [], media5 ?? [], media6 ?? [],].flat();
  let ret = [];
  for (const me of medias) {
    if (!mediaIdSet.has(me.id_str)) {
      ret.push(me);
      mediaIdSet.add(me.id_str);
    }
  }

  let tweetId1 = item.itemContent?.tweet_results?.result?.legacy?.id_str;
  let tweetId2 = item.itemContent?.tweet_results?.result?.legacy?.retweeted_status_result?.result?.tweet?.legacy?.id_str;
  let tweetId3 = item.itemContent?.tweet_results?.result?.legacy?.retweeted_status_result?.result?.legacy?.id_str;
  let tweetId4 = item.itemContent?.tweet_results?.result?.tweet?.legacy?.id_str;
  let tweetId5 = item.itemContent?.tweet_results?.result?.tweet?.legacy?.retweeted_status_result?.result?.tweet?.legacy?.id_str;
  let tweetId6 = item.itemContent?.tweet_results?.result?.tweet?.legacy?.retweeted_status_result?.result?.legacy?.id_str;
  let tweewId = tweetId6 ?? tweetId5 ?? tweetId4 ?? tweetId3 ?? tweetId2 ?? tweetId1;
  return [ret, tweewId];

}
ADAPTER.addSetup({
  name: "Twitter | X",
  workURLs: [
    /(\/x|twitter).com\/(?!(explore|notifications|messages|jobs|lists)$|i\/(?!list)|search\?)\w+/
  ],
  match: ["https://x.com/*"],
  constructor: () => new TwitterMatcher(),
});
