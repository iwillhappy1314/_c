<?php

/**
 * _s functions and definitions
 *
 * @link    https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package _s
 */
require_once(get_theme_file_path('vendor/autoload.php'));


add_action('wp_enqueue_scripts', function ()
{
    wp_enqueue_style('_c-styles', get_theme_file_uri('frontend/dist/styles/main.css'));

    wp_enqueue_script('_c-scripts', get_theme_file_uri('frontend/dist/scripts/main.js'), ['jquery'], '2.0.8');
}, 999);


add_action('after_setup_theme', function ()
{
    \WenpriseContentTypes\ContentType::register('project', 'Project', ['title', 'thumbnail'], true);
});
