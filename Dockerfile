FROM node:10-alpine as builder
WORKDIR /app
COPY . .
RUN npm install -g pg
RUN npm install --production
RUN npm install -g @vercel/ncc
RUN ncc build index.js -o dist

FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app/dist/index.js .
COPY --from=builder /app/public public/ 
COPY --from=builder /app/experimental-330205-207077d91771.json . 
CMD ["node", "index.js","PROD"]