
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.8.6/js/jsplumb.js"></script>
<script src="https://unpkg.com/popper.js"></script>
<script src="https://unpkg.com/tooltip.js"></script>

<div id="architecture">
  <div class="container">
    <div class="node" id="open-sdg">
      Open SDG
      <span class="info">
        <a href="https://github.com/open-sdg/open-sdg">Open SDG</a> provides the core layouts, styling, and functionality for your site.
      </span>
    </div>
    <div class="node" id="sdg-translations">
      SDG Translations
      <span class="info">
        <a href="https://github.com/open-sdg/sdg-translations">SDG Translations</a> provides translations of all the text used on your site.
      </span>
    </div>
    <div class="node" id="site-repo">
      Site repository
      <span class="info">
        This contains all the content, configuration, and customisations that
        are specific to your implementation. A starter template is available <a href="https://github.com/open-sdg/open-sdg-site-starter">here</a>.
      </span>
    </div>
    <div class="node" id="sdg-build">
      SDG Build
      <span class="info">
        <a href="https://github.com/open-sdg/sdg-build">SDG Build</a> handles all
        of the pre-processing of your data and metadata.
      </span>
    </div>
    <div class="node" id="data-repo">
      Data repository
      <span class="info">
        This contains all the data and metadata for your implementation. A starter template is available <a href="https://github.com/open-sdg/open-sdg-data-starter">here</a>.
      </span>
    </div>
    <div class="node" id="automation">
      Automation tool
      <img src="../img/circleci.png" />
      <img src="../img/travisci.png" />
      <img src="../img/jenkins.png" />
      <span class="info">
        Any automation tool, such as <a href="../automation/circle-ci/">CircleCI</a>
        or <a href="../automation/travis-ci/">TravisCI</a>, handles the deployment
        of both repositories to a hosting provider.
      </span>
    </div>
    <div class="node" id="hosting">
      Hosting provider
      <img src="../img/github.png" />
      <img src="../img/aws.png" />
      <img src="../img/linux.png" />
      <span class="info">
        Any hosting provider, such as <a href="../hosting/github-pages/">Github Pages</a> or <a href="../hosting/aws-s3/">Amazon S3</a>, will receive the
        uploaded files to serve them as a static website.
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
    Overlays: [ ["Arrow" , { width:12, length:12, location:0.5 }] ],
  });
  jsPlumb.connect({
    source: 'open-sdg',
    target: 'site-repo',
    anchors: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'sdg-translations',
    target: 'site-repo',
    anchors: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'sdg-build',
    target: 'data-repo',
    anchors: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'data-repo',
    target: 'site-repo',
    anchors: ['Left', 'Right'],
  });
  jsPlumb.connect({
    source: 'data-repo',
    target: 'automation',
    anchors: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'site-repo',
    target: 'automation',
    anchors: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'automation',
    target: 'hosting',
    anchors: ['Bottom', 'Top'],
  });

  // Add the tooltips with Popper.js.
  var repos = document.getElementsByClassName('node');
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
