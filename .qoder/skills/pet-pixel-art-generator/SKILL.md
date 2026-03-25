---
name: pet-pixel-art-generator
description: 根据宠物真实图片生成卡通像素风格图片。当用户想要生成像素风格宠物图片、卡通像素宠物、或提到"像素风"、"pixel art"、"卡通像素"时使用此技能。
---

# 宠物卡通像素风生成器

根据宠物真实图片生成卡通像素风格的 avatar、running 和 sprite 三张图片，并自动去除 running 和 sprite 的白色背景（转为透明）。

## 调用方式

### 独立调用

用户直接提供宠物真实照片和宠物 ID。适用于单独生成像素图的场景。

### 被主流程调用

当从 `pet-onboarding` 主流程调用时，通过 `Skill` 工具传入 `petId` 参数。自动从 `src/app/pets/[petId]/real/` 目录读取所有真实照片作为输入。

## 输入要求

支持以下两种输入方式：

### 方式 A：提供照片

用户直接提供至少 1 张宠物真实照片，可以有多张。系统会综合所有照片特征生成图片。同时需要提供宠物 ID（用于确定输出目录）。

### 方式 B：提供 petId

传入宠物 ID（如 `wangcai`），自动从 `src/app/pets/[petId]/real/` 目录读取所有图片文件作为输入。使用 Glob 工具扫描 `src/app/pets/[petId]/real/*.{png,jpg,jpeg}` 获取图片列表，然后用 Read 工具查看这些图片。

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
| 背景 | **pure solid white background (#FFFFFF)**，无阴影、无地面线 |
| 后处理 | 步骤 4 自动去除白色背景，转为透明 |
| 表情 | 活泼、开心 |
| 尺寸 | 1024x1024 |

**提示词模板：**
```
Pixel art sprite of a [宠物类型], side view, running pose facing right, mid-stride with paws lifted, happy energetic expression, [毛色描述], [特征描述], [配饰描述], pixel art style with clear visible pixels, limited color palette (16-32 colors), retro video game sprite, pure solid white background, no shadows on background, no ground line, clean sharp edges, game asset style, square format, high quality pixel art
```

### 3. sprite.png（头像框装饰用）

| 属性 | 要求 |
|-----|------|
| 用途 | 头像框装饰，像桌面宠物 |
| 姿态 | 趴着/侧卧/伏地等可爱的休息姿态 |
| 形象 | **较小巧可爱**，适合放在头像框边缘 |
| 背景 | **pure solid white background (#FFFFFF)**，无阴影、无地面线 |
| 后处理 | 步骤 4 自动去除白色背景，转为透明 |
| 表情 | 满足、惬意（与休息姿态匹配） |
| 尺寸 | 1024x1024 |

**提示词模板：**
```
Pixel art of a small cute [宠物类型], lying down resting pose, content relaxed expression, [毛色描述], [特征描述], [配饰描述], desktop pet style, pixel art with clear visible pixels, limited color palette (16-32 colors), retro video game aesthetic, small adorable character, pure solid white background, no shadows on background, no ground line, clean sharp edges, square format, high quality pixel art
```

## 生成流程

### 步骤 1：分析所有输入照片

使用 Read 工具查看用户提供的所有宠物照片，综合提取特征：
- 宠物类型（狗/猫/兔/其他）
- 品种（如果能识别）
- 毛色和花纹（重点：是否有斑块、斑点等）
- 主要特征（耳朵形状、尾巴、体型等）
- 是否有配饰（项圈、衣服等）

### 步骤 2：并行生成三张图片

三张图片的生成彼此独立，**使用 ImageGen 工具并行调用**以提升效率：

```
ImageGen:                          ImageGen:                          ImageGen:
  name: [宠物名]_pixel_avatar       name: [宠物名]_pixel_running       name: [宠物名]_pixel_sprite
  prompt: [avatar 提示词]            prompt: [running 提示词]            prompt: [sprite 提示词]
  size: "1024x1024"                 size: "1024x1024"                 size: "1024x1024"
```

生成后使用 Read 工具查看三张图片，检查以下要点：
- **avatar.png**：是否正面坐姿、渐变背景、表情友好
- **running.png**：是否侧面朝右奔跑、白色背景干净、无额外装饰物
- **sprite.png**：是否休息姿态、体型小巧可爱、白色背景干净

如果某张图片风格偏差较大（姿态错误、配色不符、背景不干净等），调整提示词后重新生成该张图片。

### 步骤 3：保存图片

确保目标目录存在并移动图片：
```bash
mkdir -p src/app/pets/[宠物名]/pixel
mv [avatar图片路径] src/app/pets/[宠物名]/pixel/avatar.png
mv [running图片路径] src/app/pets/[宠物名]/pixel/running.png
mv [sprite图片路径] src/app/pets/[宠物名]/pixel/sprite.png
```

### 步骤 4：去除白色背景（running.png 和 sprite.png）

running.png 和 sprite.png 生成时使用纯白背景，但前端组件需要透明背景（`PixelPetRunnerComponent` 的跑动动画和 `PixelPetBorderComponent` 的头像框装饰都依赖透明 alpha 通道）。通过在线抠图工具自动去除白色背景。

**此步骤为非致命步骤**：如果网站不可访问、处理失败或超时，跳过并保留白色背景，不影响整个 skill 的执行。

#### 处理对象

同时处理以下两张图片（avatar.png 保留渐变背景，不处理）：
1. `src/app/pets/[宠物名]/pixel/running.png`
2. `src/app/pets/[宠物名]/pixel/sprite.png`

#### 操作流程

网站支持批量处理，一次上传两张图一起处理：

**1) 打开抠图网站并上传**

使用 `browser_navigate` 访问 `https://www.koukoutu.com/removebgtool/all`，然后使用 `browser_file_upload` 同时上传 running.png 和 sprite.png 两张图片（需使用**绝对路径**）。

**2) 开始抠图并等待完成**

使用 `browser_click` 点击"开始抠图"按钮，然后使用 `browser_wait_for` 等待页面出现"全部完成"文字，超时设为 60 秒。

**3) 逐张下载 PNG**

对每张处理完成的图片，点击"下载高清大图"→ 使用 `browser_run_code` 设置 download 事件监听并点击"下载PNG"，用 `download.saveAs()` 直接保存到原路径覆盖：

```javascript
const downloadPromise = page.waitForEvent('download');
await page.getByText('下载PNG').click();
const download = await downloadPromise;
await download.saveAs('绝对路径/src/app/pets/[宠物名]/pixel/[文件名].png');
```

**4) 验证结果**

使用 Read 工具查看处理后的图片，确认背景已变为透明。

#### 错误处理

- 网站不可访问：输出警告，跳过整个步骤，保留白色背景
- 单张图片处理失败：跳过该图，继续处理下一张
- 处理超时（超过 60 秒）：跳过并输出警告

处理完成后报告结果：
```
背景去除结果：
- running.png - 已去除白色背景（透明）
- sprite.png - 已去除白色背景（透明）
```

## 参考示例

参考文档：`template/pixel-art-examples.md`（位于本 skill 目录下），记录了所有已生成宠物的像素图片描述。

生成新宠物图片时，请先用 Read 工具查看参考文档和对应目录下的实际图片，确保风格一致。

## 风格要求

生成的图片必须具备：
- 像素艺术风格，清晰的像素块
- 可爱的卡通表情
- 有限的颜色调色板（16-32色）
- 复古游戏视觉效果
- 保持宠物真实特征（毛色、花纹、配饰等）
