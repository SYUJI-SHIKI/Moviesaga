// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
//= require rails-ujs

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.collection-movie-item').forEach(item => {
    item.addEventListener('click', () => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      item.classList.toggle('checked', checkbox.checked);
    });
  });
});

import "@hotwired/turbo-rails"
import "controllers"