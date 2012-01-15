$(function () {
    var user = location.host.split('.')[0];
    var page_styles = {
        '#projects': 'project_page',
        '#people': 'people_page',
        '#about': 'about_page'
    };
    var api_page = {
        '#projects': '/repos',
        '#people': '/following',
        '#about': ''
    };
    var load_page = function () {
        var hash = location.hash;
        $.getJSON('https://api.github.com/users/' + user + api_page[hash] + '?callback=?', function (response) {
            var template = ich[page_styles[hash]];
            $('.nav li').removeClass('active');
            if (template) {
                console.log(response);
                $('#page_content').html(template(response));
                $('.' + hash.replace('#', '')).addClass('active');
            } else {
                $('#page_content').html('<h2>Page not found</h2>');
            }
        });
    };
    $.getJSON('https://api.github.com/users/' + user + '?callback=?', function (response) {
        $('#main').html(ich.main_content(response.data));
        var menu_title = $('#menu_title');
        menu_title.attr('href', response.data.html_url);
        menu_title.text(response.data.login);
        $('title').append(' - ' + response.data.login);
        if (location.hash === '') {
            location.hash = '#projects';
        } else {
            load_page();
        }
    });
    $(window).bind('hashchange', load_page);
});
