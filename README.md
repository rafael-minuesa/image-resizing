# 👷 `image-resizing` 

## Image resizing for WordPress images using Cloudflare

A [Cloudflare Worker](https://developers.cloudflare.com/workers/) that uses Cloudflare's [Image Resizing API](https://developers.cloudflare.com/images/worker) to automatically compress any image served from the `content/images/` path on a WordPress site. 

> ℹ️ Image resizing is only available to Business and Enterprise [Cloudflare plans](https://www.cloudflare.com/plans/)

## Installation

You can clone the repository and use `wrangler` to deploy it.
Once deployed - to activate it you need to configure a route to your `/wp-content/uploads` path to the worker
For example
```
https://www.yoursite.com/wp-content/uploads/*
```

This ensures that image requests under that path are intercepted by the worker and resized as appopriate

## Features

- The worker will pull the original, unresized image and use it as a base for resizing.
- The image is resized to the width provided in the path element. If the image does not have a size, or as a size greater than `1000` , then `1000` is used.
- If an error occurs, the original image is loaded from the origin server.
- `metadata` is stripped except `copyright`

