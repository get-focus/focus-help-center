rm -rf dist

npm run build
cp dist/index.* ..

cd ..
shopt -s extglob
rm -rf !(index.*)
rm .*

git checkout gh-pages
git add .
git commit -m 'publish help-center'
git push https://github.com/get-focus/focus-help-center.git gh-pages --force
git checkout develop
