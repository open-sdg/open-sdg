
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.8.6/js/jsplumb.js"></script>
<script src="https://unpkg.com/popper.js"></script>
<script src="https://unpkg.com/tooltip.js"></script>

<div id="architecture">
  <div class="container">
    <div class="repo" id="open-sdg">
      Open SDG
      <span class="info">
        <a href="https://github.com/open-sdg/open-sdg">Open SDG</a> provides the core layouts, styling, and functionality for your site.
      </span>
    </div>
    <div class="repo" id="sdg-translations">
      SDG Translations
      <span class="info">
        <a href="https://github.com/open-sdg/sdg-translations">SDG Translations</a> provides translations of all the text used on your site.
      </span>
    </div>
    <div class="repo" id="site-repo">
      Site repository
      <span class="info">
        This contains all the content, configuration, and customisations that
        are specific to your implementation. A starter template is available <a href="https://github.com/open-sdg/open-sdg-site-starter">here</a>.
      </span>
    </div>
    <div class="repo" id="sdg-build">
      SDG Build
      <span class="info">
        <a href="https://github.com/open-sdg/sdg-build">SDG Build</a> handles all
        of the pre-processing of your data and metadata.
      </span>
    </div>
    <div class="repo" id="data-repo">
      Data repository
      <span class="info">
        This contains all the data and metadata for your implementation. A starter template is available <a href="https://github.com/open-sdg/open-sdg-data-starter">here</a>.
      </span>
    </div>
  </div>
</div>

<script>
jsPlumb.ready(function () {

  // Draw the connections using the jsPlumb library.
  jsPlumb.importDefaults({
    ConnectionsDetachable: false,
    Connector: 'Straight',
  });
  jsPlumb.connect({
    source: 'open-sdg',
    target: 'site-repo',
    anchor: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'sdg-translations',
    target: 'site-repo',
    anchor: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'sdg-build',
    target: 'data-repo',
    anchor: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'data-repo',
    target: 'site-repo',
    anchor: ['Left', 'Right'],
    overlays:[ ["Arrow" , { width:12, length:12, location:0.5 }] ],
  });

  // Add the tooltips with Popper.js.
  var repos = document.getElementsByClassName('repo');
  for (var i = 0; i < repos.length; i++) {
    var text = repos[i].getElementsByClassName('info');
    if (text.length) {
      var instance = new Tooltip(repos[i], {
        title: text[0],
        trigger: 'click',
        html: true,
        closeOnClickOutside: true,
      });
    }
  }
});

</script>
