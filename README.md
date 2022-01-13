# pnpm-repo
pnpm解决了什么问题？

1、`Phantom dependencies` 即幽灵依赖问题， 如果A 依赖 B， B 依赖 C，那么A可以直接访问到C，但是如果有一天B升级之后不再依赖C，则A就会报错

2、`NPM doppelgangers` 这个问题其实也可以说是 hoist 导致的，可能会导致有大量的依赖的被重复安装。 如A依赖util@1.0, B依赖util@2.0，则提升时并不能将两个依赖同时提升，如果都提升了，会导致冲突。所以两个版本的包里的相同的内容则会重复安装。


## Command

常用命令和npm没有太大区别，所以学习成本也较低

| npm | pnpm |
| ------ | ------ |
| npm install | pnpm install |
| npm i <pkg> | pnpm add <pkg> |
| npm run <cmd> | pnpm <cmd> |

## workspace

- Config

  A workspace must have a `pnpm-workspace.yaml` file in its root. A workspace also may have an `.npmrc` in its root.

  pnpm-workspace.yaml

  ```js
    packages:
    - 'biz/**'
    - 'libs/**'
  ```

  .npmrc

  ```js
    shared-workspace-shrinkwrap = true
    link-workspace-packages = true
  ```

- command

  `pnpm i` - 安装所有依赖，会进行变量提升，依赖都安装在根目录， packges中的依赖通过软连接的方式指向root中的node_modules

  `pnpm i pkg -w` - 将依赖安装在root目录
  
  `pnpm i pgk1 -r --filter pkg2` - 为pkg2安装依赖 pkg1, --filter 参数用于指定scope

  `pnpm remove pgk1 -r --filter pkg2` - 为pkg2移除依赖 pkg1

  
  使用workspace安装依赖时，如果在workspace中能找到，则会在dependencies中默认添加workspace:前缀, 该别名会在发布阶段自动替换为正常版本号

  before publish

  ```js
    "dependencies": {
      "@frorz/utils": "workspace:^1.0.1"
    }
  ```

  published resource

  ```js
    "dependencies": {
      "@frorz/utils": "^1.0.1"
    }
  ```

- Publish

  `pnpm publish` - publish all

  `pnpm publish --filter pkg` - 指明要发布的包





