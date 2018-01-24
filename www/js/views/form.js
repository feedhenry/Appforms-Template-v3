$fh.ready({}, function() {
    FormView = $fh.forms.backbone.FormView.extend({
        initialize: function(params) {
            var self = this;
            params = params || {};
            params.fromRemote = false;
            params.rawMode = true;
            self.options = params;
            $fh.forms.backbone.FormView.prototype.initialize.call(this, params);

            if (params.form) {
                params.formId = params.form.getFormId();
            }

            this.loadForm(params, function() {
                self.trigger("loaded");
                if (params.autoShow) {
                    self.$el.show();
                }
                self.render();
            });
        },
        saveToDraft: function() {
          var self = this;
            AlertView.showAlert("Saving Draft", "info", 1000);
            $fh.forms.backbone.FormView.prototype.saveToDraft.apply(this, [
                function(err) {
                    if(err){
                        AlertView.showAlert("Error Saving Draft.", "error", 1000);
                    } else {
                        refreshSubmissionCollections();
                        self.submission.on("validationerror", self.onValidateError);
                        AlertView.showAlert("Draft Saved", "success", 1000);
                    }
                }
            ]);
        },
        submit: function() {


        //     var stack = new Error().stack;
        //     console.log("PRINTING CALL STACK");
        //     console.log( stack );
        // console.log('second');
        // console.log("this", this.submission.getFormId());
        // console.log("submit", $fh.forms.backbone.FormView.prototype.submit);
        //     AlertView.showAlert("Processing Submission", "info", 1000);

        //     $fh.forms.backbone.FormView.prototype.submit.apply(this, [

        //         function(err) {


        // console.log('third');
        //             if (err) {
        //                 console.log(err);
        //                 AlertView.showAlert("Submission Error", "error", 1000);
        //             } else {
        //                 refreshSubmissionCollections();
        //                 App.views.header.showHome(true);
        //                 App.views.form = null;
        //                 AlertView.showAlert("Adding To Upload Queue", "info", 1000);
        //             }
        //         }
        //     ]);


        var params = {
            "formId": "5a6769cc4d34703dcbcace90",
            "fromRemote": true
          };
          
          $fh.forms.getForm(params, function (err, form) {
            if (err) console.error(err);
          
            // var fieldModel = form.getFieldModelById(fieldId);
            console.log(form);
            var submission = form.newSubmission();

            /**
             * HOW DO I POPULATE A NEW SUBMISSION?
             * HOW DO I ATTACH A PHOTO OR FILE WITH A NEW SUBMISSION?
             *          THE PROPS FIELDVALUE IS BLANK??
             */

            var params = {
                "fieldId": '5a6769d7a8cba02baa6eb25c',
                "value": 'zzzzzz'
            };
            submission.addInputValue(params, function(err, res) {
                if (err) console.error(err);
            
                var params = {
                    "fieldId": '5a6769d7a8cba02baa6eb25d',
                    "value": '999999'
                };
                submission.addInputValue(params, function(err, res) {
                    if (err) console.error(err);
                
                    console.log('Newly added input: ', res);

                    submission.submit(function (err) {
                        console.log(!err);
                        if (err) {
                          console.log(err);
                        }
            
                        submission.upload(function (err) {
                            if (err) {
                              console.log(err);
                            }
                          });
                      });
                });
            });

            console.log(submission);
          });

        //   var currentSubmission = this.submission;

        //   currentSubmission.submit(function (err) {
        //     console.log(!err);
        //     if (err) {
        //       console.log(err);
        //     }

        //     currentSubmission.upload(function (err) {
        //         if (err) {
        //           console.log(err);
        //         }
        //       });
        //   });

        //   var params = {
        //     "fromRemote": true
        //    };
           
        //    $fh.forms.getForms(params, function(err, forms){
        //      if(err) console.error(err);
           
        //      // forms is an instance of $fh.forms.models.forms
        //      // See Models section for details of its API
        //      // for example, getFormsList() returns an array of Forms models
           
        //      var formsList = forms.getFormsList();
        //      console.log(formsList);
        //    });
        }
    });
});
