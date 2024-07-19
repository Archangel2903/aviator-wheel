import '../scss/main.scss';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import select2 from 'select2/dist/js/select2.full.min';
import '../img/modal-decor.gif';

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }
});

$(function () {
    // Elements
    const $wheel = $('.section-wheel__wheel-circle img');

    const $btnSpin = $('#button');

    const $firstModal = $('#firstTry');
    const $nextTry = $('#nexTry');

    const $secondModal = $('#secondTry');
    const $toRegistration = $('#finalStep');

    const $registrationModal = $('#registration');

    const $counter = $('.section-wheel__counter');

    // Function to update counter
    function updateCounter($el) {
        let currentVal = Number($el.attr('data-counter'));
        if (currentVal > 0) {
            $el.attr('data-counter', currentVal - 1);
            return true;
        }
    }

    // Function to show modal with a delay
    function showModal($modal, delay = 3000) {
        setTimeout(function() {
            $modal.modal({
                backdrop: 'static',
                show: true,
            });
        }, delay);
    }

    // Event handlers
    $btnSpin.on('click', function() {
        $btnSpin.attr('disabled', true);

        if (!$wheel.hasClass('step-1') && !$wheel.hasClass('step-2')) {
            $wheel.addClass('step-1');
            updateCounter($counter);
            showModal($firstModal);
        }
        else if ($wheel.hasClass('step-1')) {
            $wheel.toggleClass('step-1 step-2');
            updateCounter($counter);
            showModal($secondModal);
        }
        else {
            showModal($registrationModal, 0);
        }

        setTimeout(() => {
            $btnSpin.attr('disabled', false);
        }, 3000);
    });

    $nextTry.on('click', function() {
        $btnSpin.attr('disabled', true);

        if ($wheel.hasClass('step-1')) {
            $firstModal.modal('hide');
            $wheel.toggleClass('step-1 step-2');
            updateCounter($counter);
            showModal($secondModal);
        }

        setTimeout(() => {
            $btnSpin.attr('disabled', false);
        }, 3000);
    });

    $toRegistration.on('click', function() {
        if ($wheel.hasClass('step-2')) {
            $secondModal.modal('hide');
            showModal($registrationModal, 0);
        }
    });

    // Select2
    let selectStyled = $('.select2');

    for (let i = 0; i <= selectStyled.length; i++) {
        if (selectStyled.hasClass('js-example-placeholder-single')) {
            selectStyled.select2({
                width: '100%',
                placeholder: "Select a state",
                minimumResultsForSearch: Infinity,
            });
        } else {
            selectStyled.select2({
                width: '100%',
                minimumResultsForSearch: Infinity,
            });
        }
    }

    // Password switch
    const passBtn = document.querySelector('.form-button-pass');
    if (passBtn) {
        let inputs = document.querySelectorAll('input[type="password"]');
        passBtn.addEventListener('click', function () {
            if (inputs[0].type === 'password') {
                inputs.forEach(function(input) {
                    input.type = 'text';
                });
                this.innerHTML = '<svg><use xlink:href="img/spritemap.svg#sprite-pass-hidden"></use></svg>';
            }
            else {
                inputs.forEach(function(input) {
                    input.type = 'password';
                });
                this.innerHTML = '<svg><use xlink:href="img/spritemap.svg#sprite-pass-visible"></use></svg>';
            }
        });
    }
});