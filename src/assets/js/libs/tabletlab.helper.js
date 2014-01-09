/**
 * TabletLab.Helper
 * Library com funções para facilitar tasks comuns
 *
 * @author André Gumieri
 * @version 1.0
 */
if(!window['TabletLab']) { var TabletLab = {}; }
;(function($) {
	TabletLab.Helper = {
		Upload: {
			conf: {
				afterRead: null,
				beforeUploadWindow: null,
				onSelectFiles: null
			},

			confFixa: {
				accept: 'image/*',
				multiple: false,
				afterReadEach: null,
				beforeReadEach: null
			},

			parseJquery: function(method) {
				var self = TabletLab.Helper.Upload;
				if (typeof method === 'object' || typeof method === 'function' || !method || method=="parseJquery") {
					return self.init.apply( this, arguments );
				} else if(self[method]) {
					return self[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
				} else {
					$.error('Method ' +  method + ' does not exist on jQuery.tlHelperUpload');
				}
			},

			init: function(conf) {
				var self = TabletLab.Helper.Upload;

				var newConf = $.extend({}, self.conf);
				if(typeof conf === 'object') {
					newConf = $.extend(self.conf, conf, self.confFixa);
				}


				this.each(function(i) {
					var id="tlHelperUpload_"+i;
					var $botao = $(this);

					
					// Cria um novo campo de upload
					var $file = $("<input />");
					$file.attr({
						type: 'file',
						accept: self.conf.accept,
						multiple: self.conf.multiple,
						id: id,
						name: id
					});

					$file.css({
						position: 'absolute',
						top: -100,
						left: -100,
						display: 'block'
					});
					//$("body").append("Block Fora da Tela");

					// Faz referencia para as confs
					$botao.data("conf", $.extend({}, self.conf));
					$file.data("conf", $.extend({}, self.conf));


					$("body").prepend($file);
					$botao.data("elFile", $file);
					$botao.click(self._eventBotaoUploadClick);
					$file.change(self._eventFileChange);

					var elUpload = document.getElementById(id);
				});
			},

			_eventBotaoUploadClick: function(e) {
				var self = TabletLab.Helper.Upload;
				var conf = $(this).data("conf");

				// Callback beforeUploadWindow
				if(typeof conf.beforeUploadWindow === 'function') {
					var r = conf.beforeUploadWindow.call(self);
					if(r===false) {
						return false;
					}
				}

				var $file = $(this).data("elFile");
				if($file.is("input[type='file']")) {
					e.preventDefault();
					$file.click();
				}
			},

			_eventFileChange: function(e) {
				var today = new Date();

				var self = TabletLab.Helper.Upload;
				var input = this;
				var files = Array();
				var carregados = 0;
				var aCarregar = input.files.length;
				var conf = $(this).data("conf");


				// Callback onSelectFiles
				if(typeof conf.onSelectFiles === 'function') {
					var r = conf.onSelectFiles.call(self, $.extend({}, input.files));
					if(r===false) {
						return false;
					}
				}

				
				var readerAllLoaded = function(fileInfo) {
					// Callback afterReadEach
					if(typeof conf.afterReadEach === 'function') {
						var r = conf.afterReadEach.call(self, $.extend({}, fileInfo));
					}

					if(carregados==aCarregar) {
						// Callback afterRead
						if(typeof conf.afterRead === 'function') {
							var r = conf.afterRead.call(self, $.extend({}, files));
						}
					}
				}

				for(var x=0; x<input.files.length; x++) {
					var arquivo = x;
					var fileObj = {
						name: input.files[x].name,
						size: input.files[x].size,
						type: input.files[x].type,
						$img: null
					};
					

					// Callback beforeReadEach
					if(typeof conf.beforeReadEach === 'function') {
						var r = conf.beforeReadEach.call(self, $.extend({}, fileObj));
						if(r===false) {
							aCarregar--;
							continue;
						}
					}

					files.push(fileObj);

					var reader = new FileReader();
					var reader2 = new FileReader();
					reader.fileInfo = fileObj;
					reader.onload = function(e) {
						carregados++;
						var $img = $("<img />");
						$img.attr('src', e.target.result);
						fileObj.$img = $img;
						readerAllLoaded(this.fileInfo);
					}
					reader.readAsDataURL(input.files[x]);
				}
			}
		}
	};


	$.fn.tlabHelperUpload = TabletLab.Helper.Upload.parseJquery;

})(jQuery);