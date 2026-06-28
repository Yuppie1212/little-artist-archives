FROM ruby:3.3-slim

RUN apt-get update -qq && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libyaml-dev \
    curl \
    git \
  && rm -rf /var/lib/apt/lists/*

# Node.js 20のインストール
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/*

# Yarnのインストール
RUN npm install -g yarn

WORKDIR /app

COPY entrypoint.sh /usr/bin/entrypoint.sh
RUN sed -i 's/\r//' /usr/bin/entrypoint.sh && chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
