# BUILD ENVIRONMENT
# base image
FROM node:12-alpine as build

# set working directory
WORKDIR /app
COPY . /app

# install dependencies
RUN npm install

# build the project for production
RUN npm run build


# PRODUCTION ENVIRONMENT
# base image
FROM nginx:alpine

# copy the build folder from react to the root of nginx (www)
COPY --from=build /app/build /usr/share/nginx/html

# remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# replace with custom one
COPY nginx/nginx.conf /etc/nginx/conf.d

# expose port 80 to the outer world
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
