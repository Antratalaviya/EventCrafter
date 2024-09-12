FROM node:20-alpine AS build

WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20-alpine AS production

WORKDIR /client

COPY --from=build /client/node_modules ./node_modules
COPY --from=build /client/dist ./dist
COPY --from=build /client/package*.json ./

EXPOSE 3000
CMD ["npm", "run", "dev"]
