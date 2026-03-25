import { PetProfile } from '../../models/pet.model';

/** Images base path for tuanzi */
const BASE = 'images/pets/tuanzi';

export const TUANZI_PROFILE: PetProfile = {
  id: 'tuanzi',
  name: '团子',
  species: '兔',
  breed: '荷兰垂耳兔',
  gender: '女',
  birthDate: '2019-09-01',
  deathDate: '2026-01-05',
  avatar: `${BASE}/real/avatar.png`,
  pixelAvatar: `${BASE}/pixel/avatar.png`,
  pixelSprite: `${BASE}/pixel/sprite.png`,
  pixelRunning: `${BASE}/pixel/running.png`,
  photos: [
    {
      id: 'p1',
      url: `${BASE}/real/avatar.png`,
      caption: '团子的标准证件照',
      annotation: '圆滚滚的一坨，耳朵永远耷拉着，像两片软软的叶子',
      annotationPosition: 'top-right'
    },
    {
      id: 'p2',
      url: `${BASE}/real/grass.png`,
      caption: '在草地上放风',
      annotation: '难得出门晒太阳，结果全程趴着不动',
      annotationPosition: 'bottom-left'
    },
    {
      id: 'p3',
      url: `${BASE}/real/eat.png`,
      caption: '吃胡萝卜的团子',
      annotation: '一根胡萝卜能啃半个小时，小嘴动得飞快',
      annotationPosition: 'top-left'
    }
  ],
  videos: [
    {
      id: 'v1',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      poster: `${BASE}/real/grass.png`,
      title: '团子的日常发呆',
      description: '团子在阳台上发呆的悠闲下午',
      annotation: '她总是用这种无辜的眼神看着你，然后继续发呆',
      annotationPosition: 'bottom-right'
    }
  ],
  bio: '团子是一只胖乎乎的荷兰垂耳兔，拥有一身灰白相间的绒毛和一对永远耷拉着的长耳朵。她最大的爱好就是发呆和吃东西，尤其是胡萝卜和苜蓿草。她性格温顺到近乎佛系，无论发生什么都一脸淡定。她喜欢在主人脚边绕圈圈表达爱意，也喜欢在深夜疯狂跑酷。六年的陪伴，她用无声的温柔治愈了每一个疲惫的夜晚。',
  personality: ['佛系', '贪吃', '胆小', '黏人', '夜间狂欢'],
  favoriteThings: ['胡萝卜', '苜蓿草', '在脚边绕圈', '发呆', '深夜跑酷'],
  ownerMessage: '团子，你是我见过最安静也最温暖的小家伙。六年来你总是静静地陪在我身边，用你的小鼻子蹭我的手心。你走了以后，阳台上再也没有那个圆滚滚的影子了。希望你在彩虹桥上有吃不完的胡萝卜，永远做一只快乐的小团子。',
  theme: 'eternal-garden',
  backgroundMusic: `${BASE}/bgm.wav`,
  epitaph: '一团绒毛，六年温柔，愿你在星光草地上永远自由奔跑'
};
