<?php
include "/var/www/html/parametros";
include $scripts."/index_functions.php";
include $scripts."/body_functions.php";
include $scripts."/ip_filter.php";

include $base.$root."/".$prefix."index1"; include $base.$root."/".$prefix."meta"; include $base.$root."/".$prefix."style";
if (is_file($base.$dir.$prefix.$fileshort."titulo")){ echo '  <title>'; include $base.$dir.$prefix.$fileshort."titulo"; echo '</title>'."\n"; }
include $base.$root."/".$prefix."index2";
//include $base.$root."/".$prefix."gtag.js";
include $base.$root."/".$prefix."index2a";
include $scripts."/header.php";
include $scripts."/menu.php";

include $base.$root."/".$prefix."body1";
echo "<hr>"."\n";
include $base.$root."/".$prefix."body2";

//el cuerpo puede obtenerse de varias formas
if (is_file($scripts."/".$filename)) {
    include $scripts."/".$filename;
} elseif (is_file($base.$dir.$prefix.$fileshort)) {
    include $base.$dir.$prefix.$fileshort;
} elseif (is_file($base.$dir.$prefix."ficha")) {
    include $scripts."/ficha.php";
} else {
    if (is_file($base.$dir.$prefix."doc")){ //Documentos: Notas de aplicación,...
      body_doc($dir);
    } elseif (is_file($base.$dir.$prefix."down")){ //Descargas
        body_down($dir);
    } elseif (is_file($base.$dir.$prefix."producto")) { //producto,subfamilia,familia
	if (is_file($base.$dir.$prefix."subfamilia")){ // subfamilia 
	    if (is_file($base.$dir.$prefix."subfamiliaAuto")){ // subfamilia auto 
		body_subfamilia_auto($dir);
	    } else {
        	body_subfamilia_producto($dir);
	    }
	} else { // producto
	    body_producto($dir);
	    body_subfamilia_producto($dir);
	}
    } elseif (is_file($base.$dir.$prefix."body")) { //body estático
        include $base.$dir.$prefix."body";
    } else {
        include $base."/".$prefix."construct";
    }
}
include $base.$root."/".$prefix."body3";
echo "<hr>"."\n";
include $base.$root."/".$prefix."footer";

include $scripts."/ip_filter.php";
if ("$is_albedo_intranet"=="no"){ include $base."/".$prefix."estats"; }
//include $base.$root."/".$prefix."estats"; 

include $base.$root."/".$prefix."index3";
?>
