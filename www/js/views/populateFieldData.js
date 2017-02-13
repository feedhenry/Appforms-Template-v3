/**
 *
 * Example function to demonstrate:
 *
 *  - Getting the Submission Model from the form that is currently being viewed.
 *  - Getting the field using field codes
 *  - Adding a value programmatically to the field
 *  - Re-rendering the form to show the updated values.
 *
 * @param callback
 */
App.populateFieldData = function(callback) {

  //Checking if the form view is available.
  //If it is not available, then no form is being shown to the user.
  if (!App || !App.views.form) {
    return;
  }

  if(App && App.views.form) {

    //Get the current submission associated with the form that is currently being shown
    var submission = App.views.form.getSubmission();

    //Getting the form model associated with this submission.
    submission.getForm(function(err, formModel) {
      if(err){
        console.log("Error loading form ", err);
        return;
      }

      //Here, we can get access to fields using their field codes
      //Field codes are assigned when defining fields in the studio.
      //See https://access.redhat.com/documentation/en/red-hat-mobile-application-platform-hosted/3/paged/product-features/chapter-3-drag-and-drop-apps (Section 3.1.2.2.)
      var fieldModel = formModel.getFieldModelByCode("testFieldCode");
      var fieldId = fieldModel.get("_id");

      submission.addInputValue({
        fieldId: fieldId,
        value: "testtextvalue",
        index: 0
      }, function(err, value) {

        //Re-rendering the form with the latest submission.
        App.views.form.initWithForm(formModel, {submission: submission});
        App.views.form.render();

        return callback ? callback(err, value) : null;
      });
    });
  }
};