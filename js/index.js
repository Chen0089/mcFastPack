// JIEJOE produce
// b站主页：https://space.bilibili.com/3546390319860710
// 复制过来的
// copy from JIEJOE
const loading = {
    container: document.querySelector(".loading"),
    in(target) {
        this.container.classList.remove("loading_out");
        setTimeout(
            () => {
                window.location.href = target;
            },
            1000
        )
    },
    out() {
        this.container.classList.add("loading_out");
    }
};
window.addEventListener(
    "load",
    () => {
        loading.out();
    }
)
