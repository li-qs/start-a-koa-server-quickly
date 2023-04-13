# start-a-koa-server-quickly

开箱即用的 koa 应用，使用 [koa](https://github.com/koajs/koa) + [typeorm](https://github.com/typeorm/typeorm) + [ioredis](https://github.com/luin/ioredis) 搭建。

轻度封装，在 controller 中使用装饰器描述路由，参考 [ping.controller.ts](https://github.com/li-qs/start-a-koa-server-quickly/blob/main/src/controller/ping.controller.ts) 文件；路由规则与 [@koa/router](https://github.com/koajs/router) 保持一致。

在 [core/](https://github.com/li-qs/start-a-koa-server-quickly/tree/main/src/core) 文件夹中，依然可以按照 koa 原有的方式，对中间件进行自定义和调度。

在 [config/](https://github.com/li-qs/start-a-koa-server-quickly/tree/main/config) 文件夹中，按照 [node-config](https://github.com/node-config/node-config) 的方式管理配置文件。

## 如何使用

```shell
$ git clone git@github.com:li-qs/start-a-koa-server-quickly.git koa-server
$ cd koa-server
$ yarn run start
```

尝试访问 [ping.controller.ts](https://github.com/li-qs/start-a-koa-server-quickly/blob/main/src/controller/ping.controller.ts) 中定义的 url：

```shell
$ curl 127.0.0.1:3000/ping
$ curl 127.0.0.1:3000/ping/redis
$ curl 127.0.0.1:3000/ping/mysql
```
