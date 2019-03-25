function initialiseGoogleAnalytics(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        
    sendPageviewToGoogleAnalytics();
}

function sendPageviewToGoogleAnalytics(){
    ga('create', '{{ site.analytics['ga_prod'] }}', 'auto');
    // anonymize user IPs (chops off the last IP triplet)
    ga('set', 'anonymizeIp', true);
    // forces SSL even if the page were somehow loaded over http://
    ga('set', 'forceSSL', true);
    ga('send', 'pageview');
}


