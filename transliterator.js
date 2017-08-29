function find_match(input, input_index){
  var transform =  [['ng', 'γγ'],
                    ['a', 'α', 'ἀ', 0x3AC],
                    ['A', 'Α'],
                    ['b', 'β', 'Β'],
                    ['d', 'δ', 'Δ'],
                    ['e', 'ε', 'Ε'],
                    ['g', 'γ', 'Γ'],
                    ['i', 'ι', 'Ι', 0x3AF],
                    ['k', 'κ', 'Κ'],
                    ['l', 'λ', 'Λ'],
                    ['m', 'μ', 'Μ'],
                    ['n', 'ν', 'Ν'],
                    ['o', 'ο', 'Ο'],
                    ['p', 'π', 'Π'],
                    ['r', 'ρ', 'Ρ'],
                    ['s', 'ς', 'σ', 'Σ'],
                    ['t', 'τ', 'Τ'],
                    ['u', 'υ', 'Υ', 'ὐ'],
                    ['x', 'ξ', 'Ξ'],
                    ['y', 0x37A],
                    ['z', 'ζ', 'Ζ'],
                    ['ê', 'η', 'Η'],
                    ['ô', 'ω', 'Ω', 'ῶ'],
                    ['th', 'θ', 'Θ'],
                    ['ph', 'φ', 'Φ'],
                    ['ps', 'ψ', 'Ψ'],
                    ['ch', 'χ', 'Χ'],
                    [' ', ' '],
                    ['ha'],
                    ['he'],
                    ['hê'],
                    ['ho'],
                    ['hô'],
                    ['hu', 'ὑ']];

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
  var outstr = "<h4>Transliteration</h4>";
  var not_found = [];
  var input_index = 0;
  while(input_index < input.length) {
    results = find_match(input, input_index);
    if(results[0] == null){
      not_found.push([input.charAt(input_index), input.charCodeAt(input_index)]);
      outstr += input.charAt(input_index);
    }
    else
      outstr += results[0];
    input_index = results[1];
  }
  return [outstr, not_found];
}

function missed_table(not_found){
  var html = "<h5>Characters Not Found:</h5><table><tr><th>Character</th><th>Code</th></tr>";
  for(i=0; i<not_found.length; i++){
    html += "<tr><td>" + not_found[i][0] + "</td><td>0x" + not_found[i][1].toString(16).toUpperCase() + "</td></tr>";
  }
  html += "</table>";
  return html;
}

$(document).ready(function(){
  $('button#transliterate').click(function(){
    var input;
    input = $('textarea#nonlatin').val();
    var transliteration = transliterate(input);
    $('div#latin').html(transliteration[0]);
    $('div#missed').html(missed_table(transliteration[1]));
  });
});
