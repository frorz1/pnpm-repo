# pnpm-repo
pnpm解决了什么问题？

1、`Phantom dependencies` 即幽灵依赖问题， 如果A 依赖 B， B 依赖 C，那么A可以直接访问到C，但是如果有一天B升级之后不再依赖C，则A就会报错

2、`NPM doppelgangers` 这个问题其实也可以说是 hoist 导致的，可能会导致有大量的依赖的被重复安装。 如A依赖util@1.0, B依赖util@2.0，则提升时并不能将两个依赖同时提升，如果都提升了，会导致冲突。所以两个版本的包里的相同的内容则会重复安装。


pnpm 如何解决的？如：

```sh
pnpm i express -w
```

那么pnpm 安装之后，会在当前的node_modules里面生成一个express目录，但它仅仅是一个`软链接`， 实际都会指向root目录下的`node_modules/.pnpm/express@xxx/node_modules/express`, 而express的依赖项也都在`node_modules/.pnpm/express@xxx/node_modules`中。

pnpm安装包的规律都是如此，如果在package.json中有依赖，就在当前package中创建软连接，而实际的包则安装在
`/node_modules/.pnpm/<package-name>@version/node_modules/<package-name>`

▾ node_modules
  ▾ .pnpm
    ▸ accepts@1.3.7
    ▸ array-flatten@1.1.1
    ...
    ▾ express@4.17.1
      ▾ node_modules
        ▸ accepts
        ▸ array-flatten
        ▸ body-parser
        ▸ content-disposition
        ...
        ▸ etag
        ▾ express
          ▸ lib
            History.md
            index.js
            LICENSE
            package.json
            Readme.md

> 总结一句即： 所有实体包都是平铺在.pnpm/中的，但是每一个包的依赖都是通过软链接 指向平铺的实体包。
> 以嵌套的结构实现平铺

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


## 参考资料

[Why should we use pnpm?](https://medium.com/pnpm/why-should-we-use-pnpm-75ca4bfe7d93)

[作者主页](https://medium.com/@zoltankochan)




