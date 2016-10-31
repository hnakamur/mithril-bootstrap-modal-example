var m = require("mithril"),
  modal = require("mithril-bootstrap-modal");

var prompt = {
  title: function(attrs) {
    return attrs.title ? attrs.title : "Title";
  },
  controller: function(attrs) {
    this.field = m.prop("");
    this.submit = function() {
      attrs.callback(this.field());
    }.bind(this);
  },
  view: function(ctrl, attrs) {
    return m("form", [
      m("p",
        m("input[type='text']", {onchange: m.withAttr("value", ctrl.field), value: ctrl.field()})
      ),
      m("p",
        m("button[type='button']", {onclick: ctrl.submit}, "Submit")
      )
    ]);
  }
};

var page = {
  controller: function() {
    this.feedback = m.prop("");
    this.action = function(name) {
      this.feedback("Thanks " + name + ", you're welcome");
    }.bind(this);
  },
  view: function(ctrl) {
    return [
      m("button[type='button']", {onclick: modal.show.bind(modal, prompt, {callback: ctrl.action, title: "Please enter your name"})}, "Register"),
      m("span", ctrl.feedback()),
      m.component(modal)
    ];
  }
};

m.mount(document.body, page);
