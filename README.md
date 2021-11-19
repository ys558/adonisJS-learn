## 添加controller

```bash
node ace make:controller Pet
```

执行
```bash
node ace list:routes
```

可看到：

```bash
$ node ace list:routes
┌───────────┬────────────┬──────────────────────┬────────────┬───────────────────┐
│ Method    │ Route      │ Handler              │ Middleware │ Name              │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ HEAD, GET │ /uploads/* │ Closure              │            │ drive.local.serve │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ HEAD, GET │ /pets      │ PetsController.index │            │                   │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ POST      │ /pets      │ PetsController.store │            │                   │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ PUT       │ /pets      │ PetsController.store │            │                   │
├───────────┼────────────┼──────────────────────┼────────────┼───────────────────┤
│ DELETE    │ /pets      │ PetsController.store │            │                   │
└───────────┴────────────┴──────────────────────┴────────────┴───────────────────┘
```