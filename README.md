# 赛博墓碑

一个纪念用的网站项目，为你能想到的任何事物创建专属的纪念页面，当前主要是宠物。
本项目托管到 GitHub Pages，除非 GitHub 倒闭或者变质，不然 TA 会在互联网化粪池里面粪海狂蛆，得到赛博永生。
可以自行fork项目托管到自己的 GitHub Pages。

## 主要操作步骤

提供名称、照片、生卒年月等信息，直接在 agent 内调用，等待生成完毕后启动站点。
``` 
.qoder/skills/pet-onboarding/SKILL.md
```

也可以直接使用，不提供信息，会随机生成相关明细。

可能不同的 agent 图片生成工具会调用失败，需要修改 SKILL 修改为支持的内置生成方案。

## 没人在意的技术栈

- **框架**: [Angular](https://angular.io/) 21.2.0
- **语言**: [TypeScript](https://www.typescriptlang.org/) 5.9.2

## 开发脚本

```bash
# 启动开发服务器
npm start

# 构建生产版本
npm run build

# 监视模式构建
npm run watch

# 运行测试
npm test
```

## 项目结构

```
src/
├── app/
│   ├── components/     # 可复用组件
│   ├── models/         # 数据模型
│   ├── pages/          # 页面组件
│   ├── pets/           # 宠物数据与资源
│   ├── services/       # 服务层
│   ├── app.config.ts   # 应用配置
│   ├── app.routes.ts   # 路由配置
│   └── app.ts          # 根组件
├── index.html
├── main.ts
└── styles.css
```

## 部署

使用 GitHub Actions 自动部署到 GitHub Pages。

## 开源协议

本项目基于 [MIT License](./LICENSE) 开源，你可以自由使用、修改和分发。
