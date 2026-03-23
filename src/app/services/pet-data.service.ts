import { Injectable } from '@angular/core';
import { PetProfile } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetDataService {

  private readonly pets: PetProfile[] = [
    {
      id: 'wangcai',
      name: '旺财',
      species: '犬',
      breed: '金毛寻回犬',
      gender: '男',
      birthDate: '2012-03-15',
      deathDate: '2025-01-20',
      avatar: 'images/pet-dog-golden.png',
      photos: [
        {
          id: 'p1',
          url: 'images/pet-dog-golden.png',
          caption: '旺财的官方证件照',
          annotation: '这是旺财最帅的一张照片，眼睛里满是温柔',
          annotationPosition: 'top-right'
        },
        {
          id: 'p2',
          url: 'images/pet-dog-park.png',
          caption: '在公园里奔跑',
          annotation: '旺财最喜欢在阳光下奔跑，每次都跑得比风还快',
          annotationPosition: 'bottom-left'
        },
        {
          id: 'p3',
          url: 'images/pet-dog-sleep.png',
          caption: '午后的小憩',
          annotation: '睡着的旺财像个天使，会打小小的呼噜',
          annotationPosition: 'top-right'
        }
      ],
      videos: [
        {
          id: 'v1',
          url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          poster: 'images/pet-dog-park.png',
          title: '旺财在公园玩耍',
          description: '2024年春天，旺财在公园里追蝴蝶',
          annotation: '这是旺财最后一个春天的影像记录',
          annotationPosition: 'top-right'
        }
      ],
      bio: '旺财是一只温暖而忠诚的金毛寻回犬。它陪伴了我们整整12年，从一只毛绒绒的小奶狗长成了一位沉稳的老绅士。它喜欢在阳光下打盹，喜欢追逐公园里的蝴蝶，更喜欢依偎在家人身边。旺财用它的一生教会了我们什么是无条件的爱。',
      personality: ['温顺', '忠诚', '活泼', '贪吃', '黏人'],
      favoriteThings: ['晒太阳', '追蝴蝶', '啃骨头', '散步', '被挠下巴'],
      ownerMessage: '亲爱的旺财，谢谢你用12年的时间，教会我什么是纯粹的爱。你虽然离开了，但在我心里你永远是那个欢快摇尾巴的小家伙。彩虹桥的那一边，要继续快乐地奔跑哦。',
      theme: 'warm-sunset',
      backgroundMusic: ''
    },
    {
      id: 'xiaoxue',
      name: '小雪',
      species: '猫',
      breed: '波斯猫',
      gender: '女',
      birthDate: '2016-12-25',
      deathDate: '2025-11-08',
      avatar: 'images/pet-cat-white.png',
      photos: [
        {
          id: 'p1',
          url: 'images/pet-cat-white.png',
          caption: '小雪的肖像照',
          annotation: '像公主一样优雅，蓝色的眼睛像两颗宝石',
          annotationPosition: 'top-right'
        },
        {
          id: 'p2',
          url: 'images/pet-cat-window.png',
          caption: '窗边的小雪',
          annotation: '小雪最喜欢在窗边看雨，安静又美好',
          annotationPosition: 'bottom-right'
        },
        {
          id: 'p3',
          url: 'images/pet-cat-play.png',
          caption: '玩耍中的小雪',
          annotation: '平时高冷，但一碰到毛线球就秒变小疯子',
          annotationPosition: 'top-left'
        }
      ],
      videos: [
        {
          id: 'v1',
          url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          poster: 'images/pet-cat-window.png',
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
      backgroundMusic: ''
    }
  ];

  getAllPets(): PetProfile[] {
    return this.pets;
  }

  getPetById(id: string): PetProfile | undefined {
    return this.pets.find(p => p.id === id);
  }
}
