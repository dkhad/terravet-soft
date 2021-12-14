const container = document.querySelector('.container');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('serviceWorker.js', { scope: '/' })
            .then(res => console.log('service worker registered'))
            .catch(err => console.log('service worker not registered', err));
    });
}

jQuery(function($) {
    $('#reset').click(function() {
        const $input = $('input');

        $input.val('');
        $input.removeClass('is-danger');

        $('#result').text('Результат');
    });

    $('#calculate').click(function() {
        $('input').removeClass('is-danger');

        const $result = $('#result');
        $result.text('Результат');

        if (validate()) {
            const dose = parseFloat($('#dose').val());
            const weight = parseFloat($('#weight').val());
            const capacity = parseFloat($('#capacity').val());
            const speed = parseFloat($('#speed').val());

            const result = (dose * weight * capacity) / (16.64 * speed);
            $result.text(result.toFixed(2));
        }
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
