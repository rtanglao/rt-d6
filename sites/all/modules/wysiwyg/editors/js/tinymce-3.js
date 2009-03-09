// $Id: tinymce-3.js,v 1.9.2.4 2009/03/06 03:22:49 sun Exp $

/**
 * Initialize editor instances.
 *
 * @todo Is the following note still valid for 3.x?
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
        tinymce.PluginManager.load(plugin, Drupal.settings.wysiwyg.plugins[format][plugin]);
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
  var ed = new tinymce.Editor(params.field, settings);
  // Make toolbar buttons wrappable (required for IE).
  ed.onPostRender.add(function (ed) {
    var $toolbar = $('<div class="wysiwygToolbar"></div>');
    $('#' + ed.editorContainer + ' table.mceToolbar > tbody > tr > td').each(function () {
      $('<div></div>').addClass(this.className).append($(this).children()).appendTo($toolbar);
    });
    $('#' + ed.editorContainer + ' table.mceLayout td.mceToolbar').append($toolbar);
    $('#' + ed.editorContainer + ' table.mceToolbar').remove();
  });
  // Attach editor.
  ed.render();
};

/**
 * Detach a single or all editors.
 *
 * See Drupal.wysiwyg.editor.detach.none() for a full desciption of this hook.
 */
Drupal.wysiwyg.editor.detach.tinymce = function(context, params) {
  if (typeof params != 'undefined') {
    var instance = tinyMCE.get(params.field);
    if (instance) {
      instance.save();
      instance.remove();
    }
  }
  else {
    // Save contents of all editors back into textareas.
    tinyMCE.triggerSave();
    // Remove all editor instances.
    for (var instance in tinyMCE.editors) {
      tinyMCE.editors[instance].remove();
    }
  }
};

