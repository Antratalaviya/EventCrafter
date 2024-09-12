FROM node:20-alpine AS build

WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build



FROM node:20-alpine AS production

WORKDIR /server

COPY --from=build /server/node_modules ./node_modules
COPY --from=build /server/package*.json ./
COPY --from=build /server/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "dev"]
