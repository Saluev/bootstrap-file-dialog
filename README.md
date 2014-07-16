# Bootstrap & jQuery File Dialog

## Dependencies

Uses only jQuery and Bootstrap. Tested on jQuery 1.9.0 and Bootstrap 3.2.0.

## Usage

Basic usage example can be found in `example.html`.

To create (and open) a file dialog, run

    var fd = $.FileDialog(options);

Supported options:

* `accept`: MIME type of accepted files, e. g. `image/jpeg`. String. Default: `*`.
* `dropheight`: the height of drop zone in pixels. Number. Default: `400`.
* `multiple`: whether it is possible to choose multiple files or not. Boolean.
    Default: `true`. **Choosing single file is not yet implemented**, sorry.
* `readAs`: file reading mode. String. Supported values: `BinaryString`, `Text`,
    `DataURL`, `ArrayBuffer` (case sensitive). Default: `DataURL`.

Auxiliary string options for internationalization:

* `title`: the dialog title. Default: `Load file(s)`.
* `ok_button`: caption of the OK button. Default: `OK`.
* `cancel_button`: caption of the Cancel button. Default: `Close`.
* `drag_message`: the central text of drop zone. Default: `Drop files here`.
* `error message`: the message displayed on files that could not be loaded.
    Default: `An error occured while loading file`.

To handle files choice when done, bind an event handler:

    fd.on('files.bs.filedialog', function(ev) {
        var files_list = ev.files;
        // ...
    });

Every item in `files_list` is a
[`File` object](https://developer.mozilla.org/en-US/docs/Web/API/File),
extended with property `content` containing loaded file contents:

    $("img#my_img").attr('url', files_list[0].content);

To handle dialog cancelling, bind one more event handler:

    fd.on('cancel.bs.filedialog', function(ev) {
        // ...
    });

## License

This "software" is proudly "distributed" under the MIT License, see `LICENSE`.

---------------------------------

© Tigran Saluev, 2014.
