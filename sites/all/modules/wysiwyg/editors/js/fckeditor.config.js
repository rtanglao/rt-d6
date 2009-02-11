// $Id: fckeditor.config.js,v 1.1.2.3 2009/02/01 05:58:25 sun Exp $

/**
 * Fetch and provide original editor settings as local variable.
 *
 * FCKeditor does not support to pass complex variable types to the editor.
 *
 * For whatever reason, our custom 'format' property is not available in
 * FCKConfig.format, but in FCKConfig.PageConfig.format instead.
 */
var wysiwygSettings = window.parent.Drupal.settings.wysiwyg.configs.fckeditor[FCKConfig.PageConfig.format];

/**
 * Apply custom Wysiwyg API toolbar for input format.
 */
FCKConfig.ToolbarSets['Wysiwyg'] = wysiwygSettings.buttons;

