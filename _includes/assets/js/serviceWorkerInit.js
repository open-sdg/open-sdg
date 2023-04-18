if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('{{ site.baseurl }}/service-worker.js');
    });
}
