export interface YoutubeSearchSnippet {
  title: string;
  channelTitle: string;
  thumbnails: {
    medium: {
      url: string;
    };
  };
}

export interface YoutubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: YoutubeSearchSnippet;
}
