jQuery(function($) {
    $('#dose').focus();

    // register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker
                .register('serviceWorker.js', { scope: '/terravet-soft/' })
                .then(res => console.log('service worker registered'))
                .catch(err => console.log('service worker not registered', err));
        });
    }

    $('#reset').click(function() {
        const $input = $('input');

        $input.val('');
        $input.removeClass('is-danger');

        $('#result').html('&nbsp;');
    });

    $('#calculate').click(function() {
        $('input').removeClass('is-danger');

        const $result = $('#result');
        $result.html('&nbsp;');

        if (validate()) {
            const dose = parseFloat($('#dose').val());
            const weight = parseFloat($('#weight').val());
            const capacity = parseFloat($('#capacity').val());
            const speed = parseFloat($('#speed').val());

            const result = (dose * weight * capacity) / (16.64 * speed);
            $result.text(result.toFixed(2));
        }
    });

    $('.delete').click(function() {
        alert('delete');
        const $input = $(this).parent().prev();

        $input.val('');
        $input.removeClass('is-danger');

        $('#result').html('&nbsp;');
    });

    function validate() {
        const $dose = $('#dose');
        const $weight = $('#weight');
        const $capacity = $('#capacity');
        const $speed = $('#speed');

        const doseVal = parseFloat($dose.val());
        const weightVal = parseFloat($weight.val());
        const capacityVal = parseFloat($capacity.val());
        const speedVal = parseFloat($speed.val());

        let validated = true;

        if (isNaN(doseVal)) {
            $dose.addClass('is-danger');
            validated = false;
        }

        if (isNaN(weightVal)) {
            $weight.addClass('is-danger');
            validated = false;
        }

        if (isNaN(capacityVal)) {
            $capacity.addClass('is-danger');
            validated = false;
        }

        if (isNaN(speedVal)) {
            $speed.addClass('is-danger');
            validated = false;
        }

        return validated;
    }
});
