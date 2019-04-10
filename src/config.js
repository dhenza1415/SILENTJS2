const { hostname, platform } = require('os');

const whichPlatform = platform() === 'DHENZA' ? 'MAC' : 'win32';

const config = {
  LINE_DOMAIN: 'gd2.line.naver.jp',
  LINE_DOMAIN_2ND: 'gd2.line.naver.jp',
  LINE_DOMAIN_3RD: 'gfs.line.naver.jp', 
  LINE_DOMAIN_4TH: 'gfps.line.naver.jp',
  LINE_KEEP_X: '/r/keep/p/', //https://obs-sg.line-apps.com/r/keep/p/1508751723510tffffffff
  LINE_KEEP: '/kp/api/v21/keep', //Keep -> gfs.line.naver.jp/kp/api/v21/keep/sync.json?revision=0&limit=50&serviceType=1 || fetch.json?startRevision=0&limit=50&serviceType=1
  LINE_OS_URL: 'os.line.naver.jp',
  LINE_HTTP_URL: '/api/v4/TalkService.do',
  LINE_HTTP_URL_2ND: '/api/v3/TalkService.do',
  LINE_RS: '/api/v4p/rs',
  LINE_STICKER_URL: 'dl.stickershop.line.naver.jp/products/',
  LINE_API_QUERY_PATH_SEC: '/F4',
  LINE_POLL_QUERY_PATH_SEC: '/E4',
  LINE_POLL_QUERY_PATH_THI: '/H4',
  LINE_NORMAL_POLL_QUERY_PATH: '/NP4',
  LINE_COMPACT_MESSAGE_QUERY_PATH: '/C5',
  LINE_CALL_QUERY_PATH: '/V4',
  LINE_POLL_URL: '/P4',
  LINE_POLL_URL_2ND: '/P3',
  LINE_COMMAND_PATH: '/S4',
  LINE_COMMAND_PATH_2: '/S3',
  LINE_CERTIFICATE_URL: '/Q',
  LINE_SQUARE_PATH: '/SQS1',
  LINE_CPF: '/CPF', //What is this ?
  LINE_CHANNEL_PATH: '/CH4',
  LINE_SHOP_PATH: '/SHOP4',
  LINE_SESSION_LINE_URL: '/authct/v1/keys/line',
  LINE_SESSION_NAVER_URL: '/authct/v1/keys/naver',
  LINE_POST_CONTENT_URL: 'https://os.line.naver.jp/talk/m/upload.nhn',
  LINE_POST_CONTENT_URL_2ND: 'https://obs-sg.line-apps.com/talk/m/upload.nhn',
  X_LINE_APP: 'IOSIPAD\t8.11.0\tDhenza-PC\t8.11.0',
  ip: '11.2.5',
  version: '0.0.2',
  revision: 0,
  hostname: hostname(),
  platform: whichPlatform,
  EMAIL_REGEX: /[^@]+@[^@]+\.[^@]+/,
  Headers: {
    'User-Agent':'Line/8.11.0'
  },
  FILE_DOWNLOAD_LOCATION: '/../download/',
  YT_DL: 'http://www.saveitoffline.com/process/',
  tokenn: '',
  chanToken: '',
  certificate: '',
  botmid: '',
  doing: 'no'
};

module.exports = config;