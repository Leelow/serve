# serve

[![Travis Status][travis-image]][travis-url]
[![Docker Status][docker-image]][docker-url]

## Usage

### Pull image

```bash
docker pull leelow29/serve
```

### Options

The default credentials are `user:password`. There are several options to custom with environment variables:

* SERVE_USER        Redefine login (`user` by default).
* SERVE_PASSWORD    Redefine password (`password` by default).
* SERVE_INDEX       Display index page (enabled by default).
* SERVE_CORS        Setup * CORS headers to allow requests from any origin (enabled by default).
* SERVE_DELAY       Define a delay (in seconds) to stop the container (disabled by default).

For instance, to disable CORS, set `SERVE_CORS` to `0`.

### Examples

A container which serves directory `/dir/files` with default credentials (user:password).

```bash
docker run --name serve -d -p 443:443 -v /dir/files:/app/files leelow29/serve:latest
```

A container with custom credentials:

```bash
docker run --name serve -d -p 443:443 -v /dir/files:/app/files -e SERVE_USER=admin -e SERVE_PASSWORD=pass leelow29/serve:latest
```

A container which will stop after 5 minutes:

```bash
docker run --name serve -d -p 443:443 -v /dir/files:/app/files -e SERVE_DELAY=300 leelow29/serve:latest
```

## Build

```bash
git clone https://github.com/Leelow/serve.git
cd serve
docker build -t serve .
```

## Credits

This docker image is based on awesome [@leo](https://github.com/leo) work: [https://github.com/zeit/serve](https://github.com/zeit/serve).

## License

[MIT](LICENSE)

[travis-image]: https://travis-ci.org/Leelow/serve.svg?branch=master
[travis-url]: https://travis-ci.org/Leelow/serve
[docker-image]: https://img.shields.io/docker/build/leelow29/serve.svg
[docker-url]: https://hub.docker.com/r/leelow29/serve/
