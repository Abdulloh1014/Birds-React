# #!/bin/bash

# # PRODUCTION 
# git reset --hard
# git checkout master
# git pull origin master

# npm i yarn -g
# yarn global add serve
# yarn
# yarn run build
# pm2 start "yarn run start:prod" --name=BIRDS-REACT


#!/bin/bash

# PRODUCTION 
git reset --hard
git checkout master
git pull origin master

# Kerakli paketlarni o'rnatish
npm i yarn -g
yarn global add serve
yarn install

# Build qilish
yarn run build

# PM2: Agar bor bo'lsa restart qiladi, bo'lmasa yangi ochadi
pm2 delete BIRDS-REACT 2>/dev/null || true
pm2 start "yarn run start:prod" --name=BIRDS-REACT