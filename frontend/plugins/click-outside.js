/**
 * Directive: Click outside
 * 
 * Run some function when either of the following events occur:
 * - The 'Esc' key is pressed.
 * - There's a mouse click outside the attached element.
 */

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding) {

      /**
       * Set binding properties.
       * @param {Event} event 
       */
      const handler = (event) => {
        binding.value(event)
      }

      /**
       * Run handler if the click event isn't on the active target.
       * @param {Event} event 
       */
      const clickListener = (event) => {
        if (el.contains(event.target) || el === event.target) {
          return
        }

        handler(event)
      }

      /**
       * Run handler if the Esc key is pressed.
       * @param {Event} event 
       * @returns 
       */
      const keydownListener = (event) => {
        if (event.code !== 'Escape') {
          return
        }

        handler(event)
      }

      el.clickOutside = clickListener;
      el.keydownHandler = keydownListener;

      document.addEventListener('click', el.clickOutside);
      document.addEventListener('keydown', el.keydownHandler);
    },

    beforeUnmount(el) {
      document.removeEventListener('click', el.clickOutside);
      document.removeEventListener('keydown', el.keydownHandler);
    },
  });
})