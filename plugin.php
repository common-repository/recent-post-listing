<?php

/**
* Plugin Name: Recent Post Listing
* Author: Shreya Shah
* Description: Recent post based on total post count selection
* Version: 1.0
*/
add_action( 'init', 'recent_posts_block_initialization_block_supports' );
function recent_posts_block_initialization_block_supports() {

if ( ! function_exists( 'rpb_render_assets_backend' ) ) {
function rpb_render_assets_backend() {
   wp_enqueue_script(
      'recent-post-block',
      plugins_url( 'build/index.js', __FILE__ ),
      array( 'wp-blocks', 'wp-element','wp-editor','wp-components' )
   );

   wp_enqueue_style(
      'recent-post-block',
      plugins_url( 'block.css', __FILE__ ),
      array()
   );
}
}
add_action( 'enqueue_block_editor_assets', 'rpb_render_assets_backend' );

// Load assets for frontend
if ( ! function_exists( 'rpb_render_assets_frontend' ) ) {
function rpb_render_assets_frontend() {
   wp_enqueue_style(
      'recent-post-block',
      plugins_url( 'block.css', __FILE__ ),
      array()
   );
}
}
add_action( 'wp_enqueue_scripts', 'rpb_render_assets_frontend' );

register_block_type('recent-post-block-gutenberg/recent-post-block', [
      'style'         => 'recent-post-block',
      'editor_script' => 'recent-post-block',
      'editor_style'  => 'recent-post-block-css',
      'supports'          => array( 'color' => true ),
      'render_callback' => 'recentPostsBlockOutput',
      'attributes'      => array(
		'preview' => true
		)

   ]);
}
if ( ! function_exists( 'recentPostsBlockOutput' ) ) {

function recentPostsBlockOutput($attributes){
   if ( is_admin() ) {
        return '';
    }
    else{
      //print_r($attributes);
      if($attributes['postcount'] == '')
      {
         $postcount = 4;
      }
      else {
         $postcount = $attributes['postcount'];
       }
      $query_args = array(
       'posts_per_page'    => $postcount,
       'orderby'        => 'date',
       'order'           => 'DESC',
       'post_type'           =>  'post',
       'ignore_sticky_posts' => true
      );

      $popular_post_query = new WP_Query( $query_args );

      $output = '<h2>'.$attributes['title'].'</h2>';
      $output .= '<div class="ss-post-container">';
      if ( $popular_post_query->have_posts() ) :
         $output .='<ul>';
          while ( $popular_post_query->have_posts() ) : $popular_post_query->the_post();
            $output .= '<li class="post-box">';
            if (has_post_thumbnail( get_the_ID() ) ):
               $image = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'single-post-thumbnail' );
               $output .= '<img src ="'.$image[0].'">';
            else:
               $output .= '<img src ="'.esc_url( plugins_url( 'images/No-image-available.png', __FILE__ ) ).'">';
            endif;

            $output .= '<p><a href="'.get_the_permalink().'" target="_blank">'.get_the_title().'</a></p>';
            $output .= '<p>By - '.get_the_author().'</p>';
            $output .= '</li>';
          endwhile;
          $output .='</ul>';
      else:
         $output .= '<div class="no-post">No Post Found!!</div>';
      endif;
      $output .='</div>';
      return $output;
    }
   ?>
   <?php
   wp_reset_postdata();
}
}


 