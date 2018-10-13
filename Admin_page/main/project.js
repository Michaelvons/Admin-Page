var project = {
  isLiveApp: true,
  API: "https://api.yourvendee.com/",
  //API: "http://localhost:9000/",

  start: function() {
    console.log("started");
    try {
      admin.start();
    } catch (e) {
      views.start("merchantUIView", merchant.fetchMerchant());
    }
  },

  alert: function(message, caption) {
    views.flash("alertUIView", function() {
      views.element("alertUIMessage").innerHTML = message;
      views.element("alertUICaption").innerHTML = caption ? caption : "Hello.";
    });
  },

  showBusy: function() {
    views.element("busyUIElement").className = "active";
  },
  hideBusy: function() {
    views.element("busyUIElement").className = "inactive";
  },
  showSmallBusy: function() {
    views.element("lds-spinner").className = "active";
  },
  hideSmallBusy: function() {
    views.element("lds-spinner").className = "inactive";
  },
  showError: function(msg) {
    views.element("error-msg").className = "activerr";
    views.element("error-msg").innerHTML = msg;
  },
  removeError: function() {
    views.element("error-msg").className = "inactiverr";
    views.element("error-msg").innerHTML = "";
  }
};
