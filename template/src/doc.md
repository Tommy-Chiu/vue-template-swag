# vue-template-swag 模板说明

##  Directory tree 目录结构说明
``` dsconfig
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── rules
│   │   └── vue-md-loader      // markdown 解析loader
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
│
├── config                       // 全局变量（工程相关）
│   ├── index.js                // 项目配置
│   ├── dev.env.js              // 开发环境变量
│   ├── test.env.js             // 测试环境变量
│   └── prod.env.js             // 生产环境变量
│
├── static
│   └── env                     // 全局变量（业务相关）
│       ├── index.js            // 全局变量入口文件
│       ├── index.dev.js        // 开放环境变量
│       ├── index.test.js       // 测试环境变量
│       └── index.prod.js       // 生产环境变量
│
├── devUtils                     // 开发环境工具函数
│   ├── getFileTemplateByType   // 获取模板，用于开发者工具 popupDevTool 中创建文件
│   ├── getIPAdress             // 获取IP地址，用于devServer host
│   └── mock                    // 模拟接口
│
├── src
│   ├── assets
│   ├── components              // 公共自定义组件（业务无关）
│   │   ├── ...                // 可通过左边栏创建（左边栏 -> components -> 添加按钮）
│   │   ├── index.js           // 通过 require.context 批量 import，再通过 遍历 批量 exports 模块，其他同级路径下同名文件相同
│   │   ├── doc.md             // 当前文件夹说明文档（请勿删改, popupDevTool 强依赖，其他同级路径下同名文件相同）
│   │   └── script.js          // 脚本（请勿删改，popupDevTool 强依赖，其他同级路径下同名文件相同）
│   │
│   ├── directives              // 公共自定义指令（业务无关）
│   │   ├── ...                // 可通过左边栏创建
│   │   ├── index.js
│   │   ├── doc.md
│   │   └── script.js
│   │
│   ├── filters                 // 公共自定义过滤器（业务无关）
│   │   ├── ...                // 可通过左边栏创建
│   │   ├── index.js
│   │   ├── doc.md
│   │   └── script.js
│   │
│   ├── mixins                  // 公共自定义混入（业务无关）
│   │   ├── ...                // 可通过左边栏创建
│   │   ├── index.js
│   │   ├── doc.md
│   │   └── script.js
│   │
│   ├── utils                   // 公共函数或公共类（业务无关）
│   │   ├── ...                // 可通过左边栏创建
│   │   ├── doc.md
│   │   ├── index.js
│   │   └── script.js
│   │
│   ├── icons
│   │   ├── svgs               // svg 文件存放位置，可通过左边栏导入（左边栏 -> icons -> 添加按钮）
│   │   ├── doc_3.md
│   │   ├── index.js
│   │   └── script.js
│   │
│   ├── styles                  // 公共样式
│   │   ├── doc_4.md
│   │   └── index.css
│   │
│   ├── pages                   // 页面（业务相关）
│   │   ├── helloWorld         // 初始化页面，工程模板使用参考页
│   │   │
│   │   │    // 创建页面默认文件
│   │   │   ├── doc.md        // 页面说明文档，可用于描述页面 业务流程 等
│   │   │   ├── index.vue     // 页面根组件
│   │   │   ├── route         // 汇总至 @/router.js，设置isHomePage为true可重定向 '/' 为 '/该路由'
│   │   │   ├── requests      // 汇总至 @/requestor.js
│   │   │   ├── store         // 汇总至 @/store.js
│   │   │
│   │   │    // 非创建页面默认，可通过左边栏 -> pages -> xxx（如：helloWorld）-> 添加按钮创建
│   │   │   ├── components    // 汇总至 @/components/index.js,可通过mapComponents获取
│   │   │   ├── directives    // 汇总至 @/directives/index.js,可通过mapDirectives获取
│   │   │   ├── filters       // 汇总至 @/filters/index.js,可通过mapFilters获取
│   │   │   ├── mixins        // 汇总至 @/mixins/index.js,可通过mapMixins获取
│   │   │   └── utils         // 汇总至 @/utils/index.js,可通过mapUtils获取
│   │   │
│   │   ├── notFound           // 404页面
│   │   ├── ...                // 可通过左边栏创建
│   │   ├── doc_1.md
│   │   └── script.js
│   │
│   ├── modules                // 公共模块（业务相关）
│   │   ├── logo
│   │   │
│   │   │    // 创建页面默认文件
│   │   │   ├── doc.md        // 页面说明文档，可用于描述页面 业务流程 等
│   │   │   ├── index.vue     // 模块根组件
│   │   │   ├── requests      // 汇总至 @/requestor.js
│   │   │   ├── store         // 汇总至 @/store.js
│   │   │
│   │   │    // 非创建页面默认，可通过左边栏 -> pages -> xxx（如：helloWorld）-> 添加按钮创建
│   │   │   ├── components    // 汇总至 @/components/index.js,可通过mapComponents获取
│   │   │   ├── directives    // 汇总至 @/directives/index.js,可通过mapDirectives获取
│   │   │   ├── filters       // 汇总至 @/filters/index.js,可通过mapFilters获取
│   │   │   ├── mixins        // 汇总至 @/mixins/index.js,可通过mapMixins获取
│   │   │   └── utils         // 汇总至 @/utils/index.js,可通过mapUtils获取
│   │   │
│   │   ├── popupDevTool
│   │   ├── ...               // 可通过左边栏创建
│   │   ├── doc_2.md
│   │   ├── index.js
│   │   └── script.js
│   │
│   ├── app.vue
│   ├── main.js
│   ├── router.js
│   ├── store.js
│   ├── requestor.js
│   └── doc.md                 // 项目说明文档（业务相关）
│
├── test
├── index.html                  // 入口页面
├── package.json
└── README.md                   // 项目说明文档项（工程相关）
```

## Template features
###  PopupDevTool 全局开发者工具
即当前面面板，提供以下功能：
* markdown 文档
* demo 展示
* svg 图标
* 执行脚本：创建文件（components、directives、filters、mixins、utils）、添加文件（icons）至指定目录
###  Require.context 批量引入
使用 require.context 批量引入并封装
例如：
批量引入 'src/components'、'src/pages/xxx/components'、'src/modules/xxx/components'路径下自定义组件并exports
###  mapper 映射助手
使用 mapper 批量引入
例如：
mapComponents(['xxx'])、
mapComponents('page/helloWorld',['xxx1', 'xxx2'])、
mapComponents('module/popupDevTool',['xxx1', 'xxx2'])


## Commit message - 代码提交注释规范
``` html
<type>(<scope>): <subject> // Header
// 空一行
<body> // Body
```
###  Header
Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

#### type
用于说明本次commit的类别，只允许使用下面7个标识
* feat：添加新功能（feature）
* fix：修复问题
* docs：修改文档（documentation）
* style： 格式（不影响逻辑功能，比如格式化、补充分号等等）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加/修改测试用例
* chore：构建过程或辅助工具的变动（包括但不限于文档、代码生成等, 比如修改了README，webpack配置文件等等）

#### scope
用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

#### subject
是 commit 目的的简短描述，不超过50个字符。

### Body
用于对本次 commit 的详细描述，可以分成多行。

### 范例。
```
chore（components、directives、filters、mixins）：require.context

- components：require.context（component.name、component.install）
- directives：require.context（directive.install）
- filters：require.context（filter.install）
- mixins：require.context（mixin.install）
```
