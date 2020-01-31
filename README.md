nod.-mecab-swig
-----
MeCab bidning for node.js using swig and node-gyp


Synopsis
----
There are already several node.js bindings for MeCab , such as 

- mecab-async - npm https://www.npmjs.com/package/mecab-async
- MeCab - npm https://www.npmjs.com/package/MeCab
- umatoma/node-mecab-native: MeCab Node.js binding https://github.com/umatoma/node-mecab-native

But none of them supports parseNBest() method, which is the main reason to produce this package.
This binding is base on node-gyp and SWIG, like ones bundled wth Mecab original package.  Therefore the calling style of Mecab API is similar to java, python and ruby bindings. 

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
var tagger = new MeCab.Tagger("");  // use ipadic
tagger.parse('');     // for internal initialization

// Parse text
var sentence = '太郎は次郎が持っている本を花子に渡した。';
var out = tagger.parse(sentence);
console.log(out);

// 花      名詞,一般,*,*,*,*,花,ハナ,ハナ
// が      助詞,格助詞,一般,*,*,*,が,ガ,ガ
// 咲い    動詞,自立,*,*,五段・カ行イ音便,連用タ接続,咲く,サイ,サイ
// た      助動詞,*,*,*,特殊・タ,基本形,た,タ,タ
// 。      記号,句点,*,*,*,*,。,。,。
// EOS


// Parse NBest
sentence = "東京都庁舎前";
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

// 東京 名詞,固有名詞,地域,一般,*,*,東京,トウキョウ,トーキョー 2693
// ------------------
// 都 名詞,接尾,地域,*,*,*,都,ト,ト 2504
// ------------------
// 庁舎 名詞,一般,*,*,*,*,庁舎,チョウシャ,チョーシャ 9149
// ------------------
// 前 名詞,副詞可能,*,*,*,*,前,マエ,マエ 12899
// ------------------
//          前 名詞,副詞可能,*,*,*,*,前,ゼン,ゼン 19574
//          前 名詞,固有名詞,地域,一般,*,*,前,マエ,マエ 19938
//          前 接頭詞,数接続,*,*,*,*,前,ゼン,ゼン 19619
//          前 接頭詞,名詞接続,*,*,*,*,前,ゼン,ゼン 15477
//          前 名詞,接尾,副詞可能,*,*,*,前,マエ,マエ 15851
//          前 名詞,接尾,一般,*,*,*,前,ゼン,ゼン 20133
// *****************************************************
// 東京 名詞,固有名詞,地域,一般,*,*,東京,トウキョウ,トーキョー 2693
// ------------------
// 都庁 名詞,一般,*,*,*,*,都庁,トチョウ,トチョー 7010
// ------------------
// 舎 名詞,接尾,一般,*,*,*,舎,シャ,シャ 10911
// ------------------
// 前 名詞,副詞可能,*,*,*,*,前,マエ,マエ 12899
// ------------------
//          前 名詞,副詞可能,*,*,*,*,前,ゼン,ゼン 19574
//          前 名詞,固有名詞,地域,一般,*,*,前,マエ,マエ 19938
//          前 接頭詞,数接続,*,*,*,*,前,ゼン,ゼン 19619
//          前 接頭詞,名詞接続,*,*,*,*,前,ゼン,ゼン 15477
//          前 名詞,接尾,副詞可能,*,*,*,前,マエ,マエ 15851
//          前 名詞,接尾,一般,*,*,*,前,ゼン,ゼン 20133
// *****************************************************
// 東 名詞,一般,*,*,*,*,東,ヒガシ,ヒガシ 5962
// ------------------
//          東 名詞,一般,*,*,*,*,東,アズマ,アズマ 9498
//          東 名詞,固有名詞,人名,姓,*,*,東,アズマ,アズマ 10601
//          東 名詞,固有名詞,人名,姓,*,*,東,ヒガシ,ヒガシ 11703
//          東 名詞,固有名詞,人名,名,*,*,東,ヒガシ,ヒガシ 13032
// *****************************************************
// 東京 名詞,固有名詞,地域,一般,*,*,東京,トウキョウ,トーキョー 2693
// ------------------
// 都 名詞,一般,*,*,*,*,都,ミヤコ,ミヤコ 8985
// ------------------
//          都 名詞,固有名詞,人名,名,*,*,都,ミヤコ,ミヤコ 13779
//          都 名詞,固有名詞,人名,姓,*,*,都,ミヤコ,ミヤコ 15005
//          都 名詞,固有名詞,地域,一般,*,*,都,ミヤコ,ミヤコ 12585
//          都 名詞,接尾,地域,*,*,*,都,ト,ト 2504
// 庁舎 名詞,一般,*,*,*,*,庁舎,チョウシャ,チョーシャ 9149
// ------------------
// 前 名詞,副詞可能,*,*,*,*,前,マエ,マエ 12899
// ------------------
//          前 名詞,副詞可能,*,*,*,*,前,ゼン,ゼン 19574
//          前 名詞,固有名詞,地域,一般,*,*,前,マエ,マエ 19938
//          前 接頭詞,数接続,*,*,*,*,前,ゼン,ゼン 19619
//          前 接頭詞,名詞接続,*,*,*,*,前,ゼン,ゼン 15477
//          前 名詞,接尾,副詞可能,*,*,*,前,マエ,マエ 15851
//          前 名詞,接尾,一般,*,*,*,前,ゼン,ゼン 20133
// *****************************************************
// 東京 名詞,固有名詞,地域,一般,*,*,東京,トウキョウ,トーキョー 2693
// ------------------
// 都 名詞,接尾,地域,*,*,*,都,ト,ト 2504
// ------------------
// 庁舎 名詞,一般,*,*,*,*,庁舎,チョウシャ,チョーシャ 9149
// ------------------
// 前 接頭詞,名詞接続,*,*,*,*,前,ゼン,ゼン 15477
// ------------------
//          前 名詞,接尾,副詞可能,*,*,*,前,マエ,マエ 15851
//          前 名詞,接尾,一般,*,*,*,前,ゼン,ゼン 20133
// *****************************************************
// 東 名詞,固有名詞,地域,一般,*,*,東,ヒガシ,ヒガシ 11301
// ------------------
//          東 名詞,固有名詞,地域,一般,*,*,東,アズマ,アズマ 12395
//          東 名詞,固有名詞,一般,*,*,*,東,ヒガシ,ヒガシ 11322
// 京都 名詞,固有名詞,地域,一般,*,*,京都,キョウト,キョート 7729
// ------------------
//          京都 名詞,固有名詞,地域,一般,*,*,京都,ミヤコ,ミヤコ 13663
//          京都 名詞,固有名詞,一般,*,*,*,京都,キョウト,キョート 12745
// 庁舎 名詞,一般,*,*,*,*,庁舎,チョウシャ,チョーシャ 9149
// ------------------
// 前 名詞,副詞可能,*,*,*,*,前,マエ,マエ 12899
// ------------------
//          前 名詞,副詞可能,*,*,*,*,前,ゼン,ゼン 19574
//          前 名詞,固有名詞,地域,一般,*,*,前,マエ,マエ 19938
//          前 接頭詞,数接続,*,*,*,*,前,ゼン,ゼン 19619
//          前 接頭詞,名詞接続,*,*,*,*,前,ゼン,ゼン 15477
//          前 名詞,接尾,副詞可能,*,*,*,前,マエ,マエ 15851
//          前 名詞,接尾,一般,*,*,*,前,ゼン,ゼン 20133
// *****************************************************
// 東 名詞,一般,*,*,*,*,東,アズマ,アズマ 9498
// ------------------
//          東 名詞,固有名詞,人名,姓,*,*,東,アズマ,アズマ 10601
//          東 名詞,固有名詞,人名,姓,*,*,東,ヒガシ,ヒガシ 11703
//          東 名詞,固有名詞,人名,名,*,*,東,ヒガシ,ヒガシ 13032
//          東 名詞,固有名詞,地域,一般,*,*,東,ヒガシ,ヒガシ 11301
//          東 名詞,固有名詞,地域,一般,*,*,東,アズマ,アズマ 12395
//          東 名詞,固有名詞,一般,*,*,*,東,ヒガシ,ヒガシ 11322
// 京都 名詞,固有名詞,地域,一般,*,*,京都,キョウト,キョート 7729
// ------------------
//          京都 名詞,固有名詞,地域,一般,*,*,京都,ミヤコ,ミヤコ 13663
//          京都 名詞,固有名詞,一般,*,*,*,京都,キョウト,キョート 12745
// 庁舎 名詞,一般,*,*,*,*,庁舎,チョウシャ,チョーシャ 9149
// ------------------
// 前 名詞,副詞可能,*,*,*,*,前,マエ,マエ 12899
// ------------------
//          前 名詞,副詞可能,*,*,*,*,前,ゼン,ゼン 19574
//          前 名詞,固有名詞,地域,一般,*,*,前,マエ,マエ 19938
//          前 接頭詞,数接続,*,*,*,*,前,ゼン,ゼン 19619
//          前 接頭詞,名詞接続,*,*,*,*,前,ゼン,ゼン 15477
//          前 名詞,接尾,副詞可能,*,*,*,前,マエ,マエ 15851
//          前 名詞,接尾,一般,*,*,*,前,ゼン,ゼン 20133
// *****************************************************




// dictionary info 

out = tagger.dictionary_info();
console.log(out);


// _exports_DictionaryInfo {
//   next: null,
//   version: 102,
//   rsize: 1316,
//   lsize: 1316,
//   type: 0,
//   size: 392126,
//   charset: 'utf8',
//   filename: '/usr/lib64/mecab/dic/ipadic/sys.dic' }






```

License
-----
BSD-3-Clause
