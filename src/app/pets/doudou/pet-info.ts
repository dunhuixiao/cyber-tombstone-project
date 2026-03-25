import { PetProfile } from '../../models/pet.model';

/** Images base path for doudou */
const BASE = 'images/pets/doudou';

export const DOUDOU_PROFILE: PetProfile = {
  id: 'doudou',
  name: '豆豆',
  species: '犬',
  breed: '柯基犬',
  gender: '男',
  birthDate: '2017-06-10',
  deathDate: '2026-02-14',
  avatar: `${BASE}/real/avatar.png`,
  pixelAvatar: `${BASE}/pixel/avatar.png`,
  pixelSprite: `${BASE}/pixel/sprite.png`,
  pixelRunning: `${BASE}/pixel/running.png`,
  photos: [
    {
      id: 'p1',
      url: `${BASE}/real/avatar.png`,
      caption: '豆豆的标准证件照',
      annotation: '短腿小王子，永远一脸严肃地卖萌',
      annotationPosition: 'top-right'
    },
    {
      id: 'p2',
      url: `${BASE}/real/sofa.png`,
      caption: '霸占沙发的豆豆',
      annotation: '这是他的王座，谁坐都不行',
      annotationPosition: 'bottom-left'
    },
    {
      id: 'p3',
      url: `${BASE}/real/food.png`,
      caption: '偷吃现场',
      annotation: '被抓到偷吃红薯，毫无悔意',
      annotationPosition: 'top-left'
    }
  ],
  videos: [
    {
      id: 'v1',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      poster: `${BASE}/real/sofa.png`,
      title: '豆豆的日常巡逻',
      description: '豆豆每天都要在家里巡逻三圈，确认领地安全',
      annotation: '短腿跑起来像一颗移动的面包',
      annotationPosition: 'bottom-right'
    }
  ],
  bio: '豆豆是一只圆滚滚的柯基犬，拥有一对雷达般的大耳朵和世界上最短但最有力的四条腿。他是家里的"沙发守护者"，任何人想坐沙发都必须先经过他的审批。他对红薯有着近乎疯狂的执念，能在三个房间之外闻到烤红薯的香气。虽然腿短跑不快，但他永远是第一个冲到饭盆前的选手。他用八年的陪伴，把每一天都过成了欢乐的节日。',
  personality: ['贪吃', '倔强', '护食', '爱撒娇', '胆小'],
  favoriteThings: ['烤红薯', '霸占沙发', '巡逻领地', '拆快递', '趴在脚边'],
  ownerMessage: '豆豆，你是我见过最倔强也最可爱的小短腿。谢谢你用八年时间，把家里的每个角落都变成了充满欢笑的地方。你走了以后，沙发终于空出来了，可是再也没有人会因为我坐上去而冲我哼哼唧唧了。想你，我的小面包。',
  theme: 'warm-sunset',
  backgroundMusic: `${BASE}/bgm.wav`,
  title: {
    templeName: '薯宗',
    templeNameNote: '一生痴迷烤红薯，三室之外即可闻香而动，修炼出「隔墙嗅薯」绝技',
    posthumousName: '倔强贪薯霸座如王巡疆拆盒豆豆大帝',
    posthumousNameNote: '倔强——八年不改脾性，拉都拉不动的散步选手；贪薯——对烤红薯执念深重，三室之外即可锁定薯香；霸座如王——沙发乃龙椅，敢坐者必遭哼唧抗议；巡疆拆盒——日巡领地三圈，顺手拆毁一切快递包装',
    fullTitle: '大豆朝 薯宗 倔强贪薯霸座如王巡疆拆盒豆豆大帝'
  },
  epitaph: '腿虽短，爱很长，八年守护，一生面包'
};
