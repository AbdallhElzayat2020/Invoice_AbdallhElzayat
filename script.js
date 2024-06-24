$(document).ready(function() {
  function calculateTotal() {
      let total = 0;
      $('.invoice-table tbody tr').each(function() {
          const quantity = $(this).find('.quantity').val();
          const price = $(this).find('.price').val();
          const lineTotal = quantity * price;
          $(this).find('.line-total').text(lineTotal);
          total += lineTotal;
      });
      $('#total-amount').text(total);
  }

  function addRow() {
      const newRow = `
          <tr>
              <td><input type="text" class="form-control description" placeholder="أدخل وصف المنتج"></td>
              <td><input type="number" class="form-control quantity" placeholder="الكمية" value="0"></td>
              <td><input type="number" class="form-control price" placeholder="السعر" value="0"></td>
              <td class="line-total">0</td>
              <td><button class="btn btn-danger remove-row">حذف</button></td>
          </tr>`;
      $('.invoice-table tbody').append(newRow);
  }

  $('#add-row').on('click', function() {
      addRow();
  });

  $(document).on('click', '.remove-row', function() {
      $(this).closest('tr').remove();
      calculateTotal();
  });

  $(document).on('input', '.quantity, .price', function() {
      calculateTotal();
  });

  $('#search-input').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('.invoice-table tbody tr').filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
  });

  $('#print-btn').on('click', function() {
      // نسخ القيم المدخلة من الحقول إلى العناصر المناسبة للطباعة
      $('.info-box').each(function() {
          const input = $(this).find('input');
          const span = $(this).find('span.print-only');
          span.text(input.val());
      });
      $('.invoice-table tbody tr').each(function() {
          const description = $(this).find('.description').val();
          const quantity = $(this).find('.quantity').val();
          const price = $(this).find('.price').val();
          const lineTotal = quantity * price;

          $(this).find('.description').closest('td').append('<span class="print-only">' + description + '</span>');
          $(this).find('.quantity').closest('td').append('<span class="print-only">' + quantity + '</span>');
          $(this).find('.price').closest('td').append('<span class="print-only">' + price + '</span>');
          $(this).find('.line-total').closest('td').append('<span class="print-only">' + lineTotal + '</span>');
      });
      window.print();
  });

  calculateTotal();
});
