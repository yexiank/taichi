// 获取资源列表容器
const resourceList = document.getElementById('resource-list');

// 手动更新这个数组来匹配 ttcc 文件夹里的实际文件
const resources = [
  { name: '电脑激活软件.rar', type: 'rar' },
  { name: 'Hummingbird-M-Update-Tool.zip', type: 'zip' },

  // 可以继续添加更多文件
];

// 渲染资源列表
resources.forEach(resource => {
  const item = document.createElement('div');
  item.classList.add('resource-item');

  const title = document.createElement('h3');
  title.textContent = resource.name;
  item.appendChild(title);

  const content = document.createElement('div');
  content.classList.add('resource-content');

  if (resource.type === 'txt') {
    const pre = document.createElement('pre');
    // 模拟获取文本内容
    fetch(`ttcc/${resource.name}`)
      .then(response => response.text())
      .then(text => {
        pre.textContent = text;
      })
      .catch(error => {
        pre.textContent = `无法加载文件: ${error.message}`;
      });
    content.appendChild(pre);
  } else {
    const link = document.createElement('a');
    link.href = `ttcc/${resource.name}`;
    link.textContent = '下载文件';
    link.download = resource.name;
    content.appendChild(link);
  }

  item.appendChild(content);
  resourceList.appendChild(item);
});

// Add search functionality
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const resourceItems = resourceList.querySelectorAll('.resource-item');

  resourceItems.forEach(item => {
    const title = item.querySelector('h3').textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});
