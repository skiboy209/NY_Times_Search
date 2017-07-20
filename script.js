$("#clear").click(function(){
    $(this).closest('form').find("input[type=text], textarea").val("");
    $(this).closest('form').find("select[type=text], textarea").val("");
})

var searchTerm;
var recordNum;
var startYear;
var endYear;

//Get Results of Search
function get_results(){
    searchTerm = $("#searchTerm").val();
    recordNum = $("#recordNum").val();
    startYear = $("#startYear").val();
    endYear = $("#endYear").val();
    search();
}

function search(){

    startYear = startYear;
    endYear = endYear;
    search = searchTerm;

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "ae7a6092bb5d480aaeadb016f0a3b512",
      'q': search,
      'begin_date': startYear + "0101",
      'end_date': endYear + "0101"
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(url);

      for (var i = 0; i < recordNum; i++) {
          console.log(result.response.docs[i]);

          $('#topArticles').append($('<div id="article"' + i + '></div>'));
          $('#article' + i).append($('<h2 class="title">' + result.response.docs[i].headline.main + '</h2>'));

          //<p>" + result.response.docs[i].byline.original+"</p>
          var docNumber = i + 1;
          var content = "<div id='contentItem'><h1>" + docNumber + "</h1><h1>" + result.response.docs[i].headline.main + "</h1> <p>Section: "+ result.response.docs[i].section_name + "</p><p>"+ result.response.docs[i].pub_date + "</p> <a href=" + result.response.docs[i].web_url + ">"+ result.response.docs[i].web_url+"</a></div>";

          $('#displayResults').append(content);
      }

    }).fail(function(err) {
      throw err;
    });

}