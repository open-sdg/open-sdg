opensdg.chartColors = function(indicatorId) {
  var colorSet = {{ site.graph_color_set | jsonify }};
  var numberOfColors = {{ site.graph_color_number | jsonify }};
  var customColorList = {{ site.graph_color_list | jsonify }};

  this.goalNumber = parseInt(indicatorId.slice(indicatorId.indexOf('_')+1,indicatorId.indexOf('-')));
  this.goalColors = [['e5243b', '891523', 'ef7b89', '2d070b', 'f4a7b0', 'b71c2f', 'ea4f62', '5b0e17', 'fce9eb'],
                ['e5b735', '896d1f', 'efd385', '2d240a', 'f4e2ae', 'b7922a', 'eac55d', '5b4915', 'f9f0d6'],
                ['4c9f38', '2d5f21', '93c587', '0f1f0b', 'c9e2c3', '3c7f2c', '6fb25f', '1e3f16', 'a7d899'],
                ['c5192d', '760f1b', 'dc7581', '270509', 'f3d1d5', '9d1424', 'd04656', '4e0a12', 'e7a3ab'],
                ['ff3a21', 'b22817', 'ff7563', '330b06', 'ffd7d2', 'cc2e1a', 'ff614d', '7f1d10', 'ff9c90'],
                ['26bde2', '167187', '7cd7ed', '07252d', 'd3f1f9', '1e97b4', '51cae7', '0f4b5a', 'a8e4f3'],
                ['fcc30b', '977506', 'fddb6c', '322702', 'fef3ce', 'c99c08', 'fccf3b', '644e04', 'fde79d'],
                ['a21942', '610f27', 'c7758d', '610F28', 'ecd1d9', '811434', 'b44667', '400a1a', 'd9a3b3'],
                ['fd6925', '973f16', 'fda57c', '321507', 'fee1d3', 'ca541d', 'fd8750', '652a0e', 'fec3a7'],
                ['dd1367', '840b3d', 'ea71a3', '2c0314', 'f8cfe0', 'b00f52', 'd5358b', '580729', 'f1a0c2'],
                ['fd9d24', '653e0e', 'fed7a7', 'b16d19', 'fdba65', 'b14a1e', 'fd976b', '000000', 'fed2bf'],
                ['c9992d', '785b1b', 'dec181', '281e09', 'f4ead5', 'a07a24', 'd3ad56', '503d12', 'e9d6ab'],
                ['3f7e44', '254b28', '8bb18e', '0c190d', 'd8e5d9', '326436', '659769', '19321b', 'b2cbb4'],
                ['0a97d9', '065a82', '6cc0e8', '021e2b', 'ceeaf7', '0878ad', '3aabe0', '043c56', '9dd5ef'],
                ['56c02b', '337319', '99d97f', '112608', 'ddf2d4', '449922', '77cc55', '224c11', 'bbe5aa'],
                ['00689d', '00293e', '99c2d7', '00486d', '4c95ba', '126b80', 'cce0eb', '5a9fb0', 'a1c8d2'],
                ['19486a', '0a1c2a', '8ca3b4', '16377c', 'd1dae1', '11324a', '466c87', '5b73a3', '0f2656']];
  this.colorSets = {'default':['7e984f', '8d73ca', 'aaa533', 'c65b8a', '4aac8d', 'c95f44'],
                  'sdg':['e5243b', 'dda63a', '4c9f38', 'c5192d', 'ff3a21', '26bde2', 'fcc30b', 'a21942', 'fd6925', 'dd1367','fd9d24','bf8b2e','3f7e44','0a97d9','56c02b','00689d','19486a'],
                  'goal': this.goalColors[this.goalNumber-1],
                  'custom': customColorList,
                  'accessible': ['cd7a00', '339966', '9966cc', '8d4d57', 'A33600', '054ce6']};
  if(Object.keys(this.colorSets).indexOf(colorSet) == -1 || (colorSet=='custom' && customColorList == null)){
    return this.colorSets['default'];
  }
  this.numberOfColors = (numberOfColors>this.colorSets[colorSet].length || numberOfColors == null || numberOfColors == 0) ? this.colorSets[colorSet].length : numberOfColors;
  this.colors = this.colorSets[colorSet].slice(0,this.numberOfColors);

  return this.colors;

};
