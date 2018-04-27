var sections = [];
var sectionsYStart = [];
var activeSection = 0;

var pageInit = function(){
    sections = [];
    sectionsYStart = [];
    $("section").each(function(i,v){
        sections[i] = v;
        sectionsYStart[i] = $(v).offset().top;
    });
};

var ChangeColorOnScroll = function(){
    var scroll = $(window).scrollTop();
    scrollColors(scroll, $("body"), ["#FF006B", "#36DBFF", "#8000D2", "#00FFA7", "rgba(0,0,0,0)"]);
}

var scrollColors = function(scroll, el, colors){
    // which of all the sections, are we in between?
    var z = 0, seclen = sections.length;
    for(var i = 0; i < seclen; i ++){
        if (scroll > sectionsYStart[i]){
            z = i;
        }
    }
    activeSection = z;

    scroll_pos = scroll;
    var animation_begin_pos = sectionsYStart[z]; //where you want the animation to begin
    var animation_end_pos = sectionsYStart[z+1]; //where you want the animation to stop
    var beginning_color = $.Color(colors[z]);
    var ending_color = $.Color(colors[z+1]);

    if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos ){
        var percentScrolled = scroll_pos / ( animation_end_pos - animation_begin_pos );
        if(percentScrolled>1){ percentScrolled = percentScrolled - z; }
        var newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
        var newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
        var newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );

        var newAlpha = beginning_color.alpha() + ( ( ending_color.alpha() - beginning_color.alpha() ) * percentScrolled );

        var newColor = new $.Color( newRed, newGreen, newBlue, newAlpha );
        el.animate({ backgroundColor: newColor }, 0);
    } else if ( scroll_pos > animation_end_pos ) {
         el.animate({ backgroundColor: ending_color }, 0);
    } else if ( scroll_pos < animation_begin_pos ) {
         el.animate({ backgroundColor: beginning_color }, 0);
    } else { }

};


$(function(){
    pageInit();
    $(document).scroll(ChangeColorOnScroll);
    $(window).resize(pageInit);
});
