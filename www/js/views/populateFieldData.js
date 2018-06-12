/**
 * Adding a single field Value.
 * @param formModel
 * @param submission
 * @param value
 * @param fieldCode
 * @param cb
 */
function addFieldValue(formModel, submission, value, fieldCode, cb) {

  //Here, we can get access to fields using their field codes
  //Field codes are assigned when defining fields in the studio.
  //See https://access.redhat.com/documentation/en/red-hat-mobile-application-platform-hosted/3/paged/product-features/chapter-3-drag-and-drop-apps (Section 3.1.2.2.)
  var fieldModel = formModel.getFieldModelByCode(fieldCode);
  var fieldId = fieldModel.get("_id");

  submission.addInputValue({
    fieldId: fieldId,
    value: value,
    index: 0
  }, cb);
}

/**
 * Getting a single field value from a cloud app.
 * @param fieldCode
 * @param cb
 */
function getFieldValue(fieldCode, cb) {
  //TODO: Create endpoints..
  $fh.cloud({path: fieldCode, data: {user : "someuserid"}}, function(err, response) {
    return cb(err, response.value);
  });
}

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

      async.each([
        {
          fieldCode: "text"
        },
        {
          fieldCode: "number"
        }
      ], function(valToAdd, cb) {

        getFieldValue(valToAdd.fieldCode, function(err, value) {
          if(err) {
            return cb(err);
          }

          addFieldValue(formModel, submission, value, valToAdd.fieldCode, cb);
        });
      },  function(err) {

        //Re-rendering the form with the latest submission.
        App.views.form.initWithForm(formModel, {submission: submission});

        return callback ? callback(err) : null;
      });
    });
  }
};