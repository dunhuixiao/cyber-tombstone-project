---
name: pet-pixel-art-generator
description: 根据宠物真实图片生成卡通像素风格图片。当用户想要生成像素风格宠物图片、卡通像素宠物、或提到"像素风"、"pixel art"、"卡通像素"时使用此技能。
---

# 宠物卡通像素风生成器

根据宠物真实图片生成卡通像素风格的 avatar、running 和 sprite 三张图片。

## 输入要求

用户提供至少 1 张宠物真实照片，可以有多张。系统会综合所有照片特征生成图片。

## 输出规格

### 1. avatar.png（头像用）

| 属性 | 要求 |
|-----|------|
| 用途 | 头像显示 |
| 姿态 | 正面照，坐姿或站姿 |
| 背景 | 渐变背景（柔和的粉色、紫色、黄色过渡） |
| 表情 | 可爱、友好 |
| 尺寸 | 1024x1024 |

**提示词模板：**
```
A cute cartoon pixel art illustration of a [宠物类型], front view, sitting pose, cute friendly expression, [毛色描述], [特征描述], [配饰描述], pixel art style with clear visible pixels, limited color palette (16-32 colors), retro video game aesthetic, soft gradient background transitioning from pink to lavender to light yellow, cozy game character style, square format, high quality pixel art
```

### 2. running.png（页面内使用）

| 属性 | 要求 |
|-----|------|
| 用途 | 页面内动态展示 |
| 姿态 | 跑动姿态，侧面视角 |
| 方向 | **固定朝右奔跑** |
| 背景 | **solid white background**（纯白背景） |
| 表情 | 活泼、开心 |
| 尺寸 | 1024x1024 |

**提示词模板：**
```
Pixel art sprite of a [宠物类型], side view, running pose facing right, mid-stride with paws lifted, happy energetic expression, [毛色描述], [特征描述], [配饰描述], pixel art style with clear visible pixels, limited color palette (16-32 colors), retro video game sprite, solid white background, game asset style, square format, high quality pixel art
```

### 3. sprite.png（头像框装饰用）

| 属性 | 要求 |
|-----|------|
| 用途 | 头像框装饰，像桌面宠物 |
| 姿态 | 趴着/躺着/吊着/睡在高处四肢下垂的任意一个随机姿态，慵懒可爱 |
| 形象 | **较小巧可爱**，适合放在头像框边缘 |
| 背景 | **solid white background**（纯白背景） |
| 表情 | **活泼、开心** |
| 尺寸 | 1024x1024 |

**提示词模板：**
```
Pixel art of a small cute [宠物类型], lying down resting pose, happy energetic expression, [毛色描述], [特征描述], [配饰描述], desktop pet style, pixel art with clear visible pixels, limited color palette (16-32 colors), retro video game aesthetic, small adorable character, solid white background, square format, high quality pixel art
```

## 生成流程

### 步骤 1：分析所有输入照片

使用 Read 工具查看用户提供的所有宠物照片，综合提取特征：
- 宠物类型（狗/猫/其他）
- 品种（如果能识别）
- 毛色和花纹（重点：是否有斑块、斑点等）
- 主要特征（耳朵形状、尾巴、体型等）
- 是否有配饰（项圈、衣服等）

### 步骤 2：生成 avatar.png

使用 ImageGen 工具：
```
ImageGen:
  name: [宠物名]_pixel_avatar
  prompt: [avatar 提示词]
  size: "1024x1024"
```

### 步骤 3：生成 running.png

使用 ImageGen 工具：
```
ImageGen:
  name: [宠物名]_pixel_running
  prompt: [running 提示词]
  size: "1024x1024"
```

### 步骤 4：生成 sprite.png

使用 ImageGen 工具：
```
ImageGen:
  name: [宠物名]_pixel_sprite
  prompt: [sprite 提示词]
  size: "1024x1024"
```

### 步骤 5：保存图片

将生成的图片移动到目标目录：
```bash
mv [avatar图片路径] public/images/pets/[宠物名]/pixel/avatar.png
mv [running图片路径] public/images/pets/[宠物名]/pixel/running.png
mv [sprite图片路径] public/images/pets/[宠物名]/pixel/sprite.png
```

## 参考示例

参考目录：`public/images/pets/xiaoxue/pixel/` 和 `public/images/pets/wangcai/pixel/`

**xiaoxue（小白猫）示例：**
- avatar.png：正面坐姿，白毛蓝眼，粉色鼻子，渐变背景
- running.png：侧面跑动，纯白背景
- sprite.png：趴着休息，活泼开心，纯白背景

**wangcai（金毛犬）示例：**
- avatar.png：正面坐姿，金棕色毛发，吐舌头，渐变背景
- running.png：侧面跑动朝右，纯白背景
- sprite.png：趴着休息，活泼开心，纯白背景

## 风格要求

生成的图片必须具备：
- 像素艺术风格，清晰的像素块
- 可爱的卡通表情
- 有限的颜色调色板（16-32色）
- 复古游戏视觉效果
- 保持宠物真实特征（毛色、花纹、配饰等）
