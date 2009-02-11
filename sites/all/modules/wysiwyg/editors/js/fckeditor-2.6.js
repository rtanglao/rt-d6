// $Id: fckeditor-2.6.js,v 1.8.2.5 2009/02/05 01:34:52 sun Exp $

/**
 * Attach this editor to a target element.
 */
Drupal.wysiwyg.editor.attach.fckeditor = function(context, params, settings) {
  var FCKinstance = new FCKeditor(params.field, settings.Width, settings.Height);
  // Apply editor instance settings.
  FCKinstance.BasePath = settings.EditorPath;
  // Apply 'Wysiwyg' toolbar, if defined.
  if (settings.buttons) {
    FCKinstance.ToolbarSet = settings.ToolbarSet;
  }

  // Apply input format configuration.
  FCKinstance.Config.format = params.format;
  delete settings.buttons;
  for (var setting in settings) {
    FCKinstance.Config[setting] = settings[setting];
  }
  // Attach editor.
  FCKinstance.ReplaceTextarea();
};

/**
 * Detach a single or all editors.
 */
Drupal.wysiwyg.editor.detach.fckeditor = function(context, params) {
  if (typeof params != 'undefined' && typeof FCKeditorAPI != 'undefined') {
    var instance = FCKeditorAPI.GetInstance(params.field);
    if (instance) {
      $('#' + params.field).val(instance.GetXHTML()).show();
      $('#' + params.field + '___Config').remove();
      $('#' + params.field + '___Frame').remove();
      delete FCKeditorAPI.__Instances[params.field];
    }
  }
  else {
    for (var instance in FCKeditorAPI.__Instances) {
      $('#' + instance).val(instance.GetXHTML()).show();
      $('#' + instance + '___Config').remove();
      $('#' + instance + '___Frame').remove();
      delete FCKeditorAPI.__Instances[instance];
    }
  }
};

