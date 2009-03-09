<?php
// $Id: video_filter.codecs.inc,v 1.2.2.5 2008/05/05 08:54:43 fokke Exp $

function video_filter_codec_info()
{
	$codecs = array();
	
	$codecs['youtube'] = array(
		'name' => t('YouTube'),
		'callback' => 'video_filter_youtube',
		'regexp' => '/youtube\.com\/watch\?v=([a-z0-9\-_]+)/i',
		'ratio' => 425 / 355,
	);
	$codecs['google'] = array(
		'name' => t('Google Video'),
		'callback' => 'video_filter_google',
		'regexp' => '/video\.google\.com\/videoplay\?docid=(\-?[0-9]+)/',
		'ratio' => 400 / 326,
	);
	$codecs['godtube'] = array(
		'name' => t('GodTube'),
		'callback' => 'video_filter_godtube',
		'regexp' => '/godtube\.com\/view_video\.php\?viewkey=([a-z0-9]+)/',
		'ratio' => 300 / 270,
	);
	$codecs['dailymotion'] = array(
		'name' => t('DailyMotion'),
		'callback' => 'video_filter_dailymotion',
		'regexp' => '/dailymotion\.com\/.*video\/([a-z0-9]+)/i',
		'ratio' => 420 / 336,
	);
	$codecs['eyespot'] = array(
		'name' => t('Eyespot'),
		'callback' => 'video_filter_eyespot',
		// http://eyespot.com/share?cmd=permalink&r=0XCzIG2UEx9hoXiEJW07IWpUtT#
		'regexp' => '/eyespot\.com\/.*r=([a-z0-9]+)/i',
		'ratio' => 432 / 407,
	);
	$codecs['jumpcut'] = array(
		'name' => t('Jumpcut'),
		'callback' => 'video_filter_jumpcut',
		// http://jumpcut.com/view?id=31410FA4169E11DDB25E000423CF385C
		'regexp' => '/jumpcut\.com\/.*id=([A-Z0-9]+)/',
		'ratio' => 408 / 324,
	);
	$codecs['revver'] = array(
		'name' => t('Revver'),
		'callback' => 'video_filter_revver',
		// http://revver.com/video/856351/the-next-levelwith-nike/
		'regexp' => '/revver\.com\/video\/([0-9]+)/',
		'ratio' => 408 / 324,
	);
	$codecs['vimeo'] = array(
		'name' => t('Vimeo'),
		'callback' => 'video_filter_vimeo',
		// http://www.vimeo.com/319782
		'regexp' => '/vimeo\.com\/([0-9]+)/',
		'ratio' => 400 / 225,
	);
	
	return $codecs;
}

function video_filter_youtube($video) {
	$video['source'] = 'http://www.youtube.com/v/'.$video['codec']['matches'][1].($video['autoplay'] ? '&autoplay=1' : '');
	
	return video_filter_flash($video);
}

function video_filter_google($video) {
	$video['source'] = 'http://video.google.com/googleplayer.swf?docId='.$video['codec']['matches'][1];
	
	return video_filter_flash($video);
}

function video_filter_godtube($video) {
	$video['source'] = 'http://www.godtube.com/flvplayer.swf?viewkey='.$video['codec']['matches'][1];
	
	return video_filter_flash($video);
}

function video_filter_dailymotion($video) {
	$video['source'] = 'http://www.dailymotion.com/swf/'.$video['codec']['matches'][1];

	return video_filter_flash($video);
}

function video_filter_eyespot($video) {
  // <embed src='http://eyespot.com/flash/medialoader.swf?vurl=http%3A%2F%2Fdownloads.eyespot.com%2Fplay%3Fr%3D0XCzIG2UEx9hoXiEJW07IWpUtT&_autoPlay=false' allowfullscreen='true' type='application/x-shockwave-flash' width='432' height='407'></embed>
  
	$video['source'] = 'http://eyespot.com/flash/medialoader.swf?vurl=http%3A%2F%2Fdownloads.eyespot.com%2Fplay%3Fr%3D'.$video['codec']['matches'][1].'&_autoPlay='.($video['autoplay'] ? 'true' : 'false');
	
	return video_filter_flash($video);
}

function video_filter_jumpcut($video) {
  // <embed src="http://jumpcut.com/media/flash/jump.swf?id=31410FA4169E11DDB25E000423CF385C&asset_type=movie&asset_id=31410FA4169E11DDB25E000423CF385C&eb=1" width="408" height="324" type="application/x-shockwave-flash"></embed>
  
	$video['source'] = 'http://jumpcut.com/media/flash/jump.swf?id='.$video['codec']['matches'][1].'&asset_type=movie&asset_id='.$video['codec']['matches'][1].'&eb=1';
	
	return video_filter_flash($video);
}

function video_filter_revver($video) {
  // <script src="http://flash.revver.com/player/1.0/player.js?mediaId:856351;width:480;height:392;" type="text/javascript"></script>
  
	$output = '';
	
	$output .= '<script src="http://flash.revver.com/player/1.0/player.js?mediaId:'.$video['codec']['matches'][1].';width:'.$video['width'].';height:'.$video['height'].';" type="text/javascript"></script>';
	
	return $output;	
}

function video_filter_vimeo($video) {
	$video['source'] = 'http://www.vimeo.com/moogaloop.swf?clip_id='.$video['codec']['matches'][1].'&amp;server=www.vimeo.com&amp;fullscreen=1&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=';
	
	return video_filter_flash($video);
}