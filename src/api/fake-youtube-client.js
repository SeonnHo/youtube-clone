import axios from 'axios';

export default class FakeYoutubeClient {
  async search() {
    return axios.get('/data/search.json');
  }

  async videos() {
    return axios.get('/data/popular.json');
  }

  async videoDetails() {
    return axios.get('/data/video-detail.json');
  }

  async channels() {
    return axios.get('/data/channels.json');
  }

  async relationVideos() {
    return axios.get('/data/relation-video.json');
  }
}
