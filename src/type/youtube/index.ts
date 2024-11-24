export interface YoutubeSearchSnippet {
  title: string;
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
