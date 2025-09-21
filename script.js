const blocks = document.querySelectorAll('.block');

blocks.forEach(block => {
  let offsetX, offsetY;

  block.addEventListener('mousedown', (e) => {
    offsetX = e.clientX - block.offsetLeft;
    offsetY = e.clientY - block.offsetTop;

    function mouseMoveHandler(e) {
      block.style.left = (e.clientX - offsetX) + 'px';
      block.style.top = (e.clientY - offsetY) + 'px';
    }

    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      // Save position in localStorage
      localStorage.setItem(block.id, JSON.stringify({
        left: block.style.left,
        top: block.style.top
      }));
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  // Restore saved position on load
  const saved = localStorage.getItem(block.id);
  if (saved) {
    const { left, top } = JSON.parse(saved);
    block.style.left = left;
    block.style.top = top;
  }
});
