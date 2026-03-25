---
name: pet-onboarding
description: 宠物入驻全流程编排器。自动创建宠物信息文件、生成真实图片、注册页面、生成像素风图片和庙号谥号。当用户需要"添加新宠物"、"宠物入驻"、"完整流程"、"新建宠物"时使用此技能。
---

# 宠物入驻全流程编排器

一键完成新宠物从信息录入到页面上线的全部流程，自动调度三个子技能协同工作。

## 重要规则

- **每次调用只处理一个宠物**
- 本技能是编排器，通过 `Skill` 工具依次调用子技能完成具体工作
- 子技能调用顺序固定：`pet-page-generator` → `pet-pixel-art-generator` → `pet-title-generator`
- 如果某个子技能失败，停止后续流程，向用户报告错误
- 不要跳过任何子技能步骤，除非用户明确要求

## 输入方式

### 方式 A：用户提供宠物描述信息

用户可提供以下任意组合：
- **宠物照片**：1 张或多张真实照片（用于提取外观特征和作为 real 目录图片）
- **文字描述**：名字、品种、性格、生卒日期、主人寄语等

如果用户提供了照片但缺少某些文字信息，根据照片推断合理的信息（如品种、毛色等），其余随机生成。

### 方式 B：完全随机生成

如果用户未提供任何宠物信息，则完全随机生成一只宠物，包括：
- 随机选择物种和品种（从常见宠物中选取）
- 随机生成中文名字（1-2 个字，可爱风格）
- 随机生成性格标签（3-5 个）
- 随机生成喜好（3-5 个）
- 随机生成生卒日期（合理的宠物寿命范围）
- 随机选择主题（从 'warm-sunset' | 'cyber-night' | 'gentle-love' | 'eternal-garden' | 'deep-ocean' 中选取）
- 随机生成生平、主人寄语、墓志铭

## 全流程步骤

### 步骤 1：收集/生成宠物基础信息

根据用户输入（方式 A 或方式 B），确定以下信息：

| 字段 | 说明 | 示例 |
|-----|------|------|
| `petId` | 宠物 ID（拼音，小写，无空格） | `mimi`、`dahuang` |
| `name` | 宠物名字（中文） | `咪咪`、`大黄` |
| `species` | 物种 | `犬`、`猫`、`兔` |
| `breed` | 品种 | `金毛寻回犬`、`英国短毛猫` |
| `gender` | 性别 | `男` 或 `女` |
| `birthDate` | 出生日期 | `2015-06-01` |
| `deathDate` | 去世日期 | `2025-03-15` |
| `personality` | 性格标签数组 | `['温顺', '贪吃', '黏人']` |
| `favoriteThings` | 喜好数组 | `['晒太阳', '追蝴蝶']` |
| `bio` | 生平描述 | 一段 50-100 字的描述 |
| `ownerMessage` | 主人寄语 | 一段 50-100 字的寄语 |
| `theme` | 页面主题 | `warm-sunset` |
| `epitaph` | 墓志铭 | 一句 15-25 字的话 |
| `videos` | 视频信息（可选） | 用户提供视频 URL 或使用占位符 |

**宠物 ID 生成规则：**
- 使用宠物名字的拼音，全小写，无声调
- 如果名字重复字（如"咪咪"），用完整拼音 `mimi`
- 检查 `src/app/pets/` 下是否已存在同名目录，如有冲突则加数字后缀

### 步骤 2：创建目录结构和真实图片

#### 2a. 创建目录

```bash
mkdir -p src/app/pets/[petId]/real
mkdir -p src/app/pets/[petId]/pixel
```

#### 2b. 生成/放置真实图片

**如果用户提供了照片：**
- 将用户提供的第一张照片复制为 `src/app/pets/[petId]/real/avatar.png`
- 如果有多张照片，依次保存为有意义的文件名（如 `park.png`、`sleep.png`）

**如果需要随机生成：**
- 使用 ImageGen 工具生成 1-3 张真实风格的宠物图片
- 第一张必须是正面头像（保存为 `avatar.png`）
- 可选生成其他场景照片

**avatar.png 生成提示词模板（随机生成时使用）：**
```
A beautiful portrait photo of a [breed], front view, looking at camera, [毛色描述], [特征描述], warm lighting, bokeh background, professional pet photography, high quality, 8k
```

**场景照片提示词模板（可选）：**
```
A [breed] [场景描述，如 playing in a park / sleeping on a couch], natural lighting, candid pet photography, high quality
```

### 步骤 3：创建 pet-info.ts

**前置准备：**
1. 使用 Read 工具读取 `src/app/models/pet.model.ts`，确认 `PetProfile`、`PetPhoto`、`PetVideo` 接口的当前定义，以此作为字段名和类型的权威参考。
2. 使用 Read 工具读取一个已有的 pet-info.ts（如最近创建的宠物）作为结构参考，确保新文件格式与当前约定一致。

在 `src/app/pets/[petId]/` 目录下创建 `pet-info.ts` 文件。

**文件模板：**
```typescript
import { PetProfile } from '../../models/pet.model';

/** Images base path for [petId] */
const BASE = 'images/pets/[petId]';

export const [PETID大写]_PROFILE: PetProfile = {
  id: '[petId]',
  name: '[name]',
  species: '[species]',
  breed: '[breed]',
  gender: '[gender]',
  birthDate: '[birthDate]',
  deathDate: '[deathDate]',
  avatar: `${BASE}/real/avatar.png`,
  pixelAvatar: `${BASE}/pixel/avatar.png`,
  pixelSprite: `${BASE}/pixel/sprite.png`,
  pixelRunning: `${BASE}/pixel/running.png`,
  photos: [
    {
      id: 'p1',
      url: `${BASE}/real/avatar.png`,
      caption: '[照片说明]',
      annotation: '[照片批注]',
      annotationPosition: 'top-right'
    },
    {
      id: 'p2',
      url: `${BASE}/real/[其他照片].png`,
      caption: '[照片说明]',
      annotation: '[照片批注]',
      annotationPosition: 'bottom-left'
    }
    // ... 根据实际照片数量添加，annotationPosition 在多张照片间交替使用
  ],
  videos: [
    // 可选：如果用户提供了视频素材则填入，否则留空数组 []
    // 留空时前端视频模块不会展示
    {
      id: 'v1',
      url: '[视频URL]',
      poster: `${BASE}/real/[poster图片].png`,
      title: '[视频标题]',
      description: '[视频描述]',
      annotation: '[视频批注]',
      annotationPosition: 'bottom-right'
    }
  ],
  bio: '[bio]',
  personality: [personality数组],
  favoriteThings: [favoriteThings数组],
  ownerMessage: '[ownerMessage]',
  theme: '[theme]',
  epitaph: '[epitaph]'
};
```

**注意：**
- `title` 字段不要在这里添加，由 `pet-title-generator` 子技能后续生成
- `pixelAvatar`、`pixelSprite`、`pixelRunning` 路径先写上，实际文件由 `pet-pixel-art-generator` 后续生成
- `photos` 数组中为每张真实照片创建一个条目，包含有意义的 caption 和 annotation。`caption`、`annotation`、`annotationPosition` 均为可选字段。`annotationPosition` 有 4 个有效值：`'top-left'`、`'top-right'`、`'bottom-left'`、`'bottom-right'`，多张照片应交替使用不同位置以丰富视觉效果
- `videos` 数组可以留空 `[]`，留空时前端视频模块不会展示。如果用户提供了视频素材，按 `PetVideo` 接口格式填入，选择一张真实照片作为 poster
- `backgroundMusic` 字段可选。如果宠物目录下存在 `bgm.wav` 文件，则设置为 `` `${BASE}/bgm.wav` ``；随机生成时默认不添加，除非有 bgm 素材可用
- 常量名格式为 `[PETID大写]_PROFILE`，例如 `petId` 为 `mimi` 则常量名为 `MIMI_PROFILE`

### 步骤 4：调用 pet-page-generator 子技能

使用 Skill 工具调用 `pet-page-generator`，传入宠物 ID：

```
Skill: pet-page-generator
Args: [petId]
```

此步骤会：
- 验证 pet-info.ts 存在
- 将宠物注册到 `src/app/pets/index.ts`
- 将宠物添加到 `src/app/services/pet-data.service.ts`

**等待此步骤完成后再继续。**

### 步骤 5：调用 pet-pixel-art-generator 子技能

使用 Skill 工具调用 `pet-pixel-art-generator`，传入宠物 ID：

```
Skill: pet-pixel-art-generator
Args: [petId]
```

此步骤会：
- 读取 `src/app/pets/[petId]/real/` 下的真实照片
- 生成 avatar.png、running.png、sprite.png 三张像素风图片
- 保存到 `src/app/pets/[petId]/pixel/` 目录

**等待此步骤完成后再继续。**

### 步骤 5b：更新像素图参考文档

`pet-pixel-art-generator` 完成后，使用 Read 工具查看刚生成的三张像素图片（`pixel/avatar.png`、`pixel/running.png`、`pixel/sprite.png`），然后使用 Edit 工具将新宠物的像素图描述追加到 `.qoder/skills/pet-pixel-art-generator/template/pixel-art-examples.md`，遵循该文件中已有宠物的格式（包含宠物名、品种、目录路径、以及每张图片的视觉特征描述）。

### 步骤 6：调用 pet-title-generator 子技能

使用 Skill 工具调用 `pet-title-generator`，传入宠物 ID：

```
Skill: pet-title-generator
Args: [petId]
```

此步骤会：
- 读取 pet-info.ts 中的宠物信息
- 生成庙号、谥号等封号信息
- 将 title 字段写回 pet-info.ts

**等待此步骤完成后再继续。**

### 步骤 7：最终验证

所有子技能完成后，执行最终验证：

1. **文件完整性检查**：
   - `src/app/pets/[petId]/pet-info.ts` 存在且包含 title 字段
   - `src/app/pets/[petId]/real/avatar.png` 存在
   - `src/app/pets/[petId]/pixel/avatar.png` 存在
   - `src/app/pets/[petId]/pixel/running.png` 存在
   - `src/app/pets/[petId]/pixel/sprite.png` 存在
   - `src/app/pets/index.ts` 包含新宠物的导出
   - `src/app/services/pet-data.service.ts` 包含新宠物的注册

2. **编译验证**：运行 `npx ng build --configuration development 2>&1 | tail -20`

3. **向用户报告**：
   ```
   宠物「[name]」([petId]) 入驻完成！
   
   已完成的步骤：
   ✓ 创建宠物信息文件 (pet-info.ts)
   ✓ 注册到首页和详情页 (pet-page-generator)
   ✓ 生成像素风图片 (pet-pixel-art-generator)
   ✓ 生成庙号谥号 (pet-title-generator)
   
   访问路径：/memorial/[petId]
   庙号：[templeName]
   全称：[fullTitle]
   ```

## 错误处理

- 如果目录已存在：提示用户是否覆盖
- 如果 petId 冲突：自动加数字后缀或询问用户
- 如果子技能失败：记录失败步骤，向用户报告，不继续后续步骤
- 如果编译失败：尝试修复，或向用户报告编译错误

## 参考示例

### 示例 1：用户提供描述信息

**用户输入：** "帮我添加一只叫小橘的猫，橘猫，公的，很胖，特别贪吃"

**执行流程：**
1. 提取信息：name=小橘, species=猫, breed=橘猫, gender=男, personality=['贪吃', '慵懒', '圆润']...
2. 生成 petId: `xiaoju`
3. 创建目录 + 生成真实图片（ImageGen 生成橘猫照片）
4. 创建 pet-info.ts
5. 调用 pet-page-generator → 注册页面
6. 调用 pet-pixel-art-generator → 生成像素图
7. 调用 pet-title-generator → 生成庙号谥号
8. 验证并报告

### 示例 2：完全随机生成

**用户输入：** "随机帮我生成一只宠物"

**执行流程：**
1. 随机生成：name=团团, species=犬, breed=柯基, gender=女, ...
2. 生成 petId: `tuantuan`
3. 创建目录 + ImageGen 生成柯基照片
4. 创建 pet-info.ts
5. 调用 pet-page-generator → 注册页面
6. 调用 pet-pixel-art-generator → 生成像素图
7. 调用 pet-title-generator → 生成庙号谥号
8. 验证并报告

### 示例 3：用户提供照片

**用户输入：** [附带一张布偶猫照片] "这是我家的猫叫雪球"

**执行流程：**
1. 分析照片：识别为布偶猫，白色长毛，蓝眼睛
2. 提取信息：name=雪球, species=猫, breed=布偶猫, ...（缺失信息随机补充）
3. 生成 petId: `xueqiu`
4. 将用户照片保存为 real/avatar.png
5. 创建 pet-info.ts
6. 调用 pet-page-generator → 注册页面
7. 调用 pet-pixel-art-generator → 基于真实照片生成像素图
8. 调用 pet-title-generator → 生成庙号谥号
9. 验证并报告
