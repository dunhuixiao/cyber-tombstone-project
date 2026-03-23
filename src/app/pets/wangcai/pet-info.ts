import { PetProfile } from '../../models/pet.model';

/** Images base path for wangcai */
const BASE = 'images/pets/wangcai';

export const WANGCAI_PROFILE: PetProfile = {
  id: 'wangcai',
  name: '旺财',
  species: '犬',
  breed: '金毛寻回犬',
  gender: '男',
  birthDate: '2012-03-15',
  deathDate: '2025-01-20',
  avatar: `${BASE}/real/avatar.png`,
  pixelAvatar: `${BASE}/pixel/avatar.png`,
  pixelSprite: `${BASE}/pixel/sprite.png`,
  pixelRunning: `${BASE}/pixel/running.png`,
  photos: [
    {
      id: 'p1',
      url: `${BASE}/real/avatar.png`,
      caption: '旺财的官方证件照',
      annotation: '这是旺财最帅的一张照片，眼睛里满是温柔',
      annotationPosition: 'top-right'
    },
    {
      id: 'p2',
      url: `${BASE}/real/park.png`,
      caption: '在公园里奔跑',
      annotation: '旺财最喜欢在阳光下奔跑，每次都跑得比风还快',
      annotationPosition: 'bottom-left'
    },
    {
      id: 'p3',
      url: `${BASE}/real/sleep.png`,
      caption: '午后的小憩',
      annotation: '睡着的旺财像个天使，会打小小的呼噜',
      annotationPosition: 'top-right'
    }
  ],
  videos: [
    {
      id: 'v1',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      poster: `${BASE}/real/park.png`,
      title: '旺财在公园玩耍',
      description: '2024年春天，旺财在公园里追蝴蝶',
      annotation: '这是旺财最后一个春天的影像记录',
      annotationPosition: 'top-right'
    }
  ],
  bio: '旺财是一只温暖而忠诚的金毛寻回犬。它陪伴了我们整整 12 年，从一只毛绒绒的小奶狗长成了一位沉稳的老绅士。它喜欢在阳光下打盹，喜欢追逐公园里的蝴蝶，更喜欢依偎在家人身边。旺财用它的一生教会了我们什么是无条件的爱。',
  personality: ['温顺', '忠诚', '活泼', '贪吃', '黏人'],
  favoriteThings: ['晒太阳', '追蝴蝶', '啃骨头', '散步', '被挠下巴'],
  ownerMessage: '亲爱的旺财，谢谢你用 12 年的时间，教会我什么是纯粹的爱。你虽然离开了，但在我心里你永远是那个欢快摇尾巴的小家伙。彩虹桥的那一边，要继续快乐地奔跑哦。',
  theme: 'warm-sunset',
  backgroundMusic: `${BASE}/bgm.wav`,
  title: {
    templeName: '馋宗',
    templeNameNote: '一生以嘴为尊，见食物双眼放光，修炼出「隔空闻骨」绝技',
    posthumousName: '忠烈贪嘴摇尾如风黏人圣善旺财大帝',
    posthumousNameNote: '忠烈——守门十二载，仅对快递员狂吠不止；贪嘴——曾一口吞下整根火腿肠，连包装都没放过；摇尾如风——尾巴摆动频率可发电；黏人——超过三分钟不摸就开始哼唧',
    fullTitle: '大旺朝 馋宗 忠烈贪嘴摇尾如风黏人圣善旺财大帝'
  },
  epitaph: '十二年守护，一生忠诚，愿你彩虹桥上继续追逐蝴蝶'
};
