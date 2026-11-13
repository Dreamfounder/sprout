# 把「生芽」发布到 GitHub Pages

GitHub Pages 可以把纯前端网页免费放到公网，得到类似这样的固定地址：

```text
https://你的用户名.github.io/shengya-studio/
```

这个项目不需要后端，`github-pages/` 里就是可以直接上传的全部文件。

---

## 准备

- 一个 GitHub 账号：<https://github.com/signup>
- 建议用电脑浏览器操作，手机上的 GitHub 设置不完整。
- 这个文件夹里不要放你的录音或私人文件。GitHub Pages 是公开网页。

---

## 方法一：网页上传（文件少，最快）

### 1. 新建仓库

1. 登录 GitHub。
2. 右上角 `+` → **New repository**。
3. 填写：
   - **Repository name**：`shengya-studio`
   - **Description**：随便写，比如 `生芽 · 浏览器音乐工作室`
   - 选择 **Public**
   - 不要勾选 “Add a README file”
4. 点 **Create repository**。

### 2. 上传文件

1. 在新仓库页面点 **uploading an existing file**。
2. 打开本机的 `shengya-studio/github-pages/` 文件夹。
3. 选中里面的**所有文件和 preview 文件夹**，拖到 GitHub 上传框。
   - 不要把 `github-pages` 这个文件夹本身拖进去。
   - 上传后，仓库根目录应该能直接看到 `index.html`、`app.js`、`styles.css`。
4. 下方 Commit changes 填 `init`，点 **Commit changes**。

### 3. 打开 Pages

1. 进入仓库的 **Settings**（顶部选项卡）。
2. 左侧菜单点 **Pages**。
3. **Build and deployment** → **Source** 选 **Deploy from a branch**。
4. **Branch** 选 `main`，文件夹选 `/ (root)`，点 **Save**。
5. 等 1–3 分钟，刷新页面，顶部会出现：

```text
Your site is live at https://你的用户名.github.io/shengya-studio/
```

打开这个地址即可。

---

## 方法二：GitHub Desktop（文件夹多、以后要更新时更省事）

1. 安装 GitHub Desktop：<https://desktop.github.com/>
2. 登录 GitHub。
3. `File` → `New repository`：
   - Name：`shengya-studio`
   - Local path：选一个空文件夹
   - 点 **Create repository**。
4. 打开新建的本地仓库文件夹，把 `github-pages/` 里的**内容**（不是文件夹本身）复制进去。
5. 回到 GitHub Desktop：
   - 左下角 Summary 填 `init`
   - 点 **Commit to main**
   - 点 **Publish repository**
   - 取消勾选 **Keep this code private**
   - 点 **Publish repository**。
6. 到 GitHub 网页仓库的 **Settings → Pages**，按上面第 3 步设置 `main` + `/ (root)`。

以后更新：改完文件 → GitHub Desktop 里 Commit → Push，等 Pages 自动更新。

---

## 发布后检查

打开：

```text
https://你的用户名.github.io/shengya-studio/
```

应该看到「生芽」页面。检查：

- [ ] 页面能打开，不是 404
- [ ] 样式正常（不是裸 HTML）
- [ ] 右上角「专家模式」能进入
- [ ] 按播放能听到声音
- [ ] 允许麦克风后能哼唱（GitHub Pages 是 HTTPS，权限可以正常弹）
- [ ] 导出 WAV 能下载

---

## 常见问题

### 打开是 404

- Pages 刚开启，等 2–3 分钟再刷新。
- 仓库根目录必须有 `index.html`，不能是 `shengya-studio/index.html` 多套一层。
- 仓库必须是 Public，或者你的 GitHub 账号支持私有仓库 Pages。
- 检查 **Settings → Pages** 里是否显示 `Your site is live at ...`。

### 页面出来了，但没有样式 / 没有声音

- 只上传了 `index.html`，漏了 `styles.css`、`app.js`、`expert.css`、`expert.js`。
- 文件名大小写必须一致：`app.js` 不是 `App.js`。
- 所有文件要在仓库根目录，和 `index.html` 同级。

### 改了代码，网页没变化

- GitHub Pages 需要 1–3 分钟重新构建。
- 浏览器有缓存，按 `Ctrl + F5` 强制刷新，或用无痕窗口打开。

### 麦克风没反应

- 必须用 `https://` 地址，GitHub Pages 默认就是 HTTPS。
- 第一次会弹权限，点允许。
- 如果之前拒绝过：点地址栏左侧的图标 → 麦克风 → 允许，再刷新。

### 我的作品会跟过去吗？

不会。作品保存在浏览器的 `localStorage` 里，和网址绑定。

- 本机 `127.0.0.1:4173` 上做的歌，不会自动出现在 `https://...github.io/...`。
- 换仓库名、换用户名、换域名，也会变成一份新的空数据。
- 重要作品先导出 WAV。
- 目前还没有「导出工程文件」功能；如果需要把可编辑工程迁移到新网址，需要再加一个 JSON 工程导入/导出。

---

## 更新网站

网页上传方式：

1. 仓库页面 → **Add file** → **Upload files**。
2. 上传修改后的同名文件，覆盖旧文件。
3. Commit changes。
4. 等 1–3 分钟。

GitHub Desktop 方式：

1. 把新文件复制进本地仓库。
2. Commit to main。
3. Push origin。
4. 等 Pages 更新。

---

## 可选：绑定自己的域名

1. 在域名服务商买一个域名。
2. GitHub 仓库 **Settings → Pages → Custom domain** 填入域名。
3. 按 GitHub 提示配置 DNS 的 `CNAME` 记录。
4. 开启 **Enforce HTTPS**。

不买域名也完全可以免费用 `github.io` 地址。

---

## 这个文件夹里有什么

```text
github-pages/
├─ index.html      页面入口（必须是这个名字）
├─ styles.css      简单模式样式
├─ expert.css      专家模式样式
├─ app.js          音频引擎、生成、导出
├─ expert.js       专家模式交互
├─ preview/        README 里的预览图
├─ README.md       项目说明
└─ .nojekyll       告诉 GitHub Pages 不要跑 Jekyll
```

`server.mjs`、`start.ps1`、`启动生芽.cmd` 只用于本地预览，不需要上传。
