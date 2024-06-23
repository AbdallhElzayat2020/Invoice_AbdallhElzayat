$(document).ready(function () {
  function calculateTotal() {
    let total = 0;
    $('.invoice-table tbody tr').each(function () {
      const quantity = $(this).find('.quantity').val();
      const price = $(this).find('.price').val();
      const lineTotal = quantity * price;
      $(this).find('.line-total').text(lineTotal);
      total += lineTotal;
    });
    $('#total-amount').text(total);
  }

  $('.quantity, .price').on('input', function () {
    calculateTotal();
  });

  $('#search-input').on('keyup', function () {
    const value = $(this).val().toLowerCase();
    $('.invoice-table tbody tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  $('#print-btn').on('click', function () {
    window.print();
  });

  calculateTotal();
});
