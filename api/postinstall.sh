# Gets the Swagger-UI files

mkdir -p dist
cd dist
git clone http://www.github.com/swagger-api/swagger-ui.git
mv swagger-ui/dist/ docs/
rm -rf swagger-ui
sed -i 's/petstore.swagger.io\/v2/localhost:1337/g' docs/index.html
