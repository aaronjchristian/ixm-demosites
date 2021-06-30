<?php

/**
 * @file
 * theme-settings.php
 *
 * Provides theme settings for Bootstrap Barrio-based themes.
 */

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\Core\Link;

/**
 * Implements hook_form_FORM_ID_alter().
 */
function swat_form_system_theme_settings_alter(&$form, FormStateInterface $form_state, $form_id = NULL) {

  // General "alters" use a form id. Settings should not be set here. The only
  // thing useful about this is if you need to alter the form for the running
  // theme and *not* the theme setting.
  // @see http://drupal.org/node/943212
  if (isset($form_id)) {
    return;
  }

  // Change collapsible fieldsets (now details) to default #open => FALSE.
  $form['theme_settings']['#open'] = FALSE;
  $form['logo']['#open'] = FALSE;
  $form['favicon']['#open'] = FALSE;

  // Vertical tabs.
  $form['swat'] = [
    '#type' => 'vertical_tabs',
    '#prefix' => '<h2><small>' . t('SWAT settings') . '</small></h2>',
    '#weight' => -10,
  ];

  // Layout.
  $form['ui_kit'] = [
    '#type' => 'details',
    '#title' => t('UI Kit'),
    '#group' => 'swat',
  ];

  // Colors.
  $form['ui_kit']['colors'] = [
    '#type' => 'details',
    '#title' => t('Colors'),
    '#open' => TRUE,
  ];

  // Get the number of rows, default to 2 rows.
  $num_of_rows = $form_state->get('num_of_rows');

  if (empty($num_of_rows)) {
    $num_of_rows = 3;
    $form_state->set('num_of_rows', $num_of_rows);
  }

  // Add the headers.
  $form['ui_kit']['colors']['contacts'] = array(
    '#type' => 'table',
    '#title' => 'Sample Table',
    '#header' => array('Variable Name', 'HEX'),
  );

  // Create rows according to $num_of_rows.
  for ($i = 1; $i <= $num_of_rows; $i++) {
    $form['ui_kit']['colors']['contacts'][$i]['name'] = array(
      '#type' => 'textfield',
      '#title' => t('Name'),
      '#title_display' => 'invisible',
      '#default_value' => '--custom-color-' . $i,
    );


    $form['ui_kit']['colors']['contacts'][$i]['hex'] = array(
      '#type' => 'tel',
      '#title' => t('HEX Code'),
      '#title_display' => 'invisible',
      '#default_value' => '#',
    );
  }

  // 'Add row' button.
  $form['ui_kit']['colors']['actions']['add_row'] = [
    '#type' => 'submit',
    '#value' => t('Add row'),
    '#submit' => array('::addRowCallback'),
  ];

  // Submit button.
  $form['ui_kit']['colors']['actions']['submit'] = [
    '#type' => 'submit',
    '#value' => t('Submit'),
  ];

}
