
hexo.extend.helper.register('currentLang', function () {
    const lang = this.page.lang || this.theme.lang || 'zh'; // 默认语言为中文
    return lang;
});
