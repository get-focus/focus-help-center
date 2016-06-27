cd api
npm run build
npm run db-init:prod
cd ../app
npm run build
cd ..
mkdir -p dist/app dist/typings
cp api/dist/. dist/ -R
cp api/typings/. dist/typings -R
cp app/dist/. dist/app -R
cp api/package.json dist/package.json
cp api/tsconfig.json dist/tsconfig.json
cd dist
npm install --only=prod
cd ..
rm dist/package.json
export IS_BUNDLE=true
"./node_modules/.bin/envify" dist/index.js > dist/index2.js
rm dist/index.js
mv dist/index2.js dist/index.js
unset IS_BUNDLE