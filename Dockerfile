# Use an NGINX base image
FROM nginx:alpine

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy project files to serve
COPY . /usr/share/nginx/html
