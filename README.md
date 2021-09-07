# 👷 `image-resizing` 

## Image resizing for WordPress images using Cloudflare

[![Total alerts](https://img.shields.io/lgtm/alerts/g/Vortexmind/image-resizing.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Vortexmind/image-resizing/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Vortexmind/image-resizing.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Vortexmind/image-resizing/context:javascript) [![Build Status](https://api.travis-ci.com/Vortexmind/image-resizing.svg?branch=master)](https://travis-ci.com/github/Vortexmind/image-resizing) [![Known Vulnerabilities](https://snyk.io/test/github/Vortexmind/image-resizing/badge.svg)](https://snyk.io/test/github/Vortexmind/image-resizing) [![Maintainability](https://api.codeclimate.com/v1/badges/67d113999682b54bc46e/maintainability)](https://codeclimate.com/github/Vortexmind/image-resizing/maintainability) [![codecov](https://codecov.io/gh/Vortexmind/image-resizing/branch/master/graph/badge.svg)](https://codecov.io/gh/Vortexmind/image-resizing)

A [Cloudflare Worker](https://developers.cloudflare.com/workers/) that uses Cloudflare's [Image Resizing API](https://developers.cloudflare.com/images/worker) to automatically compress any image served from the `content/images/` path on a WordPress site. 

> ℹ️ Image resizing is only available to Business and Enterprise [Cloudflare plans](https://www.cloudflare.com/plans/)

## Installation

Use the button below to deploy the worker automatically to your Cloudflare zone

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Vortexmind/image-resizing)

Or you can clone the repository and use `wrangler` to deploy it.
Once deployed - to activate it you need to configure a route to your `/wp-content/uploads` path to the worker
For example
```
https://www.yourblog.com/wp-content/uploads/*
```

This ensures that image requests under that path are intercepted by the worker and resized as appopriate

## Features

- The worker will pull the original, unresized image and use it as a base for resizing.
- The image is resized to the width provided in the path element. If the image does not have a size, or as a size greater than `1000` , then `1000` is used.
- If an error occurs, the original image is loaded from the origin server.
- `metadata` is stripped except `copyright`

