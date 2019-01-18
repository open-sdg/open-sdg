
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.8.6/js/jsplumb.js"></script>
<script src="https://unpkg.com/popper.js"></script>
<script src="https://unpkg.com/tooltip.js"></script>

<div id="architecture">
  <div class="container">
    <div class="node row1 site-column" id="open-sdg">
      Open SDG
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        <a href="https://github.com/open-sdg/open-sdg">Open SDG</a> provides the core layouts, styling, and functionality for your site.
        <br><br>
        This is a <a href="https://jekyllrb.com/docs/themes/">Jekyll theme</a>
        designed to be easily customised if needed.
      </span>
    </div>
    <div class="node row2 site-column" id="site-repo">
      Site repository
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        This contains all the content, configuration, and customisations that
        are specific to your implementation. A starter template is available <a href="https://github.com/open-sdg/open-sdg-site-starter">here</a>.
        <br><br>
        This functions as your own custom <a href="https://jekyllrb.org">Jekyll</a>
        site.
      </span>
    </div>
    <div class="node row1 data-column" id="prose-io">
      Prose.io editor
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        <a href="https://prose.io">Prose.io</a> is a free cloud service that allows
        for user-friendly editing of the data and metadata files.
        <br><br>
        This functions as a data management system for curating the statistics in
        the platform.
      </span>
    </div>
    <div class="node row2 data-column" id="data-repo">
      Data repository
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        This contains all the data and metadata for your implementation. A starter template is available <a href="https://github.com/open-sdg/open-sdg-data-starter">here</a>.
        <br><br>
        Data and metadata imports, validation, and pre-processing are all
        handled here.
      </span>
    </div>
    <div class="node row3 site-column" id="automation-site">
      Automation tool
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        Any automation tool, such as <a href="../automation/circle-ci/">CircleCI</a>
        or <a href="../automation/travis-ci/">TravisCI</a>, performs configured actions in response to events or schedules.
      </span>
    </div>
    <div class="node row4" id="jekyll">
      Jekyll
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        <a href="https://jekyllrb.com/">Jekyll</a> is a static site generator that
        compiles the everything into a fast and secure website.
      </span>
    </div>
    <div class="node row4 site-column" id="sdg-translations">
      SDG<br> Translations
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        <a href="https://github.com/open-sdg/sdg-translations">SDG Translations</a> provides translations of all the text used on your site.
        <br><br>
        This is a stand-alone project which can be forked and extended to translate
        any implementation-specific text as needed.
      </span>
    </div>
    <div class="node row3 data-column" id="automation-data">
      Automation tool
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        Any automation tool, such as <a href="../automation/circle-ci/">CircleCI</a>
        or <a href="../automation/travis-ci/">TravisCI</a>, performs configured actions in response to events or schedules.
      </span>
    </div>
    <div class="node row4 data-column" id="sdg-build">
      SDG Build
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        <a href="https://github.com/open-sdg/sdg-build">SDG Build</a> handles the
        requisite pre-processing of your data and metadata.
        <br><br>
        This is a stand-alone library which does not require customisation.
      </span>
    </div>
    <div class="node row5 site-column" id="hosting-site">
      Hosting provider
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        Any hosting provider, such as <a href="../hosting/github-pages/">Github Pages</a> or <a href="../hosting/aws-s3/">Amazon S3</a>, will receive the
        uploaded files to serve them as a static website.
      </span>
    </div>
    <div class="node row5 data-column" id="hosting-data">
      Hosting provider
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        Any hosting provider, such as <a href="../hosting/github-pages/">Github Pages</a> or <a href="../hosting/aws-s3/">Amazon S3</a>, will receive the
        uploaded files to serve them as a static website.
      </span>
    </div>
    <div id="logos-automation" class="logos row3">
      <img src="../img/circleci.png" alt="Logo for CircleCI" />
      <img src="../img/travisci.png" alt="Logo for TravisCI" />
      <img src="../img/jenkins.png" alt="Logo for Jenkins" />
    </div>
    <div id="logos-hosting" class="logos row5">
      <img src="../img/github.png" alt="Logo for GitHub" />
      <img src="../img/aws.png" alt="Logo for AWS" />
      <img src="../img/linux.png" alt="Logo for Linux" />
    </div>
    <div class="node row6 site-column" id="prod-stage-site">
      Production and <br>staging domains
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        The hosted site can now be reached in two versions - <strong>staging</strong>
        and <strong>production</strong> - accessible at different domain names.
      </span>
    </div>
    <div class="node row6 data-column" id="prod-stage-data">
      Production and <br>staging domains
      <i tabindex="0" class="fa fa-info-circle"></i>
      <span class="info">
        The hosted data can now be reached in two versions - <strong>staging</strong>
        and <strong>production</strong> - accessible at different domain names.
      </span>
    </div>
  </div>
</div>

<script>
jsPlumb.ready(function () {

  // Helper function to get overlay labels as tooltips.
  function connectorTip(text, location) {
    if (!location) {
      location = 0.5;
    }
    var label = '' +
      '<div class="node connector-tooltip">' +
        '<i tabindex="0" class="fa fa-info-circle"></i>' +
        '<span class="info">' + text + '</span>' +
      '</div>';
    return [['Custom', {create: function() { return $(label); }, location: location}]]
  }

  // Helper function to get overlay arrows.
  function connectorArrow(location) {
    if (!location) {
      location = 0.5;
    }
    return [["Arrow" , { width: 12, length: 12, location: location }]];
  }

  // Draw the connections using the jsPlumb library.
  jsPlumb.importDefaults({
    ConnectionsDetachable: false,
    Connector: 'Straight',
    Endpoint: [ 'Dot', { radius: 4 } ],
    Anchors: ['Bottom', 'Top'],
  });
  jsPlumb.connect({
    source: 'open-sdg',
    target: 'site-repo',
    overlays: connectorArrow(),
  });
  jsPlumb.connect({
    source: 'site-repo',
    target: 'automation-site',
    overlays: connectorTip('The automation tool listens for changes in the repository code.'),
  });
  jsPlumb.connect({
    source: 'jekyll',
    target: 'sdg-translations',
    anchors: ['Right', 'Left'],
    overlays: connectorTip('During the Jekyll build, the SDG Translations project is used to get multilingual content.'),
  });
  jsPlumb.connect({
    source: 'prose-io',
    target: 'data-repo',
    overlays: connectorTip('Edits made in Prose.io are pushed to the data repository.'),
  });
  jsPlumb.connect({
    source: 'data-repo',
    target: 'automation-data',
    overlays: connectorTip('The automation tool listens for changes in the repository code.'),
  });
  jsPlumb.connect({
    source: 'prod-stage-data',
    target: 'site-repo',
    anchors: ['Left', 'Right'],
    connector: 'Flowchart',
    overlays: connectorTip('The metadata and headline data is imported into the site at build time, which allows the platform to display data even without javascript.', 0.9),
  });
  jsPlumb.connect({
    source: 'automation-data',
    target: 'sdg-build',
    overlays: connectorTip('Whenever the repository code changes, the automation tool kicks in and validates and processes the data.'),
  });
  jsPlumb.connect({
    source: 'sdg-build',
    target: 'hosting-data',
    overlays: connectorTip('The automation tool continues by pushing the processed data on to the hosting provider.'),
  });
  jsPlumb.connect({
    source: 'jekyll',
    target: 'hosting-site',
    overlays: connectorTip('The automation tool continues by pushing the Jekyll build to the hosting provider'),
  });
  jsPlumb.connect({
    source: 'automation-site',
    target: 'jekyll',
    overlays: connectorTip('Whenever the repository code changes, the automation tool kicks in and starts a Jekyll build.'),
  });
  jsPlumb.connect({
    source: 'hosting-data',
    target: 'prod-stage-data',
    overlays: connectorArrow(),
  });
  jsPlumb.connect({
    source: 'hosting-site',
    target: 'prod-stage-site',
    overlays: connectorArrow(),
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
        placements: ['bottom', 'top'],
        trigger: 'hover focus',
        delay: {
          show: 50,
          hide: 150,
        },
        html: true,
        closeOnClickOutside: true,
        // Hijack the template to workaround a bug by adding an "inner" div.
        // @see https://github.com/FezVrasta/popper.js/issues/669
        template: '<div class="tooltip" role="tooltip">' +
                    '<div class="inner">' +
                      '<div class="tooltip-arrow"></div>' +
                      '<div class="tooltip-inner"></div>' +
                    '</div>' +
                  '</div>',
      });
    }
  }
});

</script>
