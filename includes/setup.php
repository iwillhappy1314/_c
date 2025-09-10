<?php

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('_c-icons', get_theme_file_uri('frontend/dist/styles/iconfont.css'));
    wp_enqueue_style('_c-styles', get_theme_file_uri('frontend/dist/styles/main.css'));

    wp_enqueue_script('_c-scripts', get_theme_file_uri('frontend/dist/scripts/main.js'), ['jquery'], '2.0.8');

    $template_path = parse_url(get_theme_file_uri(), PHP_URL_PATH);

    wp_localize_script('_c-scripts', 'wenpriseSettings', [
        'staticPath' => $template_path . '/frontend/static/',
    ]);
}, 999);


// add_action('init', function ()
// {
//     \WenpriseContentTypes\ContentType::register('project', 'Project', ['title', 'thumbnail'], true);
//     \WenpriseContentTypes\Taxonomy::register('project_cat', 'project', 'Project Category', true);
// });


/**
 * 设置主题更新
 */
$theme_update_checker = PucFactory::buildUpdateChecker(
    'https://api.wpcio.com/api/theme/info/_c',
    get_theme_file_path('functions.php'),
    '_c'
);


add_filter('kadence_customizer_post_type_ignore_array', function ($ignore_post_types)
{
    // 没有启用 WooCommerce 时，取消忽略 product 文章类型，因为其他插件或主题也可能注册这个文章类型
    if(!function_exists('wc_get_product')){
        unset($ignore_post_types['product']);
    }

    return $ignore_post_types;
});