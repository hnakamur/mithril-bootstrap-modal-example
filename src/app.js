var m = require("mithril"),
  modal = require("mithril-bootstrap-modal");

var message = {
  title: function(attrs) {
    return "Sample";
  },
  view: function(ctrl, attrs) {
    return m("h2", "This is an example");
  }
};

var page = {
  view: function(ctrl) {
    return [
      m("button[type='button']", {onclick: modal.show.bind(modal, message)}, "This will display a reusable component in a popup"),
      m.component(modal)
    ];
  }
};

m.mount(document.body, page);
