// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const tabs = document.querySelectorAll('.tab');
    const poemList = document.getElementById('poemList');
    const poemDetail = document.getElementById('poemDetail');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const secondaryNav = document.getElementById('secondaryNav');
    const secondaryNavTitle = document.getElementById('secondaryNavTitle');
    const secondaryNavList = document.getElementById('secondaryNavList');

    // 当前激活的标签类型
    let currentType = null;

    // 导航标签点击事件
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的激活状态
            tabs.forEach(t => t.classList.remove('active'));
            // 添加当前标签的激活状态
            this.classList.add('active');
            
            // 获取当前标签类型
            currentType = this.dataset.type;
            
            // 显示二级导航，隐藏详情和搜索结果
            showSecondaryNav(currentType);
            secondaryNav.classList.remove('hidden'); // 显示二级导航
            poemDetail.classList.add('hidden');
            searchResults.classList.add('hidden');
        });
    });

    // 显示二级导航（诗歌列表）
    function showSecondaryNav(type) {
        const poems = type === 'tang' ? tangPoems : songPoems;
        const title = type === 'tang' ? '唐诗' : '宋词';
        
        // 更新二级导航标题
        secondaryNavTitle.textContent = `${title}列表`;
        
        // 生成诗歌列表HTML
        let html = '';
        poems.forEach((poem, index) => {
            html += `
                <li class="secondary-nav-item" data-type="${type}" data-index="${index}">
                    ${poem.title} - ${poem.author}
                </li>
            `;
        });
        
        secondaryNavList.innerHTML = html;
        
        // 为二级导航项添加点击事件
        addSecondaryNavListeners();
    }
    
    // 为二级导航项添加点击事件
    function addSecondaryNavListeners() {
        const navItems = document.querySelectorAll('.secondary-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const type = this.dataset.type;
                const index = parseInt(this.dataset.index);
                showPoemDetail(type, index);
            });
        });
    }

    // 为诗歌列表项添加点击事件
    function addPoemItemListeners() {
        const poemItems = document.querySelectorAll('.poem-item');
        poemItems.forEach(item => {
            item.addEventListener('click', function() {
                const type = this.dataset.type;
                const index = parseInt(this.dataset.index);
                showPoemDetail(type, index);
            });
        });
    }

    // 显示诗歌详情
    function showPoemDetail(type, index) {
        const poems = type === 'tang' ? tangPoems : songPoems;
        const poem = poems[index];
        
        // 更新详情页面内容
        document.getElementById('detailTitle').textContent = poem.title;
        document.getElementById('detailAuthor').textContent = `作者：${poem.author}`;
        document.getElementById('detailContent').textContent = poem.content;
        
        // 更新视频播放
        const videoElement = document.getElementById('poemVideo');
        // 这里可以根据诗歌的标题或索引来设置对应的视频文件
        // 示例：videoElement.src = `videos/${poem.title}.mp4`;
        // 由于目前没有具体的视频文件，使用占位符
        videoElement.src = `your-video-file.mp4`;
        videoElement.load(); // 重新加载视频
        
        // 显示详情，隐藏列表和搜索结果
        poemDetail.classList.remove('hidden');
        poemList.classList.add('hidden');
        searchResults.classList.add('hidden');
    }

    // 移除返回按钮相关代码

    // 搜索按钮点击事件
    searchBtn.addEventListener('click', function() {
        performSearch();
    });

    // 搜索输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 执行搜索功能
    function performSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        
        // 如果关键词为空，不执行搜索
        if (!keyword) {
            alert('请输入搜索关键词');
            return;
        }
        
        // 合并所有诗歌数据，并添加原始索引信息
        const allPoems = [
            ...tangPoems.map((poem, index) => ({ ...poem, type: 'tang', originalIndex: index })),
            ...songPoems.map((poem, index) => ({ ...poem, type: 'song', originalIndex: index }))
        ];
        
        // 执行搜索
        const results = allPoems.filter(poem => {
            return poem.title.toLowerCase().includes(keyword) || 
                   poem.author.toLowerCase().includes(keyword);
        });
        
        // 显示搜索结果
        displaySearchResults(results);
    }

    // 显示搜索结果
    function displaySearchResults(results) {
        // 隐藏详情，显示搜索结果在二级导航处
        poemDetail.classList.add('hidden');
        searchResults.classList.add('hidden');
        secondaryNav.classList.remove('hidden'); // 显示二级导航
        
        // 更新二级导航标题为"搜索结果"
        secondaryNavTitle.textContent = "搜索结果";
        
        // 生成搜索结果HTML
        if (results.length === 0) {
            secondaryNavList.innerHTML = '<li style="padding: 10px; text-align: center;">没有找到匹配的诗歌</li>';
            return;
        }
        
        let html = '';
        results.forEach((poem, index) => {
            // 直接使用我们在performSearch中添加的originalIndex属性
            html += `
                <li class="secondary-nav-item" data-type="${poem.type}" data-index="${poem.originalIndex}">
                    ${poem.title} - ${poem.author}
                </li>
            `;
        });
        
        secondaryNavList.innerHTML = html;
        
        // 为搜索结果项添加点击事件
        addSecondaryNavListeners();
    }

    // 为搜索结果项添加点击事件
    function addSearchResultListeners() {
        const resultItems = resultsList.querySelectorAll('.poem-item');
        resultItems.forEach(item => {
            item.addEventListener('click', function() {
                const type = this.dataset.type;
                const index = parseInt(this.dataset.index);
                showPoemDetail(type, index);
            });
        });
    }
});
