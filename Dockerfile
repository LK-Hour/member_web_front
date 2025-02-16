FROM node:20-alpine as builder

WORKDIR /app

# Copy package files and install dependencies with specific npm version
COPY package*.json ./
RUN npm install -g npm@10.2.4 && \
    npm install && \
    npm install --save-dev @babel/plugin-proposal-private-property-in-object

COPY . .

# Set CI=false to prevent treating warnings as errors
ENV CI=false
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
