cd api
npm run build
cd ../app
npm run build
cd ..
mkdir -p dist/app
cp api/dist/. dist/ -R
cp app/dist/. dist/app -R
cp api/package.json dist/package.json
cd dist
npm install --only=prod
cd ..
rm dist/package.json
export IS_BUNDLE=true
"./node_modules/.bin/envify" dist/index.js > dist/index2.js
"./node_modules/.bin/envify" dist/db/index.js > dist/db/index2.js
rm dist/index.js
rm dist/db/index.js
mv dist/index2.js dist/index.js
mv dist/db/index2.js dist/db/index.js
unset IS_BUNDLE