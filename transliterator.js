function latinFromGreek(search_code){
  var latin = ['a', 'b', 'c', 'd', 
               'e', 'f', 'g', 'h', 
               'i', 'j', 'k', 'l', 
               'm', 'n', 'o', 'p', 
               'q', 'r', 's', 't', 
               'u', 'v', 'w', 'x', 
               'y', 'z', 'ê', 'ô', 
               'th', 'ph', 'ps', 'ch'];
  var greek = [[0x391, 0x3B1, 0x386, 0x3AC], [0x392, 0x3B2], [], [0x394, 0x3B4],
               [0x395, 0x3B5, 0x388, 0x3AD], [], [0x393, 0x3B3], [0x2018],
               [0x399, 0x3B9, 0x38A, 0x390, 0x3AA, 0x3AF, 0x3CA], [], [0x39A, 0x3BA], [0x39B, 0x3BB],
               [0x39C, 0x3BC], [0x39D, 0x3BD], [0x39F, 0x3BF, 0x38C, 0x3CC], [0x3A0, 0x3C0],
               [], [0x3A1, 0x3C1], [0x3A3, 0x3C2, 0x3C3], [0x3A4, 0x3C4],
               [0x3A5, 0x3C5, 0x38E, 0x3AB, 0x3B0, 0x3CB, 0x3CD], [], [], [0x39E, 0x3BE],
               [0x37A], [0x396, 0x3B6], [0x397, 0x3B7, 0x389, 0x3AE], [0x3A9, 0x3C9, 0x38F, 0x3CE],
               [0x398, 0x3B8], [0x3A6, 0x3C6], [0x3A8, 0x3C8], [0x3A7, 0x3C7]];

  for (var i=0; i<greek.length; i++) {
    for (var j=0; j<greek[i].length; j++){
      if (greek[i][j] == search_code)
        return latin[i];
    }
  }
  return null;
}

function transliterate(input){
  var outstr = "";
  for (var i=0; i<input.length; i++) {
    var code = input.charCodeAt(i);
    var out_char = latinFromGreek(code);
    if (out_char == null)
      out_char = input.charAt(i);
    outstr += out_char;
  }
  return outstr;
}

$(document).ready(function(){
  $('button#transliterate').click(function(){
    var input;
    input = $('textarea#nonlatin').val();
    $('div#latin').html(transliterate(input));
  });
});