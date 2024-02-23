const h = (tag, props, children) => {

    return {
        tag,
        props,
        children
    }
}

// 把虛擬dom 挂載到 真實的dom上
const mount = (vnode, container) => {
    // 1 創建真實的dom結構
    const el = vnode.el = document.createElement(vnode.tag)

    // 2 處理props
    if (vnode.props) {
        for (const key in vnode.props) {
            const element = vnode.props[key];
            if (Object.hasOwnProperty.call(vnode.props, key) && key.startsWith("on")) {
                el.addEventListener(key.slice(2).toLocaleLowerCase(), element)
            } else {
                el.setAttribute(vnode.tag, element)
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