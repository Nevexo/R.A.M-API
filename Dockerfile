FROM mhart/alpine-node:12
WORKDIR /api
# Copy source
COPY src/* .

# Install deps
RUN npm i
RUN npm i -g typescript

# Compile typescript
RUN tsc 

# Copy config
RUN cp config-example.json config.json

# Run!
CMD ["node", "api.js"]