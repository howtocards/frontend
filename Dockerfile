#
# ---- Build ----
FROM node:dubnium-alpine as base
WORKDIR /root/build

# install and cache node packages
COPY package.json package-lock.json ./
RUN npm set progress=false && npm config set depth 0
RUN npm install
COPY . .
RUN npm run build:prod

#
# ---- Release ----
FROM nginx:alpine
# copy production node_modules
COPY --from=base /root/build/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
