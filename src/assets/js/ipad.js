if(!window['Anuncio']) { var Anuncio = {}; }
;(function($) {
	Anuncio.iPad = {
		$bg: $("#bg"),

		init: function() {
			if (TL.sysInfo().appleDevice) {
				var fd = parseInt(TL.sysInfo().osVersion.split('.')[0]);
				if (fd >= 6) {
					var self = this;
					self.setupUpload();
					window.addEventListener('resize', self._resize);
				} else {
					$('#comandos').hide();
					$('#alert').html('Este recurso está disponível somente para iOS 6 ou superior.');
					$('#alert').show();
				}
			} else {
				$('#comandos').hide();
				$('#alert').html('Este recurso não está disponível para esta plataforma em tablets Android.');
				$('#alert').show();
			}
		},


		_resize: function() {
			var self = Anuncio.iPad;
			self.ajustaTamanhoBg();
		},


		ajustaTamanhoBg: function(callback) {
			var self = this;
			var $img = self.$bg.children("img");
			if($img.is("*")) {
				var novaLargura = window.innerWidth;
				var novaAltura = (novaLargura*$img.data("height-original"))/$img.data("width-original");
				if(novaAltura<window.innerHeight) {
					novaAltura = window.innerHeight;
					novaLargura = (novaAltura*$img.data("width-original"))/$img.data("height-original");
				}

				var x = (window.innerWidth-novaLargura)/2;
				var y = (window.innerHeight-novaAltura)/2;

				$img.width(novaLargura);
				$img.height(novaAltura);				
				$img.css({
					top: y,
					left: x
				});

				if(typeof callback == "function") {
					callback.call(self);
				}
			}
		},


		setupUpload: function() {
			var self = this;
			$("#fazerUpload").tlabHelperUpload({
				beforeUploadWindow: function(ev) {self.$bg.css("opacity", 0);},

				afterRead: function(f) {
					var $img = f[0].$img;

					
					self.$bg.children("img").remove();
					self.$bg.append($img);
					$img.on("load", function() {
						$img.data("width-original", $img.width());
						$img.data("height-original", $img.height());
						self.ajustaTamanhoBg(function() {
							$("#fazerUpload").show();
							$("#carregando").hide();
							self.$bg.css("opacity", 1);
						});
						
					});
				},

				onSelectFiles: function(f) {
					$("#fazerUpload").hide();
					$("#carregando").show();
				}
			});
		}
	}
	$(window).load(function() { Anuncio.iPad.init(); })
})(jQuery);