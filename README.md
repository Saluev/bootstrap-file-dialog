# Bootstrap & jQuery File Dialog

## Dependencies

Uses only jQuery and Bootstrap. Tested on jQuery 1.9.0 and Bootstrap 3.2.0.

## Install

Install via [bower](http://bower.io/):
```bash
$ bower install --save bootstrap-file-dialog
```

## Usage

Basic usage example can be found in `example.html`.

To create (and open) a file dialog, run

```js
var fd = $.FileDialog(options);
```

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
* `error_message`: the message displayed on files that could not be loaded.
    Default: `An error occured while loading file`.
* `remove_message`: popup hint to remove file button. Default: `Remove file`.

To handle files choice when done, bind an event handler:

```js
fd.on('files.bs.filedialog', function(ev) {
    var files_list = ev.files;
    // ...
});
```

Every item in `files_list` is a
[`File` object](https://developer.mozilla.org/en-US/docs/Web/API/File),
extended with property `content` containing loaded file contents:

```js
$("img#my_img").attr('url', files_list[0].content);
```

To handle dialog cancelling, bind one more event handler:

```js
fd.on('cancel.bs.filedialog', function(ev) {
    // ...
});
```
## Contributing
```bash
# Clone repository
git clone git@github.com:Saluev/bootstrap-file-dialog.git
cd bootstrap-file-dialog

# Install required packages
npm install
bower install

# Install gulp globally
sudo npm install -g gulp

# Run server (using default task)
gulp

# Now, open your browser at 0.0.0.0:8000/example.html and start edit sources
```

## License

This "software" is proudly "distributed" under the MIT License, see `LICENSE`.

---------------------------------

© Tigran Saluev, 2014-2015
