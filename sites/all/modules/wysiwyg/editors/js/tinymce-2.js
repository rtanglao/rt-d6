// $Id: tinymce-2.js,v 1.7.2.1 2009/03/06 03:22:49 sun Exp $

/**
 * Initialize editor instances.
 *
 * This function needs to be called before the page is fully loaded, as
 * calling tinyMCE.init() after the page is loaded breaks IE6.
 *
 * @param editorSettings
 *   An object containing editor settings for each input format.
 */
Drupal.wysiwyg.editor.init.tinymce = function(settings) {
  // If JS compression is enabled, TinyMCE is unable to find its own base path
  // and exec mode, hence we need to define it manually.
  // @todo Move global library settings somewhere else.
  tinyMCE.baseURL = Drupal.settings.wysiwyg.editorBasePath;
  tinyMCE.srcMode = (Drupal.settings.wysiwyg.execMode == 'src' ? '_src' : '');
  tinyMCE.gzipMode = (Drupal.settings.wysiwyg.execMode == 'gzip');

  // Initialize editor configurations.
  for (var format in settings) {
    tinyMCE.init(settings[format]);
    if (Drupal.settings.wysiwyg.plugins[format]) {
      // Load native external plugins.
      for (var plugin in Drupal.settings.wysiwyg.plugins[format]) {
        tinyMCE.loadPlugin(plugin, Drupal.settings.wysiwyg.plugins[format][plugin]);
      }
    }
  }
};

/**
 * Attach this editor to a target element.
 *
 * See Drupal.wysiwyg.editor.attach.none() for a full desciption of this hook.
 */
Drupal.wysiwyg.editor.attach.tinymce = function(context, params, settings) {
  // Configure editor settings for this input format.
  for (var setting in settings) {
    tinyMCE.settings[setting] = settings[setting];
  }
  // Attach editor.
  tinyMCE.execCommand('mceAddControl', true, params.field);
};

/**
 * Detach a single or all editors.
 *
 * See Drupal.wysiwyg.editor.detach.none() for a full desciption of this hook.
 */
Drupal.wysiwyg.editor.detach.tinymce = function(context, params) {
  if (typeof params != 'undefined') {
    tinyMCE.removeMCEControl(tinyMCE.getEditorId(params.field));
    $('#' + params.field).removeAttr('style');
  }
//  else if (tinyMCE.activeEditor) {
//    tinyMCE.triggerSave();
//    tinyMCE.activeEditor.remove();
//  }
};

