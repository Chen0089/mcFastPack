// JIEJOE produce
// b站主页：https://space.bilibili.com/3546390319860710
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

// 文件树展示
function createFileTree() {
    const fileTree = document.getElementById("fileTree");
    const treeData = [
        {
            name: "models", 
            type: "folder", 
            children: [
                { 
                    name: "model1.json", 
                    type: "file"
                }
            ] 
        },
        {
            name: "textures",
            type: "folder",
            children: [
                {
                    name: "texture.png",
                    type: "file" 
                }
            ]
        }
    ];
    fileTree.innerHTML = generateTreeHTML(treeData);
}

function generateTreeHTML(treeData) {
    return treeData.map(item => {
        if (item.type === "folder") {
            return `<div class="folder">${item.name}<div class="children">${generateTreeHTML(item.children)}</div></div>`;
        } else {
            return `<div class="file">${item.name}</div>`;
        }
    }).join('');
}

createFileTree();

// 画图功能
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// 设置画布的宽度和高度为 16x16 像素
const gridSize = 16; // 画布为 16x16 像素

window.addEventListener('load', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context not available');
        return;
    }   
    // 绘制 16x16 像素的画布，每个像素为一个 1x1 的矩形
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            // 设置颜色，这里可以根据条件来改变颜色
            ctx.fillStyle = 'blue'; // 可以更改颜色
            ctx.fillRect(x, y, 1, 1);  // 绘制一个 1x1 的像素
        }
    }
    // 触摸版
    canvas.addEventListener('touchstart', (event) => {
        const x = event.touches[0].pageX - canvas.offsetLeft;
        const y = event.touches[0].pageY - canvas.offsetTop;
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, 5, 5); // 在触摸位置绘制小点
    });

    canvas.addEventListener('touchmove', (event) => {
        event.preventDefault(); // 防止滚动
        const x = event.touches[0].pageX - canvas.offsetLeft;
        const y = event.touches[0].pageY - canvas.offsetTop;
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, 5, 5);
    });
    
    // 鼠标版
    canvas.addEventListener(
        'mousedown',
        (event) => {
            const x = event.offsetX;
            const y = event.offsetY;
            ctx.fillStyle = 'black';
            ctx.fillRect(x, y, 5, 5); // 在点击位置绘制小点
        }
    );
}
);


function downloadFrame() {
    const frameData = canvas.toDataURL(); // 获取绘制内容
    const link = document.createElement('a');
    link.href = frameData;
    link.download = 'frame.png';
    link.click();
}

// 文件上传处理
function uploadFile() {
    document.getElementById('fileInput').click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log(
                'File content:',
                e.target.result
            );
        };
        reader.readAsText(file);  // 可以处理 JSON 文件
    }
}

// 生成 ZIP
function generateZip() {
    const JSZip = window.JSZip;
    const zip = new JSZip();

    // 将绘制的内容作为 PNG 文件添加到 ZIP
    zip.file(
        "texture.png",
        canvas.toDataURL().split(',')[1],
        {
            base64: true
        }
    );
    // 添加一个简单的 JSON 模型数据
    zip.file(
        "model.json",
        JSON.stringify(
            {
                example: "model data"
            }
        )
    );

    // 生成 ZIP 文件并下载
    zip.generateAsync(
        {
            type: "blob" 
        }
    ).then(
        function(content) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = "resource_pack.zip";
            link.click();
        }
    );
}
