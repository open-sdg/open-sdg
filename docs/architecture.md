
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.8.6/js/jsplumb.js"></script>

<div id="architecture">
  <div class="container">
    <div class="repo" id="open-sdg">Open SDG</div>
    <div class="repo" id="sdg-translations">SDG Translations</div>
    <div class="repo" id="site-repo">Site repository</div>
    <div class="repo" id="sdg-build">SDG Build</div>
    <div class="repo" id="data-repo">Data repository</div>
  </div>
</div>

<script>
jsPlumb.ready(function () {

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

});
</script>
