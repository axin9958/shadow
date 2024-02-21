##　簡潔版的Mini-Vue框架,該Vue包括三個模塊
1. 渲染系統模塊
2. 可相應式系統模塊
3. 應用程序入口模塊

1. 渲染系統模塊 runtime->vnode->真實dom
2. 可相應式系統模塊 reactive(vue2 vue3)
3. 應用程序入口模塊 createApp(rootComponent).mount("#app")

### 説明 compiler->ast->大量的正則 沒有實現[在用戶的瀏覽器上是沒有這段代碼的]
1. 像.vue文件 ==>直接交給 @vue/compiler-sfc 插件實現的

11. 渲染系統的實現包含三個功能
12. 功能一: h 函數 用於返回一個VNode對象
13. 功能二: mount函數 用於將VNode挂載到DOM上
14. 功能三: patch函數,用於對兩個VNode進行對比,決定如何處理新的VNode