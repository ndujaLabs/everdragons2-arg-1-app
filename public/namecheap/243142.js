var adblock = {
	// Required and steady
    'container' : 'ads',
    'type' : 'textads',
    'adLoadedCallback' : function(shown, param2) {},
    'linkTarget' : '_blank',
    'lines' : 3,
    'number' : 5,
    'colorBackground' : 'transparent',
    // Ad Icon
    'adIconUrl' : 'http://afs.googleusercontent.com/dp-teaminternet/arr_de3723.png',
    'adIconWidth' : 17,
    'adIconHeight' : 12,
    'adIconSpacingAbove' : 13,
    'adIconSpacingAfter' : 14,
    // Font-Sizes and Line-Heights
    'fontSizeAttribution' : 16,
    'fontSizeTitle' : 22,
    'fontSizeDescription' : 16,
    'fontSizeDomainLink' : 16,
    'lineHeightTitle' : 40,
    'lineHeightDescription' : 30,
    'lineHeightDomainLink' : 23,
    // Colors
    'colorAttribution' : '#aaa',
    'colorTitleLink' : '#04c',
    'colorText' : '#222',
    'colorDomainLink' : '#090',
    // Alphabetically
    'adjustableLineHeight' : 14,
    'fontFamily' : 'Arial',
    'rolloverLinkColor' : '#de3723',
    'titleBold': false,
    'verticalSpacing' : 12
};

var rsblock = {
	// Required and steady
	'container' : 'related_holder',
	'type' : 'relatedsearch',
	'number' : 10,
	// Font-Sizes and Line-Heights
	'fontSizeAttribution' : 17,
	'fontSizeTitle' : 17,
	'lineHeightTitle' : 20,
	// Colors
	'colorAttribution' : '#efefef',
	'colorTitleLink' : '#04c',
	'rolloverLinkColor' : '#de3723',
	// Alphabetically
	'attributionSpacingBelow' : 20,
	'colorBackground' : 'transparent',
	'noTitleUnderline': false,
	'verticalSpacing' : 14
};

var tcblock = {
	// Required and steady
	'container' : 'tc_holder1',
	'type' : 'relatedsearch',
	'number' :10,
	'columns' : 1,
	// Ad Icon
	'adIconUrl' : 'http://afs.googleusercontent.com/dp-teaminternet/arr_de3723.png',
	'adIconWidth' : 17,
	'adIconHeight' : 12,
	'adIconSpacingAbove' : 11,
	'adIconSpacingAfter' : 8,
	// Font-Sizes and Line-Heights
	'fontSizeAttribution' : 14,
	'fontSizeTitle' : 22,
	'lineHeightTitle' : 33,
	// Colors
	'colorAttribution' : '#6d6e70',
	'colorTitleLink' : '#04c',
	'rolloverLinkColor' : '#de3723',
	// Alphabetically
    'colorAdSeparator' : '#6d6e70',
    'colorBackground' : 'transparent',
    'noTitleUnderline': true,
    'titleBold': true,
    'verticalSpacing' : 3
};

var searchboxBlock = {
    'container' : 'form',
    'type' : 'searchbox',
    //Button
    'colorSearchButton' : '#6D6E70',
    'colorSearchButtonText' : '#e1e3e7',
    'fontSizeSearchButton' : 13,
    //Button Border
    'colorSearchButtonBorder' : '#505152',
    'radiusSearchButtonBorder' : 8,
    'widthSearchButtonBorder' : 1,
    //Input
    'fontSizeSearchInput' : 12,
    'heightSearchInput' : 30
};

var caf_oneclick_call = function() {
    new loadFeed(pageOptions, adblock, rsblock, searchboxBlock);
};

var caf_oneclick_afs_call = function() {
    new loadFeed(pageOptions, adblock, rsblock, searchboxBlock);
};

var caf_twoclick_call = function() {
    new loadFeed(pageOptions, tcblock, searchboxBlock);
};

if(typeof caf_style_loaded != "undefined")
    caf_style_loaded();
