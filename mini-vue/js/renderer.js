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
    // debugger;
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

// patch 主要運行的就是 diff算法 老的虛擬dom和新的虛擬dom誰顯示的問題
const patch = (n1, n2) => {
    // 元素可能是不同的 例如div 和 h2 
    if (n1.tag !== n2.tag) {
        const n1ElementParent = n1.el.parentElement
        n1ElementParent.removeChild(n1.el)
        mount(n2, n1ElementParent)
    } else {
        // 1 取出element對象,并且在n2中進行保存

        const el = n2.el = n1.el
        // 2 處理props
        const oldProps = n1.props || {}
        const newProps = n2.props || {}
        //  console.log(oldProps);打印結果是 {class:"est"}

        // 2.1獲取所有的newProps添加到el
        for (const key in newProps) {
            const oldValue = oldProps[key] // 所以這樣的取值可以得到同名的 class屬性獲得他的值
            const newValue = newProps[key]
            // console.log(key, oldValue, newValue); 打印 class est est
            if (newValue !== oldValue) {
                if (key.startsWith("on")) {
                    el.addEventListener(key.slice(2).toLocaleLowerCase(), newValue)
                } else {
                    el.setAttribute(key, newValue)
                }
            }
        }
        // 2.2刪除舊的props 重新遍歷
        for (const key in oldProps) {
            if (!(key in newProps)) {
                const value = oldProps[key]
                el.removeEventListener(key.slice(2).toLocaleLowerCase(), value)
            } else {
                el.removeAttribute(key)
            }
        }
    }
}

