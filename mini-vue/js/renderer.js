const h = (tag, props, children) => {
    return {
        tag,
        props,
        children
    }
}
// h函數主要是實現了 虛擬dom 但是並沒有挂載到 真實的dom節點上
// 所以需要 挂在 mount
const mount = (vnode, container) => {
    // 1 創建出真實的原生,并且在vnode上保留el
    const el = vnode.el = document.createElement(vnode.tag)
    // 2 處理props
    if (vnode.props) {
        for (const key in vnode.props) {
            const value = vnode.props[key]
            if (key.startsWith("on")) {
                el.addEventListener(key.slice(2).toLocaleLowerCase(), value)
            } else {
                el.setAttribute(vnode.tag, value)
            }
        }
    }

    // 3 處理children 分成兩種情況 一種是 string 一種是數組[]
    if (vnode.children) {
        if (typeof vnode.children === "string") {
            el.textContent = vnode.children
        } else {
            vnode.children.forEach(element => {
                mount(element, el)
            });
        }
    }
    // 4 將el挂載到container上
    container.appendChild(el)
}