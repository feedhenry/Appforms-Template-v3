WeatherView = Backbone.View.extend({
  el: $('#weather'),
  initialize: function() {
    var self = this;
    this.template = _.template($('#weather-update').html());

    $fh.cloud(
      {
        path: 'hello'
      },
      function (res) {
        self.render(res.msg);
      },
      function () {
        self.render("Error loading weather");
      }
    );

    this.render();
  },
  render: function(value) {
    this.$el.html(this.template({
      value: value || "Loading...."
    }));
  }
});
