function find_match(input, input_index){
 /*
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
               */

  var transform =  [['ng', 'γγ'],
                    ['a', 'α', 'Α'],
                    ['b', 'β', 'Β'],
                    ['d', 'δ', 'Δ'],
                    ['e', 'ε', 'Ε'],
                    ['g', 'γ', 'Γ'],
                    ['h', 0x2018],
                    ['i', 'ι', 'Ι'],
                    ['k', 'κ', 'Κ'],
                    ['l', 'λ', 'Λ'],
                    ['m', 'μ', 'Μ'],
                    ['n', 'ν', 'Ν'],
                    ['o', 'ο', 'Ο'],
                    ['p', 'π', 'Π'],
                    ['r', 'ρ', 'Ρ'],
                    ['s', 'ς', 'σ', 'Σ'],
                    ['t', 'τ', 'Τ'],
                    ['u', 'υ', 'Υ'],
                    ['x', 'ξ', 'Ξ'],
                    ['y', 0x37A],
                    ['z', 'ζ', 'Ζ'],
                    ['ê', 'η', 'Η'],
                    ['ô', 'ω', 'Ω'],
                    ['th', 'θ', 'Θ'],
                    ['ph', 'φ', 'Φ'],
                    ['ps', 'ψ', 'Ψ'],
                    ['ch', 'χ', 'Χ']];
/*
  for (var i=0; i<greek.length; i++) {
    for (var j=0; j<greek[i].length; j++){
      if (greek[i][j] == search_code)
        return latin[i];
    }
  }
  return null;
*/
  for(transform_index = 0; transform_index < transform.length; transform_index++){
    var search_array = transform[transform_index];
    for(search_index = 1; search_index < search_array.length; search_index++){
      var compare = search_array[search_index];
      if(compare == input.substr(input_index, compare.length))
        return [search_array[0], input_index + compare.length]; 
      if(compare == input.charCodeAt(input_index))
        return [search_array[0], input_index + 1]
    }
  }
  return [null, input_index + 1];
}

function transliterate(input){
  var outstr = "";
  var not_found = [];
  var input_index = 0;
  while(input_index < input.length) {
    results = find_match(input, input_index);
    if(results[0] == null)
      not_found.push([input.charAt(input_index), input.charCodeAt(input_index)]);
    else
      outstr += results[0];
    input_index = results[1];
  }
  return [outstr, not_found];
}

$(document).ready(function(){
  $('button#transliterate').click(function(){
    var input;
    input = $('textarea#nonlatin').val();
    var transliteration = transliterate(input);
    $('div#latin').html(transliteration[0]);
  });
});