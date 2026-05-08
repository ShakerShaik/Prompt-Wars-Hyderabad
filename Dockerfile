# Use lightweight Nginx for serving static content
FROM nginx:alpine

# Copy the static website files to the Nginx html directory
COPY . /usr/share/nginx/html

# Cloud Run expects the container to listen on the port defined by the PORT environment variable
# Nginx default is 80, we will use a custom script to inject the PORT variable
RUN printf 'server {\n  listen %s;\n  location / {\n    root /usr/share/nginx/html;\n    index index.html;\n  }\n}\n' '$PORT' > /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
