/**
 * TabletLab.Base
 * Library base para o desenvolvimento de anúncios para tablets
 *
 * @author Tablet Lab
 * @version 1.1
 */
var TabletLabJQuery = null;
if(typeof(jQuery)=="function") { TabletLabJQuery = jQuery }

if(!window['TabletLab']) { var TabletLab = {}; }
;(function($) {
	TabletLab.Base = {
		/**
		 * TabletLab.Base.init
		 * Função de inicialização da library
		 *
		 * @author André Gumieri
		 * @version 1.0
		 *
		 * @param FUNCTION callback		- Função para ser executada logo após a inicialização
		 * @param OBJ options			- Opções de inicialização
		 */
		init: function(callback, options) {
			var self = this;
			var osInfo = self.getOSInfo();
			var settings = {
				idVertical: "vertical",
				idHorizontal: "horizontal",
			};
			$.extend(settings, options);


			// Se for Android, desabilita as animações do jQuery
			if(osInfo.androidDevice) {
				$.fx.off=true;
			}


			// Pega os elementos Horizontal e Vertical
			var $horizontal = $("#"+settings.idHorizontal);
			var $vertical = $("#"+settings.idVertical);


			// Verifica a orientação e mostra apenas o que precisa
			if(self.getOrientacao()=="horizontal") {
				$vertical.hide();
				$horizontal.fadeIn();
			} else {
				$horizontal.hide();
				$vertical.fadeIn();
			}


			// Se foi setado o callback, faz o call
			if(typeof(callback)=="function") {
				callback.call(self);
			}
		},


		/**
		 * TabletLab.Base.getOrientacao
		 * Retorna a orientação atual do device
		 *
		 * @author Carlos Soler
		 * @version 1.0
		 *
		 * @return "horizontal" ou "vertical"
		 */
		getOrientacao: function() {
			var landscapeOrientation = window.innerWidth / window.innerHeight > 1;
			if(landscapeOrientation) {
				return "horizontal";	
			} else {
				return "vertical";
			}
		},


		/**
		 * TabletLab.Base.getOSInfo
		 * Pega as informações sobre o sistema operacional e browser
		 *
		 * @author André Gumieri e Carlos Soler
		 * @version 1.1
		 *
		 * @return OBJ - Objeto com os seguintes parametros:
		 *					STRING userAgent: String do useragent do sistema
		 *					STRING os: ios | android
		 *					BOOL appleDevice: true se for um device da apple, false se não.
		 *					BOOL androidDevice: true se for um device android, false se não.
		 *					BOOL celular: true se for um celular, false se não.
		 *					BOOL tablet: true se for um tablet, false se não.
		 *					*** Para outros retornos, ver código abaixo ***
		 */
		getOSInfo: function() {
			var self = this;

			var ua = navigator.userAgent;
			var retorno = {
				userAgend: ua,
				os: null, 
				appleDevice: false, 
				androidDevice: false,
				celular: false,
				tablet: false,

				iPad: false,
				iPhone: false,
				androidPhone: false,
				androidTablet: false,

				osVersion: null
			};




			if(/ipad/i.test(ua)) {
				retorno.os = "ios";
				retorno.appleDevice = true;
				retorno.tablet = true;
				retorno.iPad = true;
			} else if(/iphone/i.test(ua)) {
				retorno.os = "ios";
				retorno.appleDevice = true;
				retorno.celular = true;
				retorno.iPhone = true;
			} else if(/android/i.test(ua)) {

				retorno.os = "android";
				retorno.androidDevice = true;
				if(/mobile/i.test(ua)) {

					retorno.celular = true;
					retorno.androidPhone = true;
				} else {

					retorno.tablet = true;
					retorno.androidTablet = true;
				}
			}



			// Detecta a versao do browser e do OS			
			if(retorno.os=="ios") {
				var reVersaoOs = /([0-9]_[0-9_?]+)/i;
				var versaoOs = reVersaoOs.exec(ua);
				if(versaoOs.length>1) {
					versaoOs = self.stringReplaceAll(versaoOs[1], "_", ".");
					retorno.osVersion = versaoOs;
				}
			} else if(retorno.os=="android") {
				var reVersaoOs = /Android ([0-9.?]+);?/i;
				var versaoOs = reVersaoOs.exec(ua);
				if(versaoOs.length>1) {
					versaoOs = versaoOs[1];
					retorno.osVersion = versaoOs;
				}
			}
			

			return retorno;
		},



		/**
		 * TabletLab.Base.stringReplaceAll
		 *
		 * @param STRING str – O valor onde será feita a busca do replace
		 * @param STRING de – A palavra/string que deve ser buscada
		 * @param STRING para – Por qual valor será modificado os resultados encontrados
		 *
		 * @version 1.0
		 *
		 * @return STRING - String com a modificação feita
		 */
		stringReplaceAll: function(str, de, para) {
			var pos = str.indexOf(de);
			while (pos > -1){
				str = str.replace(de, para);
				pos = str.indexOf(de);
			}
			return (str);
		}
	};
})(TabletLabJQuery);