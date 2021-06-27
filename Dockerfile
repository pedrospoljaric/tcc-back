FROM node
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN dpkg --add-architecture i386
RUN apt-get update -y
RUN apt-get install -y wget gnupg
RUN apt-get install -y libgtk2.0-0:i386
RUN apt-get install -y lib32z1 lib32ncurses5 lib32bz2-1.0
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update
RUN apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends
RUN rm -rf /var/lib/apt/lists/*
RUN /sbin/ldconfig -v
    
RUN npm install
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser
RUN mkdir -p /home/pptruser/Downloads
RUN chown -R pptruser:pptruser /home/pptruser
RUN chown -R pptruser:pptruser ./node_modules

USER pptruser

COPY . /app
CMD ["npm", "start"]