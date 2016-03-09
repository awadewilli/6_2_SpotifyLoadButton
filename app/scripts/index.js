var Backbone = require('backbone');

var $ = require('jquery');
var Handlebars = require('handlebars');
//###################################
//#### Models
//###################################

var Album = Backbone.Model.extend({
      'artist':'artist',
      'name':'name',
      'date':'date',
});


var Albums = Backbone.Collection.extend({
        model:Album,
        url:'https://api.spotify.com/v1/artists/3nJWBJvK7uGvfp4iZh9CkN/albums',
        parse: function(data){
    return data.items;
  }
});
//###################################
//#### Controls and Views
//###################################

var artistsAlbums = new Albums();

$('.button').click(function(){

      $('h5').toggleClass('hidden');
      $('.loader').toggleClass('hidden');

      var renderResults = function(){

        artistsAlbums.fetch().done(function(){
          artistsAlbums.each(function(album){
                console.log(album.get('name'));

          var source   = $("#show_albums").html();
          var template = Handlebars.compile(source);
          var context = {url:album.get('images')[1].url,album_name:album.get('name'),spotlink:album.get("external_urls").spotify};
          var html    = template(context);

          $('.album-container').append(html);

          });
        });
        $('h5').toggleClass('hidden');
        $('.loader').toggleClass('hidden');

};
setTimeout(renderResults,2000);

});
