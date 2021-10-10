#!/usr/bin/env sh

# 部署代码 : sh deploy.sh
# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>

# 部署到 GitHub
 git push -f git@github.com:WE5T3/CC-Tally-demo.git master:gh-pages

# 部署到 Gitee
# git push -f git@gitee.com:we5t3/cc-tally-demo.git master:gh-pages

cd -