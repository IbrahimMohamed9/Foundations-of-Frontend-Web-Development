var FormValidation = {
  serialize_form: (form) => {
    let result = {};
    $.each(form.serializeArray(), (_, field) => {
      result[field.name] = field.value;
    });
    return result;
  },
  validate: (
    form_selector,
    form_rules,
    messages,
    form_submit_handler_callback
  ) => {
    var form_object = $(form_selector);

    $(form_object).validate({
      rules: form_rules,
      messages: messages,
      submitHandler: (form, event) => {
        event.preventDefault();
        if (form_submit_handler_callback)
          form_submit_handler_callback(
            FormValidation.serialize_form(form_object)
          );
      },
    });
  },
};
