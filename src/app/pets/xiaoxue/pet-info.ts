import { PetProfile } from '../../models/pet.model';

/** Images base path for xiaoxue */
const BASE = 'images/pets/xiaoxue';

export const XIAOXUE_PROFILE: PetProfile = {
  id: 'xiaoxue',
  name: '小雪',
  species: '猫',
  breed: '波斯猫',
  gender: '女',
  birthDate: '2016-12-25',
  deathDate: '2025-11-08',
  avatar: `${BASE}/real/avatar.png`,
  pixelAvatar: `${BASE}/pixel/avatar.png`,
  pixelSprite: `${BASE}/pixel/sprite.png`,
  pixelRunning: `${BASE}/pixel/running.png`,
  photos: [
    {
      id: 'p1',
      url: `${BASE}/real/avatar.png`,
      caption: '小雪的肖像照',
      annotation: '像公主一样优雅，蓝色的眼睛像两颗宝石',
      annotationPosition: 'top-right'
    },
    {
      id: 'p2',
      url: `${BASE}/real/window.png`,
      caption: '窗边的小雪',
      annotation: '小雪最喜欢在窗边看雨，安静又美好',
      annotationPosition: 'bottom-right'
    },
    {
      id: 'p3',
      url: `${BASE}/real/play.png`,
      caption: '玩耍中的小雪',
      annotation: '平时高冷，但一碰到毛线球就秒变小傻子',
      annotationPosition: 'top-left'
    }
  ],
  videos: [
    {
      id: 'v1',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      poster: `${BASE}/real/window.png`,
      title: '小雪的日常',
      description: '小雪在窗台晒太阳的悠闲午后',
      annotation: '她总是在这个角落等我回家',
      annotationPosition: 'bottom-left'
    }
  ],
  bio: '小雪是一只美丽的白色波斯猫，在圣诞节出生，如同一份来自天堂的礼物。她拥有一双湛蓝色的眼睛和一身如雪的长毛。虽然外表高冷，但她会在深夜悄悄爬到床边，用温暖的身体依偎着你入睡。她是我们家最优雅的小公主。',
  personality: ['优雅', '高冷', '温柔', '好奇', '安静'],
  favoriteThings: ['窗台晒太阳', '毛线球', '金枪鱼罐头', '纸箱', '被梳毛'],
  ownerMessage: '小雪，你是我收到的最好的圣诞礼物。九年的陪伴，你用无声的温柔治愈了我无数个疲惫的夜晚。愿你在星辰之间，依然是那只最优雅的小公主。永远爱你。',
  theme: 'gentle-love',
  backgroundMusic: `${BASE}/bgm.wav`,
  title: {
    templeName: '傲宗',
    templeNameNote: '一生高贵冷艳，仅在罐头开启时短暂降尊屈贵，修炼出「已读不回」奥义',
    posthumousName: '慧静高冷偶尔撒娇窗台圣洁小雪女皇',
    posthumousNameNote: '慧静——看破一切却懒得理你；高冷——每日仅限三次抚摸配额，超额则挠；偶尔撒娇——凌晨三点准时踩脸；窗台圣洁——称霸全屋最佳观景位长达九年',
    fullTitle: '大喵朝 傲宗 慧静高冷偶尔撒娇窗台圣洁小雪女皇'
  }
};
