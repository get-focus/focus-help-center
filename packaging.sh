export IS_BUNDLE=true
cd api
npm run build
cd ../app
npm run build
cd ..
mkdir -p dist/app
cp api/dist/. dist/ -R
rm -rf dist/db/db.sqlite
rm -rf dist/docs
cp app/dist/. dist/app -R
cp api/package.json dist/package.json
cp api/tsconfig.json dist/tsconfig.json
cd dist
npm install --only=prod
cd ..
"./node_modules/.bin/envify" dist/index.js > dist/index2.js
rm dist/index.js
mv dist/index2.js dist/index.js
unset IS_BUNDLE