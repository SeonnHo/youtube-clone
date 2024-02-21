export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async videos(ids) {
    return this.#videoDetailsByVideoIds(ids);
  }

  async channels(ids) {
    return this.#channelsByChannelIds(ids);
  }

  async relationVideos(id) {
    return this.#relationVideosByCategoryId(id);
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          q: keyword,
        },
      })
      .then((res) => {
        return res.data.items;
      })
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet,contentDetails,statistics',
          maxResults: 25,
          chart: 'mostPopular',
          regionCode: 'KR',
        },
      })
      .then((res) => {
        return res.data.items;
      });
  }

  async #videoDetailsByVideoIds(ids) {
    // 배열의 마지막 인덱스
    const lastIndex = ids.length - 1;

    // 문자열 초기화
    let result = '';

    // 각 아이템을 순회하면서 쉼표를 추가
    ids.forEach((item, index) => {
      // 현재 아이템을 결과 문자열에 추가
      result += item;

      // 현재 인덱스가 마지막이 아닌 경우에만 쉼표 추가
      if (index < lastIndex) {
        result += ',';
      }
    });
    return this.apiClient
      .videoDetails({
        params: {
          part: 'snippet,contentDetails,statistics',
          maxResults: 25,
          id: result,
          type: 'video',
        },
      })
      .then((res) => res.data.items);
  }

  async #channelsByChannelIds(ids) {
    // 배열의 마지막 인덱스
    const lastIndex = ids.length - 1;

    // 문자열 초기화
    let result = '';

    // 각 아이템을 순회하면서 쉼표를 추가
    ids.forEach((item, index) => {
      // 현재 아이템을 결과 문자열에 추가
      result += item;

      // 현재 인덱스가 마지막이 아닌 경우에만 쉼표 추가
      if (index < lastIndex) {
        result += ',';
      }
    });
    return this.apiClient
      .channels({
        params: {
          part: 'snippet,contentDetails,statistics',
          maxResults: 25,
          id: result,
        },
      })
      .then((res) => {
        return res.data.items;
      });
  }

  async #relationVideosByCategoryId(id) {
    console.log('category id : ' + id);
    return this.apiClient
      .relationVideos({
        params: {
          part: 'snippet,contentDetails,statistics',
          maxResults: 25,
          chart: 'mostPopular',
          regionCode: 'KR',
          videoCategoryId: id,
        },
      })
      .then((res) => res.data.items);
  }
}
