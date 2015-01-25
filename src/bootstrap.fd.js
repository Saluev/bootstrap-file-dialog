/**
 * 
 * @source: https://github.com/Saluev/bootstrap-file-dialog/blob/master/bootstrap.fd.js
 * 
 * Copyright (C) 2014-2015 Tigran Saluev
 * 
 */
(function($) {
    'use strict';
    
    $.FileDialog = function FileDialog(userOptions) {
        var options = $.extend({}, $.FileDialog.defaults, userOptions);
        
        var modal_html = '\
<div class="modal fade">\
  <div class="modal-dialog">\
    <div class="modal-content">\
      <div class="modal-header">\
        <button type="button" class="close" data-dismiss="modal">\
          <span aria-hidden="true">&times;</span><span class="sr-only">{{cancel_button}}</span>\
        </button>\
        <h4 class="modal-title">{{title}}</h4>\
      </div>\
      <div class="modal-body">\
        <input type="file" />\
        <div class="bfd-dropfield">\
          <div class="bfd-dropfield-inner">{{drag_message}}</div>\
        </div>\
        <div class="container-fluid bfd-files">\
          \
        </div>\
      </div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-primary bfd-ok">{{ok_button}}</button>\
        <button type="button" class="btn btn-default bfd-cancel" data-dismiss="modal">{{cancel_button}}</button>\
      </div>\
    </div>\
  </div>\
</div>';
        modal_html = modal_html.replace(/{{title}}/g, options.title);
        modal_html = modal_html.replace(/{{ok_button}}/g, options.ok_button);
        modal_html = modal_html.replace(/{{cancel_button}}/g, options.cancel_button);
        modal_html = modal_html.replace(/{{drag_message}}/g, options.drag_message);
        
        var done = false;
        
        var modal = $(modal_html);
        var input = $("input:file", modal);
        var dropfield = $(".bfd-dropfield", modal);
        var dropfieldInner = $(".bfd-dropfield-inner", dropfield);
        
        dropfieldInner.css({height: options.dropheight});
        dropfieldInner.css('padding-top', options.dropheight / 2 - 32);
        
        input.attr({accept: options.accept, multiple: options.multiple});
        
        dropfield.on('click.bfd', function() {
            input.trigger('click');
        });
        
        var loaded_files = [];
        var readers = [];
        
        var load_file = function load_file(f) {
            var reader = new FileReader();
            var progress_bar, row;
            
            readers.push(reader);
            
            reader.onloadstart = function(ev) {
                
            };
            
            reader.onerror = function(ev) {
                if(ev.target.error.code == ev.target.error.ABORT_ERR)
                    return;
                progress_bar.parent().html([
                  '<div class="bg-danger bfd-error-message">',
                    options.error_message,
                  '</div>'].join(''));
            };
            
            reader.onprogress = function(ev) {
                var percentLoaded = Math.round(ev.loaded * 100. / ev.total) + '%';
                progress_bar.attr('aria-valuenow', ev.loaded);
                progress_bar.css ('width', percentLoaded);
                $(".sr-only", progress_bar).text(percentLoaded);
            };
            
            reader.onload = function(ev) {
                f.content = ev.target.result;
                loaded_files.push(f);
                progress_bar.removeClass('active');
                //progress_bar.addClass('progress-bar-success');
            };
            
            var progress = $([
                  '<div class="col-xs-7 col-sm-4 bfd-info">',
                  '  <span class="glyphicon glyphicon-remove bfd-remove"></span>&nbsp;' +
                  '  <span class="glyphicon glyphicon-file"></span>&nbsp;'   + f.name,
                  '</div>',
                  '<div class="col-xs-5 col-sm-8 bfd-progress">',
                  '  <div class="progress">',
                  '    <div class="progress-bar progress-bar-striped active" role="progressbar"',
                  '         aria-valuenow="0" aria-valuemin="0" aria-valuemax="' + f.size + '">',
                  '      <span class="sr-only">0%</span>',
                  '    </div>',
                  '  </div>',
                  '</div>',
                ].join("\n"));
            progress_bar = $(".progress-bar", progress);
            $(".bfd-remove", progress).tooltip({
                title: options.remove_message, 
                placement: 'top',
                container: 'body',
                html: true,
            }).on('click.bfd', function(ev) {
                reader.abort();
                var idx = loaded_files.indexOf(f);
                if(idx >= 0)
                  loaded_files.pop(idx);
                row.fadeOut();
            });
            row = $('<div class="row"></div>');
            row.append(progress);
            $(".bfd-files", modal).append(row);
            
            reader['readAs' + options.readAs](f);
        };
        
        var load_files = function load_files(flist) {
            Array.prototype.forEach.apply(flist, [load_file]);
        };
        
        // setting up event handlers
        input.change(function(ev) {
            ev = ev.originalEvent;
            var files = ev.target.files;
            load_files(files);
            // clearing input field by replacing it with a clone (lol)
            var new_input = input.clone(true);
            input.replaceWith(new_input);
            input = new_input;
        });
        // // drag&drop stuff
        dropfield.on('dragenter.bfd', function(ev) {
            dropfieldInner.addClass("bfd-dragover");
        });
        dropfield.on('dragover.bfd', function(ev) {
            ev = ev.originalEvent;
            ev.stopPropagation();
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'copy';
        });
         dropfield.on('dragleave.bfd drop.bfd', function(ev) {
            dropfieldInner.removeClass("bfd-dragover");
        });
        dropfield.on('drop.bfd', function(ev) {
            ev = ev.originalEvent;
            ev.stopPropagation();
            ev.preventDefault();
            var files = ev.dataTransfer.files;
            if(files.length == 0) {
                // problem with desktop/browser
                // ... TODO
            }
            load_files(files);
        });
        
        $(".bfd-ok", modal).on('click.bfd', function(ev) {
            var event = $.Event('files.bs.filedialog');
            event.files = loaded_files;
            modal.trigger(event);
            done = true;
            modal.modal('hide');
        });
        
        modal.on('hidden.bs.modal', function() {
            readers.forEach(function(reader) { reader.abort(); });
            if(!done) {
                var event = $.Event('cancel.bs.filedialog');
                modal.trigger(event);
            }
            modal.remove();
        });
        
        $(document.body).append(modal);
        modal.modal();
        
        return modal;
    }
    
    $.FileDialog.defaults = {
        accept: "*", /* e. g. 'image/*' */
        dropheight: 400,
        title: 'Load file(s)',
        ok_button: 'OK',
        cancel_button: 'Close',
        drag_message: 'Drop files here',
        error_message: 'An error occured while loading file',
        remove_message: 'Remove&nbsp;file',
        multiple: true,
        readAs: 'DataURL', /* possible choices: BinaryString, Text, DataURL, ArrayBuffer, */
    }
    
})(jQuery);
