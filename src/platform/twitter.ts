import { GM_xmlhttpRequest } from "$";
import { conf } from "../config";
import { GalleryMeta } from "../download/gallery-meta";
import ImageNode from "../img-node";
import { Chapter } from "../page-fetcher";
import { evLog } from "../utils/ev-log";
import { transactionId, uuid } from "../utils/random";
import { BaseMatcher, OriginMeta, Result } from "./platform";

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
type Legacy = {
  entities: {
    media: [
      {
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
        video_info?: VideoInfo,
      },
    ],
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
    }
  },
}
type Item = {
  itemContent: {
    tweet_results: {
      result: {
        legacy?: Legacy,
        tweet?: {
          legacy: Legacy,
        },
        rest_id?: string,
        core?: {
          user_results?: {
            result: {
              legacy?: {
                name?: string,
              }
            }
          }
        }
      }
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
  fetchChapters(): Chapter[];
  next(chapter: Chapter, cursor?: string): Promise<[Item[], string | undefined]>;
}

class TwitterUserMediasAPI implements TwitterAPIClient {
  uuid = uuid();
  userID?: string;

  fetchChapters(): Chapter[] {
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
      const features = "&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Afalse%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D"
      url = `${window.location.origin}/i/api/graphql/q6xj5bs0hapm9309hexA_g/UserTweets?variables=${encodeURIComponent(variables)}${features}`;
    } else {
      const variables = `{"userId":"${this.userID}","count":20,${cursor ? "\"cursor\":\"" + cursor + "\"," : ""}"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true}`;
      const features = "&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_media_interstitial_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D";
      url = `${window.location.origin}/i/api/graphql/aQQLnkexAl5z9ec_UgbEIA/UserMedia?variables=${encodeURIComponent(variables)}${features}`;
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
        const instructions = json.data.user.result.timeline_v2.timeline.instructions as Instructions;
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

  fetchChapters(): Chapter[] {
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
  uuid = uuid();
  seenTweetIds: Record<number, string[]> = { 1: [], 2: [], 3: [] };
  chapterCursors: Record<number, string | undefined> = { 1: undefined, 2: undefined, 3: undefined };
  myID?: string;

  fetchChapters(): Chapter[] {
    return [
      new Chapter(1, "For you", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
      new Chapter(2, "Following", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
      new Chapter(3, "Your Likes", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
    ];
  }
  async next(chapter: Chapter): Promise<[Item[], string | undefined]> {
    const cursor = this.chapterCursors[chapter.id];
    const seenTweetIds = this.seenTweetIds[chapter.id].map(e => "\"" + e + "\"").join(",");
    const headers = createHeader(this.uuid);
    const [url, body] = (() => {
      if (chapter.id === 1) { // for you
        const url = `${window.location.origin}/i/api/graphql/ci_OQZ2k0rG0Ax_lXRiWVA/HomeTimeline`;
        const cursorStr = cursor ? `"cursor":"${cursor}",` : "";
        const body = `{"variables":{"count":20,${cursorStr}"includePromotedContent":true,"latestControlAvailable":true,"requestContext":"launch","withCommunity":true,"seenTweetIds":[${seenTweetIds}]},"features":{"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false},"queryId":"ci_OQZ2k0rG0Ax_lXRiWVA"}`
        return [url, body];
      } else if (chapter.id === 2) { // following
        const url = `${window.location.origin}/i/api/graphql/nMyTQqsJiUGBKLGNSQamAA/HomeLatestTimeline`;
        const cursorStr = cursor ? `"cursor":"${cursor}",` : "";
        // const body = `{"variables":{"count":20,${cursorStr}"includePromotedContent":true,"latestControlAvailable":true,"seenTweetIds":[${seenTweetIds}]},"features":{"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false},"queryId":"nMyTQqsJiUGBKLGNSQamAA"}`;
        const body = `{"variables":{"count":20,${cursorStr}"includePromotedContent":true,"latestControlAvailable":true,"seenTweetIds":[${seenTweetIds}]},"features":{"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false},"queryId":"nMyTQqsJiUGBKLGNSQamAA"}`;
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
        GM_xmlhttpRequest({
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

export class TwitterMatcher extends BaseMatcher<Item[]> {
  name(): string {
    return "Twitter | X";
  }
  postCount: number = 0;
  mediaCount: number = 0;
  api: TwitterAPIClient;

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

  async fetchChapters(): Promise<Chapter[]> {
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
      const mediaList = item?.itemContent?.tweet_results?.result?.legacy?.entities?.media
        || item?.itemContent?.tweet_results?.result?.tweet?.legacy?.entities?.media
        || item?.itemContent?.tweet_results?.result?.legacy?.retweeted_status_result?.result?.legacy?.entities?.media;
      if (mediaList === undefined) {
        const user = item.itemContent?.tweet_results?.result?.core?.user_results?.result?.legacy?.name;
        const rest_id = item.itemContent.tweet_results.result.rest_id;
        evLog("error", `cannot found mediaList: ${window.location.origin}/${user}/status/${rest_id}`, item);
        continue;
      }
      this.postCount++;
      if (conf.reverseMultipleImagesPost) {
        mediaList.reverse();
      }
      for (let i = 0; i < mediaList.length; i++) {
        const media = mediaList[i];
        if (conf.excludeVideo && media.type === "video") {
          continue;
        }
        if (media.type !== "video" && media.type !== "photo" && media.type !== "animated_gif") {
          evLog("error", `Not supported media type: ${media.type}`);
          continue;
        }
        const ext = media.media_url_https.split(".").pop();
        const baseSrc = media.media_url_https.replace(`.${ext}`, "");
        const src = `${baseSrc}?format=${ext}&name=${media.sizes.small ? "small" : "thumb"}`;
        let href = media.expanded_url.replace(/\/(photo|video)\/\d+/, "");
        href = `${href}/${media.type === "video" ? "video" : "photo"}/${i + 1}`
        const largeSrc = `${baseSrc}?format=${ext}&name=${media.sizes.large ? "large" : media.sizes.medium ? "medium" : "small"}`
        const title = `${media.id_str}-${baseSrc.split("/").pop()}.${ext}`
        const wh = { w: media.sizes.small.w, h: media.sizes.small.h };
        const node = new ImageNode(src, href, title, undefined, largeSrc, wh);
        if (media.video_info) {
          let bitrate = 0;
          for (const variant of media.video_info.variants) {
            if (variant.bitrate !== undefined && variant.bitrate >= bitrate) {
              bitrate = variant.bitrate;
              node.originSrc = variant.url;
              node.mimeType = variant.content_type;
              node.title = node.title.replace(/\.\w+$/, `.${variant.content_type.split("/")[1]}`);
            }
          }
        }
        list.push(node);
        this.mediaCount++;
      }
    }
    return list;
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

  workURL(): RegExp {
    return /(\/x|twitter).com\/(?!(explore|notifications|messages|jobs|lists)$|i\/(?!list)|search\?)\w+/;
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
      items.push(entry.content);
      if (entry.content.itemContent.tweet_results.result.legacy?.id_str) {
        ids.push(entry.content.itemContent.tweet_results.result.legacy.id_str);
      }
      if (entry.content.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str) {
        ids.push(entry.content.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str);
      }
    } else if (entry.content.entryType === "TimelineTimelineModule" && entry.content.displayType === "VerticalConversation") {
      entry.content.items.forEach(i => {
        items.push(i.item);
        if (i.item.itemContent.tweet_results.result.legacy?.id_str) {
          ids.push(i.item.itemContent.tweet_results.result.legacy?.id_str);
        }
        if (i.item.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str) {
          ids.push(i.item.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str);
        }
      });
    } else if (entry.content.entryType === "TimelineTimelineCursor" && entry.entryId.startsWith("cursor-bottom")) {
      cursor = entry.content.value;
    }
  }
  return { items, ids, cursor };
}
