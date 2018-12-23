
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.8.6/js/jsplumb.js"></script>
<script src="https://unpkg.com/popper.js"></script>
<script src="https://unpkg.com/tooltip.js"></script>

<div id="architecture">
  <div class="container">
    <div class="node" id="open-sdg">
      Open<br>SDG
      <i class="fa fa-info-circle"></i>
      <span class="info">
        <a href="https://github.com/open-sdg/open-sdg">Open SDG</a> provides the core layouts, styling, and functionality for your site.
        <br><br>
        This is a <a href="https://jekyllrb.com/docs/themes/">Jekyll theme</a>
        designed to be easily customised if needed.
      </span>
    </div>
    <div class="node" id="sdg-translations">
      SDG<br>Translations
      <i class="fa fa-info-circle"></i>
      <span class="info">
        <a href="https://github.com/open-sdg/sdg-translations">SDG Translations</a> provides translations of all the text used on your site.
        <br><br>
        This is a stand-alone project which can be forked and extended to translate
        any implementation-specific text as needed.
      </span>
    </div>
    <div class="node" id="site-repo">
      Site<br>repository
      <i class="fa fa-info-circle"></i>
      <span class="info">
        This contains all the content, configuration, and customisations that
        are specific to your implementation. A starter template is available <a href="https://github.com/open-sdg/open-sdg-site-starter">here</a>.
        <br><br>
        This functions as your own custom <a href="https://jekyllrb.org">Jekyll</a>
        site.
      </span>
    </div>
    <div class="node" id="sdg-build">
      SDG<br>Build
      <i class="fa fa-info-circle"></i>
      <span class="info">
        <a href="https://github.com/open-sdg/sdg-build">SDG Build</a> handles the
        requisite pre-processing of your data and metadata.
        <br><br>
        This is a stand-alone library which does not require customisation.
      </span>
    </div>
    <div class="node" id="prose-io">
      Prose.io<br>service
      <i class="fa fa-info-circle"></i>
      <span class="info">
        <a href="https://prose.io">Prose.io</a> is a free cloud service that allows
        for user-friendly editing of the data and metadata files.
        <br><br>
        This functions as a data management system for curating the statistics in
        the platform.
      </span>
    </div>
    <div class="node" id="data-repo">
      Data<br>repository
      <i class="fa fa-info-circle"></i>
      <span class="info">
        This contains all the data and metadata for your implementation. A starter template is available <a href="https://github.com/open-sdg/open-sdg-data-starter">here</a>.
        <br><br>
        Data and metadata imports, validation, and pre-processing are all
        handled here.
      </span>
    </div>
    <div class="node" id="automation">
      Automation<br>tool
      <i class="fa fa-info-circle"></i>
      <img src="../img/circleci.png" alt="Logo for CircleCI" />
      <img src="../img/travisci.png" alt="Logo for TravisCI" />
      <img src="../img/jenkins.png" alt="Logo for Jenkins" />
      <span class="info">
        Any automation tool, such as <a href="../automation/circle-ci/">CircleCI</a>
        or <a href="../automation/travis-ci/">TravisCI</a>, handles the deployment
        of both repositories to a hosting provider.
      </span>
    </div>
    <div class="node" id="hosting">
      Hosting<br>provider
      <i class="fa fa-info-circle"></i>
      <img src="../img/github.png" alt="Logo for GitHub" />
      <img src="../img/aws.png" alt="Logo for AWS" />
      <img src="../img/linux.png" alt="Logo for Linux" />
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
    Endpoint: [ 'Dot', { radius: 4 } ],
    Overlays: [ ["Arrow" , { width:12, length:12, location:0.5 }] ],
    Anchors: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'open-sdg',
    target: 'site-repo',
  });
  jsPlumb.connect({
    source: 'sdg-translations',
    target: 'site-repo',
  });
  jsPlumb.connect({
    source: 'prose-io',
    target: 'data-repo',
  });
  jsPlumb.connect({
    source: 'sdg-build',
    target: 'data-repo',
  });
  jsPlumb.connect({
    source: 'data-repo',
    target: 'site-repo',
    anchors: ['Left', 'Right'],
  });
  jsPlumb.connect({
    source: 'data-repo',
    target: 'automation',
  });
  jsPlumb.connect({
    source: 'site-repo',
    target: 'automation',
  });
  jsPlumb.connect({
    source: 'automation',
    target: 'hosting',
  });
  window.addEventListener('resize', function() {
    jsPlumb.repaintEverything();
  });

  // Add the tooltips with Popper.js.
  var repos = document.getElementsByClassName('node');
  for (var i = 0; i < repos.length; i++) {
    var button = repos[i].getElementsByClassName('fa-info-circle');
    var text = repos[i].getElementsByClassName('info');
    if (text.length && button.length) {
      var instance = new Tooltip(button[0], {
        title: text[0].innerHTML,
        trigger: 'hover focus',
        html: true,
        closeOnClickOutside: true,
      });
    }
  }
});

</script>
