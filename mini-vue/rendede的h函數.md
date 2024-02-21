const h = (tag, props, children) => {

    <!-返回vnode 節點其實就是javascript 對象 {} -->
    return {
        tag,
        props,
        children
    }
}

        // 通過h函數來創建一個vnode
        const vnode = h('div', { class: "est" }, [
            h("h2", null, "當前計數: 100"),
            h("button", null, "+1")
        ])
        // 看著是一個 vnode 其實 是兩個 vnode節點
        //  h("button", null, "+1") 改成  h("button", null, [h()])
        // 又是一個vnode vdom 結構 dom樹結構