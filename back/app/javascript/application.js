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

document.addEventListener('DOMContentLoaded', function () {
  const movieItems = document.querySelectorAll('.show-collection-movie-item');

  movieItems.forEach(item => {
    const image = item.querySelector('.show-collection-movie-image');
    const youtubeId = image.dataset.youtubeId;
    const iframe = document.getElementById('youtube-iframe');

    item.addEventListener('mouseover', () => {
      iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1`;
    });

  });
});
import "@hotwired/turbo-rails"
import "controllers"