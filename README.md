nod.-mecab-swig
-----
MeCab bidning for node.js using swig and node-gyp

Requirements
-----
- MeCab (mecab-0.996, mecab-ipadic, mecab-config)
- Node.js (4.x or 5.x or 6.x)
- Linux OS

Install MeCab
-----
```bash
// yum
$ sudo yum install http://packages.groonga.org/centos/groonga-release-1.1.0-1.noarch.rpm
$ sudo yum install mecab mecab-ipadic mecab-config

// From Source
// MeCab
$ wget -O mecab-0.996.tar.gz https://googledrive.com/host/0B4y35FiV1wh7cENtOXlicTFaRUE
$ tar zxfv mecab-0.996.tar.gz
$ cd mecab-0.996
$ ./configure --enable-utf8-only
$ make
$ make check
$ sudo make install
$ sudo ldconfig
// MeCab IPA Dictionary
$ wget -O mecab-ipadic-2.7.0-20070801.tar.gz https://googledrive.com/host/0B4y35FiV1wh7MWVlSDBCSXZMTXM
$ tar zxfv mecab-ipadic-2.7.0-20070801.tar.gz
$ cd mecab-ipadic-2.7.0-20070801
$ ./configure --with-charset=utf8
$ make
$ sudo make install
$ sudo ldconfig
```
MeCab downloads: https://drive.google.com/drive/folders/0B4y35FiV1wh7fjQ5SkJETEJEYzlqcUY4WUlpZmR4dDlJMWI5ZUlXN2xZN2s2b0pqT3hMbTQ

Install
-----
```bash
$ npm install https://github.com/wegenichtwerke/node-mecab-swig.git
```

Usage
-----
```javascript
'use strict';

var MeCab = require('node-mecab-swig');
var tagger = new MeCab.Tagger(""); 
tagger.parse('');     // for internal initialization

// Parse text
var sentence = '太郎は次郎が持っている本を花子に渡した。';
var out = tagger.parse(sentence);
console.log(out);


// Parse NBest
tagger.parseNBest(10, sentence);
tagger.parseNBestInit(sentence);
for (var i = 0; i<10; i++){
    var node = tagger.nextNode();
    while( node ) {
        var node_surface = node.surface + "";
        if( node_surface.length  > 0){
            console.log( node_surface, node.feature, node.cost ) ;
            console.log("------------------")
            // output other words in the same span
            snode = node.enext;
            while( snode ){
                if( snode.length == node.length ){
                    console.log( "\t", snode.surface, snode.feature, snode.cost ) ;
                } else if ( snode.length > node.length ){
                    break;
                }
                snode = snode.enext;
            }
        }
        node = node.next;

    }
    console.log("**************");

}

```

License
-----
BSD-3-Clause
