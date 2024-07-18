import '../scss/main.scss';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import select2 from 'select2/dist/js/select2.full.min';

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }
});

$(function () {
    // wheel&modals
    const wheel = $('.section-wheel__wheel-circle img');
    const btnSpin = $('#button');
    const first_modal = $('#firstTry');
    const next_try = $('#nexTry');
    const second_modal = $('#secondTry');
    const to_registration = $('#finalStep');
    const registration_modal = $('#registration');
    const counter = $('.section-wheel__counter');

    function counterData(el) {
        let currentVal = $(el).attr('data-counter');

        $(el).attr('data-counter', currentVal - 1);
    }

    btnSpin.on('click', function () {
        if (!wheel.hasClass('step-2')) {
            wheel.addClass('step-1');
            counterData(counter);

            setTimeout(function () {
                first_modal.modal({
                    backdrop: 'static',
                    show: true,
                });
            }, 3000);
        }
        else {
            registrationModal.modal('show');
        }
    });
    next_try.on('click', function () {
        first_modal.modal('hide');
        wheel.toggleClass('step-1 step-2');
        counterData(counter);

        setTimeout(function () {
            second_modal.modal({
                backdrop: 'static',
                show: true,
            });
        }, 3000);
    });
    to_registration.on('click', function () {
        second_modal.modal('hide');
        registration_modal.modal({
            backdrop: 'static',
            show: true,
        });
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