sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension",
  "sap/m/MessageToast"
], function (ControllerExtension, MessageToast) {
  "use strict";

  return ControllerExtension.extend("books.ext.controller.ListReportExt", {
    onDummyInfo: function () {
      MessageToast.show("Dummy component action from Admin app");
    },

    onDummySelected: function () {
      var aSelected = this.base.getExtensionAPI().getSelectedContexts();
      MessageToast.show("Selected items: " + aSelected.length);
    }
  });
});
