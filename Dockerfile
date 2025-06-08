FROM php:8.2-apache

# Set Apache document root to /var/www/html/public (Laravel's public folder)
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/sites-available/000-default.conf \
    && sed -ri -e "s!/var/www/!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# PHP INI configuration (opcache + xdebug)
RUN echo "zend_extension=opcache.so\n\
opcache.enable=1\n\
opcache.memory_consumption=128\n\
opcache.interned_strings_buffer=8\n\
opcache.max_accelerated_files=10000\n\
opcache.revalidate_freq=2\n\
opcache.fast_shutdown=1" \
    > "$PHP_INI_DIR/conf.d/docker-php-ext-opcache.ini"

RUN echo "zend_extension=xdebug.so\n\
xdebug.mode=develop,debug\n\
xdebug.start_with_request=yes\n\
xdebug.client_host=host.docker.internal\n\
xdebug.client_port=9003" \
    > "$PHP_INI_DIR/conf.d/99-xdebug.ini"

# Install required system packages
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    zip \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    git \
    unzip \
    curl \
    && docker-php-ext-configure intl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install intl opcache pdo_mysql zip gd \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Enable Apache rewrite module
RUN a2enmod rewrite

# Install and enable APCu
RUN pecl install apcu-5.1.24 \
    && docker-php-ext-enable apcu \
    && echo "extension=apcu.so\napc.enable_cli=1\napc.enable=1" >> "$PHP_INI_DIR/php.ini"

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Optional: Install Node Version Manager (NVM)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
