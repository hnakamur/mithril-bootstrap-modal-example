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
      return false;
    }.bind(this);
  },
  view: function() {
    var focused = false;
    return function(ctrl, attrs) {
      return m("form", {
          onkeydown: function(e) {
            // close modal by pressing escape key
            if (e.keyCode === 27) {
              modal.hide();
              return;
            }
            m.redraw.strategy("none");
          },
          onsubmit: ctrl.submit
        }, [
        m("p",
          m("input[type='text']", {
            config: function(element) {
              // NOTE: Set focus to input when the dialog is shown.
              // https://github.com/lhorie/mithril.js/issues/488#issuecomment-82030189
              // https://github.com/tastejs/todomvc/blob/b880885e4145975fd79a00db98e6c526deae12bb/examples/mithril/js/views/main-view.js#L30-L35
              element.focus();
              focused = true;
            },
            onchange: m.withAttr("value", ctrl.field),
            value: ctrl.field()
          })
        ),
        m("p",
          m("button[type='submit']", {onsubmit: ctrl.submit}, "Submit")
        )
      ]);
    }
  }()
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
