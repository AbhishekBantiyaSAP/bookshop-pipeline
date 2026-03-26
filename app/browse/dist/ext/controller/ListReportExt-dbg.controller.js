sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension",
  "sap/m/MessageToast"
], function (ControllerExtension, MessageToast) {
  "use strict";

  return ControllerExtension.extend("bookshop.ext.controller.ListReportExt", {
    onDummyInfo: function () {
      MessageToast.show("Dummy component action from Browse app");
    },

    onDummySelected: function () {
      var aSelected = this.base.getExtensionAPI().getSelectedContexts();
      MessageToast.show("Selected items: " + aSelected.length);
    }
  });
});
