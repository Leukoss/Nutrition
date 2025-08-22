export const frenchRequired = {
  mounted(el, binding) {
    // Set the custom validation message when the field is invalid
    el.oninvalid = () => {
      el.setCustomValidity(binding.value || 'Veuillez remplir ce champ.');
    };

    // Reset the validation message when the user starts typing
    el.oninput = () => {
      el.setCustomValidity('');
    };
  }
};