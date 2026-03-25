---
name: pet-page-generator
description: 基于宠物描述信息和petinfo，生成宠物模块的前端页面，并修改代码使其能正常展示在首页和详情页。当用户需要添加新宠物到网站、注册宠物页面、或提到"生成页面"、"添加宠物"、"注册宠物"时使用此技能。
---

# 宠物页面生成器

基于宠物的 `pet-info.ts` 描述信息，将宠物注册到前端系统中，使其能在首页展示卡片并可以点击进入详情页。

## 调用方式

### 独立调用

用户直接提供宠物 ID。适用于 pet-info.ts 已存在但尚未注册的场景。

### 被主流程调用

当从 `pet-onboarding` 主流程调用时，通过 `Skill` 工具传入 `petId` 参数，流程与独立调用相同。

## 重要规则

- **每次调用只处理一个宠物**
- 宠物信息必须已存在于 `src/app/pets/[petId]/pet-info.ts` 中
- 只修改 `src/app/pets/index.ts` 和 `src/app/services/pet-data.service.ts` 两个文件
- 不修改宠物的 `pet-info.ts` 本身
- 不修改任何组件或页面代码
- 如果宠物已经注册（已在 index.ts 和 service 中），需要告知用户并跳过

## 输入要求

用户提供宠物 ID（即 `src/app/pets/[petId]/` 目录名），例如 `doudou`、`wangcai`、`xiaoxue`。

如果用户未指定宠物 ID，则：
1. 使用 Glob 工具扫描 `src/app/pets/*/pet-info.ts` 获取所有宠物目录
2. 读取 `src/app/pets/index.ts` 查看已注册的宠物
3. 找出未注册的宠物，列出供用户选择
4. 如果只有一个未注册的宠物，自动处理该宠物

## 生成流程

### 步骤 1：验证宠物信息文件存在

使用 Read 工具读取 `src/app/pets/[petId]/pet-info.ts`，确认文件存在且格式正确。

提取以下关键信息用于后续步骤：
- **导出常量名**：如 `WANGCAI_PROFILE`、`XIAOXUE_PROFILE`（格式为 `[PETID大写]_PROFILE`）
- **宠物 ID**：如 `wangcai`、`xiaoxue`
- **宠物名字**：如 `旺财`、`小雪`

**验证规则：**
- 文件必须导入 `PetProfile` 类型
- 文件必须导出一个 `PetProfile` 类型的常量
- 常量名格式必须为 `[PETID大写]_PROFILE`

如果文件不存在或格式不正确，告知用户并终止。

### 步骤 2：检查是否已注册

读取 `src/app/pets/index.ts`，检查该宠物的导出是否已存在。

**判断方法：** 检查是否存在 `export { [PETID大写]_PROFILE } from './[petId]/pet-info';` 这行。

- 如果已存在导出 → 继续检查 service
- 如果不存在 → 进入步骤 3

读取 `src/app/services/pet-data.service.ts`，检查该宠物是否已在 service 中注册。

**判断方法：** 检查 `pets` 数组中是否已包含 `[PETID大写]_PROFILE`。

- 如果 index.ts 和 service 中都已存在 → 告知用户"该宠物已注册"，终止
- 如果部分存在 → 只补充缺失的部分

### 步骤 3：更新 src/app/pets/index.ts

使用 Edit 工具在 `src/app/pets/index.ts` 文件末尾添加新的导出行。

**添加格式：**
```typescript
export { [PETID大写]_PROFILE } from './[petId]/pet-info';
```

**示例：** 如果宠物 ID 是 `doudou`，则添加：
```typescript
export { DOUDOU_PROFILE } from './doudou/pet-info';
```

**注意：** 保持与现有导出行的格式一致，每行一个导出。

### 步骤 4：更新 src/app/services/pet-data.service.ts

使用 Edit 工具修改 `src/app/services/pet-data.service.ts`，需要修改两处：

#### 4a. 添加 import 语句

在现有的 import 行中，添加新宠物的导入。

**当前格式示例：**
```typescript
import { WANGCAI_PROFILE, XIAOXUE_PROFILE } from '../pets';
```

**修改为（添加新宠物）：**
```typescript
import { WANGCAI_PROFILE, XIAOXUE_PROFILE, DOUDOU_PROFILE } from '../pets';
```

#### 4b. 添加到 pets 数组

在 `pets` 数组中添加新宠物的 profile。

**当前格式示例：**
```typescript
private readonly pets: PetProfile[] = [
  WANGCAI_PROFILE,
  XIAOXUE_PROFILE
];
```

**修改为（添加新宠物）：**
```typescript
private readonly pets: PetProfile[] = [
  WANGCAI_PROFILE,
  XIAOXUE_PROFILE,
  DOUDOU_PROFILE
];
```

### 步骤 5：验证结果

生成完成后执行以下验证：

1. **读取验证**：使用 Read 工具重新读取三个文件，确认修改正确：
   - `src/app/pets/index.ts` - 确认新导出行存在
   - `src/app/services/pet-data.service.ts` - 确认 import 和 pets 数组都包含新宠物

2. **编译验证**：使用 Bash 工具运行 `npx ng build --configuration development 2>&1 | tail -20`，确认没有编译错误

3. **向用户报告结果**：
   - 显示宠物名称和 ID
   - 确认已添加到首页展示
   - 确认可通过 `/memorial/[petId]` 访问详情页
   - 如果有编译错误，显示错误信息并尝试修复

## 命名规范

| 宠物 ID | 导出常量名 | 目录路径 |
|---------|-----------|---------|
| wangcai | WANGCAI_PROFILE | src/app/pets/wangcai/ |
| xiaoxue | XIAOXUE_PROFILE | src/app/pets/xiaoxue/ |
| doudou | DOUDOU_PROFILE | src/app/pets/doudou/ |
| [petId] | [PETID大写]_PROFILE | src/app/pets/[petId]/ |

**常量名生成规则：** 将宠物 ID 转为全大写，后缀 `_PROFILE`。

## 参考示例

### 完整示例：注册 doudou

**步骤 1** - 读取 `src/app/pets/doudou/pet-info.ts`，确认存在 `DOUDOU_PROFILE` 导出。

**步骤 2** - 检查 index.ts 和 service，确认 doudou 未注册。

**步骤 3** - 修改 `src/app/pets/index.ts`：
```typescript
export { WANGCAI_PROFILE } from './wangcai/pet-info';
export { XIAOXUE_PROFILE } from './xiaoxue/pet-info';
export { DOUDOU_PROFILE } from './doudou/pet-info';
```

**步骤 4** - 修改 `src/app/services/pet-data.service.ts`：
```typescript
import { Injectable } from '@angular/core';
import { PetProfile } from '../models/pet.model';
import { WANGCAI_PROFILE, XIAOXUE_PROFILE, DOUDOU_PROFILE } from '../pets';

@Injectable({
  providedIn: 'root'
})
export class PetDataService {

  private readonly pets: PetProfile[] = [
    WANGCAI_PROFILE,
    XIAOXUE_PROFILE,
    DOUDOU_PROFILE
  ];

  getAllPets(): PetProfile[] {
    return this.pets;
  }

  getPetById(id: string): PetProfile | undefined {
    return this.pets.find(p => p.id === id);
  }
}
```

**步骤 5** - 验证编译通过，向用户报告：
> 已成功注册宠物「豆豆」(doudou)！
> - 首页卡片已添加
> - 详情页可通过 /memorial/doudou 访问

## 注意事项

- 宠物的图片资源（real/、pixel/）需要已经存在于对应目录中，否则页面会显示缺失图片
- 如果宠物没有 pixel 图片，首页头像框装饰和详情页跑动动画不会显示（这是正常行为，由组件的 @if 条件控制）
- 背景音乐文件 bgm.wav 是可选的
- title（庙号谥号）是可选的，可以后续通过 pet-title-generator 技能生成
- pixel 图片是可选的，可以后续通过 pet-pixel-art-generator 技能生成
