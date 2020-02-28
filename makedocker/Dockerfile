FROM ubuntu
RUN apt-get update

##########################
# INSTALL PACKAGES
##########################

# Install Python
RUN apt-get install -y python3-pip
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 2
RUN update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 2

# Install Ruby
RUN apt-get install -y ruby-full build-essential zlib1g-dev
RUN export GEM_HOME="$HOME/gems"
RUN export PATH="$HOME/gems/bin:$PATH"
RUN gem install jekyll bundler

# Install NodeJS
RUN apt install -y nodejs npm

# Install Git
RUN apt install -y git
RUN apt -y install locales

##########################
# CONFIGURATIONS
##########################

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
WORKDIR /repo
COPY ./assets /assets

CMD chmod +x /assets/serve.sh && /assets/serve.sh