# GitHub Pages 部署指南

本指南将帮助您将 Sroof UI 文档部署到 GitHub Pages。

## 前提条件

1. 确保您有一个 GitHub 账户
2. 确保您的项目已经推送到 GitHub 仓库 `Suroof/sroof-ui`
3. 确保您有该仓库的写入权限

## 部署步骤

### 1. 启用 GitHub Pages

1. 访问您的 GitHub 仓库：https://github.com/Suroof/sroof-ui
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages** 选项
4. 在 **Source** 部分，选择 **GitHub Actions**

### 2. 推送代码

确保您的最新代码（包括更新的 GitHub Actions 工作流）已经推送到 `main` 或 `master` 分支：

```bash
git add .
git commit -m "Add Docusaurus deployment workflow"
git push origin main
```

### 3. 自动部署

一旦代码推送到主分支，GitHub Actions 将自动：

1. 安装根目录依赖
2. 构建组件库 (`npm run build:lib`)
3. 安装文档依赖
4. 构建 Docusaurus 站点
5. 部署到 GitHub Pages

### 4. 访问部署的站点

部署完成后，您可以通过以下 URL 访问文档站点：

**https://suroof.github.io/sroof-ui/**

## 工作流说明

我们已经配置了 `.github/workflows/deploy-docs.yml` 文件，它包含以下步骤：

- **构建阶段**：
  - 检出代码
  - 设置 Node.js 环境
  - 安装根目录依赖
  - 构建组件库
  - 安装文档依赖
  - 构建 Docusaurus 站点
  - 上传构建产物

- **部署阶段**：
  - 将构建产物部署到 GitHub Pages

## 故障排除

### 如果部署失败

1. 检查 GitHub Actions 日志：
   - 访问仓库的 **Actions** 标签页
   - 查看失败的工作流运行
   - 检查错误日志

2. 常见问题：
   - **权限问题**：确保仓库设置中启用了 GitHub Actions
   - **依赖问题**：确保 `package.json` 中的依赖正确
   - **构建问题**：本地测试构建命令是否正常工作

### 本地测试

在推送到 GitHub 之前，您可以本地测试构建过程：

```bash
# 在根目录
npm ci
npm run build:lib

# 在 docs 目录
cd docs
npm ci
npm run build
```

## 自定义域名（可选）

如果您想使用自定义域名：

1. 在 `docs/static` 目录下创建 `CNAME` 文件
2. 在文件中添加您的域名（例如：`docs.yoursite.com`）
3. 在您的 DNS 提供商处配置 CNAME 记录指向 `suroof.github.io`

## 更新文档

要更新文档内容：

1. 修改 `docs/docs/` 目录下的 Markdown 文件
2. 提交并推送更改
3. GitHub Actions 将自动重新部署站点

---

**注意**：首次部署可能需要几分钟时间。后续更新通常会更快。