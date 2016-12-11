var transition = require('../dependencies/semantic/transition');
var dropdown = require('../dependencies/semantic/dropdown');
var tab = require('../dependencies/semantic/tab');

module.exports = {
    init() {
        //initialize nav menu dropdowns
        $('.ui.nav.dropdown.item').dropdown({
            on: 'hover',
            delay: { hide: 200, show: 100 }
        });

        $('[data-tab-button]').on('click', function() {
            // programmatically activating tab
            $('[data-tab-button]').addClass('basic');
            $(this).removeClass('basic');
            $.tab('change tab', $(this).data('tab-button'));
            $('[data-tab="default"]').addClass('hidden');
        });
    }
};