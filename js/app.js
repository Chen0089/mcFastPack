// 文件树展示
function createFileTree() {
    const fileTree = document.getElementById("fileTree");
    const treeData = [
        { name: "models", type: "folder", children: [{ name: "model1.json", type: "file" }] },
        { name: "textures", type: "folder", children: [{ name: "texture.png", type: "file" }] }
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

canvas.addEventListener('mousedown', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 5, 5); // 在点击位置绘制小点
});

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
            console.log('File content:', e.target.result);
        };
        reader.readAsText(file);  // 可以处理 JSON 文件
    }
}

// 生成 ZIP
function generateZip() {
    const JSZip = window.JSZip;
    const zip = new JSZip();

    // 将绘制的内容作为 PNG 文件添加到 ZIP
    zip.file("texture.png", canvas.toDataURL().split(',')[1], { base64: true });
    // 添加一个简单的 JSON 模型数据
    zip.file("model.json", JSON.stringify({ example: "model data" }));

    // 生成 ZIP 文件并下载
    zip.generateAsync({ type: "blob" }).then(function(content) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "resource_pack.zip";
        link.click();
    });
}
